import type { Metadata } from "next";
import { PageIntro, WideImage } from "@/components/company/Blocks";
import { DetailCards } from "@/components/company/DetailCards";
import { Gallery } from "@/components/company/Gallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { brandGuide as g } from "@/content/company";
import { brand } from "@/content/site";

export const metadata: Metadata = { title: `Wytyczne marki – ${brand.name}`, description: g.lead };

/** Logotyp jako tekst – w przykładach „czego nie robić” modyfikujemy go klasami. */
function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`text-[2.75rem] leading-none font-semibold tracking-tight ${className}`}>{brand.name}</span>;
}

// Wizualizacje błędów – kolejno do opisów w content/company.ts → brandGuide.logoDonts
const donts = [
  "inline-block scale-x-150",
  "text-[#fa423e]",
  "inline-block translate-x-[45%]",
  "bg-gradient-to-r from-[#8952ee] to-[#f077af] bg-clip-text text-transparent",
  "[text-shadow:4px_4px_0_#3a83f7]",
  "inline-block -rotate-12",
];

function Prose({ children, title, id, level = 2 }: { children?: React.ReactNode; title: string; id?: string; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div id={id} className="mx-auto w-full max-w-article scroll-mt-24">
      <H className={level === 2 ? "text-h2 md:text-display" : "text-h4 md:text-h3"}>{title}</H>
      {children && <div className="mt-6 flex flex-col gap-6 text-primary-80">{children}</div>}
    </div>
  );
}

/**
 * Wytyczne marki (wg openai.com/brand): nagłówek + Kontakt → film/grafika → kolumna 672px z sekcjami
 * (Wprowadzenie, Logo, Sygnet, Używanie logo) → siatki „czego nie robić” (3 kolumny) → galeria (karuzela)
 * → współpraca marek → typografia → zasady języka (karty z oknem szczegółów) → kontakt, prasa, warunki.
 */
export default function BrandPage() {
  return (
    <div className="flex flex-col gap-20 md:gap-30">
      <PageIntro title={g.title} lead={g.lead} cta={g.contact} />
      <WideImage tone="purple" />

      <Container className="flex flex-col gap-20 md:gap-24">
        <Prose title="Wprowadzenie">
          <p>{g.intro}</p>
        </Prose>

        <div className="flex flex-col gap-10">
          <Prose title="Logo" />
          <Prose title="Logotyp" level={3}>
            <p>{g.logotype}</p>
          </Prose>
          <figure className="mx-auto w-full max-w-article">
            <div className="flex aspect-[2/1] items-center justify-center rounded-md bg-primary-4">
              {/* pole ochronne zaznaczone przerywaną ramką */}
              <span className="border border-dashed border-primary-44 p-[0.75em] text-[2.75rem] md:text-[4rem]">
                <Wordmark className="text-[1em]!" />
              </span>
            </div>
            <figcaption className="mt-3 text-meta font-normal text-primary-60">Zachowaj pole ochronne równe wysokości litery wokół logotypu.</figcaption>
          </figure>
          <div className="flex flex-wrap justify-center gap-2">
            <Button href="/marka/logo-czarne.svg" download size="lg">
              Pobierz logotyp (ciemny)
            </Button>
            <Button href="/marka/logo-biale.svg" download variant="secondary" size="lg">
              Pobierz logotyp (jasny)
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-10 text-center text-h4 md:text-h3">Zalecenia i błędy: logotyp</h3>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {g.logoDonts.map((d, i) => (
              <li key={d}>
                <div className="flex aspect-[3/2] items-center justify-center overflow-hidden rounded-md bg-primary-4">
                  <Wordmark className={donts[i]} />
                </div>
                <p className="mt-3 text-meta font-normal text-primary-80">{d}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-10">
          <Prose title="Sygnet" level={3}>
            <p>{g.symbol}</p>
          </Prose>
          <div className="mx-auto flex w-full max-w-[70rem] items-center justify-center gap-6 rounded-md bg-primary-4 py-16 md:gap-10 md:py-24">
            {[96, 64, 40, 24].map((s) => (
              <span key={s} style={{ width: s, height: s, fontSize: s * 0.55 }} className="flex items-center justify-center rounded-[22%] bg-primary-100 font-semibold text-inverse">
                {brand.name[0]}
              </span>
            ))}
          </div>
        </div>

        <Prose title="Używanie logo" level={3}>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              ["Dozwolone:", g.usage.allowed, "✓"],
              ["Niedozwolone:", g.usage.forbidden, "✕"],
            ].map(([t, list, mark]) => (
              <div key={t as string}>
                <p className="font-medium text-primary-100">{t as string}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {(list as string[]).map((x) => (
                    <li key={x} className="flex gap-3">
                      <span aria-hidden className="text-primary-60">
                        {mark as string}
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Prose>
      </Container>

      <Gallery title="Galeria" items={g.gallery} />

      <Container className="flex flex-col gap-10">
        <Prose title="Współpraca marek">
          <p>{g.partnership}</p>
        </Prose>
        <div className="mx-auto flex w-full max-w-[70rem] items-center justify-center gap-6 rounded-md bg-primary-4 py-16 md:gap-10">
          <Wordmark />
          <span aria-hidden className="text-h3 text-primary-44">×</span>
          <span className="text-[2.75rem] leading-none font-semibold tracking-tight text-primary-60">Partner</span>
        </div>
      </Container>

      <Container className="flex flex-col gap-10">
        <Prose title="Typografia">
          <p>{g.typography}</p>
        </Prose>
        <div className="mx-auto w-full max-w-article overflow-hidden rounded-md bg-primary-4 p-8 md:p-12">
          <p className="text-[5rem] leading-none font-medium tracking-tight md:text-[7rem]">Aa</p>
          <p className="mt-6 text-p1 break-words text-primary-80">AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ aąbcćdeęfghijklłmnńoóprsśtuwyzźż 0123456789</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-meta sm:grid-cols-4">
            {[
              ["Hero", "64 / 500"],
              ["Nagłówek", "48 / 500"],
              ["Tekst", "17 / 400"],
              ["Meta", "14 / 500"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-normal text-primary-60">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <Container>
        <h3 className="mb-10 text-center text-h4 md:text-h3">Zalecenia i błędy: język</h3>
        <DetailCards items={g.language} detail={[]} />
      </Container>

      <Container className="flex flex-col gap-20 md:gap-24">
        <Prose title={g.contactSection.title} id="kontakt">
          <p>
            {g.contactSection.text}{" "}
            <a href={`mailto:${g.contactSection.email}`} className="text-primary-100 underline underline-offset-4 hover:text-primary-60">
              {g.contactSection.email}
            </a>
          </p>
        </Prose>
        <Prose title={g.press.title}>
          <p>{g.press.text}</p>
          <div>
            <Button href={g.press.cta.href} variant="secondary" size="lg">
              {g.press.cta.label}
            </Button>
          </div>
        </Prose>
        <Prose title={g.terms.title}>
          <p>{g.terms.text}</p>
        </Prose>
      </Container>
    </div>
  );
}
