import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/lib/content";

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Données personnelles"
        title="Politique de confidentialité"
        intro="Une base claire pour expliquer le traitement des demandes d'inscription et des demandes de contact."
      />

      <section className="section section--white">
        <div className="container narrow prose">
          <SectionTitle title="Données collectées" />
          <p>
            Le formulaire de contact peut collecter les informations nécessaires au traitement d'une
            demande : identité, coordonnées, message libre et consentement au traitement de la
            demande.
          </p>

          <SectionTitle title="Demandes d'inscription" />
          <p>
            Le dossier de demande d'inscription collecte le prénom, le nom, la date de naissance,
            l'adresse e-mail, le numéro de téléphone, l'adresse postale, la situation de
            l'étudiant·e (lycée ou établissement actuel, discipline envisagée), la situation de
            bourse et l'échelon, la mention au bac (obtenue ou visée), les coordonnées d'un parent,
            représentant légal ou contact d'urgence, l'autorisation de droit à l'image, le souhait
            d'être ajouté·e au groupe WhatsApp de la promotion et un éventuel message.
          </p>
          <p>
            Aucune pièce justificative, aucun numéro de sécurité sociale et aucune information de
            santé ne sont demandés. Ces informations servent à étudier l'éligibilité de l'étudiant·e
            au dispositif gratuit, puis à la recontacter au sujet de sa demande.
          </p>
          <p>
            Elles sont enregistrées dans un espace de stockage privé situé dans l'Union européenne,
            accessible uniquement à l'équipe AGMS. Pour traiter la demande, le prénom, le nom,
            l'adresse e-mail, le numéro de téléphone, l'établissement, la situation, la discipline
            envisagée, la situation de bourse (sans l'échelon), la mention au bac et le message sont
            aussi enregistrés dans l'outil de gestion interne de l'AGMS. Ces informations sont
            conservées le temps nécessaire au traitement de la demande et peuvent être modifiées ou
            supprimées sur simple demande.
          </p>

          <SectionTitle title="Finalité" />
          <p>
            Ces informations sont utilisées pour répondre aux demandes, vérifier l'éligibilité
            potentielle et organiser la suite du parcours d'inscription ou d'information.
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
