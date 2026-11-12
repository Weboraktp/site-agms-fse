import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { preinscription, site } from "@/lib/content";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Demander des informations"
        intro="Pour toute question sur la licence portail santé, le PASS ou la LAS, le dispositif gratuit sous conditions ou la voie payante ouverte à tous, écrivez-nous ou déposez votre demande d'inscription : l'équipe AGMS vous rappelle."
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
            <div className="info-panel contact-preinscription">
              <p className="eyebrow">Pré-inscriptions {preinscription.season}</p>
              <p>Vous visez la licence portail santé à la rentrée 2027 ? Découvrez comment vous inscrire.</p>
              <Link className="inline-link" href={site.inscriptionUrl}>
                Comment s'inscrire
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <aside className="info-panel">
            <p className="eyebrow">Demande d'inscription</p>
            <h3>Faire ma demande d'inscription</h3>
            <p>
              Pour connaître votre éligibilité ou poser une question sur l'accompagnement, déposez
              votre demande d'inscription : elle est gratuite et sans pièce justificative. L'équipe
              AGMS vous recontactera pour vérifier si vous relevez du dispositif gratuit sous
              conditions ou d'une voie payante ouverte à tous.
            </p>
            <div className="section-actions">
              <Link className="button button--primary" href={site.candidatureUrl}>
                Demande d'inscription
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
