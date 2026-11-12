import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { preinscription, site } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div className="hero__grid">
          <div className="hero__copy">
            <Link className="hero__announce" href={site.inscriptionUrl}>
              <span className="hero__announce-dot" aria-hidden="true" />
              Pré-inscriptions {preinscription.season}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="hero__kicker">AGMS — Projet FSE+ réussite éducative</p>
            <h1>Réussir sa première année de santé en Guadeloupe : licence portail santé, PASS, LAS</h1>
            <p className="hero__lead">
              AGMS propose deux voies d'accompagnement : un dispositif gratuit, cofinancé par
              l'Union européenne et la Région Guadeloupe, réservé aux étudiants éligibles sur critères
              sociaux et pédagogiques (bourse ou situation sociale, dossier, résultats au bac,
              entretien et admission en licence portail santé) ; et un accompagnement payant ouvert à
              tous avec Cours Médical. Déposez votre demande d'inscription en ligne : on vous
              rappelle pour étudier votre éligibilité.
            </p>

            <div className="hero__actions" aria-label="Actions principales">
              <Link className="button button--primary" href={site.candidatureUrl}>
                Demande d'inscription
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button--secondary" href={site.inscriptionUrl}>
                Comment s'inscrire
              </Link>
              <Link className="button button--ghost" href="/projet">
                Découvrir le projet
              </Link>
            </div>
          </div>

          <aside className="hero__brand-card" aria-label="Repères du dispositif">
            <div className="hero__seal">
              <img src="/images/agms-logo.png" alt="Logo AGMS" />
            </div>
            <div className="hero__mini-stats">
              <strong>5 min</strong>
              <span>pour déposer votre demande, sans pièce justificative</span>
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
