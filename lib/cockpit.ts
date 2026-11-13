import type { Preinscription } from "./preinscription-server";

/**
 * Chaque demande d'inscription part aussi vers le cockpit de l'AGMS (son outil de gestion interne) :
 * POST {COCKPIT_URL}/api/webhooks/site, signé par une clé partagée (COCKPIT_WEBHOOK_KEY, la même
 * valeur que SITE_WEBHOOK_KEY côté cockpit). C'est le cockpit qui prévient ensuite l'équipe par e-mail.
 *
 * L'enregistrement du site (Vercel Blob) reste la référence : ce fichier ne lève jamais d'erreur,
 * et ne journalise aucune donnée personnelle (identifiant et code d'erreur seulement).
 * L'appel est idempotent par identifiant : un second envoi répond 200 { deja: true }.
 *
 * Une demande qui n'est pas arrivée se voit en tête de /admin, se renvoie d'un clic, et repart toute
 * seule une fois par jour (app/api/cron/cockpit/route.ts, variable CRON_SECRET).
 *
 * Sans dépendance au reste du site, pour que tests/cockpit.test.mjs puisse le charger tel quel.
 */

/** Longueurs acceptées par le cockpit : un champ plus long ferait refuser toute la demande (400). */
const limits = {
  prenom: 80,
  nom: 80,
  email: 160,
  telephone: 40,
  objet: 200,
  message: 4000,
  details: 2000
} as const;

const subject = "Pré-inscription · Dispositif AGMS (FSE+)";

export type CockpitPayload = {
  id: string;
  type: "pre_inscription";
  formation_code: "PREPA_PASS_LAS";
  recu_le?: string;
  prenom: string | null;
  nom: string;
  email: string | null;
  telephone: string | null;
  /** Toujours vide : le cockpit ne lit ce champ que pour une entreprise. L'établissement part dans `details`. */
  structure: null;
  objet: string;
  message: string | null;
  details: string | null;
  whatsapp: false;
};

/** Caractères de contrôle (hors tabulation et saut de ligne) et demi-paires Unicode isolées : une base de données les refuse. */
const unsafeCharacters =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;

function clean(value: unknown) {
  return typeof value === "string"
    ? value.replace(/\r\n?/g, "\n").replace(unsafeCharacters, "").trim()
    : "";
}

/** Champ d'une seule ligne : les retours à la ligne deviennent des espaces. */
function oneLine(value: unknown) {
  return clean(value).replace(/\s+/g, " ");
}

/** Coupe à la longueur voulue sans casser un mot ni un caractère, et le signale par « … ». */
export function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  let cut = value.slice(0, max - 1);
  // Ne pas couper un caractère codé sur deux unités (émoji).
  if (/[\uD800-\uDBFF]$/.test(cut)) cut = cut.slice(0, -1);
  const lastSpace = cut.search(/\s\S*$/);
  if (lastSpace > max * 0.6) cut = cut.slice(0, lastSpace);
  return `${cut.trimEnd()}…`;
}

/** Même exigence que le cockpit : une adresse qu'il refuserait ferait rejeter toute la demande. */
const strictEmail =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

const isoDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

/**
 * Ce que le cockpit reçoit : de quoi rappeler la personne et étudier son éligibilité, rien de plus.
 *
 * Transmis : identifiant, date de réception, prénom, nom, e-mail, téléphone, établissement,
 * situation, discipline envisagée, situation de bourse (sans l'échelon), mention au bac, message.
 * L'établissement part dans les détails (« Établissement : … ») : pour une pré-inscription, le
 * cockpit ne garde pas le champ `structure`, réservé aux demandes d'une entreprise.
 *
 * Laissés sur le site (espace admin) : date de naissance, adresse postale, échelon de bourse,
 * parent ou contact d'urgence (une autre personne), droit à l'image, groupe WhatsApp.
 *
 * Renvoie null si le nom manque : le cockpit refuserait la demande.
 */
