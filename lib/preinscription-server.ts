import { del, get, list, put } from "@vercel/blob";
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
};

export type StoredPreinscription = Preinscription & { pathname: string };

function assertOwnPathname(pathname: string) {
  if (!pathname.startsWith(prefix) || !pathname.endsWith(".json")) {
    throw new Error("Pré-inscription introuvable");
  }
}

export async function savePreinscription(record: Preinscription) {
  const stamp = record.createdAt.replace(/[:.]/g, "-");
  await put(`${prefix}${stamp}-${record.id}.json`, JSON.stringify(record), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false
  });
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
