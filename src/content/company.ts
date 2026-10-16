/**
 * Sekcja „Firma” – treść wszystkich podstron (/firma/…).
 * Układ odtworzony z openai.com (about, careers, stories, brand, public-policy), treść neutralna.
 */
import type { Block } from "./blog";
import type { Tone } from "./site";

type Link = { label: string; href: string };

/* ───────────────────────── O nas ───────────────────────── */

export const about = {
  eyebrow: "Firma",
  title: "O nas",
  lead: "Jedno lub dwa zdania o tym, czym zajmuje się firma, dla kogo tworzy swoje produkty i jaki ma cel.",
  mission: {
    title: "Nasza misja",
    text: "Krótki akapit opisujący misję firmy. Wyjaśnij, dlaczego firma istnieje i jaki wpływ chce wywierać na swoich użytkowników oraz otoczenie.",
    primary: { label: "Poznaj nasze zasady", href: "/firma/polityka-publiczna" } as Link,
    secondary: { label: "Polityka publiczna", href: "/firma/polityka-publiczna#zasady" } as Link,
    tone: "purple" as Tone,
  },
  statement: { title: "Zdanie, które w kilku słowach podsumowuje, nad czym pracujemy na co dzień i dlaczego to ważne.", tone: "blue" as Tone },
  careers: {
    title: "Kariera w firmie",
    text: "Szukamy ciekawych świata osób o różnych doświadczeniach. Dołącz do zespołu, który tworzy produkty używane każdego dnia.",
    cta: { label: "Wyświetl wszystkie oferty pracy", href: "/firma/kariera/oferty" } as Link,
    tone: "orange" as Tone,
  },
  learnMore: { title: "Dowiedz się więcej o naszych działaniach", tabs: ["Produkt", "Firma", "Badania"], cta: { label: "Przeczytaj więcej", href: "/blog" } as Link },
  structure: {
    title: "Nasza struktura",
    text: "Akapit o strukturze organizacyjnej: kto podejmuje decyzje, jak działa zarząd i jakie zasady nadzoru obowiązują w firmie.",
    cta: { label: "Nasza struktura", href: "#" } as Link,
    tone: "teal" as Tone,
  },
  cta: { title: "Dołącz do nas i kształtuj przyszłość technologii", primary: { label: "Wyświetl oferty pracy", href: "/firma/kariera/oferty" } as Link },
};

/* ───────────────────────── Kariera ───────────────────────── */

