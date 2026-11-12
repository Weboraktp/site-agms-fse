import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { reformAdaptations, reformArticleUrl } from "@/lib/content";

type ReformSectionProps = {
  /** Fond accentué (par défaut) ou blanc, pour alterner avec les sections voisines. */
  white?: boolean;
};

/** Ce que la licence portail santé change pour l'accompagnement (repris de l'encadré de l'article). */
export function ReformSection({ white = false }: ReformSectionProps) {
  return (
    <section className={`section ${white ? "section--white" : "section--accent"}`}>
      <div className="container">
        <SectionTitle
          eyebrow="Rentrée 2027"
          title="Rentrée 2027 : l'accompagnement s'adapte"
          intro="La licence portail santé remplace le PASS et la LAS. Il ne suffit plus de réussir la santé : il faut aussi valider sa discipline, dès la première session et sans compensation entre les blocs."
          align="center"
        />
        <div className="preview-grid">
          {reformAdaptations.map((item) => (
            <article className="preview-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="important-box reform-note">
          Vous êtes en PASS ou en LAS cette année ? Rien ne change pour vous : vous gardez les règles
          actuelles jusqu&apos;à la fin de l&apos;année 2028-2029, et nous continuons de vous
          accompagner.
        </p>
        <div className="section-actions section-actions--center">
          <Link className="inline-link" href={reformArticleUrl}>
            Tout comprendre de la réforme
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
