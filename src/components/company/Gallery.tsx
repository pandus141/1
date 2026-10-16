"use client";

import { useRef } from "react";
import { Gradient } from "@/components/ui/Gradient";
import type { Tone } from "@/content/site";

/** Karuzela (scroll-snap) ze strzałkami poprzedni/następny – „Galeria” na stronie wytycznych marki. */
export function Gallery({ items, title }: { items: Tone[]; title: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };

  const arrow = "flex size-8 items-center justify-center rounded-full bg-primary-12 transition-colors hover:bg-primary-44/40";

  return (
    <section aria-roledescription="karuzela" aria-label={title}>
      <div className="flex flex-col items-center gap-6 px-6">
        <h2 className="text-h2 md:text-display">{title}</h2>
        <div className="flex gap-2">
          <button type="button" className={arrow} onClick={() => go(-1)} aria-label="Poprzedni">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M7.5 2.5L4 6l3.5 3.5" />
            </svg>
          </button>
          <button type="button" className={arrow} onClick={() => go(1)} aria-label="Następny">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4.5 2.5L8 6l-3.5 3.5" />
            </svg>
          </button>
        </div>
      </div>
      <ul ref={ref} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 md:scroll-px-8 md:px-8">
        {items.map((t, i) => (
          <li key={i} className="relative aspect-[4/3] w-[80%] flex-none snap-start overflow-hidden rounded-md sm:w-[45%] lg:w-[36rem]" aria-label={`Slajd ${i + 1} z ${items.length}`}>
            <Gradient tone={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}