export const careers = {
  eyebrow: "Firma",
  title: "Twórz z nami bezpieczne i pożyteczne produkty",
  lead: "Szukamy ciekawych świata osób o różnym doświadczeniu. Dołącz do nas i współtwórz produkty, z których korzystają miliony ludzi.",
  cta: { label: "Zobacz oferty pracy", href: "/firma/kariera/oferty" } as Link,
  statement: "Zdanie o kulturze firmy – co jest dla nas najważniejsze w codziennej pracy i współpracy.",
  values: {
    intro: "Wartości: określają, czego oczekujemy od siebie nawzajem i jak podejmujemy decyzje.",
    items: [
      { title: "Ludzie na pierwszym miejscu.", text: "Krótki opis wartości – jedno lub dwa zdania wyjaśniające, co oznacza w praktyce." },
      { title: "Pokora.", text: "Krótki opis wartości – jedno lub dwa zdania wyjaśniające, co oznacza w praktyce." },
      { title: "Odwaga.", text: "Krótki opis wartości – jedno lub dwa zdania wyjaśniające, co oznacza w praktyce." },
      { title: "Radość z tworzenia.", text: "Krótki opis wartości – jedno lub dwa zdania wyjaśniające, co oznacza w praktyce." },
    ],
  },
  principles: {
    intro: "Zasady działania: opisują, jak pracujemy na co dzień.",
    items: [
      { title: "Znajdź sposób.", text: "Krótki opis zasady – jedno lub dwa zdania." },
      { title: "Kreatywność ponad kontrolę.", text: "Krótki opis zasady – jedno lub dwa zdania." },
      { title: "Szybko się aktualizuj.", text: "Krótki opis zasady – jedno lub dwa zdania." },
      { title: "Skupienie.", text: "Krótki opis zasady – jedno lub dwa zdania." },
    ],
  },
  imageTone: "pink" as Tone,
  benefits: {
    title: "Benefity",
    lead: "Dbamy o dobre samopoczucie w codziennym życiu. Benefity wspierają zdrowie, rodzinę i rozwój.",
    groups: [
      { icon: "heart", items: ["Pakiet medyczny dla Ciebie i rodziny", "Wsparcie zdrowia psychicznego", "Ubezpieczenie w podróży służbowej", "Program emerytalny", "Budżet konferencyjny"] },
      { icon: "home", items: ["Płatny urlop rodzicielski", "Elastyczna praca zdalna", "Ubezpieczenie na życie", "Wsparcie w planowaniu rodziny", "Hojny płatny urlop wypoczynkowy"] },
      { icon: "spark", items: ["Roczny budżet na naukę i rozwój", "Grupy pracownicze", "Wydarzenia zespołowe", "Posiłki w biurze", "Sesje coachingowe"] },
    ] as { icon: "heart" | "home" | "spark"; items: string[] }[],
  },
  featured: { title: "Wyróżnione oferty", lead: "Zawsze szukamy utalentowanych osób do naszego zespołu.", cta: { label: "Zobacz wszystkie oferty", href: "/firma/kariera/oferty" } as Link },
  programs: [
    { title: "Program rezydencki", text: "Półroczny program dla osób z innych dziedzin, które chcą rozpocząć karierę w naszej branży. Krótki opis i warunki udziału.", cta: { label: "Dowiedz się więcej", href: "#" }, tone: "green" as Tone },
    { title: "Młode talenty", text: "Staże i programy dla studentów i absolwentów. Krótki opis, kiedy ruszają nabory i czego można się nauczyć.", cta: { label: "Dowiedz się więcej", href: "#" }, tone: "yellow" as Tone },
  ],
  quote: { text: "Miejsce na cytat pracownika o tym, jak wygląda praca w firmie – podmień na prawdziwy, za zgodą autora.", cite: "Imię Nazwisko, stanowisko" },
  resources: [
    { title: "Nasze zasady", category: "Firma", href: "/firma/polityka-publiczna", tone: "blue" as Tone },
    { title: "Jak wygląda rekrutacja", category: "Kariera", href: "/blog?kategoria=Firma", tone: "purple" as Tone },
    { title: "Jak budujemy zespoły", category: "Firma", href: "/blog", tone: "red" as Tone },
  ],
  finalCta: { title: "Kształtuj z nami przyszłość technologii", primary: { label: "Zobacz oferty pracy", href: "/firma/kariera/oferty" } as Link },
};

export type Job = {
  slug: string;
  title: string;
  team: string;
  locations: string[];
  type: "Pełny etat" | "Staż" | "Kontrakt";
  remote?: boolean;
  featured?: boolean;
  posted: string; // ISO
};

export const jobTeams = ["Inżynieria", "Produkt", "Projektowanie", "Sprzedaż", "Wsparcie klienta", "Operacje", "Bezpieczeństwo"];
export const jobLocations = ["Warszawa", "Kraków", "Wrocław", "Gdańsk", "Zdalnie"];

const J = (title: string, team: string, locations: string[], extra: Partial<Job> = {}): Job => ({
  slug: title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  title,
  team,
  locations,
  type: "Pełny etat",
  posted: "2026-10-01",
  ...extra,
});

