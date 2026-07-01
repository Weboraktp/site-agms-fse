import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/lib/content";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Demander des informations"
        intro="Pour toute question sur l'orientation PASS/LAS, le dispositif gratuit sous conditions ou la voie payante ouverte à tous, remplissez le questionnaire : l'équipe AGMS vous rappelle."
      />

      <section className="section section--white">
        <div className="container two-column two-column--form">
          <div>
            <SectionTitle title="Coordonnées" />
            <div className="contact-list">
              {site.email ? (
                <a href={`mailto:${site.email}`}>
                  <Mail size={20} aria-hidden="true" />
                  {site.email}
                </a>
              ) : (
                <span>
                  <Mail size={20} aria-hidden="true" />
                  {site.emailLabel}
                </span>
              )}
              <span>
                <Phone size={20} aria-hidden="true" />
                {site.phones.join(" ou ")}
              </span>
              <span>
                <MapPin size={20} aria-hidden="true" />
                {site.address}
              </span>
            </div>
            <p className="important-box">
              Les demandes liées au dispositif sont étudiées sous réserve d'éligibilité, de sélection
              et dans la limite des 20 places disponibles.
            </p>
          </div>
          <aside className="info-panel">
            <p className="eyebrow">Questionnaire unique</p>
            <h3>Trouver la voie adaptée</h3>
            <p>
              Pour connaître votre éligibilité ou poser une question sur l'accompagnement, utilisez le
              questionnaire d'orientation. L'équipe AGMS vous recontactera pour vérifier si vous relevez
              du dispositif gratuit sous conditions ou d'une voie payante ouverte à tous.
            </p>
            <div className="section-actions">
              <Link className="button button--primary" href={site.questionnaireUrl}>
                Accéder au questionnaire
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
