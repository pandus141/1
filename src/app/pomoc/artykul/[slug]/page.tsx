import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Feedback } from "@/components/help/Feedback";
import { ArticleList, Breadcrumbs } from "@/components/help/HelpParts";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { formatDate, slugify } from "@/content/blog";
import { getCategoryArticles, getHelpArticle, getHelpCategory, helpArticles, type HelpBlock } from "@/content/help";
import { brand } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return helpArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const art = getHelpArticle((await params).slug);
  return art ? { title: `${art.title} – Centrum pomocy ${brand.name}`, description: art.description } : {};
}

/**
 * Artykuł pomocy (wg help.openai.com/articles/…):
 * okruszki → H1 36px/600 → opis → data aktualizacji → treść 16/24 w kolumnie 672px,
 * spis treści po prawej (sticky, od 1024px) → „Czy był pomocny?” → powiązane artykuły.
 */
export default async function HelpArticlePage({ params }: Params) {
  const art = getHelpArticle((await params).slug);
  if (!art) notFound();
  const cat = getHelpCategory(art.category)!;
  const related = getCategoryArticles(cat.slug).filter((a) => a.slug !== art.slug);
  const toc = art.body.flatMap((b) =>
    b.type === "h2" || b.type === "h3" ? [{ id: slugify(b.text), label: b.text, level: b.type === "h2" ? (2 as const) : (3 as const) }] : [],
  );

  return (
    <>
      <Breadcrumbs items={[{ label: "Wszystkie kategorie", href: "/pomoc" }, { label: cat.title, href: `/pomoc/kategoria/${cat.slug}` }, { label: art.title }]} />

      <div className="flex gap-16">
        <article className="min-w-0 max-w-article flex-1">
          <header className="mb-8 border-b border-primary-12 pb-8">
            <h1 className="text-h2 font-semibold md:text-[2.25rem] md:leading-[1.25]">{art.title}</h1>
            <p className="mt-3 text-p2 text-primary-60">{art.description}</p>
            <p className="mt-3 text-footer font-normal text-primary-44">
              Zaktualizowano: <time dateTime={art.updated}>{formatDate(art.updated)}</time>
            </p>
          </header>

          <HelpBody blocks={art.body} />

          <div className="mt-16 border-t border-primary-12 pt-8">
            <Feedback />
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-4 text-h4 font-semibold">Powiązane artykuły</h2>
              <ArticleList articles={related} />
            </section>
          )}
        </article>

        {toc.length > 1 && (
          <aside className="hidden w-52 flex-none lg:block">
            <TableOfContents items={toc} title="Na tej stronie" variant="help" />
          </aside>
        )}
      </div>
    </>
  );
}

function HelpBody({ blocks }: { blocks: HelpBlock[] }) {
  return (
    <div className="text-p2 text-primary-80">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mb-3">
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)} className="mt-9 mb-4 scroll-mt-24 text-[1.5rem] leading-[1.17] font-semibold text-primary-100">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugify(b.text)} className="mt-9 mb-4 scroll-mt-24 text-h4 font-semibold text-primary-100">
                {b.text}
              </h3>
            );
          case "list": {
            const L = b.ordered ? "ol" : "ul";
            return (
              <L key={i} className={`mb-5 flex flex-col gap-1.5 ps-6 marker:text-primary-60 ${b.ordered ? "list-decimal" : "list-disc"}`}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </L>
            );
          }
          case "note":
            return (
              <div key={i} role="note" className="my-6 flex gap-3 rounded-xl bg-primary-4 px-4 py-3 text-meta font-normal">
                <svg aria-hidden width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-px flex-none">
                  <circle cx="10" cy="10" r="7.5" />
                  <path d="M10 9v5M10 6.2v.1" strokeLinecap="round" />
                </svg>
                <p>{b.text}</p>
              </div>
            );
        }
      })}
    </div>
  );
}
