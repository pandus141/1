import Link from "next/link";
import type { Job } from "@/content/company";

/**
 * Lista ofert (wg openai.com/careers): wiersz = tytuł 14px + zespół · lokalizacja (60%),
 * po prawej „Aplikuj”. Kolumna ≈900px, linie oddzielające.
 */
export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <ul className="border-t border-primary-12">
      {jobs.map((j) => (
        <li key={j.slug} className="group relative flex items-center gap-4 border-b border-primary-12 py-3">
          <Link href={`/firma/kariera/oferty/${j.slug}`} className="flex flex-1 flex-col gap-0.5 py-1 after:absolute after:inset-0">
            <h3 className="text-meta font-normal transition-colors group-hover:text-primary-60">{j.title}</h3>
            <p className="text-meta font-normal text-primary-60">
              {j.team} · {j.locations.length > 2 ? `${j.locations.length} lokalizacje` : j.locations.join(", ")}
              {j.type !== "Pełny etat" && ` · ${j.type}`}
            </p>
          </Link>
          <span aria-hidden className="relative flex h-10 items-center gap-1 rounded px-2 text-cta transition-colors group-hover:bg-primary-4">
            Aplikuj
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4.5 2.5L8 6l-3.5 3.5" />
            </svg>
          </span>
        </li>
      ))}
    </ul>
  );
}
