import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { blogPosts } from "@/lib/blog";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Actualités du dispositif AGMS : licence portail santé, PASS et LAS, vie de l'accompagnement et informations pour les futurs étudiants de santé en Guadeloupe."
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Actualités"
        title="Les actualités du dispositif"
        intro="Licence portail santé, PASS, LAS : ce que la réforme change, et ce qui se passe au sein de l'accompagnement."
      />

      <section className="section section--white">
        <div className="container">
          <div className="preview-grid">
            {blogPosts.map((post) => (
              <article className="preview-card" key={post.slug}>
                {post.image ? (
                  <Link className="news-card__image" href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
                    <img src={post.image} alt="" loading="lazy" />
                  </Link>
                ) : null}
                <p className="eyebrow">
                  {post.date} · {post.author}
                </p>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link className="inline-link" href={`/blog/${post.slug}`}>
                  Lire l&apos;article
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">Pré-inscriptions ouvertes</p>
            <h2>Accompagnement gratuit sous conditions : faites votre demande d&apos;inscription.</h2>
          </div>
          <Link className="button button--primary" href={site.candidatureUrl}>
            Demande d&apos;inscription
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