export function buildCockpitPayload(record: Preinscription): CockpitPayload | null {
  const nom = oneLine(record.lastName);
  if (!record.id || !nom) return null;

  const email = oneLine(record.email);
  const emailAccepted = email.length <= limits.email && strictEmail.test(email);

  const mention = [oneLine(record.bacMentionStatus), oneLine(record.bacMention)]
    .filter(Boolean)
    .join(" · ");

  const lines = [
    ["Situation", oneLine(record.situation)],
    ["Établissement", oneLine(record.school)],
    ["Discipline envisagée", oneLine(record.discipline)],
    ["Boursier·ère", oneLine(record.scholarship)],
    ["Mention au bac", mention],
    // Une adresse que le cockpit refuserait reste lisible ici, plutôt que de perdre toute la demande.
    ["E-mail à vérifier", emailAccepted ? "" : email],
    ["Dossier complet", "espace admin du site du dispositif"]
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label} : ${value}`);

  // Les lignes entières d'abord : on retire celles qui dépassent plutôt que d'en couper une au milieu.
  let details = lines.join("\n");
  while (details.length > limits.details && lines.length > 1) {
    lines.pop();
    details = lines.join("\n");
  }

  const message = clean(record.message);
  const createdAt = clean(record.createdAt);

  return {
    id: record.id,
    type: "pre_inscription",
    formation_code: "PREPA_PASS_LAS",
    ...(isoDateTime.test(createdAt) && !Number.isNaN(Date.parse(createdAt)) ? { recu_le: createdAt } : {}),
    prenom: truncate(oneLine(record.firstName), limits.prenom) || null,
    nom: truncate(nom, limits.nom),
    email: emailAccepted ? email : null,
    telephone: truncate(oneLine(record.phone), limits.telephone) || null,
    structure: null,
    objet: truncate(subject, limits.objet),
    message: message ? truncate(message, limits.message) : null,
    details: details ? truncate(details, limits.details) : null,
    whatsapp: false
  };
}

export type CockpitResult =
  | {
      ok: true;
      already: boolean;
      attempts: number;
      /**
       * Vrai quand le cockpit n'a pas confirmé « aucun message automatique » pour cette demande
       * (`messages_automatiques` absent ou vrai) : la personne a pu recevoir un WhatsApp tout seul.
       */
      automated: boolean;
    }
  | { ok: false; code: string; attempts: number };

/** Taille maximale lue dans la réponse du cockpit (son accusé tient en quelques centaines d'octets). */
const maxAnswerBytes = 16_384;

/** Le texte de la réponse, ou null s'il dépasse la taille attendue ou ne se lit pas (page HTML, coupure). */
async function readBounded(response: Response) {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let text = "";
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxAnswerBytes) {
        // Sans attendre : l'abandon du reste ne doit jamais retenir la suite.
        void reader.cancel().catch(() => undefined);
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
  } catch {
    return null;
  }
  return text + decoder.decode();
}

/**
 * L'accusé du cockpit : { ok: true, deja, messages_automatiques: false, … }. Un 200 qui n'est pas
 * cet accusé (page d'erreur ou d'accueil d'une mauvaise adresse) n'est pas une transmission.
 */
async function readAcknowledgement(response: Response) {
  const text = await readBounded(response);
  if (text === null) return null;
  try {
    const answer = JSON.parse(text) as { ok?: unknown; messages_automatiques?: unknown } | null;
    if (!answer || typeof answer !== "object" || answer.ok !== true) return null;
    return { automated: answer.messages_automatiques !== false };
  } catch {
    return null;
  }
}

type CockpitOptions = {
  /** Par défaut : COCKPIT_URL et COCKPIT_WEBHOOK_KEY. */
  url?: string;
  key?: string;
  fetch?: typeof fetch;
  /** Attente avant le 2e puis le 3e essai, en millisecondes. */
  delays?: number[];
  timeoutMs?: number;
  wait?: (ms: number) => Promise<void>;
};

/** Adresse du webhook, ou null si COCKPIT_URL est absente ou n'est pas une adresse https (http accepté en local). */
function webhookUrl(base: string) {
  try {
    const url = new URL(base.trim());
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !(local && url.protocol === "http:")) return null;
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}/api/webhooks/site`;
  } catch {
    return null;
  }
}

export function isCockpitConfigured() {
  return Boolean(webhookUrl(process.env.COCKPIT_URL ?? "") && process.env.COCKPIT_WEBHOOK_KEY);
}

/**
 * Trois essais au plus, avec une attente croissante, uniquement quand un nouvel essai peut changer
 * quelque chose : erreur réseau, délai dépassé ou réponse 5xx. Un 400 (corps refusé) ou un 401 (clé)
 * ne se rejoue pas. Un 200 ou un 201 ne vaut « transmise » que si le corps est bien l'accusé du
 * cockpit ({ ok: true }) : sinon « reponse_inattendue », sans nouvel essai (adresse à vérifier).
 */
