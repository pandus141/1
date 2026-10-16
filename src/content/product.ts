/**
 * Treść strony produktowej (/produkt) – układ wg openai.com/codex, treść neutralna.
 * Opinie poniżej to wyraźne PLACEHOLDERY – podmień na prawdziwe, za zgodą autorów.
 */
import type { Tone } from "./site";

type Link = { label: string; href: string };

export const product = {
  name: "Produkt A",
  hero: {
    title: "Nagłówek produktu w kilku słowach",
    lead: "Jedno lub dwa zdania, które wyjaśniają, co robi produkt i dla kogo jest przeznaczony.",
    primary: { label: "Pobierz aplikację", href: "#" },
    secondary: { label: "Wypróbuj w przeglądarce", href: "#" },
    logosLabel: "Zaufały nam zespoły",
    logos: ["Firma 1", "Firma 2", "Firma 3", "Firma 4", "Firma 5"],
  },
  plans: {
    title: "Zacznij korzystać",
    lead: "Produkt jest dostępny w ramach poniższych planów.",
    items: [
      { name: "Plus", description: "Dla osób, które chcą regularnie korzystać z produktu w codziennej pracy.", cta: { label: "Wybierz plan Plus", href: "#" } },
      { name: "Pro", description: "Wyższe limity i pierwszeństwo dostępu do nowych funkcji.", cta: { label: "Wybierz plan Pro", href: "#" } },
      {
        name: "Biznes",
        description: "Wspólna przestrzeń dla zespołu, administracja kontami i rozszerzona ochrona danych.",
        cta: { label: "Wypróbuj dla firm", href: "#" },
        note: "*Dla 2+ stanowisk, rozliczanie roczne.",
        more: { label: "Dowiedz się więcej", href: "#" } as Link,
      },
    ] as { name: string; description: string; cta: Link; note?: string; more?: Link }[],
  },
  features: {
    title: "Najlepszy sposób na codzienną pracę",
    items: [
      { title: "Pierwsza kluczowa funkcja", text: "Opis funkcji w dwóch–trzech zdaniach. Wyjaśnij, jaki problem rozwiązuje i jaką korzyść daje użytkownikowi.", tone: "blue" },
      { title: "Druga kluczowa funkcja", text: "Opis funkcji w dwóch–trzech zdaniach. Grafika i tekst zamieniają się stronami w kolejnych wierszach.", tone: "purple" },
      { title: "Trzecia kluczowa funkcja", text: "Opis funkcji w dwóch–trzech zdaniach. Grafika ma proporcje 16:9 i zajmuje około dwóch trzecich szerokości.", tone: "teal" },
      { title: "Czwarta kluczowa funkcja", text: "Opis funkcji w dwóch–trzech zdaniach. Na urządzeniach mobilnych grafika jest zawsze nad tekstem.", tone: "orange" },
    ] as { title: string; text: string; tone: Tone }[],
  },
  surfaces: {
    title: "Pracuj tam, gdzie wolisz",
    lead: "Ten sam produkt w przeglądarce, aplikacji, edytorze i terminalu.",
    cta: { label: "Więcej informacji w dokumentacji", href: "#" },
    items: [
      { title: "Aplikacja", tone: "blue", action: { kind: "link", label: "Pobierz aplikację", href: "#" } },
      { title: "W przeglądarce", tone: "purple", action: { kind: "link", label: "Otwórz w przeglądarce", href: "#" } },
      { title: "Rozszerzenie do edytora", tone: "green", action: { kind: "link", label: "Zainstaluj rozszerzenie", href: "#" } },
      { title: "Wiersz poleceń", tone: "yellow", action: { kind: "copy", label: "npm i -g przyklad-cli" } },
    ] as { title: string; tone: Tone; action: { kind: "link"; label: string; href: string } | { kind: "copy"; label: string } }[],
  },
  testimonials: {
    title: "Opinie użytkowników",
    items: Array.from({ length: 6 }, (_, i) => ({
      quote: "Miejsce na krótką opinię użytkownika – dwa, trzy zdania o tym, co zmieniło się w jego pracy dzięki produktowi.",
      author: `Imię Nazwisko ${i + 1}`,
      role: "Stanowisko, firma",
      tone: (["pink", "blue", "green", "orange", "purple", "teal"] as Tone[])[i],
    })),
  },
  cta: {
    title: "Zacznij pracę z produktem",
    primary: { label: "Pobierz aplikację", href: "#" },
    secondary: { label: "Wypróbuj w przeglądarce", href: "#" },
  },
};
