import { isAdmin } from "@/lib/admin-auth";
import { eligibilityStatuses } from "@/lib/content";
import { listPreinscriptions } from "@/lib/preinscription-server";

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Guadeloupe"
});

function phone(value: string) {
  return value ? `"=""${value}"""` : "";
}

function eligibilityLabel(value?: string) {
  return eligibilityStatuses.find((status) => status.value === value)?.label ?? "À étudier";
}

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
    "Date de naissance",
    "E-mail",
    "Téléphone",
    "Adresse",
    "Code postal",
    "Ville",
    "Situation",
    "Établissement",
    "Discipline envisagée",
    "Boursier·ère",
    "Échelon de bourse",
    "Mention au bac",
    "Mention (obtenue ou visée)",
    "Parent ou contact d'urgence",
    "Lien",
    "Téléphone du contact",
    "Droit à l'image",
    "Groupe WhatsApp",
    "Éligibilité",
    "Message"
  ];
  const rows = records.map((record) => [
    cell(dateFormat.format(new Date(record.createdAt))),
    cell(record.firstName),
    cell(record.lastName),
    cell(record.birthDate ? record.birthDate.split("-").reverse().join("/") : ""),
    cell(record.email),
    // Formule Excel pour garder le numéro tel quel (le champ n'accepte que chiffres, espaces et + ( ) . -).
    phone(record.phone),
    cell(record.address ?? ""),
    cell(record.postalCode ?? ""),
    cell(record.city ?? ""),
    cell(record.situation),
    cell(record.school),
    cell(record.discipline ?? ""),
    cell(record.scholarship ?? ""),
    cell(record.scholarshipLevel ?? ""),
    cell(record.bacMentionStatus ?? ""),
    cell(record.bacMention ?? ""),
    cell(record.emergencyName ?? ""),
    cell(record.emergencyRelation ?? ""),
    phone(record.emergencyPhone ?? ""),
    cell(record.imageRights ?? ""),
    cell(record.whatsappGroup === undefined ? "" : record.whatsappGroup ? "Oui" : "Non"),
    cell(eligibilityLabel(record.eligibility)),
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
