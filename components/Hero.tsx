import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { heroHighlights } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__kicker">AGMS — Projet FSE+ réussite éducative</p>
            <h1>Un accompagnement gratuit pour réussir son entrée en PASS/LAS en Guadeloupe</h1>
            <p className="hero__lead">
              Un dispositif soutenu par le FSE+ et porté par l'AGMS pour lutter contre le décrochage,
              renforcer l'orientation santé et accompagner 60 étudiants boursiers vers la réussite.
            </p>

            <div className="hero__actions" aria-label="Actions principales">
              <Link className="button button--primary" href="/candidature">
                Candidater au dispositif
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button--secondary" href="/contact">
                Demander des informations
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
              Projet FSE+ contre le décrochage scolaire
            </p>
            <div className="hero__mini-stats">
              <strong>60</strong>
              <span>places pour les étudiants boursiers sélectionnés</span>
            </div>
            <div className="hero__mini-stats hero__mini-stats--light">
              <strong>192h</strong>
              <span>d'accompagnement possible sur l'année</span>
            </div>
          </aside>
        </div>

        <div className="hero__logos" aria-label="Emplacements réservés aux logos">
          <span className="logo-placeholder logo-placeholder--agms">
            <img src="/images/agms-logo.png" alt="AGMS" />
          </span>
          <span className="logo-placeholder logo-placeholder--fse">
            <img src="/images/institutions/logo-fse-europe.svg" alt="L'Europe s'engage en France - Union européenne" />
          </span>
          <span className="logo-placeholder logo-placeholder--region">
            <img src="/images/institutions/logo-region-guadeloupe.svg" alt="Région Guadeloupe" />
          </span>
        </div>
      </div>
    </section>
  );
}
