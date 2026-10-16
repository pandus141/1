import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Section";
import { ShareButton } from "@/components/ui/ShareButton";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { formatDate, formatDateLong, getPost, getRelated, posts, slugify } from "@/content/blog";
import { brand } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} – ${brand.name}`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date },
  };
}

/**
 * Pojedynczy artykuł wg openai.com/index/…:
 * wyśrodkowany nagłówek (data · kategoria, H1 64px, lead) → pasek autor/Udostępnij
 * → spis treści przyklejony po lewej (od 1280px) + kolumna tekstu → tagi, autorzy → „Przeczytaj więcej”.
 */
export default async function BlogPostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const toc = post.body.flatMap((b) => (b.type === "h2" ? [{ id: slugify(b.text), label: b.text }] : []));
  const related = getRelated(post.slug);

  return (
    <article>
      {/* Nagłówek */}
      <Container className="flex flex-col items-center pt-16 text-center md:pt-22">
        <p className="flex gap-3 text-meta">
          <time dateTime={post.date}>{formatDateLong(post.date)}</time>
          <Link href={`/blog?kategoria=${encodeURIComponent(post.category)}`} className="text-primary-60 transition-colors hover:text-primary-100">
            {post.category}
          </Link>
        </p>
        <h1 className="mt-8 max-w-wide text-[2.5rem] leading-[1.06] font-medium tracking-[-0.03em] text-balance md:text-hero">
          {post.title}
        </h1>
        <p className="mt-6 max-w-[37rem] text-primary-80 text-pretty">{post.excerpt}</p>
      </Container>

      <Container className="relative mt-16 md:mt-20">
        {/* Pasek: autor / czas czytania / udostępnij */}
        <div className="mx-auto flex max-w-article items-center justify-between gap-4">
          <p className="flex flex-wrap gap-x-3 text-meta">
            {post.author && <span>{post.author}</span>}
            {post.readingTime && <span className="text-primary-60">{post.readingTime}</span>}
          </p>
          <ShareButton title={post.title} />
        </div>

        {/* Spis treści – w lewym marginesie */}
        {toc.length > 1 && (
          <div className="absolute inset-y-0 start-8 hidden w-48 pt-26 xl:block">
            <TableOfContents items={toc} />
          </div>
        )}

        <div className="mt-12 md:mt-16">
          <ArticleBody blocks={post.body} />
        </div>

        {/* Tagi i autorzy */}
        <footer className="mx-auto mt-20 flex max-w-article flex-col gap-8 md:mt-32">
          {post.tags && (
            <ul className="flex flex-wrap gap-3">
              {post.tags.map((t) => (
                <li key={t}>
                  <Link
                    href={blogCategoriesHref(t)}
                    className="inline-flex rounded-full bg-primary-12 px-3 py-2 text-meta transition-colors hover:bg-primary-44/40"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {post.author && (
            <div>
              <h2 className="mb-3 text-meta font-normal text-primary-60">Autorzy</h2>
              <p className="text-p2">{post.author}</p>
            </div>
          )}
        </footer>
      </Container>

      {/* Przeczytaj więcej */}
      <section className="mt-30 md:mt-40">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-h5">Przeczytaj więcej</h2>
            <Link href="/blog" className="flex h-10 items-center rounded px-2 text-cta transition-colors hover:bg-primary-4">
              Wyświetl wszystko
            </Link>
          </div>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Card item={{ title: p.title, href: `/blog/${p.slug}`, category: p.category, date: formatDate(p.date), tone: p.tone }} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}

/** Tag będący kategorią prowadzi do filtra; pozostałe (np. rok) – do listy wszystkich wpisów. */
function blogCategoriesHref(tag: string) {
  return /^\d{4}$/.test(tag) ? "/blog" : `/blog?kategoria=${encodeURIComponent(tag)}`;
}
