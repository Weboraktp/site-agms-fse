import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle ?? post.title,
      description: post.excerpt,
      publishedTime: post.dateISO,
      authors: [post.author],
      images: post.image ? [post.image] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const Body = post.Body;

  return (
    <>
      <header className="page-header">
        <div className="container page-header__content">
          <p className="eyebrow">Actualités</p>
          <h1 className="page-header__title--article">{post.title}</h1>
          <p>
            Par {post.author} · <time dateTime={post.dateISO}>{post.date}</time>
          </p>
        </div>
      </header>

      <section className="section section--white">
        <div className="container narrow">
          <article className="prose prose--large article-body">
            <Body />
          </article>

          <p className="article-signature">
            {post.author}
            <span>{site.agms}</span>
          </p>

          <div className="section-actions">
            <Link className="button button--on-light" href="/blog">
              <ArrowLeft size={17} aria-hidden="true" />
              Toutes les actualités
            </Link>
            <Link className="button button--primary" href={site.inscriptionUrl}>
              Comment s&apos;inscrire
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="section">
          <div className="container">
            <div className="section-title section-title--center">
              <p className="eyebrow">À lire aussi</p>
              <h2>D&apos;autres actualités</h2>
            </div>
            <div className="preview-grid">
              {others.map((other) => (
                <article className="preview-card" key={other.slug}>
                  <p className="eyebrow">{other.date}</p>
                  <h3>
                    <Link href={`/blog/${other.slug}`}>{other.title}</Link>
                  </h3>
                  <p>{other.excerpt}</p>
                  <Link className="inline-link" href={`/blog/${other.slug}`}>
                    Lire l&apos;article
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