export async function sendToCockpit(
  record: Preinscription,
  options: CockpitOptions = {}
): Promise<CockpitResult> {
  const endpoint = webhookUrl(options.url ?? process.env.COCKPIT_URL ?? "");
  const key = options.key ?? process.env.COCKPIT_WEBHOOK_KEY ?? "";
  if (!endpoint || !key) return { ok: false, code: "non_relie", attempts: 0 };

  const payload = buildCockpitPayload(record);
  if (!payload) return { ok: false, code: "nom_absent", attempts: 0 };

  const call = options.fetch ?? fetch;
  const delays = options.delays ?? [1000, 3000];
  const wait = options.wait ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const body = JSON.stringify(payload);
  const maxAttempts = delays.length + 1;
  let code = "reseau";

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt > 1) await wait(delays[attempt - 2]);
    try {
      const response = await call(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-site-key": key },
        body,
        cache: "no-store",
        // Une redirection transformerait le POST en GET : on la traite comme une erreur d'adresse.
        redirect: "manual",
        signal: AbortSignal.timeout(options.timeoutMs ?? 8000)
      });
      if (response.status === 200 || response.status === 201) {
        const acknowledgement = await readAcknowledgement(response);
        if (!acknowledgement) return { ok: false, code: "reponse_inattendue", attempts: attempt };
        return {
          ok: true,
          already: response.status === 200,
          attempts: attempt,
          automated: acknowledgement.automated
        };
      }
      code = `http_${response.status}`;
      void response.body?.cancel().catch(() => undefined);
      if (response.status < 500) return { ok: false, code, attempts: attempt };
    } catch (error) {
      const name = error instanceof Error ? error.name : "";
      code = name === "TimeoutError" || name === "AbortError" ? "delai" : "reseau";
    }
  }
  return { ok: false, code, attempts: maxAttempts };
}

/**
 * Une demande reçue (date d'envoi du formulaire) depuis plus de 14 jours n'est jamais renvoyée toute
 * seule : c'est l'équipe qui la transmet, depuis l'espace admin, qui le signale. Le cockpit prévient
 * bien par e-mail à l'arrivée, quel que soit l'âge de la demande (corrigé le 13/11/2026), mais son
 * propre rattrapage d'un e-mail manqué s'arrête lui aussi à 14 jours.
 */
const cockpitEmailWindowMs = 14 * 86_400_000;
/** Marge : une demande à quelques minutes de la limite est déjà traitée comme hors délai. */
const windowMarginMs = 3_600_000;
/** Une demande jamais tentée n'est reprise toute seule que si elle est récente (pas de reprise d'historique). */
const neverAttemptedMaxAgeMs = 48 * 3_600_000;
/** Laisse le temps à l'envoi qui suit le dépôt du formulaire de se terminer. */
const neverAttemptedMinAgeMs = 10 * 60_000;

function ageMs(createdAt: string, now: Date) {
  const created = Date.parse(createdAt);
  return Number.isNaN(created) ? Number.POSITIVE_INFINITY : now.getTime() - created;
}

/** Vrai si la demande a été reçue il y a plus de 14 jours : elle se transmet à la main, depuis l'espace admin. */
export function isBeyondCockpitEmailWindow(createdAt: string, now = new Date()) {
  return ageMs(createdAt, now) > cockpitEmailWindowMs - windowMarginMs;
}

/** Refus qui tient à la demande elle-même : la renvoyer telle quelle donnerait le même refus. */
function isRefusedRequest(code: string) {
  return code === "nom_absent" || /^http_4(00|13|22)/.test(code);
}

/** Ce que le rattrapage planifié regarde d'un enregistrement (même forme que CockpitState, sans l'importer). */
type TransmissionView = {
  createdAt: string;
  cockpit?: { status: "transmise" } | { status: "erreur"; code: string };
};

/**
 * Le rattrapage planifié doit-il renvoyer cette demande ? Oui pour un échec qui peut passer au
 * nouvel essai (réseau, délai, 5xx, clé ou adresse corrigée entre-temps), et pour une demande
 * récente restée sans état (envoi interrompu après le dépôt). Non pour une demande déjà transmise,
 * refusée pour son contenu, reçue il y a plus de 14 jours (à transmettre à la main), ou
 * jamais tentée et ancienne (l'historique d'avant le raccordement se transmet à la main).
 */
export function shouldRetryAutomatically(record: TransmissionView, now = new Date()) {
  if (record.cockpit?.status === "transmise") return false;
  if (isBeyondCockpitEmailWindow(record.createdAt, now)) return false;
  if (record.cockpit?.status === "erreur") return !isRefusedRequest(record.cockpit.code);
  const age = ageMs(record.createdAt, now);
  return age >= neverAttemptedMinAgeMs && age <= neverAttemptedMaxAgeMs;
}
