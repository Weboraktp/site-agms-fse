import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { site } from "@/lib/content";

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Mentions légales"
        intro="Une base à compléter avec les informations juridiques validées par l'AGMS."
      />

      <section className="section section--white">
        <div className="container narrow prose">
          <SectionTitle title="Éditeur du site" />
          <p>{site.agms}</p>
          <p>{site.address}</p>
          <p>Email : {site.email || site.emailLabel}</p>

          <SectionTitle title="Responsable de publication" />
          <p>À compléter par l'AGMS.</p>

          <SectionTitle title="Hébergement" />
          <p>À compléter selon l'hébergeur retenu pour la mise en ligne.</p>

          <SectionTitle title="Logos et financements" />
          <p>
            Les logos institutionnels AGMS, FSE/Union européenne et Région Guadeloupe sont présentés
            dans le cadre de l'information sur le dispositif.
          </p>
        </div>
      </section>
    </>
  );
}
