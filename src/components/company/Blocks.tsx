import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Gradient } from "@/components/ui/Gradient";
import type { Tone } from "@/content/site";

type Link = { label: string; href: string };

/** Nagłówek podstrony: nadtytuł 14px → H1 64px → lead (592px) → przycisk. Wyśrodkowany. */
export function PageIntro({ eyebrow, title, lead, cta }: { eyebrow?: string; title: string; lead?: string; cta?: Link }) {
  return (
    <Container className="flex flex-col items-center pt-16 text-center md:pt-22">
      {eyebrow && <p className="mb-8 text-meta">{eyebrow}</p>}
      <h1 className="max-w-wide text-[2.5rem] leading-[1.06] font-medium tracking-[-0.03em] text-balance md:text-hero">{title}</h1>
      {lead && <p className="mt-6 max-w-[37rem] text-primary-80 text-pretty">{lead}</p>}
      {cta && (
        <Button href={cta.href} size="lg" className="mt-8">
          {cta.label}
        </Button>
      )}
    </Container>
  );
}

/** Tekst (≈360px) + kwadratowa grafika (≈550px), opcjonalnie odwrócone. */
export function Split({
  title,
  text,
  actions = [],
  tone,
  reverse = false,
  id,
}: {
  title: string;
  text: string;
  actions?: Link[];
  tone: Tone;
  reverse?: boolean;
  id?: string;
}) {
  return (
    <Container>
      <div id={id} className={`mx-auto grid max-w-[64rem] scroll-mt-24 items-center gap-10 md:gap-20 ${reverse ? "md:grid-cols-[1fr_22rem]" : "md:grid-cols-[22rem_1fr]"}`}>
        <div className={`flex flex-col items-start ${reverse ? "md:order-2" : ""}`}>
          <h2 className="text-h4 md:text-h3">{title}</h2>
          <p className="mt-5 text-primary-80">{text}</p>
          {actions.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {actions.map((a, i) => (
                <Button key={a.label} href={a.href} variant={i === 0 ? "secondary" : "ghost"} size="lg">
                  {a.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className={`relative aspect-square overflow-hidden rounded-md ${reverse ? "md:order-1" : ""}`}>
          <Gradient tone={tone} />
        </div>
      </div>
    </Container>
  );
}

/** Szeroka grafika 16:9 (≈1130px). */
export function WideImage({ tone, caption }: { tone: Tone; caption?: string }) {
  return (
    <Container>
      <figure className="mx-auto max-w-[70rem]">
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Gradient tone={tone} />
        </div>
        {caption && <figcaption className="mt-3 text-meta font-normal text-primary-60">{caption}</figcaption>}
      </figure>
    </Container>
  );
}

/** Wyśrodkowany blok: tytuł 30px, opcjonalny tekst i przycisk. */
export function CenteredBlock({ title, text, cta, as: As = "h2", size = "h3" }: { title: string; text?: string; cta?: Link; as?: "h2" | "h3"; size?: "h3" | "display" }) {
  return (
    <Container className="flex flex-col items-center text-center">
      <As className={`max-w-wide text-balance ${size === "display" ? "text-h2 md:text-display" : "text-h4 md:text-h3"}`}>{title}</As>
      {text && <p className="mt-6 max-w-wide text-primary-80">{text}</p>}
      {cta && (
        <Button href={cta.href} variant="secondary" size="lg" className="mt-8">
          {cta.label}
        </Button>
      )}
    </Container>
  );
}
