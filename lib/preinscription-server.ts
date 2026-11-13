import { del, get, list, put } from "@vercel/blob";
import {
  isCockpitConfigured,
  sendToCockpit,
  shouldRetryAutomatically,
  type CockpitResult
} from "@/lib/cockpit";
import { eligibilityStatuses, type EligibilityStatus } from "@/lib/content";

/**
 * Ouverture des pré-inscriptions : 1er octobre 2026 à 0 h, heure de Guadeloupe (UTC−4, sans heure d'été).
 * PREINSCRIPTION_OPENS_AT permet de simuler une autre date en local.
 */
const opensAt = new Date(process.env.PREINSCRIPTION_OPENS_AT ?? "2026-10-01T00:00:00-04:00");

export function isPreinscriptionOpen(now = new Date()) {
  return now.getTime() >= opensAt.getTime();
}

/** Les essais en local ou en preview restent séparés des vraies pré-inscriptions. */
export const isProductionData = process.env.VERCEL_ENV === "production";
const prefix = isProductionData ? "pre-inscriptions/" : "test-pre-inscriptions/";

/** Transmission au cockpit de l'AGMS : faite le…, ou dernière erreur (code seul, sans donnée personnelle). */
export type CockpitState =
  | {
      status: "transmise";
      at: string;
      /**
       * Présent quand le cockpit n'a pas confirmé « aucun message automatique » pour cette demande :
       * la personne a pu recevoir un WhatsApp tout seul, à vérifier côté cockpit.
       */
      automated?: true;
    }
  | { status: "erreur"; at: string; code: string };

/**
 * Demande d'inscription. Les champs marqués optionnels n'existent que dans le dossier de demande
 * d'inscription (depuis le 12 novembre 2026) : les pré-inscriptions plus anciennes ne les ont pas.
 */
export type Preinscription = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  situation: string;
  school: string;
  message: string;
  birthDate?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  /** Discipline envisagée en licence portail santé. */
  discipline?: string;
  scholarship?: string;
  /** Échelon de bourse (renseigné si l'étudiant·e est boursier·ère). */
  scholarshipLevel?: string;
  bacMentionStatus?: string;
  bacMention?: string;
  /** Parent, représentant légal ou contact d'urgence. */
  emergencyName?: string;
  emergencyRelation?: string;
  emergencyPhone?: string;
  imageRights?: string;
  whatsappGroup?: boolean;
  /** Suivi de l'éligibilité, saisi dans l'espace admin (absent : « à étudier »). */
  eligibility?: EligibilityStatus;
  /** Suivi de la transmission au cockpit (absent : jamais tentée). */
  cockpit?: CockpitState;
};

export type StoredPreinscription = Preinscription & { pathname: string };

function assertOwnPathname(pathname: string) {
  if (!pathname.startsWith(prefix) || !pathname.endsWith(".json")) {
    throw new Error("Pré-inscription introuvable");
  }
}

/** Enregistre la demande et renvoie son emplacement (utile pour y noter ensuite la transmission au cockpit). */
export async function savePreinscription(record: Preinscription) {
  const stamp = record.createdAt.replace(/[:.]/g, "-");
  const pathname = `${prefix}${stamp}-${record.id}.json`;
  await put(pathname, JSON.stringify(record), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false
  });
  return pathname;
}

export async function listPreinscriptions(): Promise<StoredPreinscription[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((blob) => blob.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const records: StoredPreinscription[] = [];
  for (let i = 0; i < pathnames.length; i += 10) {
    const batch = await Promise.all(pathnames.slice(i, i + 10).map(readPreinscription));
    for (const record of batch) {
      if (record) records.push(record);
    }
  }

  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function readPreinscription(pathname: string): Promise<StoredPreinscription | null> {
  // Sans cache : une mise à jour (éligibilité) doit se voir tout de suite dans l'admin.
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  const record = JSON.parse(await new Response(result.stream).text()) as Preinscription;
  return { ...record, pathname };
}

export async function setPreinscriptionEligibility(pathname: string, eligibility: string) {
  assertOwnPathname(pathname);
  if (!eligibilityStatuses.some((status) => status.value === eligibility)) {
    throw new Error("Statut d'éligibilité inconnu");
  }
  const current = await readPreinscription(pathname);
  if (!current) throw new Error("Pré-inscription introuvable");
  const { pathname: _ignored, ...record } = current;
  const updated: Preinscription = { ...record, eligibility: eligibility as EligibilityStatus };
  await put(pathname, JSON.stringify(updated), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true
  });
}

export async function deletePreinscription(pathname: string) {
  assertOwnPathname(pathname);
  await del(pathname);
}

/** Les essais (local, preview) ne partent jamais au cockpit : il n'a qu'une base, la vraie. */
export function canSendToCockpit() {
  return isProductionData && isCockpitConfigured();
}

async function noteCockpitState(pathname: string, state: CockpitState) {
  const current = await readPreinscription(pathname);
  // Supprimée entre-temps : on ne la recrée pas. Déjà transmise : un échec ultérieur ne l'efface pas.
  if (!current) return;
  if (current.cockpit?.status === "transmise" && state.status === "erreur") return;
  const { pathname: _ignored, ...record } = current;
  const updated: Preinscription = { ...record, cockpit: state };
  await put(pathname, JSON.stringify(updated), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true
  });
}

