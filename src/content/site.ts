/**
 * Cała treść strony w jednym miejscu – podmień na własną.
 * Komponenty nie zawierają tekstów na sztywno.
 */

export type Tone = "blue" | "purple" | "pink" | "orange" | "yellow" | "green" | "teal" | "red";

export type CardItem = {
  title: string;
  href: string;
  category?: string;
  date?: string;
  description?: string;
  tone: Tone; // kolor placeholdera zamiast obrazka
  image?: string; // opcjonalnie ścieżka do obrazu w /public
};

export const brand = { name: "Marka" };

export type NavLink = { label: string; href: string };
/** Kolumna w rozwijanym menu: "lg" – duże linki 30px, "sm" – małe linki 13px. */
export type NavSection = { title: string; size: "lg" | "sm"; links: NavLink[] };
export type NavItem = NavLink & { sections?: NavSection[] };

/** Kolejność w headerze: (logo → strona główna) · Produkty · Blog · Firma · Pomoc */
export const nav: NavItem[] = [
  {
    label: "Produkty",
    href: "/produkt",
    sections: [
      { title: "Poznaj produkty", size: "lg", links: [{ label: "Produkt A", href: "/produkt" }, { label: "Cennik", href: "/produkt#plany" }] },
      { title: "Pomoc", size: "sm", links: [{ label: "Centrum pomocy", href: "/pomoc" }, { label: "Pierwsze kroki", href: "/pomoc/kategoria/pierwsze-kroki" }] },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "Firma",
    href: "/firma",
    sections: [
      {
        title: "Poznaj firmę",
        size: "lg",
        links: [
          { label: "O nas", href: "/firma" },
          { label: "Kariera", href: "/firma/kariera" },
          { label: "Wiadomości", href: "/blog?kategoria=Firma" },
          { label: "Historie", href: "/firma/historie" },
        ],
      },
      {
        title: "Zasoby",
        size: "sm",
        links: [
          { label: "Wytyczne marki", href: "/firma/marka" },
          { label: "Polityka publiczna", href: "/firma/polityka-publiczna" },
        ],
      },
    ],
  },
  { label: "Pomoc", href: "/pomoc" },
];

export const headerCtas = {
  secondary: { label: "Zaloguj się", href: "#" },
  primary: { label: "Wypróbuj", href: "#" },
};

export const hero = {
  title: "Nagłówek strony głównej w jednym, krótkim zdaniu",
  lead: "Krótki opis wprowadzający – jedno lub dwa zdania wyjaśniające, czym zajmuje się marka.",
  primary: { label: "Zacznij teraz", href: "/produkt" },
  secondary: { label: "Dowiedz się więcej", href: "#" },
};

export const featured: CardItem[] = [
  { title: "Wyróżniony materiał numer jeden", href: "/blog/przykladowy-wpis-7", category: "Produkt", date: "15 paź 2026", tone: "blue" },
  { title: "Drugi wyróżniony materiał", href: "/blog/przykladowy-wpis-8", category: "Badania", date: "12 paź 2026", tone: "purple" },
  { title: "Trzeci wyróżniony materiał", href: "/blog/przykladowy-wpis-9", category: "Firma", date: "9 paź 2026", tone: "orange" },
  { title: "Czwarty wyróżniony materiał", href: "/blog/przykladowy-wpis-10", category: "Bezpieczeństwo", date: "5 paź 2026", tone: "teal" },
];

export const news: CardItem[] = [
  { title: "Najważniejsza wiadomość tygodnia", href: "/blog/przykladowy-wpis-1", category: "Ogłoszenie", date: "14 paź 2026", tone: "pink",
    description: "Dwa zdania zajawki do najważniejszej wiadomości, która wyświetla się w większej karcie." },
  { title: "Druga wiadomość", href: "/blog/przykladowy-wpis-2", category: "Produkt", date: "10 paź 2026", tone: "green",
    description: "Krótka zajawka drugiej wiadomości." },
];

export const newsList: CardItem[] = [
  { title: "Wpis na liście aktualności numer jeden", href: "/blog/przykladowy-wpis-3", category: "Firma", date: "8 paź 2026", tone: "blue" },
  { title: "Wpis na liście aktualności numer dwa", href: "/blog/przykladowy-wpis-4", category: "Badania", date: "6 paź 2026", tone: "yellow" },
  { title: "Wpis na liście aktualności numer trzy", href: "/blog/przykladowy-wpis-5", category: "Produkt", date: "2 paź 2026", tone: "red" },
  { title: "Wpis na liście aktualności numer cztery", href: "/blog/przykladowy-wpis-6", category: "Globalnie", date: "29 wrz 2026", tone: "purple" },
];

export const rows: { title: string; href: string; items: CardItem[] }[] = [
  {
    title: "Historie",
    href: "/firma/historie",
    items: [
      { title: "Historia klienta numer jeden", href: "/firma/historie/historia-1", category: "Edukacja", tone: "orange" },
      { title: "Historia klienta numer dwa", href: "/firma/historie/historia-2", category: "Zdrowie", tone: "green" },
      { title: "Historia klienta numer trzy", href: "/firma/historie/historia-3", category: "Finanse", tone: "blue" },
    ],
  },
  {
    title: "Najnowsze badania",
    href: "#",
    items: [
      { title: "Publikacja badawcza numer jeden", href: "#", category: "Publikacja", date: "1 paź 2026", tone: "purple" },
      { title: "Publikacja badawcza numer dwa", href: "#", category: "Publikacja", date: "24 wrz 2026", tone: "teal" },
      { title: "Publikacja badawcza numer trzy", href: "#", category: "Kamień milowy", date: "18 wrz 2026", tone: "pink" },
    ],
  },
  {
    title: "Dla biznesu",
    href: "#",
    items: [
      { title: "Rozwiązanie dla zespołów", href: "#", category: "Biznes", tone: "yellow" },
      { title: "Wdrożenia w przedsiębiorstwie", href: "#", category: "Biznes", tone: "red" },
      { title: "Platforma dla deweloperów", href: "#", category: "API", tone: "blue" },
    ],
  },
];

export const cta = {
  title: "Zacznij korzystać już dziś",
  primary: { label: "Wypróbuj", href: "#" },
  secondary: { label: "Kontakt", href: "#" },
};

export const footer: { title: string; links: { label: string; href: string }[] }[] = [
  { title: "Produkty", links: [{ label: "Produkt A", href: "/produkt" }, { label: "Cennik", href: "/produkt#plany" }] },
  {
    title: "Firma",
    links: [
      { label: "O nas", href: "/firma" },
      { label: "Kariera", href: "/firma/kariera" },
      { label: "Wiadomości", href: "/blog?kategoria=Firma" },
      { label: "Historie", href: "/firma/historie" },
    ],
  },
  { title: "Zasoby", links: [{ label: "Blog", href: "/blog" }, { label: "Wytyczne marki", href: "/firma/marka" }, { label: "Polityka publiczna", href: "/firma/polityka-publiczna" }] },
  { title: "Pomoc", links: [{ label: "Centrum pomocy", href: "/pomoc" }, { label: "Kontakt z pomocą", href: "/pomoc/artykul/kontakt-z-pomoca" }] },
  { title: "Zasady", links: [{ label: "Regulamin", href: "#" }, { label: "Prywatność", href: "#" }, { label: "Cookies", href: "#" }] },
];
