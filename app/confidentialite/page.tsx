import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/lib/content";

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Données personnelles"
        title="Politique de confidentialité"
        intro="Une base claire pour expliquer le traitement des demandes de contact et de candidature."
      />

      <section className="section section--white">
        <div className="container narrow prose">
          <SectionTitle title="Données collectées" />
          <p>
            Le formulaire peut collecter les informations nécessaires au traitement d'une demande :
            identité, coordonnées, situation actuelle, formation visée, indication de bourse,
            message libre et consentement au traitement de la demande.
          </p>

          <SectionTitle title="Finalité" />
          <p>
            Ces informations sont utilisées pour répondre aux demandes, vérifier l'éligibilité
            potentielle et organiser la suite du parcours de candidature ou d'information.
          </p>

          <SectionTitle title="Contact" />
          <p>Pour toute question relative aux données personnelles : {site.email || site.emailLabel}.</p>
        </div>
      </section>
    </>
  );
}
