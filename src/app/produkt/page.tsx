import type { Metadata } from "next";
import { AppWindow } from "@/components/product/AppWindow";
import { CopyCommand } from "@/components/product/CopyCommand";
import { Button } from "@/components/ui/Button";
import { Gradient } from "@/components/ui/Gradient";
import { Container } from "@/components/ui/Section";
import { product } from "@/content/product";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: `${product.name} – ${brand.name}`,
  description: product.hero.lead,
};

/**
 * Strona produktowa wg układu openai.com/codex:
 * hero z gradientem + logotypy + makieta aplikacji → plany (3 kolumny) → funkcje (naprzemienne
 * wiersze tekst 1/3 + grafika 2/3) → „Pracuj tam, gdzie wolisz” (4 karty) → opinie (3×2) → CTA.
 * Odstęp między sekcjami: 80px mobile / 120px desktop.
 */
export default function ProductPage() {
  const { hero, plans, features, surfaces, testimonials, cta } = product;

  return (
    <div className="flex flex-col gap-20 md:gap-30">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[52rem] bg-[radial-gradient(70%_60%_at_30%_20%,#8952ee_0%,transparent_70%),radial-gradient(60%_60%_at_80%_30%,#3a83f7_0%,transparent_70%),radial-gradient(50%_50%_at_50%_60%,#a4cdfb_0%,transparent_70%)] opacity-70 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] light:opacity-50"
        />
        <Container className="flex flex-col items-center pt-16 text-center md:pt-24">
          <div aria-hidden className="flex size-14 items-center justify-center rounded-2xl border border-primary-12 bg-background/60 backdrop-blur md:size-16">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
            </svg>
          </div>
          <h1 className="mt-8 max-w-3xl text-[2.5rem] leading-[1.06] font-medium tracking-[-0.03em] text-balance md:text-hero">{hero.title}</h1>
          <p className="mt-6 max-w-sm text-primary-80 text-pretty">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Button href={hero.primary.href} size="lg">{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="secondary" size="lg">{hero.secondary.label}</Button>
          </div>

          <p className="mt-20 text-meta text-primary-80">{hero.logosLabel}</p>
          <ul className="mt-8 grid w-full grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
            {hero.logos.map((l) => (
              <li key={l} className="flex h-10 items-center justify-center text-h4 font-semibold tracking-tight text-primary-60">
                {l}
              </li>
            ))}
          </ul>

          <div className="mt-16 w-full max-w-5xl md:mt-20">
            <AppWindow />
          </div>
        </Container>
      </section>

      {/* PLANY */}
      <section id="plany" className="scroll-mt-24">
        <Container>
          <SectionHeading title={plans.title} lead={plans.lead} />
          {/* subgrid: przyciski w jednej linii niezależnie od długości opisu */}
          <ul className="mx-auto mt-12 grid max-w-[68rem] gap-x-14 gap-y-12 md:grid-cols-3 md:grid-rows-[auto_1fr_auto_auto] md:gap-y-0">
            {plans.items.map((p) => (
              <li key={p.name} className="flex flex-col md:row-span-4 md:grid md:grid-rows-subgrid">
                <h3 className="text-h3">{p.name}</h3>
                <p className="mt-2 text-primary-80">{p.description}</p>
                <Button href={p.cta.href} size="lg" className="mt-8 w-full">
                  {p.cta.label}
                </Button>
                {p.note ? (
                  <p className="mt-6 text-meta font-normal text-primary-60">
                    {p.note}{" "}
                    {p.more && (
                      <a href={p.more.href} className="text-primary-100 underline-offset-4 hover:underline">
                        {p.more.label}
                      </a>
                    )}
                  </p>
                ) : (
                  <span aria-hidden />
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FUNKCJE – naprzemienne wiersze */}
      <section>
        <Container>
          <SectionHeading title={features.title} />
          <ul className="mt-12 flex flex-col gap-16 md:mt-16 md:gap-32">
            {features.items.map((f, i) => (
              <li key={f.title} className="grid items-end gap-6 md:grid-cols-12 md:gap-8">
                <div className={`relative aspect-video overflow-hidden rounded-md md:col-span-8 ${i % 2 ? "md:order-1" : "md:order-2"}`}>
                  <Gradient tone={f.tone} />
                </div>
                <div className={`md:col-span-4 ${i % 2 ? "md:order-2" : "md:order-1"}`}>
                  <h3 className="text-h4 md:text-h3">{f.title}</h3>
                  <p className="mt-4 text-primary-80">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* GDZIE PRACOWAĆ – 4 karty */}
      <section>
        <Container>
          <SectionHeading title={surfaces.title} lead={surfaces.lead} />
          <div className="mt-6 flex justify-center">
            <Button href={surfaces.cta.href} size="lg">{surfaces.cta.label}</Button>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {surfaces.items.map((s) => (
              <li key={s.title} className="flex flex-col rounded-2xl bg-primary-4 p-2">
                <div className="relative aspect-[306/250] overflow-hidden rounded-xl">
                  <Gradient tone={s.tone} />
                </div>
                <div className="flex flex-1 flex-col gap-6 px-3 pt-4 pb-3">
                  <h3 className="flex-1 text-h5">{s.title}</h3>
                  {s.action.kind === "copy" ? (
                    <CopyCommand command={s.action.label} />
                  ) : (
                    <Button href={s.action.href} variant="secondary" size="lg" className="w-full">
                      {s.action.label}
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* OPINIE */}
      <section>
        <Container>
          <SectionHeading title={testimonials.title} />
          <ul className="mt-12 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:px-8">
            {testimonials.items.map((t) => (
              <li key={t.author}>
                <figure className="flex flex-col gap-6">
                  <div aria-hidden className="relative size-16 overflow-hidden rounded-full">
                    <Gradient tone={t.tone} />
                  </div>
                  <blockquote>„{t.quote}”</blockquote>
                  <figcaption className="text-meta font-normal text-primary-60">
                    {t.author}, {t.role}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="flex flex-col items-center gap-10 py-10 text-center md:py-20">
          <h2 className="text-h2 text-balance md:text-display">{cta.title}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            <Button href={cta.primary.href} size="lg">{cta.primary.label}</Button>
            <Button href={cta.secondary.href} variant="secondary" size="lg">{cta.secondary.label}</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mx-auto flex max-w-wide flex-col items-center gap-6 text-center">
      <h2 className="text-h2 text-balance md:text-display">{title}</h2>
      {lead && <p className="max-w-narrow text-primary-80">{lead}</p>}
    </div>
  );
}
