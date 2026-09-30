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
  title: "Pré-inscription rentrée 2027-2028",
  description:
    "Pré-inscrivez-vous à l'accompagnement PASS/LAS de l'AGMS pour la rentrée 2027-2028 : l'équipe vous recontacte pour vous orienter vers la voie adaptée."
};

export default async function PreinscriptionPage() {
  // La page est rendue à chaque visite : le formulaire s'ouvre tout seul à la date prévue.
  await connection();
  const open = isPreinscriptionOpen();

  return (
    <>
      <PageHeader
        eyebrow={`Pré-inscriptions ${preinscription.season}`}
        title="Pré-inscription à l'accompagnement PASS/LAS"
        intro={
          open
            ? `Les pré-inscriptions pour la ${preinscription.season} sont ouvertes. Laissez-nous vos coordonnées, l'équipe AGMS vous recontacte rapidement.`
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
