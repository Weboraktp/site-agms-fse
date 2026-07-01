import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { Timeline } from "@/components/Timeline";
import {
  agmsText,
  annualTimeline,
  fseTexts,
  keyFigures,
  localDetails,
  projectCards,
  projectFrame,
  projectObjectives,
  projectSummary,
  site,
  whyProjectText
} from "@/lib/content";

export default function ProjetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Le projet"
        title="Un projet FSE+ contre le décrochage scolaire"
        intro="Un projet lancé dans le cadre du FSE+ et porté localement par l'AGMS pour renforcer l'orientation, la motivation et la réussite des jeunes dans les parcours de santé."
      />

      <section className="section section--white project-why">
        <div className="container">
          <div className="project-why__layout">
            <div className="project-why__intro">
              <SectionTitle title="Pourquoi ce projet ?" />
              <div className="prose">
                <p>{whyProjectText}</p>
                <p className="project-why__summary">{projectSummary}</p>
              </div>
            </div>

            <div className="project-why__details">
              <ul className="check-list project-why__objectives">
                {projectObjectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--motion">
        <div className="container">
          <SectionTitle
            eyebrow="Cadre du projet"
            title="FSE+ et AGMS : le cadre qui permet l'action"
            intro="Le FSE+ permet le lancement du projet ; l'AGMS en assure le portage local, la coordination pédagogique et l'accueil opérationnel à Jarry."
            align="center"
          />
          <div className="actor-grid">
            <article className="actor-card actor-card--fse">
              <p className="eyebrow">{projectFrame[0].label}</p>
              <h3>{projectFrame[0].title}</h3>
              <p>{fseTexts.intro}</p>
              <p>{projectFrame[0].text}</p>
              <strong>{projectFrame[0].note}</strong>
            </article>

            <article className="actor-card actor-card--agms">
              <div className="actor-card__logo">
                <img src="/images/agms-logo.png" alt="Logo AGMS" />
              </div>
              <p className="eyebrow">{projectFrame[1].label}</p>
              <h3>{projectFrame[1].title}</h3>
              <p>{agmsText}</p>
              <p>{projectFrame[1].text}</p>
              <ul className="clean-list">
                {localDetails.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Le projet FSE en résumé"
            intro="L'action combine orientation, accompagnement pédagogique, espaces de travail et temps forts autour des métiers de la santé."
            align="center"
          />
          <div className="card-grid card-grid--four">
            {projectCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
          <div className="stats-grid">
            {keyFigures.map((figure) => (
              <div className="stat-card" key={figure}>
                <CheckCircle size={20} aria-hidden="true" />
                <span>{figure}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle
            eyebrow="Organisation annuelle"
            title="Les grandes étapes de l'année"
            intro="Le calendrier reste ajustable selon les besoins pédagogiques et les contraintes du projet."
            align="center"
          />
          <Timeline items={annualTimeline} />
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">Places limitées</p>
            <h2>60 étudiants peuvent être accompagnés dans le cadre du dispositif gratuit sous conditions.</h2>
          </div>
          <Link className="button button--primary" href={site.questionnaireUrl}>
            Trouver ma voie
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