/**
 * Transmet une demande au cockpit de l'AGMS, puis note le résultat dans son enregistrement.
 * À appeler après l'enregistrement (after() de next/server) : ne lève jamais d'erreur, et ne
 * journalise que l'identifiant et un code, jamais une donnée personnelle.
 * Renvoie le résultat de l'envoi, ou null si rien n'est parti (hors production, liaison absente).
 */
export async function transmitPreinscription(
  pathname: string,
  known?: Preinscription,
  options: { singleAttempt?: boolean } = {}
): Promise<CockpitResult | null> {
  let id = known?.id ?? "";
  try {
    assertOwnPathname(pathname);
    if (!isProductionData) {
      console.info("[cockpit] hors production : demande non transmise", { id });
      return null;
    }
    if (!isCockpitConfigured()) {
      console.warn("[cockpit] COCKPIT_URL ou COCKPIT_WEBHOOK_KEY absente : demande non transmise", { id });
      return null;
    }
    const record = known ?? (await readPreinscription(pathname));
    if (!record) return null;
    id = record.id;

    const result = await sendToCockpit(record, options.singleAttempt ? { delays: [] } : {});
    if (!result.ok) {
      console.error("[cockpit] demande non transmise", { id, code: result.code, essais: result.attempts });
    } else if (result.automated) {
      // Décision du 13/11/2026 : aucune pré-inscription ne doit déclencher de message automatique.
      console.error("[cockpit] demande transmise, mais le cockpit n'a pas confirmé l'absence de message automatique", { id });
    }
    const at = new Date().toISOString();
    await noteCockpitState(
      pathname,
      result.ok
        ? { status: "transmise", at, ...(result.automated ? { automated: true as const } : {}) }
        : { status: "erreur", at, code: result.code }
    );
    return result;
  } catch (error) {
    console.error("[cockpit] suivi de la transmission impossible", {
      id,
      code: error instanceof Error ? error.name : "inconnu"
    });
    return null;
  }
}

/**
 * Rattrapage planifié (app/api/cron/cockpit/route.ts) : renvoie, de la plus ancienne à la plus
 * récente, les demandes que shouldRetryAutomatically retient. Un seul essai par demande, un nombre
 * et une durée bornés ; le passage suivant reprend le reste. Ne renvoie que des nombres.
 */
export async function retryPendingTransmissions({ limit = 20, budgetMs = 40_000 } = {}) {
  if (!canSendToCockpit()) return { ready: false as const };

  const started = Date.now();
  const now = new Date();
  const pending = (await listPreinscriptions()).filter((record) => record.cockpit?.status !== "transmise");
  const candidates = pending.filter((record) => shouldRetryAutomatically(record, now)).reverse();

  let tried = 0;
  let sent = 0;
  for (const { pathname, ...record } of candidates.slice(0, limit)) {
    if (Date.now() - started > budgetMs) break;
    tried++;
    const result = await transmitPreinscription(pathname, record, { singleAttempt: true });
    if (result?.ok) sent++;
    // Clé refusée ou réception fermée : les suivantes échoueraient de la même façon.
    else if (result && (result.code === "http_401" || result.code === "http_503")) break;
  }

  return {
    ready: true as const,
    /** Demandes non transmises avant ce passage, historique compris. */
    pending: pending.length,
    candidates: candidates.length,
    tried,
    sent
  };
}
