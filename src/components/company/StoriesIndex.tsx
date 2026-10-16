"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Section";
import { formatDate } from "@/content/blog";
import { stories, storyCategories } from "@/content/company";

const PAGE = 8;

/**
 * Lista historii (wg openai.com/stories): tytuł 48px → zakładki kategorii (18px) + sortowanie
 * → układ wyróżniony (duża karta 16:9 na 3/4 szerokości + 3 karty w kolumnie) → siatka 4 kolumn
 * → „Załaduj więcej”. Kategoria w adresie (?kategoria=).
 */
export function StoriesIndex() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get("kategoria");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [count, setCount] = useState(PAGE);

  const list = useMemo(() => {
    const f = category ? stories.filter((s) => s.category === category) : stories;
    return [...f].sort((a, b) => (sort === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [category, sort]);

  const setCategory = (c: string | null) => {
    setCount(PAGE);
    router.replace(c ? `${pathname}?kategoria=${encodeURIComponent(c)}` : pathname, { scroll: false });
  };

  const featured = !category && sort === "new" && list.length >= 4;
  const [hero, ...side] = featured ? list.slice(0, 4) : [];
  const rest = (featured ? list.slice(4) : list).slice(0, featured ? count - 4 : count);
  const shown = (featured ? 4 : 0) + rest.length;

  const toItem = (s: (typeof stories)[number]) => ({
    title: s.title,
    href: `/firma/historie/${s.slug}`,
    category: s.category,
    date: formatDate(s.date),
    tone: s.tone,
  });

  return (
    <Container className="pt-16 md:pt-22">
      <h1 className="text-h2 md:text-display">Historie</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Kategorie" className="no-scrollbar -mx-6 flex gap-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          {[null, ...storyCategories].map((c) => (
            <button
              key={c ?? "all"}
              role="tab"
              type="button"
              aria-selected={c === category}
              onClick={() => setCategory(c)}
              className={`text-quote whitespace-nowrap transition-colors duration-200 ${c === category ? "text-primary-100" : "text-primary-60 hover:text-primary-100"}`}
            >
              {c ?? "Wszystkie"}
            </button>
          ))}
        </div>
        <label className="flex h-10 items-center gap-2 rounded px-2 text-meta hover:bg-primary-4">
          <span className="text-primary-60">Sortuj:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")} className="cursor-pointer bg-transparent outline-none [&>option]:bg-background">
            <option value="new">Najnowsze</option>
            <option value="old">Najstarsze</option>
          </select>
        </label>
      </div>

      <div key={`${category}-${sort}`} className="mt-12 animate-fade-in">
        {featured && (
          <div className="mb-20 grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card item={toItem(hero)} aspect="video" size="large" />
            </div>
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {side.map((s) => (
                <li key={s.slug}>
                  <Card item={toItem(s)} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {list.length === 0 && <p className="text-primary-60">Brak historii w tej kategorii.</p>}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-16 md:gap-x-6 lg:grid-cols-4">
          {rest.map((s) => (
            <li key={s.slug}>
              <Card item={toItem(s)} />
            </li>
          ))}
        </ul>
      </div>

      {shown < list.length && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE)}
            className="inline-flex min-h-10 items-center rounded-[2.5rem] bg-primary-100 px-6 text-cta text-inverse transition-colors hover:bg-primary-80"
          >
            Załaduj więcej
          </button>
        </div>
      )}
    </Container>
  );
}
