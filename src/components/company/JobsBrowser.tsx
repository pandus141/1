"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";
import { jobLocations, jobs, jobTeams } from "@/content/company";
import { JobList } from "./JobList";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");

/**
 * Wyszukiwarka ofert (wg openai.com/careers/search): pole „Filtruj po nazwie” po lewej,
 * listy „Wszystkie zespoły” / „Wszystkie lokalizacje” po prawej. Stan w adresie (?q=&zespol=&lokalizacja=),
 * więc wyniki można linkować i wracają po odświeżeniu.
 */
export function JobsBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = params.get("q") ?? "";
  const team = params.get("zespol") ?? "";
  const loc = params.get("lokalizacja") ?? "";
  const inputRef = useRef<HTMLInputElement>(null);

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const s = next.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const list = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean);
    return jobs
      .filter((j) => (!team || j.team === team) && (!loc || j.locations.includes(loc)))
      .filter((j) => words.every((w) => norm(`${j.title} ${j.team}`).includes(w)))
      .sort((a, b) => a.title.localeCompare(b.title, "pl"));
  }, [q, team, loc]);

  const select = "h-10 cursor-pointer rounded bg-transparent px-2 text-cta outline-none hover:bg-primary-4 [&>option]:bg-background";

  return (
    <div className="mx-auto max-w-wide">
      <div className="flex flex-col gap-3 border-b border-primary-12 pb-4 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-3">
          <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-primary-60">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Filtruj oferty po nazwie</span>
          <input
            ref={inputRef}
            type="search"
            defaultValue={q}
            onChange={(e) => set("q", e.target.value.trim())}
            placeholder="Szukaj stanowiska"
            className="h-10 w-full bg-transparent text-p2 placeholder:text-primary-60 focus:outline-none"
          />
        </label>
        <div className="flex gap-2">
          <label>
            <span className="sr-only">Zespół</span>
            <select value={team} onChange={(e) => set("zespol", e.target.value)} className={select}>
              <option value="">Wszystkie zespoły</option>
              {jobTeams.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Lokalizacja</span>
            <select value={loc} onChange={(e) => set("lokalizacja", e.target.value)} className={select}>
              <option value="">Wszystkie lokalizacje</option>
              {jobLocations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 mb-3 text-meta font-normal text-primary-60" aria-live="polite">
        {list.length} {list.length === 1 ? "oferta" : list.length % 10 >= 2 && list.length % 10 <= 4 && (list.length < 10 || list.length > 20) ? "oferty" : "ofert"}
      </p>
      {list.length ? (
        <JobList jobs={list} />
      ) : (
        <div className="rounded-2xl border border-primary-12 px-6 py-10 text-center">
          <p>Brak ofert spełniających kryteria.</p>
          <button type="button" onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              router.replace(pathname, { scroll: false });
            }} className="mt-3 text-meta text-primary-60 underline hover:text-primary-100">
            Wyczyść filtry
          </button>
        </div>
      )}
    </div>
  );
}
