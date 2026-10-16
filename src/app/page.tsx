import { Hero } from "@/components/sections/Hero";
import { CardRow } from "@/components/sections/CardRow";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { Card, ListRow } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Section";
import { cta, featured, hero, news, newsList, rows } from "@/content/site";

export default function Home() {
  return (
    // odstęp między sekcjami: 80px mobile / 120px desktop
    <div className="flex flex-col gap-20 md:gap-30">
      <Hero {...hero} />

      {/* Wyróżnione: 2 → 4 kolumny */}
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          {featured.map((item) => (
            <li key={item.title}>
              <Card item={item} />
            </li>
          ))}
        </ul>
      </Container>

      {/* Aktualności: 2 duże karty + lista */}
      <Section title="Najnowsze wiadomości" href="/blog">
        <Container>
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {news.map((item) => (
              <li key={item.title}>
                <Card item={item} aspect="video" size="large" />
              </li>
            ))}
          </ul>
          <ul className="mt-10 border-b border-primary-12">
            {newsList.map((item) => (
              <li key={item.title}>
                <ListRow item={item} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Rzędy 3 kart, przewijane poziomo na mobile */}
      {rows.map((row) => (
        <Section key={row.title} title={row.title} href={row.href}>
          <CardRow items={row.items} />
        </Section>
      ))}

      <CtaBlock {...cta} />
    </div>
  );
}
