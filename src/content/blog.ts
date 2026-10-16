import type { Tone } from "./site";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; tone: Tone; caption?: string; image?: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO – sortowanie
  tone: Tone;
  excerpt: string;
  author?: string;
  readingTime?: string;
  tags?: string[];
  body: Block[];
};

export const blogCategories = ["Firma", "Badania", "Produkt", "Bezpieczeństwo", "Inżynieria", "Biznes", "Globalnie"];

const tones: Tone[] = ["blue", "purple", "orange", "teal", "pink", "green", "yellow", "red"];

/** Przykładowa treść – pokazuje wszystkie typy bloków (akapit, śródtytuł, lista, grafika, cytat). */
const sampleBody = (tone: Tone): Block[] => [
  { type: "p", text: "Akapit wprowadzający. Tu znajdzie się pierwsze, najważniejsze zdanie artykułu, które streszcza całą treść w kilku słowach i zachęca do dalszej lektury." },
  { type: "p", text: "Drugi akapit rozwija temat. Kolumna tekstu ma około 42rem szerokości, co daje wygodną długość wiersza – zwykle 60–75 znaków." },
  { type: "h2", text: "Pierwsze obserwacje" },
  { type: "p", text: "Treść sekcji. Artykuły dzielą się na krótkie fragmenty ze śródtytułami, listami i cytatami. Odstęp między akapitami wynosi 24px, a przed śródtytułem 64px." },
  { type: "list", items: ["Pierwszy punkt listy z krótkim wyjaśnieniem", "Drugi punkt listy", "Trzeci punkt listy, nieco dłuższy, aby pokazać zawijanie tekstu w kolejnym wierszu"] },
  { type: "p", text: "Akapit zamykający sekcję, po którym pojawia się szeroka grafika – szersza niż kolumna tekstu." },
  { type: "figure", tone, caption: "Podpis pod grafiką – opcjonalny, w kolorze drugorzędnym." },
  { type: "h2", text: "Co dalej" },
  { type: "p", text: "Kolejna sekcja artykułu. Wyróżniony cytat poniżej przerywa rytm tekstu i podkreśla kluczową myśl." },
  { type: "quote", text: "Wyróżniony cytat, który przerywa rytm tekstu i podkreśla kluczową myśl całego artykułu.", cite: "Imię Nazwisko, stanowisko" },
  { type: "p", text: "Akapit po cytacie wraca do zwykłego rytmu tekstu." },
  { type: "h2", text: "Podsumowanie" },
  { type: "p", text: "Ostatni akapit z podsumowaniem i ewentualnym wezwaniem do działania." },
];

const titles = [
  "Przykładowy wpis o nowym produkcie",
  "Jak zespół podchodzi do bezpieczeństwa",
  "Wyniki najnowszych badań w skrócie",
  "Historia klienta: wdrożenie w firmie",
  "Notatki inżynierskie z ostatniego kwartału",
  "Ogłoszenie dotyczące rozwoju firmy",
];

export const posts: Post[] = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 9, 15 - i * 4));
  const tone = tones[i % tones.length];
  const category = blogCategories[i % blogCategories.length];
  return {
    slug: `przykladowy-wpis-${i + 1}`,
    title: titles[i % titles.length] + ` (${i + 1})`,
    category,
    date: d.toISOString().slice(0, 10),
    tone,
    excerpt: "Krótka zajawka wpisu – jedno lub dwa zdania, które zachęcają do przeczytania całości.",
    author: "Zespół redakcyjny",
    readingTime: `${4 + (i % 5)} min czytania`,
    tags: [String(d.getUTCFullYear()), category],
    body: sampleBody(tones[(i + 3) % tones.length]),
  };
});

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Powiązane wpisy: najpierw ta sama kategoria, potem najnowsze. */
export const getRelated = (slug: string, n = 3) => {
  const post = getPost(slug);
  const others = posts.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === post?.category);
  return [...same, ...others.filter((p) => !same.includes(p))].slice(0, n);
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const formatDateLong = (iso: string) =>
  new Date(iso).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Kotwica dla śródtytułu (spis treści). */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
