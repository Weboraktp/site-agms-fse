import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import {
  accessModes,
  agmsText,
  applicationText,
  fseTexts,
  freePathText,
  impactStats,
  methodPillars,
  accompanimentFeatures,
  accompanimentText,
  openPathText,
  orientationSteps,
  projectCards,
  projectFrame,
  projectSummary,
  salonText,
  site,
  supportCards,
  whyProjectText
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="impact-ribbon" aria-label="Chiffres clés du dispositif">
        <div className="container impact-ribbon__grid">
          {impactStats.map((stat) => (
            <article className="impact-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <small>{stat.detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle
            eyebrow="Comment ça marche"
            title="Un questionnaire unique pour vous orienter"
            intro="Le questionnaire sert à comprendre votre situation. Il ne remplace pas l'échange avec l'équipe AGMS : c'est justement cet échange qui permet de confirmer l'éligibilité et la voie adaptée."
            align="center"
          />
          <div className="candidate-flow">
            {orientationSteps.map((step, index) => (
              <article className="candidate-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="section-actions section-actions--center">
            <Link className="button button--primary" href={site.questionnaireUrl}>
              Trouver ma voie
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--motion">
        <div className="container">
          <SectionTitle
            eyebrow="Le dispositif en un coup d'oeil"
            title="Un projet FSE+ contre le décrochage, l'isolement et les freins à la réussite"
            intro={whyProjectText}
            align="center"
          />
          <div className="card-grid card-grid--four">
            {projectCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
          <p className="home-project-summary">{projectSummary}</p>
          <div className="section-actions section-actions--center">
            <Link className="button button--primary" href="/projet">
              Voir le détail du projet FSE
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle
            eyebrow="Cadre du projet"
            title="FSE+ et AGMS, expliqués sans détour"
            intro="Le FSE+ permet le lancement du dispositif ; l'AGMS le porte localement en Guadeloupe."
            align="center"
          />
          <div className="home-actor-grid">
            <article className="actor-card actor-card--fse">
              <p className="eyebrow">{projectFrame[0].label}</p>
              <h3>{projectFrame[0].title}</h3>
              <p>{fseTexts.support}</p>
              <Link className="inline-link" href="/projet">
                Lire le cadre du projet
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article className="actor-card actor-card--agms">
              <div className="actor-card__logo">
                <img src="/images/agms-logo.png" alt="Logo AGMS" />
              </div>
              <p className="eyebrow">{projectFrame[1].label}</p>
              <h3>{projectFrame[1].title}</h3>
              <p>{agmsText}</p>
              <Link className="inline-link" href="/projet">
                Comprendre le rôle de l'AGMS
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <SectionTitle eyebrow="Accompagnement" title="Un dispositif AGMS PASS/LAS local et humain" />
            <div className="prose">
              <p>{accompanimentText}</p>
            </div>
            <div className="section-actions">
              <Link className="button button--primary" href="/accompagnement">
                Voir l'accompagnement
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="tag-cloud" aria-label="Éléments de l'accompagnement">
            {accompanimentFeatures.slice(0, 8).map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle
            eyebrow="Repères pédagogiques"
            title="Ce qui structure l'accompagnement"
            intro="L'accueil reste volontairement synthétique ; le détail des cours, TD, colles et stages se trouve dans la page accompagnement."
            align="center"
          />
          <div className="pillar-track pillar-track--home">
            {methodPillars.slice(0, 4).map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="container two-column">
          <div>
            <SectionTitle
              eyebrow="Deux voies"
              title="Une orientation honnête selon votre situation"
            />
            <div className="prose">
              <h3>Le dispositif gratuit sous conditions</h3>
              <p>{freePathText}</p>
              <p className="important-box">
                L'éligibilité tient compte notamment des critères sociaux, de la bourse, du dossier,
                des résultats au bac, de l'entretien et de l'admission PASS/LAS.
              </p>
            </div>
          </div>
          <aside className="info-panel">
            <h3>Accompagnement payant possible</h3>
            <p>{applicationText}</p>
            <p>{openPathText}</p>
            <div className="section-actions">
              <Link className="button button--primary" href={site.questionnaireUrl}>
                Trouver ma voie
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
        <div className="container">
          <div className="card-grid card-grid--two access-mode-grid">
            {accessModes.map((mode) => (
              <FeatureCard key={mode.title} {...mode} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Aller plus loin"
            title="Chaque sujet a sa page dédiée"
            intro="L'accueil oriente rapidement ; les pages internes détaillent l'organisation annuelle, le contenu de l'accompagnement, le salon santé et le questionnaire d'orientation."
            align="center"
          />
          <div className="preview-grid">
            <article className="preview-card">
              <h3>Organisation annuelle</h3>
              <p>Pré-rentrée, soutien régulier, révisions, suivi et temps d'orientation.</p>
              <Link className="inline-link" href="/projet">
                Voir le calendrier
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article className="preview-card">
              <h3>Ce que comprend l'accompagnement</h3>
              <p>{supportCards[0].text}</p>
              <Link className="inline-link" href="/accompagnement">
                Voir les modalités
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article className="preview-card">
              <h3>Salon des métiers de la santé</h3>
              <p>{salonText}</p>
              <Link className="inline-link" href="/salon">
                Découvrir le salon
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">Orientation</p>
            <h2>Pour connaître votre éligibilité, commencez par le questionnaire : l'équipe AGMS vous rappelle ensuite.</h2>
          </div>
          <div className="cta-band__actions">
            <Link className="button button--primary" href={site.questionnaireUrl}>
              Trouver ma voie
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
