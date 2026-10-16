"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; level?: 2 | 3 };

type Props = {
  items: TocItem[];
  title?: string;
  /** "article" – 12px, jak w blogu; "help" – 14px, jak w Centrum pomocy */
  variant?: "article" | "help";
  className?: string;
};

/**
 * Spis treści przyklejony pod headerem (sticky top = 64px).
 * Aktywna pozycja: pełny kolor, pozostałe 60%.
 */
export function TableOfContents({ items, title, variant = "article", className = "" }: Props) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const onScroll = () => {
      // ostatni nagłówek, który minął górną krawędź (z marginesem na header)
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top < 120) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const text = variant === "article" ? "text-toc" : "text-meta font-normal";

  return (
    <nav aria-label={title ?? "Spis treści"} className={`sticky top-header-h pt-2 ${className}`}>
      {title && <p className={`mb-3 ${text} font-medium text-primary-100`}>{title}</p>}
      <ul className={`flex flex-col ${variant === "article" ? "gap-3" : "gap-2"}`}>
        {items.map((i) => (
          <li key={i.id} className={i.level === 3 ? "ps-3" : ""}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`block ${text} transition-colors duration-200 ${
                active === i.id ? "text-primary-100" : "text-primary-60 hover:text-primary-100"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
