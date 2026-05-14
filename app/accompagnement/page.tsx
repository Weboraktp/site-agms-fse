import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { accompanimentFeatures, accompanimentText, methodPillars, supportCards } from "@/lib/content";

export default function AccompagnementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accompagnement"
        title="Accompagnement PASS/LAS — dispositif AGMS"
        intro="Un dispositif local, humain et structuré qui combine préparation annuelle, stage de pré-rentrée, soutien ciblé, colles, QCM, suivi personnalisé et méthode."
      />

      <section className="section section--white">
        <div className="container two-column">
          <div>
            <SectionTitle title="Un cadre pédagogique structuré" />
            <div className="prose">
              <p>{accompanimentText}</p>
            </div>
          </div>
          <div className="tag-cloud" aria-label="Modalités proposées">
            {accompanimentFeatures.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Ce que comprend l'accompagnement"
            title="Les éléments pédagogiques du dispositif"
            align="center"
          />
          <div className="card-grid card-grid--three">
            {supportCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle
            eyebrow="Méthode et suivi"
            title="Les repères qui aident à tenir dans la durée"
            intro="L'objectif est autant de renforcer les connaissances que d'éviter l'isolement, la perte de rythme et le décrochage."
            align="center"
          />
          <div className="pillar-track">
            {methodPillars.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">PASS/LAS</p>
            <h2>L'accompagnement vise autant la méthode que la compréhension des matières.</h2>
          </div>
          <Link className="button button--primary" href="/candidature">
            Candidater au dispositif
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
