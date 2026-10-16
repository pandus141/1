"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { formatDate, posts } from "@/content/blog";

/**
 * „Dowiedz się więcej o naszych działaniach”: zakładki (kategorie bloga) przełączają
 * rząd 4 najnowszych wpisów z danej kategorii; treść płynnie się przenika.
 */
export function TabbedPosts({ title, tabs, cta }: { title: string; tabs: string[]; cta: { label: string; href: string } }) {
  const [tab, setTab] = useState(tabs[0]);
  const list = posts
    .filter((p) => p.category === tab)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <section>
      <Container>
        <h2 className="text-h5">{title}</h2>
        <div role="tablist" aria-label={title} className="no-scrollbar mt-4 flex gap-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              aria-controls="tabbed-posts-panel"
              onClick={() => setTab(t)}
              className={`h-10 rounded text-p1 transition-colors duration-200 ${tab === t ? "text-primary-100" : "text-primary-60 hover:text-primary-100"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <ul id="tabbed-posts-panel" role="tabpanel" key={tab} className="mt-6 grid animate-fade-in grid-cols-2 gap-x-4 gap-y-10 md:gap-6 lg:grid-cols-4">
          {list.map((p) => (
            <li key={p.slug}>
              <Card item={{ title: p.title, href: `/blog/${p.slug}`, category: p.category, date: formatDate(p.date), tone: p.tone }} />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Button href={`${cta.href}?kategoria=${encodeURIComponent(tab)}`} variant="secondary" size="lg">
            {cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
