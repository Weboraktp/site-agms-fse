import type { Metadata } from "next";
import { Download, LogOut } from "lucide-react";
import { AdminDeleteButton } from "@/components/AdminDeleteButton";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { PageHeader } from "@/components/PageHeader";
import { isAdmin } from "@/lib/admin-auth";
import { preinscription } from "@/lib/content";
import {
  isProductionData,
  listPreinscriptions,
  type StoredPreinscription
} from "@/lib/preinscription-server";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Espace admin",
  robots: { index: false, follow: false }
};

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Guadeloupe"
});

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

  return (
    <>
      <PageHeader
        eyebrow="Espace admin"
        title={`Pré-inscriptions ${preinscription.season}`}
        intro={`${records.length} pré-inscription${records.length > 1 ? "s" : ""} reçue${records.length > 1 ? "s" : ""}, de la plus récente à la plus ancienne.`}
      />

      <section className="section section--white">
        <div className="container">
          {!isProductionData ? (
            <p className="important-box admin-notice">
              Mode test : cette liste contient uniquement les essais faits en local, pas les vraies
              pré-inscriptions du site.
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
                    <th scope="col">Nom</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Situation</th>
                    <th scope="col">Établissement</th>
                    <th scope="col">Message</th>
                    <th scope="col">
                      <span className="visually-hidden">Supprimer</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    const name = `${record.firstName} ${record.lastName}`;
                    return (
                      <tr key={record.pathname}>
                        <td>{dateFormat.format(new Date(record.createdAt))}</td>
                        <td>
                          <strong>{name}</strong>
                        </td>
                        <td>
                          <a href={`tel:${record.phone.replace(/[^\d+]/g, "")}`}>{record.phone}</a>
                          <a href={`mailto:${record.email}`}>{record.email}</a>
                        </td>
                        <td>{record.situation}</td>
                        <td>{record.school || "—"}</td>
                        <td className="admin-table__message">{record.message || "—"}</td>
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
