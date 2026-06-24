import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{site.agms}</p>
          <p>Projet FSE+ contre le décrochage scolaire et accompagnement PASS/LAS</p>
          <div className="logo-row logo-row--footer" aria-label="Logos institutionnels du dispositif">
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

        <address className="footer-contact">
          <span>
            <MapPin size={18} aria-hidden="true" />
            {site.address}
          </span>
          <span>
            <Mail size={18} aria-hidden="true" />
            {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : site.emailLabel}
          </span>
          <span>
            <Phone size={18} aria-hidden="true" />
            {site.phones.join(" ou ")}
          </span>
        </address>

        <div className="footer-links">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Politique de confidentialité</Link>
          <Link href="/candidature">Candidater</Link>
        </div>
      </div>
    </footer>
  );
}
