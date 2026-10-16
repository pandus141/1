import type { Metadata } from "next";
import { DetailCards } from "@/components/company/DetailCards";
import { PillNav } from "@/components/company/PillNav";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Gradient } from "@/components/ui/Gradient";
import { Container } from "@/components/ui/Section";
import { formatDate, posts } from "@/content/blog";
import { policy as p } from "@/content/company";
import { brand } from "@/content/site";

export const metadata: Metadata = { title: `Polityka publiczna – ${brand.name}`, description: p.lead };

function Heading({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-wide flex-col items-center gap-6 text-center md:mb-12">
      <h2 className="text-h2 text-balance md:text-display">{title}</h2>
      {lead && <p className="text-primary-80">{lead}</p>}
    </div>
  );
}

/**
 * Polityka publiczna (wg openai.com/company/public-policy): nagłówek dzielony (tekst + kwadrat)
 * → przyklejony pasek kotwic z podświetleniem sekcji → zasady (5 kolumn) → priorytety i podejście
 * (karty otwierające pełnoekranowe okno) → zasoby (wpisy bloga z kategorii).
 */
export default function PolicyPage() {
  const resources = posts.filter((x) => x.category === p.resources.category).concat(posts.filter((x) => x.category !== p.resources.category)).slice(0, 3);

  return (
    <div className="flex flex-col gap-20 md:gap-24">
      <Container className="pt-10 md:pt-22">
        <div className="grid items-end gap-10 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <h1 className="text-[2.5rem] leading-[1.06] font-medium tracking-[-0.03em] text-balance md:text-hero">{p.title}</h1>
            <p className="mt-6 text-primary-80">{p.lead}</p>
            <Button href={p.cta.href} variant="secondary" size="lg" className="mt-8">
              {p.cta.label}
            </Button>
          </div>
          <div className="relative order-1 aspect-square overflow-hidden rounded-md md:order-2">
            <Gradient tone={p.tone} />
          </div>
        </div>
      </Container>

      <PillNav items={p.nav} />

      <section id="zasady" className="scroll-mt-40">
        <Container>
          <Heading title={p.principles.title} lead={p.principles.lead} />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {p.principles.items.map((it) => (
              <li key={it.title}>
                <p className="text-quote">{it.title}</p>
                <p className="mt-4 text-meta text-primary-60">{it.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="priorytety" className="scroll-mt-40">
        <Container>
          <Heading title={p.priorities.title} lead={p.priorities.lead} />
          <DetailCards items={p.priorities.items} detail={p.detail} />
        </Container>
      </section>

      <section id="podejscie" className="scroll-mt-40">
        <Container>
          <Heading title={p.approach.title} lead={p.approach.lead} />
          <DetailCards items={p.approach.items} detail={p.detail} />
        </Container>
      </section>

      <section id="zasoby" className="scroll-mt-40">
        <Container>
          <Heading title={p.resources.title} />
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((x) => (
              <li key={x.slug}>
                <Card item={{ title: x.title, href: `/blog/${x.slug}`, category: x.category, date: formatDate(x.date), tone: x.tone }} />
              </li>
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <Button href={`/blog?kategoria=${encodeURIComponent(p.resources.category)}`} variant="secondary" size="lg">
              Wszystkie aktualności
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
