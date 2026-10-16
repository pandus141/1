import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ShareButton } from "@/components/ui/ShareButton";
import { formatDateLong } from "@/content/blog";
import { applyEmail, getJob, jobDescription, jobs } from "@/content/company";
import { brand } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const job = getJob((await params).slug);
  return job ? { title: `${job.title} – Kariera – ${brand.name}`, description: `${job.team} · ${job.locations.join(", ")}` } : {};
}

/** Oferta pracy: okruszek → tytuł → zespół / lokalizacja / typ → opis → „Aplikuj” (e-mail z tematem). */
export default async function JobPage({ params }: Params) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  const mailto = `mailto:${applyEmail}?subject=${encodeURIComponent(`Aplikacja: ${job.title}`)}`;

  return (
    <Container className="pt-16 md:pt-22">
      <div className="mx-auto max-w-article">
        <Link href="/firma/kariera/oferty" className="inline-flex items-center gap-1 text-meta text-primary-60 transition-colors hover:text-primary-100">
          <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7.5 2.5L4 6l3.5 3.5" />
          </svg>
          Wszystkie oferty
        </Link>
        <h1 className="mt-6 text-h2 text-balance md:text-display">{job.title}</h1>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-primary-12 py-6 text-meta sm:grid-cols-4">
          {[
            ["Zespół", job.team],
            ["Lokalizacja", job.locations.join(", ")],
            ["Typ umowy", job.type],
            ["Opublikowano", formatDateLong(job.posted)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-normal text-primary-60">{k}</dt>
              <dd className="mt-1">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex items-center justify-between gap-4">
          <Button href={mailto} size="lg">
            Aplikuj
          </Button>
          <ShareButton title={job.title} />
        </div>

        <div className="mt-14 flex flex-col gap-10">
          {jobDescription(job).map((s) => (
            <section key={s.title}>
              <h2 className="mb-4 text-h4">{s.title}</h2>
              {s.text && <p className="text-primary-80">{s.text}</p>}
              {s.items && (
                <ul className="flex list-disc flex-col gap-2 ps-6 text-primary-80 marker:text-primary-60">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-primary-4 p-8 text-center">
          <p className="text-h5">Zainteresowany?</p>
          <p className="mt-2 text-meta font-normal text-primary-60">Wyślij CV na adres {applyEmail}, podając w temacie nazwę stanowiska.</p>
          <Button href={mailto} size="lg" className="mt-6">
            Aplikuj na to stanowisko
          </Button>
        </div>
      </div>
    </Container>
  );
}
