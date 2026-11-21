import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { blogPosts } from "@/lib/blog";

type NewsSectionProps = {
  /** Fond blanc (par défaut) ou fond crème, pour alterner avec les sections voisines. */
  white?: boolean;
};

/** « Actualités » : les articles marqués `news`, du plus récent au plus ancien. */
export function NewsSection({ white = true }: NewsSectionProps) {
  const news = blogPosts
    .filter((post) => post.news)
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, 3);

  return (
    <section className={`section ${white ? "section--white" : ""}`} id="actualites">
      <div className="container">
        <SectionTitle eyebrow="Actualités" title="Ce qu'il faut savoir en ce moment" />
        <div className="news-grid">
          {news.map((post) => (
            <article className="news-card" key={post.slug}>
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
        <div className="section-actions section-actions--center">
          <Link className="inline-link" href="/blog">
            Toutes les actualités
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
