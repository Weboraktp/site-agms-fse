import { isAdmin } from "@/lib/admin-auth";
import { listPreinscriptions } from "@/lib/preinscription-server";

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Guadeloupe"
});

/** Cellule CSV lisible par Excel (séparateur « ; »), protégée contre l'injection de formules. */
function cell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Accès réservé", { status: 401 });
  }

  const records = await listPreinscriptions();
  const header = [
    "Reçue le",
    "Prénom",
    "Nom",
    "E-mail",
    "Téléphone",
    "Situation",
    "Établissement",
    "Message"
  ];
  const rows = records.map((record) => [
    cell(dateFormat.format(new Date(record.createdAt))),
    cell(record.firstName),
    cell(record.lastName),
    cell(record.email),
    // Formule Excel pour garder le numéro tel quel (le champ n'accepte que chiffres, espaces et + ( ) . -).
    `"=""${record.phone}"""`,
    cell(record.situation),
    cell(record.school),
    cell(record.message)
  ]);

  const csv = [header.map(cell), ...rows].map((row) => row.join(";")).join("\r\n");
  const today = new Date().toISOString().slice(0, 10);

  return new Response(`﻿${csv}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pre-inscriptions-${today}.csv"`,
      "Cache-Control": "no-store"
    }
  });
}