export const jobs: Job[] = [
  J("Inżynier oprogramowania, frontend", "Inżynieria", ["Warszawa", "Zdalnie"], { featured: true, posted: "2026-10-14" }),
  J("Inżynier oprogramowania, backend", "Inżynieria", ["Kraków"], { featured: true, posted: "2026-10-12" }),
  J("Inżynier infrastruktury", "Inżynieria", ["Warszawa", "Wrocław"], { posted: "2026-10-09" }),
  J("Inżynier ds. niezawodności (SRE)", "Inżynieria", ["Zdalnie"], { posted: "2026-10-03" }),
  J("Product manager", "Produkt", ["Warszawa"], { featured: true, posted: "2026-10-11" }),
  J("Analityk produktowy", "Produkt", ["Kraków", "Zdalnie"], { posted: "2026-09-29" }),
  J("Product designer", "Projektowanie", ["Warszawa"], { featured: true, posted: "2026-10-10" }),
  J("Badacz UX", "Projektowanie", ["Gdańsk", "Zdalnie"], { posted: "2026-09-25" }),
  J("Account executive", "Sprzedaż", ["Warszawa"], { posted: "2026-10-07" }),
  J("Solutions engineer", "Sprzedaż", ["Kraków", "Wrocław"], { featured: true, posted: "2026-10-08" }),
  J("Specjalista ds. wsparcia klienta", "Wsparcie klienta", ["Gdańsk"], { posted: "2026-10-02" }),
  J("Specjalista ds. finansów", "Operacje", ["Warszawa"], { posted: "2026-09-21" }),
  J("Rekruter techniczny", "Operacje", ["Zdalnie"], { type: "Kontrakt", posted: "2026-09-18" }),
  J("Inżynier bezpieczeństwa aplikacji", "Bezpieczeństwo", ["Warszawa", "Zdalnie"], { posted: "2026-10-05" }),
  J("Stażysta – inżynieria", "Inżynieria", ["Kraków"], { type: "Staż", posted: "2026-09-30" }),
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

/** Opis oferty – wspólny szablon (podmień na treść z systemu rekrutacyjnego). */
export const jobDescription = (job: Job): { title: string; items?: string[]; text?: string }[] => [
  { title: "O zespole", text: `Zespół ${job.team} odpowiada za kluczowe obszary naszych produktów. Krótki opis zespołu, jego celów i sposobu pracy.` },
  { title: "Twoje zadania", items: ["Pierwsze zadanie na tym stanowisku", "Drugie zadanie na tym stanowisku", "Współpraca z innymi zespołami", "Udział w planowaniu i przeglądach"] },
  { title: "Czego szukamy", items: ["Doświadczenie w podobnej roli", "Umiejętność samodzielnej pracy i komunikacji", "Ciekawość i chęć nauki", "Mile widziane: dodatkowe kompetencje"] },
  { title: "Co oferujemy", text: "Konkurencyjne wynagrodzenie, pełen pakiet benefitów (zobacz stronę Kariera) i realny wpływ na produkt." },
];

export const applyEmail = "kariera@example.com";

/* ───────────────────────── Historie ───────────────────────── */

export type Story = {
  slug: string;
  title: string;
  category: string;
  date: string;
  tone: Tone;
  excerpt: string;
  body: Block[];
};

export const storyCategories = ["Edukacja", "Zdrowie", "Finanse", "Nauka", "Społeczność"];

const storyTitles = [
  "Jak szkoła wykorzystuje nasz produkt w codziennej nauce",
  "Szybsza diagnostyka dzięki nowym narzędziom",
  "Mała firma, duże możliwości",
  "Badacze przyspieszają analizę danych",
  "Lokalna społeczność łączy siły",
  "Uczelnia wdraża produkt na wszystkich wydziałach",
];

const storyTones: Tone[] = ["orange", "green", "blue", "purple", "pink", "teal", "yellow", "red"];

export const stories: Story[] = Array.from({ length: 16 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 9, 12 - i * 9));
  const tone = storyTones[i % storyTones.length];
  return {
    slug: `historia-${i + 1}`,
    title: storyTitles[i % storyTitles.length] + (i >= storyTitles.length ? ` (${i + 1})` : ""),
    category: storyCategories[i % storyCategories.length],
    date: d.toISOString().slice(0, 10),
    tone,
    excerpt: "Krótki opis historii – kim jest bohater, jaki miał problem i co udało się osiągnąć.",
    body: [
      { type: "p", text: "Wprowadzenie do historii klienta. Kim jest, czym się zajmuje i z jakim wyzwaniem się mierzył." },
      { type: "h2", text: "Wyzwanie" },
      { type: "p", text: "Opis sytuacji przed wdrożeniem – co nie działało, ile czasu zajmowały poszczególne zadania." },
      { type: "h2", text: "Rozwiązanie" },
      { type: "p", text: "Jak produkt został wykorzystany. Konkretne przykłady zastosowań." },
      { type: "list", items: ["Pierwszy efekt wdrożenia", "Drugi efekt wdrożenia", "Trzeci efekt wdrożenia"] },
      { type: "figure", tone: storyTones[(i + 2) % storyTones.length], caption: "Podpis zdjęcia z wdrożenia." },
      { type: "quote", text: "Miejsce na cytat bohatera historii – podmień na prawdziwy, za zgodą autora.", cite: "Imię Nazwisko, stanowisko" },
      { type: "h2", text: "Rezultaty" },
      { type: "p", text: "Podsumowanie efektów i plany na przyszłość." },
    ],
  };
});

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

