import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MapPin, Users } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import {
  salonEventDetails,
  salonItems,
  salonProfessionalExamples,
  salonProgram,
  salonText,
  site
} from "@/lib/content";

export default function SalonPage() {
  return (
    <>
      <PageHeader
        eyebrow="Salon santé"
        title="Le salon des métiers de la santé"
        intro="Un temps fort prévu en septembre au Palais des Sports du Gosier pour aider les jeunes et leurs familles à comprendre la diversité des parcours de santé."
      />

      <section className="section section--white">
        <div className="container two-column">
          <div>
            <SectionTitle title="Informer, orienter, créer du lien" />
            <div className="prose">
              <p>{salonText}</p>
            </div>
            <Link className="button button--secondary button--on-light" href={site.questionnaireUrl}>
              <Mail size={18} aria-hidden="true" />
              Être informé du prochain salon
            </Link>
          </div>
          <div className="event-panel" aria-label="Informations pratiques du salon">
            {salonEventDetails.map((detail, index) => {
              const Icon = index === 0 ? CalendarDays : index === 1 ? MapPin : Users;
              return (
                <article className="event-detail" key={detail.label}>
                  <Icon size={22} aria-hidden="true" />
                  <div>
                    <p className="eyebrow">{detail.label}</p>
                    <h3>{detail.value}</h3>
                    <p>{detail.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Professionnels et acteurs"
            title="Des rencontres concrètes autour des métiers de la santé"
            intro="La programmation pourra associer différents métiers et structures afin de montrer aux jeunes la diversité des parcours possibles."
            align="center"
          />
          <div className="card-grid card-grid--three">
            {salonProfessionalExamples.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container two-column">
          <div>
            <SectionTitle
              eyebrow="Programme type"
              title="Ce que les visiteurs pourront trouver sur place"
            />
            <div className="prose">
              <p>
                Le salon doit permettre aux jeunes de passer d'une idée parfois floue des métiers de la
                santé à une vision plus concrète des formations, des exigences, des débouchés et des
                réalités de terrain.
              </p>
            </div>
          </div>
          <ul className="check-list check-list--panel">
            {salonProgram.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--accent">
        <div className="container">
          <SectionTitle
            eyebrow="Objectifs du salon"
            title="Un outil d'orientation et de prévention du décrochage"
            intro="Le salon complète les interventions en lycée et l'accompagnement PASS/LAS en donnant aux jeunes des repères visibles, accessibles et motivants."
            align="center"
          />
          <div className="stats-grid">
            {salonItems.map((item) => (
              <div className="stat-card" key={item}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">Acteurs éducatifs et santé</p>
            <h2>Le salon peut associer lycéens, étudiants, professionnels, centres de formation et structures d'orientation.</h2>
          </div>
          <Link className="button button--primary" href={site.questionnaireUrl}>
            Proposer un échange
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
