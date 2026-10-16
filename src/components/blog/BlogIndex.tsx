"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Section";
import { Gradient } from "@/components/ui/Gradient";
import { blogCategories, formatDate, posts } from "@/content/blog";

/**
 * Lista wpisów wg openai.com/news:
 * tytuł 32px → poziomy pasek kategorii → pasek Filtruj/Sortuj + przełącznik siatka/lista
 * → siatka 1/2/3 kolumny (gap-x 24, gap-y 80) albo lista z miniaturą 104px.
 */
export function BlogIndex() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("kategoria");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [view, setView] = useState<"grid" | "list">("grid");

  const list = useMemo(() => {
    const filtered = category ? posts.filter((p) => p.category === category) : posts;
    return [...filtered].sort((a, b) => (sort === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [category, sort]);

  const setCategory = (c: string | null) =>
    router.replace(c ? `/blog?kategoria=${encodeURIComponent(c)}` : "/blog", { scroll: false });

  return (
    <Container className="@container flex flex-col pt-20 md:pt-10">
      <h1 className="text-h2">{category ?? "Wszystko"}</h1>

      {/* Kategorie – przewijane poziomo */}
      <nav aria-label="Kategorie" className="no-scrollbar -mx-6 mt-5 overflow-x-auto px-6 py-1 md:-mx-8 md:px-8">
        <ul className="flex items-center gap-6 whitespace-nowrap">
          {[null, ...blogCategories].map((c) => {
            const active = c === category;
            return (
              <li key={c ?? "all"}>
                <button
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-current={active ? "page" : undefined}
                  className={`text-meta transition-colors ${active ? "text-primary-100" : "text-primary-60 hover:text-primary-100"}`}
                >
                  {c ?? "Wszystko"}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pasek narzędzi */}
      <div className="mt-10 mb-12 flex items-center justify-between border-y border-primary-12 py-2 md:mb-16">
        <label className="flex h-10 items-center gap-2 rounded px-2 text-meta hover:bg-primary-4">
          <span className="text-primary-60">Sortuj:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "new" | "old")}
            className="cursor-pointer bg-transparent text-primary-100 outline-none [&>option]:bg-background"
          >
            <option value="new">Najnowsze</option>
            <option value="old">Najstarsze</option>
          </select>
        </label>
        <div className="flex gap-1" role="group" aria-label="Widok">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              aria-label={v === "grid" ? "Widok siatki" : "Widok listy"}
              onClick={() => setView(v)}
              className={`flex size-10 items-center justify-center rounded transition-colors ${
                view === v ? "text-primary-100" : "text-primary-44 hover:text-primary-100"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                {v === "grid" ? (
                  <path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" />
                ) : (
                  <path d="M1 2h14v2H1zM1 7h14v2H1zM1 12h14v2H1z" />
                )}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 && <p className="text-primary-60">Brak wpisów w tej kategorii.</p>}

      {view === "grid" ? (
        <ul className="grid gap-x-6 gap-y-20 @sm:grid-cols-2 @3xl:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug}>
              <Card item={{ title: p.title, href: `/blog/${p.slug}`, category: p.category, date: formatDate(p.date), tone: p.tone }} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col">
          {list.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex items-center gap-6 border-b border-primary-12 py-6">
                <div className="relative size-[104px] shrink-0 overflow-hidden rounded-lg">
                  <Gradient tone={p.tone} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-card transition-colors group-hover:text-primary-60">{p.title}</span>
                  <span className="flex gap-3 text-meta">
                    <span>{p.category}</span>
                    <span className="text-primary-60">{formatDate(p.date)}</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
