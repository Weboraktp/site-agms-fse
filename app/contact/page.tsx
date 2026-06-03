import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/lib/content";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Demander des informations"
        intro="Pour une candidature, une question familiale, un échange institutionnel ou une demande liée au salon des métiers de la santé."
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
              et dans la limite des places disponibles.
            </p>
          </div>
          <ContactForm requestType="Demande d'informations" />
        </div>
      </section>
    </>
  );
}
