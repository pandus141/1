import type { Metadata } from "next";
import { CenteredBlock, PageIntro, Split, WideImage } from "@/components/company/Blocks";
import { JobList } from "@/components/company/JobList";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Section";
import { careers, jobs } from "@/content/company";
import { brand } from "@/content/site";

export const metadata: Metadata = { title: `Kariera – ${brand.name}`, description: careers.lead };

const icons = {
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  home: <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-5h-6v5H5a1 1 0 01-1-1v-8z" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />,
};

/**
 * Kariera (wg openai.com/careers): nagłówek z CTA → zdanie + wartości i zasady (kolumna 672px)
 * → szeroka grafika → benefity (3 kolumny) → wyróżnione oferty → programy (naprzemienne)
 * → cytat → zasoby (3 karty) → CTA.
 */
export default function CareersPage() {
  const featured = jobs.filter((j) => j.featured).slice(0, 5);

  return (
    <div className="flex flex-col gap-20 md:gap-30">
      <PageIntro eyebrow={careers.eyebrow} title={careers.title} lead={careers.lead} cta={careers.cta} />

      <section className="flex flex-col gap-12 md:gap-16">
        <CenteredBlock title={careers.statement} />
        <Container>
          <div className="mx-auto flex max-w-article flex-col gap-14">
            {[careers.values, careers.principles].map((group) => (
              <div key={group.intro}>
                <p>{group.intro}</p>
                <ul className="mt-6 flex list-disc flex-col gap-3 ps-7 marker:text-primary-60">
                  {group.items.map((v) => (
                    <li key={v.title}>
                      <span className="font-medium">{v.title}</span> <span className="text-primary-80">{v.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WideImage tone={careers.imageTone} />

      <section>
        <CenteredBlock title={careers.benefits.title} text={careers.benefits.lead} />
        <Container>
          <ul className="mx-auto mt-12 grid max-w-[68rem] gap-10 md:grid-cols-3 md:gap-16">
            {careers.benefits.groups.map((g) => (
              <li key={g.icon}>
                <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mb-5 text-primary-60">
                  {icons[g.icon]}
                </svg>
                <ul className="flex flex-col gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="text-primary-80">
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <CenteredBlock title={careers.featured.title} text={careers.featured.lead} cta={careers.featured.cta} />
        <Container className="mt-10">
          <div className="mx-auto max-w-wide">
            <JobList jobs={featured} />
          </div>
        </Container>
      </section>

      {careers.programs.map((p, i) => (
        <Split key={p.title} title={p.title} text={p.text} actions={[p.cta]} tone={p.tone} reverse={i % 2 === 1} />
      ))}

      <Container>
        <figure className="mx-auto max-w-[54rem] text-center">
          <blockquote className="text-h4 text-balance md:text-h3">„{careers.quote.text}”</blockquote>
          <figcaption className="mt-6 text-meta font-normal text-primary-60">{careers.quote.cite}</figcaption>
        </figure>
      </Container>

      <Container>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {careers.resources.map((r) => (
            <li key={r.title}>
              <Card item={r} />
            </li>
          ))}
        </ul>
      </Container>

      <Container className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-h2 text-balance md:text-display">{careers.finalCta.title}</h2>
        <Button href={careers.finalCta.primary.href} variant="secondary" size="lg">
          {careers.finalCta.primary.label}
        </Button>
      </Container>
    </div>
  );
}
