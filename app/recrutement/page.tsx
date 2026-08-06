import { FileText, GraduationCap, Mail } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/lib/content";

const applicationDocuments = [
  "Votre CV",
  "Une lettre de motivation",
  "Votre relevé de notes de première année"
];

export default function RecrutementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recrutement"
        title="Devenir tuteur"
        intro="Vous avez réussi votre première année et souhaitez accompagner les étudiants PASS/LAS en Guadeloupe ? Rejoignez l'équipe de tuteurs du dispositif AGMS."
      />

      <section className="section section--white">
        <div className="container two-column two-column--form">
          <div>
            <SectionTitle
              title="Comment candidater"
              intro="Pour nous rejoindre en tant que tuteur, envoyez-nous par e-mail les documents suivants :"
            />
            <div className="contact-list">
              <span>
                <FileText size={20} aria-hidden="true" />
                {applicationDocuments[0]}
              </span>
              <span>
                <Mail size={20} aria-hidden="true" />
                {applicationDocuments[1]}
              </span>
              <span>
                <GraduationCap size={20} aria-hidden="true" />
                {applicationDocuments[2]}
              </span>
            </div>
            <p className="important-box">
              L'équipe AGMS étudie chaque candidature et recontacte les candidats retenus pour un
              échange.
            </p>
          </div>
          <aside className="info-panel">
            <p className="eyebrow">Candidature</p>
            <h3>Envoyez votre dossier</h3>
            <p>
              Transmettez votre CV, votre lettre de motivation et votre relevé de notes de première
              année à l'adresse suivante :
            </p>
            <div className="section-actions">
              <a
                className="button button--primary"
                href={`mailto:${site.recruitmentEmail}?subject=Candidature tuteur — Dispositif FSE%2B AGMS`}
              >
                <Mail size={18} aria-hidden="true" />
                {site.recruitmentEmail}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
