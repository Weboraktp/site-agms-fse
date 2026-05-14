import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { applicationText, eligibilityCriteria, eligibilityText, faqItems } from "@/lib/content";

export default function CandidaturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidature"
        title="Candidater au dispositif FSE"
        intro="Un formulaire pour prendre contact avec l'équipe et initier l'étude de votre demande."
      />

      <section className="section section--white">
        <div className="container two-column">
          <div>
            <SectionTitle title="Qui peut bénéficier du dispositif ?" />
            <div className="prose">
              <p>{eligibilityText}</p>
              <p>{applicationText}</p>
            </div>
            <ul className="check-list">
              {eligibilityCriteria.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
            <p className="important-box">
              Le dispositif est gratuit pour les étudiants boursiers sélectionnés, dans la limite de
              60 places disponibles.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="FAQ" title="Avant de candidater" align="center" />
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
