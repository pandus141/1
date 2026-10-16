"use client";

import { useSearchParams } from "next/navigation";

/**
 * Pole wyszukiwania Centrum pomocy – zwykły formularz GET (działa też bez JS),
 * duże pole 18px z linią na dole, jak na help.openai.com.
 */
export function HelpSearch() {
  const q = useSearchParams().get("q") ?? "";
  return (
    <form action="/pomoc/szukaj" role="search" className="relative">
      <label htmlFor="help-q" className="sr-only">
        Wyszukaj artykuły
      </label>
      <svg
        aria-hidden
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-primary-60"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4 4" strokeLinecap="round" />
      </svg>
      <input
        key={q}
        id="help-q"
        name="q"
        type="search"
        defaultValue={q}
        placeholder="Wyszukaj artykuły…"
        autoComplete="off"
        className="h-14 w-full border-b border-primary-44 bg-transparent ps-12 pe-4 text-quote font-normal placeholder:text-primary-60 focus:border-primary-100 focus:outline-none md:h-16"
      />
    </form>
  );
}
