import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { MajorMeetup } from "@/components/MajorMeetup";
import { PageHeader } from "@/components/PageHeader";
import { PlatformShowcase } from "@/components/PlatformShowcase";
import { ReformSection } from "@/components/ReformSection";
import { SectionTitle } from "@/components/SectionTitle";
import {
  accessModes,
  accompanimentFeatures,
  accompanimentText,
  methodPillars,
  site,
  supportCards
} from "@/lib/content";

export default function AccompagnementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accompagnement"
        title="Accompagnement en première année de santé : licence portail santé, PASS, LAS"
        intro="Un dispositif local, humain et structuré qui combine préparation annuelle, soutien ciblé, colles, QCM, suivi personnalisé et méthode."
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

      <ReformSection />

      <section className="section section--white">
        <div className="container">
          <SectionTitle
            eyebrow="Deux voies d'accès"
            title="Gratuit sous conditions ou payant ouvert à tous"
            intro="La demande d'inscription permet de vérifier si l'étudiant relève du dispositif gratuit sous conditions. Si ce n'est pas le cas, une solution payante peut être proposée avec Cours Médical, hors financement FSE+."
            align="center"
          />
          <div className="card-grid card-grid--two">
            {accessModes.map((mode) => (
              <FeatureCard key={mode.title} {...mode} />
            ))}
          </div>
        </div>
      </section>

      <PlatformShowcase />

      <section className="section">
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

      <MajorMeetup />

      <section className="section section--cta">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">Première année de santé</p>
            <h2>L'accompagnement vise autant la méthode que la compréhension des matières.</h2>
          </div>
          <Link className="button button--primary" href={site.candidatureUrl}>
            Demande d'inscription
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
