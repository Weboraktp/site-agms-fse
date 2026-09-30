import { del, get, list, put } from "@vercel/blob";

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
};

export type StoredPreinscription = Preinscription & { pathname: string };

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
  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) return null;
  const record = JSON.parse(await new Response(result.stream).text()) as Preinscription;
  return { ...record, pathname };
}

export async function deletePreinscription(pathname: string) {
  if (!pathname.startsWith(prefix) || !pathname.endsWith(".json")) {
    throw new Error("Pré-inscription introuvable");
  }
  await del(pathname);
}
