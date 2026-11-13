import type { Metadata } from "next";
import { Download, LogOut } from "lucide-react";
import { AdminCockpit } from "@/components/AdminCockpit";
import { AdminDeleteButton } from "@/components/AdminDeleteButton";
import { AdminEligibility } from "@/components/AdminEligibility";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { PageHeader } from "@/components/PageHeader";
import { isAdmin } from "@/lib/admin-auth";
import { isBeyondCockpitEmailWindow } from "@/lib/cockpit";
import { preinscription } from "@/lib/content";
import {
  canSendToCockpit,
  isProductionData,
  listPreinscriptions,
  type StoredPreinscription
} from "@/lib/preinscription-server";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Espace admin",
  robots: { index: false, follow: false }
};

/** Un envoi au cockpit demandé depuis cette page peut faire trois essais : on lui laisse le temps. */
export const maxDuration = 60;

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Guadeloupe"
});

function birthDateLabel(value?: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

/** Les détails du dossier (absents des pré-inscriptions d'avant le 12 novembre 2026). */
function details(record: StoredPreinscription) {
  return [
    ["Né·e le", birthDateLabel(record.birthDate)],
    [
      "Adresse",
      [record.address, [record.postalCode, record.city].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", ")
    ],
    ["Établissement", record.school],
    ["Discipline envisagée", record.discipline],
    [
      "Boursier·ère",
      record.scholarship
        ? record.scholarshipLevel
          ? `${record.scholarship} · échelon ${record.scholarshipLevel}`
          : record.scholarship
        : undefined
    ],
    [
      "Mention au bac",
      record.bacMentionStatus
        ? record.bacMention
          ? `${record.bacMentionStatus} · ${record.bacMention}`
          : record.bacMentionStatus
        : undefined
    ],
    [
      "Parent ou contact d'urgence",
      record.emergencyName
        ? `${record.emergencyName} (${record.emergencyRelation}) · ${record.emergencyPhone}`
        : undefined
    ],
    ["Droit à l'image", record.imageRights],
    [
      "Groupe WhatsApp",
      record.whatsappGroup === undefined ? undefined : record.whatsappGroup ? "Oui" : "Non"
    ],
    ["Message", record.message]
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));
}

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <>
        <PageHeader
          eyebrow="Espace admin"
          title="Connexion"
          intro="Espace réservé à l'équipe AGMS."
        />
        <section className="section section--white">
          <div className="container narrow">
            <AdminLoginForm />
          </div>
        </section>
      </>
    );
  }

  let records: StoredPreinscription[] = [];
  let loadError = false;
  try {
    records = await listPreinscriptions();
  } catch (error) {
    console.error("Lecture des pré-inscriptions impossible", error);
    loadError = true;
  }

  const toStudy = records.filter((record) => !record.eligibility || record.eligibility === "a-etudier").length;
  const eligible = records.filter((record) => record.eligibility === "eligible").length;
  const notEligible = records.filter((record) => record.eligibility === "non-eligible").length;
  const cockpitReady = canSendToCockpit();
  const now = new Date();
  const notSent = records.filter((record) => record.cockpit?.status !== "transmise");
  const lateIds = new Set(
    notSent.filter((record) => isBeyondCockpitEmailWindow(record.createdAt, now)).map((record) => record.pathname)
  );
  const unconfirmed = records.filter(
    (record) => record.cockpit?.status === "transmise" && record.cockpit.automated
  ).length;
  // Le rattrapage quotidien (app/api/cron/cockpit) ne tourne que si CRON_SECRET est posée.
  const retryPlanned = Boolean(process.env.CRON_SECRET);

  return (
    <>
      <PageHeader
        eyebrow="Espace admin"
        title={`Demandes d'inscription ${preinscription.season}`}
        intro={`${records.length} demande${records.length > 1 ? "s" : ""} reçue${records.length > 1 ? "s" : ""}, de la plus récente à la plus ancienne. À étudier : ${toStudy} · éligibles : ${eligible} · non éligibles : ${notEligible}.`}
      />

      <section className="section section--white">
        <div className="container">
          {!isProductionData ? (
            <p className="important-box admin-notice">
              Mode test : cette liste contient uniquement les essais faits en local, pas les vraies
              pré-inscriptions du site.
            </p>
          ) : !cockpitReady ? (
            <p className="important-box admin-notice">
              Le cockpit de l&apos;AGMS n&apos;est pas relié à ce site : les demandes restent ici et
              ne lui sont pas transmises.
            </p>
          ) : null}

          {cockpitReady && notSent.length > 0 ? (
            <p className="important-box admin-notice" role="status">
              <strong>
                {notSent.length > 1
                  ? `${notSent.length} demandes non transmises au cockpit de l'AGMS`
                  : "1 demande non transmise au cockpit de l'AGMS"}
              </strong>
              {lateIds.size > 0
                ? `, dont ${lateIds.size} reçue${lateIds.size > 1 ? "s" : ""} il y a plus de 14 jours`
                : ""}
              .{" "}
              {retryPlanned
                ? "Les échecs récents sont renvoyés automatiquement une fois par jour ; les autres se transmettent avec le bouton de leur ligne."
                : "Transmettez-les avec le bouton de leur ligne."}
            </p>
          ) : null}

          {unconfirmed > 0 ? (
            <p className="important-box admin-notice" role="status">
              <strong>
                {unconfirmed > 1
                  ? `${unconfirmed} demandes transmises sans que le cockpit confirme l'absence de message automatique`
                  : "1 demande transmise sans que le cockpit confirme l'absence de message automatique"}
              </strong>
              . Vérifiez dans le cockpit qu&apos;aucun WhatsApp n&apos;est parti (lignes signalées
              ci-dessous) avant de transmettre d&apos;autres demandes.
            </p>
          ) : null}

          <div className="admin-toolbar">
            <a className="button button--primary" href="/admin/export">
              <Download size={18} aria-hidden="true" />
              Exporter pour Excel
            </a>
            <form action={logout}>
              <button className="button button--on-light" type="submit">
                <LogOut size={18} aria-hidden="true" />
                Se déconnecter
              </button>
            </form>
          </div>

          {loadError ? (
            <p className="form-error">
              Impossible de charger les pré-inscriptions pour le moment. Rechargez la page dans
              quelques instants.
            </p>
          ) : records.length === 0 ? (
            <p className="admin-empty">Aucune pré-inscription pour le moment.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Reçue le</th>
                    <th scope="col">Étudiant·e</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Éligibilité</th>
                    <th scope="col">Dossier</th>
                    <th scope="col">
                      <span className="visually-hidden">Supprimer</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    const name = `${record.firstName} ${record.lastName}`;
                    const detail = details(record);
                    return (
                      <tr key={record.pathname}>
                        <td>
                          {dateFormat.format(new Date(record.createdAt))}
                          <AdminCockpit
                            pathname={record.pathname}
                            state={record.cockpit}
                            sentLabel={
                              record.cockpit?.status === "transmise"
                                ? dateFormat.format(new Date(record.cockpit.at))
                                : undefined
                            }
                            canSend={cockpitReady}
                            late={lateIds.has(record.pathname)}
                          />
                        </td>
                        <td>
                          <strong>{name}</strong>
                          <span className="admin-table__sub">{record.situation}</span>
                        </td>
                        <td>
                          <a href={`tel:${record.phone.replace(/[^\d+]/g, "")}`}>{record.phone}</a>
                          <a href={`mailto:${record.email}`}>{record.email}</a>
                        </td>
                        <td>
                          <AdminEligibility pathname={record.pathname} current={record.eligibility} />
                        </td>
                        <td className="admin-table__message">
                          {detail.length > 0 ? (
                            <details className="admin-details">
                              <summary>Voir le dossier</summary>
                              <dl>
                                {detail.map(([label, value]) => (
                                  <div key={label}>
                                    <dt>{label}</dt>
                                    <dd>{value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </details>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>
                          <AdminDeleteButton pathname={record.pathname} name={name} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