/* ───────────────────────── Wytyczne marki ───────────────────────── */

export const brandGuide = {
  title: "Wytyczne dotyczące używania elementów identyfikacji marki",
  lead: "Zasady korzystania z nazwy, logo i innych elementów marki w materiałach partnerów, mediów i społeczności.",
  contact: { label: "Kontakt", href: "#kontakt" } as Link,
  intro:
    "Nazwa i logo marki są zastrzeżonymi znakami towarowymi. Poniższe wytyczne pomagają używać ich w spójny i poprawny sposób. W razie wątpliwości skontaktuj się z nami.",
  logotype:
    "Logotyp to najprostszy sposób przedstawienia marki. Używaj go w podstawowej wersji – jednokolorowej, na jednolitym tle, z zachowaniem pola ochronnego równego wysokości litery.",
  logoDonts: [
    "NIE należy rozciągać ani zniekształcać logotypu",
    "NIE należy zmieniać kolorów logotypu",
    "NIE należy przycinać logotypu",
    "NIE należy używać logotypu jako maski",
    "NIE należy dodawać efektów ani cieni",
    "NIE należy obracać logotypu",
  ],
  symbol: "Sygnet to skrócona forma znaku. Stosuj go tam, gdzie pełny logotyp byłby nieczytelny – na przykład w ikonach aplikacji i awatarach.",
  usage: {
    allowed: ["Używaj logo tylko w bezpośrednim związku z naszymi produktami.", "Postępuj zgodnie z instrukcjami w tych wytycznych.", "Używaj logo bez modyfikacji."],
    forbidden: [
      "Nie używaj logo bez zgody, jeśli sugeruje to partnerstwo.",
      "Nie wprowadzaj w błąd co do relacji z firmą.",
      "Nie umieszczaj logo w sposób bardziej widoczny niż własna marka.",
      "Nie umieszczaj logo na produktach na sprzedaż.",
    ],
  },
  gallery: ["blue", "purple", "orange", "teal", "pink", "green"] as Tone[],
  partnership:
    "Łącząc nasz logotyp z logo partnera, zachowaj równą wysokość obu znaków, oddziel je pionową linią lub znakiem „×” i zachowaj pole ochronne wokół całej kompozycji.",
  typography:
    "Krój pisma marki to bezszeryfowy font o geometrycznym charakterze. W tym szablonie używamy Geist (licencja OFL) – zamień go na własny w layout.tsx i w tokenie --font-sans.",
  language: [
    { title: "Nazwy produktów", text: "Zasady pisowni nazw produktów: zawsze z wielkiej litery, bez odmiany w tytułach, bez skrótów. Przykłady poprawnej i niepoprawnej formy." },
    { title: "Integracje", text: "Jak opisywać integrację z naszym produktem: „działa z…”, „zintegrowane z…”. Nie używaj nazwy produktu jako części własnej nazwy." },
    { title: "Modele i wersje", text: "Jak podawać numery wersji: pełna nazwa przy pierwszym wystąpieniu, potem forma skrócona." },
    { title: "Brak partnerstwa", text: "Nie używaj sformułowań sugerujących partnerstwo („we współpracy z…”, „oficjalny partner”), jeśli nie ma zawartej umowy." },
    { title: "Atrybucja treści", text: "Jak oznaczać treści wygenerowane z użyciem naszych produktów, np. „Utworzono z pomocą…”." },
  ],
  press: { title: "Komunikaty prasowe", text: "Dziennikarzy prosimy o kontakt z zespołem prasowym. Materiały prasowe i aktualności znajdziesz na blogu.", cta: { label: "Wiadomości firmy", href: "/blog?kategoria=Firma" } as Link },
  contactSection: { title: "Kontakt", text: "Pytania dotyczące używania marki prześlij na adres:", email: "marka@example.com" },
  terms: { title: "Warunki wykorzystania", text: "Korzystając z elementów marki, akceptujesz te wytyczne. Możemy je zmieniać w dowolnym momencie; aktualna wersja jest zawsze dostępna na tej stronie." },
};

