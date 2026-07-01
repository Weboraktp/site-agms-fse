import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { heroHighlights, site } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__kicker">AGMS — Projet FSE+ réussite éducative</p>
            <h1>Réussir PASS/LAS en Guadeloupe — trouvez la voie adaptée à votre situation</h1>
            <p className="hero__lead">
              AGMS propose deux voies d'accompagnement : un dispositif gratuit, cofinancé par
              l'Union européenne et la Région Guadeloupe, réservé aux étudiants éligibles sur critères
              sociaux et pédagogiques (bourse ou situation sociale, dossier, résultats au bac,
              entretien et admission PASS/LAS) ; et un accompagnement payant ouvert à tous avec Cours
              Médical. Faites le point en 2 minutes, on vous rappelle pour vous répondre précisément.
            </p>

            <div className="hero__actions" aria-label="Actions principales">
              <Link className="button button--primary" href={site.questionnaireUrl}>
                Trouver ma voie
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button--secondary" href={site.questionnaireUrl}>
                Remplir le questionnaire
              </Link>
              <Link className="button button--ghost" href="/projet">
                Découvrir le projet
              </Link>
            </div>

            <div className="hero__facts" aria-label="Points clés du dispositif">
              {heroHighlights.map((highlight, index) => (
                <span key={highlight}>
                  {index === 0 ? (
                    <ShieldCheck size={17} aria-hidden="true" />
                  ) : index === 3 ? (
                    <MapPin size={17} aria-hidden="true" />
                  ) : (
                    <CheckCircle size={17} aria-hidden="true" />
                  )}
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <aside className="hero__brand-card" aria-label="Repères du dispositif">
            <div className="hero__seal">
              <img src="/images/agms-logo.png" alt="Logo AGMS" />
            </div>
            <p className="hero__badge">
              <Sparkles size={16} aria-hidden="true" />
              Questionnaire d'orientation unique
            </p>
            <div className="hero__mini-stats">
              <strong>2 min</strong>
              <span>pour faire le point sur votre situation</span>
            </div>
            <div className="hero__mini-stats hero__mini-stats--light">
              <strong>2 voies</strong>
              <span>gratuite sous conditions ou payante ouverte à tous</span>
            </div>
          </aside>
        </div>

        <div className="hero__logos" aria-label="Logos institutionnels du dispositif">
          <span className="logo-placeholder logo-placeholder--agms">
            <img src="/images/agms-logo.png" alt="AGMS" />
          </span>
          <span className="logo-placeholder logo-placeholder--institutional">
            <img
              src="/images/institutions/bloc-marque-fse-guadeloupe.png"
              alt="L'Europe s'engage en Guadeloupe - Région Guadeloupe - cofinancé par l'Union européenne"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
