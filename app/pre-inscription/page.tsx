import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, CalendarClock, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PreinscriptionForm } from "@/components/PreinscriptionForm";
import { SectionTitle } from "@/components/SectionTitle";
import { preinscription, site } from "@/lib/content";
import { isPreinscriptionOpen } from "@/lib/preinscription-server";

export const metadata: Metadata = {
  title: "Demande d'inscription rentrée 2027-2028",
  description:
    "Déposez votre demande d'inscription au dispositif gratuit sous conditions de l'AGMS pour la rentrée 2027-2028 : dossier en ligne gratuit, sans pièce justificative. L'équipe étudie votre éligibilité et vous recontacte."
};

/** Après l'envoi du dossier, la transmission au cockpit de l'AGMS peut faire trois essais : on lui laisse le temps. */
export const maxDuration = 60;

export default async function PreinscriptionPage() {
  // La page est rendue à chaque visite : le formulaire s'ouvre tout seul à la date prévue.
  await connection();
  const open = isPreinscriptionOpen();

  return (
    <>
      <PageHeader
        eyebrow={`Dossier de candidature · ${preinscription.season}`}
        title="Demande d'inscription au dispositif"
        intro={
          open
            ? "Les pré-inscriptions sont ouvertes. Le dossier est gratuit et ne demande aucune pièce justificative : l'équipe AGMS étudie votre éligibilité et vous recontacte."
            : `Les pré-inscriptions pour la ${preinscription.season} ouvrent le ${preinscription.openingLabel}.`
        }
      />

      <section className="section section--white">
        <div className="container two-column two-column--form">
          <div>
            <SectionTitle eyebrow="Comment ça se passe ?" title="Trois étapes simples" />
            <ol className="steps-list">
              {preinscription.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="important-box">{preinscription.notice}</p>
            <p className="preinscription-more">
              Pas sûr·e de votre situation ?{" "}
              <Link className="inline-link" href={site.inscriptionUrl}>
                Voir comment s&apos;inscrire
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
            <div className="contact-list preinscription-contact">
              {site.phones.map((phone) => (
                <a href={`tel:${phone.replace(/\s/g, "")}`} key={phone}>
                  <Phone size={19} aria-hidden="true" />
                  {phone}
                </a>
              ))}
              <a href={`mailto:${site.email}`}>
                <Mail size={19} aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>

          {open ? (
            <PreinscriptionForm />
          ) : (
            <div className="contact-form form-done">
              <CalendarClock size={40} aria-hidden="true" />
              <p className="eyebrow">Bientôt disponible</p>
              <h2>Ouverture des pré-inscriptions le {preinscription.openingLabel}</h2>
              <p>
                Le formulaire sera disponible sur cette page dès le 1er octobre à 0 h (heure de
                Guadeloupe). En attendant, vous pouvez déjà nous poser vos questions.
              </p>
              <Link className="button button--primary" href="/contact">
                Nous contacter
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