/* ───────────────────────── Polityka publiczna ───────────────────────── */

export const policy = {
  title: "Nasze podejście do polityki publicznej",
  lead: "Jak współpracujemy z instytucjami publicznymi, jakie zasady nami kierują i które obszary uważamy za priorytetowe.",
  cta: { label: "Subskrybuj newsletter", href: "#" } as Link,
  tone: "red" as Tone,
  nav: [
    { id: "zasady", label: "Zasady" },
    { id: "priorytety", label: "Priorytety" },
    { id: "podejscie", label: "Podejście" },
    { id: "zasoby", label: "Zasoby i aktualności" },
  ],
  principles: {
    title: "Nasze zasady",
    lead: "Technologia może zmienić sposób, w jaki ludzie pracują i żyją. Te zasady pomagają nam podejmować decyzje.",
    items: [
      { title: "Dostępność", text: "Krótki opis zasady w jednym, dwóch zdaniach." },
      { title: "Sprawczość", text: "Krótki opis zasady w jednym, dwóch zdaniach." },
      { title: "Dobrobyt", text: "Krótki opis zasady w jednym, dwóch zdaniach." },
      { title: "Odporność", text: "Krótki opis zasady w jednym, dwóch zdaniach." },
      { title: "Elastyczność", text: "Krótki opis zasady w jednym, dwóch zdaniach." },
    ],
  },
  priorities: {
    title: "Nasze priorytety",
    lead: "Wspieramy rozwiązania, które poszerzają możliwości i ograniczają ryzyka.",
    items: [
      { title: "Bezpieczeństwo produktów", text: "Krótki opis priorytetu w jednym zdaniu.", supports: "odporność, elastyczność", tone: "blue" as Tone },
      { title: "Ochrona młodzieży", text: "Krótki opis priorytetu w jednym zdaniu.", supports: "dobrobyt, sprawczość", tone: "pink" as Tone },
      { title: "Edukacja i kompetencje", text: "Krótki opis priorytetu w jednym zdaniu.", supports: "dostępność, sprawczość", tone: "yellow" as Tone },
      { title: "Rynek pracy", text: "Krótki opis priorytetu w jednym zdaniu.", supports: "dobrobyt, dostępność", tone: "green" as Tone },
      { title: "Pochodzenie treści", text: "Krótki opis priorytetu w jednym zdaniu.", supports: "odporność", tone: "purple" as Tone },
      { title: "Infrastruktura i energia", text: "Krótki opis priorytetu w jednym zdaniu.", supports: "dobrobyt, odporność", tone: "orange" as Tone },
    ],
  },
  approach: {
    title: "Nasze podejście",
    lead: "Jak realizujemy priorytety w praktyce.",
    items: [
      { title: "Współpraca z instytucjami", text: "Krótki opis w jednym zdaniu.", supports: "dostępność", tone: "teal" as Tone },
      { title: "Dialog z pracownikami", text: "Krótki opis w jednym zdaniu.", supports: "dobrobyt", tone: "red" as Tone },
      { title: "Przejrzystość działań", text: "Krótki opis w jednym zdaniu.", supports: "odporność", tone: "blue" as Tone },
    ],
  },
  /** Treść okna szczegółów (wspólny szablon – podmień per pozycja). */
  detail: [
    "Pierwszy akapit szczegółowego opisu: jaki problem dostrzegamy i dlaczego uważamy go za ważny.",
    "Drugi akapit: jakie rozwiązania wspieramy, z kim współpracujemy i jakie działania już podjęliśmy.",
    "Trzeci akapit: jak mierzymy postępy i gdzie można znaleźć więcej informacji.",
  ],
  resources: { title: "Zasoby i aktualności", category: "Firma" },
};
