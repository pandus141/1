import Link from "next/link";
import type { HelpArticle } from "@/content/help";

/** Okruszki: „Wszystkie kategorie › Kategoria › Artykuł”. */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Okruszki" className="mb-6 text-footer font-normal">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-primary-44">
                <path d="M4.5 2.5L8 6l-3.5 3.5" />
              </svg>
            )}
            {it.href ? (
              <Link href={it.href} className="text-primary-80 hover:text-primary-100 hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-primary-60">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Lista artykułów w zaokrąglonej ramce (radius 16px, wiersze 20/24px, strzałka po prawej). */
export function ArticleList({ articles }: { articles: HelpArticle[] }) {
  return (
    <ul className="overflow-hidden rounded-2xl border border-primary-12">
      {articles.map((art) => (
        <li key={art.slug} className="border-b border-primary-12 last:border-b-0">
          <Link href={`/pomoc/artykul/${art.slug}`} className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-primary-4 md:px-6">
            <span className="flex flex-1 flex-col gap-1">
              <span className="text-p2 font-medium">{art.title}</span>
              <span className="text-meta font-normal text-primary-60">{art.description}</span>
            </span>
            <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-none text-primary-60 transition-transform group-hover:translate-x-0.5">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
