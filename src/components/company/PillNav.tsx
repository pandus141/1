"use client";

import { useEffect, useState } from "react";

/**
 * Przyklejony pasek kotwic (pigułki) pod headerem – top 88px jak na openai.com.
 * Aktywna pigułka (sekcja widoczna na ekranie) dostaje tło 12%.
 */
export function PillNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      let cur = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = it.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="Na tej stronie" className="sticky top-22 z-30 flex justify-center px-6">
      <ul className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full bg-background/80 p-1 backdrop-blur-xl">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "location" : undefined}
              className={`inline-flex min-h-10 items-center rounded-[2.5rem] px-5 text-cta whitespace-nowrap transition-colors duration-200 ${
                active === it.id ? "bg-primary-12 text-primary-100" : "text-primary-80 hover:text-primary-100"
              }`}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
