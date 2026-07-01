import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/lib/content";

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Données personnelles"
        title="Politique de confidentialité"
        intro="Une base claire pour expliquer le traitement des questionnaires d'orientation et demandes de contact."
      />

      <section className="section section--white">
        <div className="container narrow prose">
          <SectionTitle title="Données collectées" />
          <p>
            Le formulaire peut collecter les informations nécessaires au traitement d'une demande :
            identité, coordonnées, situation actuelle, formation visée, indication de bourse,
            message libre et consentement au traitement de la demande.
          </p>
          <p>
            Aucun échelon de bourse n'est demandé dans le questionnaire en ligne. Les informations
            servent à orienter l'étudiant ou sa famille vers la voie adaptée, puis à organiser un
            échange avec l'équipe AGMS.
          </p>

          <SectionTitle title="Finalité" />
          <p>
            Ces informations sont utilisées pour répondre aux demandes, vérifier l'éligibilité
            potentielle et organiser la suite du parcours d'orientation ou d'information.
          </p>
          <p>
            Les données sont traitées dans le cadre du RGPD, avec hébergement dans l'Union européenne.
          </p>

          <SectionTitle title="Contact" />
          <p>Pour toute question relative aux données personnelles : {site.email || site.emailLabel}.</p>
        </div>
      </section>
    </>
  );
}
