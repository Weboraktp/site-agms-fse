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
          <div className="logo-row logo-row--footer" aria-label="Emplacements logos institutionnels">
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
