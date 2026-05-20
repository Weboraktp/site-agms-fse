import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import {
  agmsText,
  applicationText,
  eligibilityText,
  fseTexts,
  impactStats,
  methodPillars,
  accompanimentFeatures,
  accompanimentText,
  projectCards,
  projectFrame,
  projectSummary,
  salonText,
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
            <SectionTitle eyebrow="Pour qui ?" title="Un dispositif pour les étudiants boursiers PASS/LAS sélectionnés" />
            <div className="prose">
              <p>{eligibilityText}</p>
              <p className="important-box">
                Le dispositif est gratuit pour les étudiants boursiers sélectionnés, dans la limite de
                60 places disponibles.
              </p>
            </div>
          </div>
          <aside className="info-panel">
            <h3>Candidature</h3>
            <p>{applicationText}</p>
            <div className="section-actions">
              <Link className="button button--primary" href="/candidature">
                Candidater au dispositif
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button--on-light" href="/contact">
                Poser une question
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Aller plus loin"
            title="Chaque sujet a sa page dédiée"
            intro="L'accueil oriente rapidement ; les pages internes détaillent l'organisation annuelle, le contenu de l'accompagnement, le salon santé et la candidature."
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
            <p className="eyebrow">Places limitées</p>
            <h2>Un doute sur l'éligibilité ou les documents à fournir ? L'équipe peut vous orienter.</h2>
          </div>
          <div className="cta-band__actions">
            <Link className="button button--primary" href="/candidature">
              Candidater
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="button button--secondary" href="/contact">
              <Mail size={18} aria-hidden="true" />
              Demander des informations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
