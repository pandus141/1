/**
 * Treść Centrum pomocy (/pomoc) – kategorie i artykuły. Podmień na własną.
 */

export type HelpIcon = "start" | "account" | "billing" | "shield" | "code" | "wrench";

export type HelpCategory = {
  slug: string;
  title: string;
  description: string;
  icon: HelpIcon;
};

export type HelpBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "note"; text: string };

export type HelpArticle = {
  slug: string;
  category: string; // slug kategorii
  title: string;
  description: string;
  updated: string; // ISO
  body: HelpBlock[];
};

export const helpCategories: HelpCategory[] = [
  { slug: "pierwsze-kroki", title: "Pierwsze kroki", description: "Wszystko, czego potrzebujesz, aby zacząć korzystać z usługi.", icon: "start" },
  { slug: "konto-i-logowanie", title: "Konto i logowanie", description: "Zakładanie konta, logowanie, zmiana danych i usuwanie konta.", icon: "account" },
  { slug: "platnosci", title: "Płatności i faktury", description: "Plany, metody płatności, faktury i zwroty.", icon: "billing" },
  { slug: "prywatnosc-i-bezpieczenstwo", title: "Prywatność i bezpieczeństwo", description: "Jak chronimy Twoje dane i jak możesz nimi zarządzać.", icon: "shield" },
  { slug: "api-i-integracje", title: "API i integracje", description: "Najczęstsze pytania dotyczące interfejsu API, kluczy i limitów.", icon: "code" },
  { slug: "rozwiazywanie-problemow", title: "Rozwiązywanie problemów", description: "Komunikaty o błędach, problemy z działaniem i kontakt z pomocą.", icon: "wrench" },
];

const steps = (topic: string): HelpBlock[] => [
  { type: "p", text: `Ten artykuł wyjaśnia krok po kroku, jak ${topic}. Instrukcja dotyczy wersji przeglądarkowej oraz aplikacji mobilnej.` },
  { type: "h2", text: "Zanim zaczniesz" },
  { type: "p", text: "Upewnij się, że jesteś zalogowany na właściwe konto i masz uprawnienia administratora, jeśli zarządzasz kontem zespołu." },
  { type: "note", text: "Wskazówka: zmiany wprowadzone w ustawieniach konta mogą być widoczne na innych urządzeniach dopiero po kilku minutach." },
  { type: "h2", text: "Instrukcja" },
  { type: "list", ordered: true, items: ["Otwórz menu konta w prawym górnym rogu.", "Wybierz Ustawienia.", "Przejdź do odpowiedniej sekcji i wprowadź zmiany.", "Zapisz zmiany przyciskiem Zapisz."] },
  { type: "h3", text: "W aplikacji mobilnej" },
  { type: "p", text: "W aplikacji mobilnej menu konta znajdziesz po dotknięciu ikony profilu. Pozostałe kroki są takie same." },
  { type: "h2", text: "Najczęstsze pytania" },
  { type: "h3", text: "Co zrobić, jeśli nie widzę tej opcji?" },
  { type: "p", text: "Niektóre opcje są dostępne tylko w wybranych planach lub dla administratorów. Skontaktuj się z administratorem konta albo z naszym zespołem pomocy." },
  { type: "h3", text: "Czy mogę cofnąć zmianę?" },
  { type: "p", text: "Większość zmian możesz cofnąć w ten sam sposób, w jaki je wprowadziłeś. Wyjątki opisujemy w osobnych artykułach." },
];

const a = (category: string, slug: string, title: string, description: string, topic: string, updated: string): HelpArticle => ({
  slug,
  category,
  title,
  description,
  updated,
  body: steps(topic),
});

export const helpArticles: HelpArticle[] = [
  a("pierwsze-kroki", "czym-jest-usluga", "Czym jest usługa i jak działa", "Krótkie wprowadzenie do najważniejszych funkcji.", "poznać najważniejsze funkcje usługi", "2026-10-10"),
  a("pierwsze-kroki", "pierwsza-konfiguracja", "Pierwsza konfiguracja konta", "Ustawienia, które warto sprawdzić na początku.", "skonfigurować konto po rejestracji", "2026-10-02"),
  a("pierwsze-kroki", "dostepne-platformy", "Na jakich urządzeniach działa usługa?", "Przeglądarka, aplikacje mobilne i komputerowe.", "zainstalować aplikację na swoim urządzeniu", "2026-09-21"),
  a("konto-i-logowanie", "resetowanie-hasla", "Jak zresetować hasło", "Odzyskaj dostęp do konta, jeśli nie pamiętasz hasła.", "zresetować hasło do konta", "2026-10-12"),
  a("konto-i-logowanie", "zmiana-adresu-email", "Jak zmienić adres e-mail", "Zmiana adresu przypisanego do konta.", "zmienić adres e-mail przypisany do konta", "2026-09-30"),
  a("konto-i-logowanie", "usuwanie-konta", "Jak usunąć konto", "Co się dzieje z danymi po usunięciu konta.", "trwale usunąć konto", "2026-09-14"),
  a("platnosci", "zmiana-planu", "Jak zmienić plan subskrypcji", "Przejście na wyższy lub niższy plan.", "zmienić plan subskrypcji", "2026-10-08"),
  a("platnosci", "pobieranie-faktur", "Gdzie znajdę faktury?", "Pobieranie faktur i zmiana danych do faktury.", "pobrać fakturę i zmienić dane rozliczeniowe", "2026-09-28"),
  a("platnosci", "zwroty", "Zasady zwrotów", "Kiedy i jak możesz poprosić o zwrot płatności.", "poprosić o zwrot płatności", "2026-08-30"),
  a("prywatnosc-i-bezpieczenstwo", "eksport-danych", "Jak wyeksportować swoje dane", "Pobierz kopię danych zapisanych na koncie.", "wyeksportować dane z konta", "2026-10-05"),
  a("prywatnosc-i-bezpieczenstwo", "weryfikacja-dwuetapowa", "Włączanie weryfikacji dwuetapowej", "Dodatkowa warstwa ochrony konta.", "włączyć weryfikację dwuetapową", "2026-09-19"),
  a("api-i-integracje", "klucze-api", "Jak utworzyć i chronić klucz API", "Tworzenie, rotacja i usuwanie kluczy.", "utworzyć nowy klucz API i bezpiecznie go przechowywać", "2026-10-11"),
  a("api-i-integracje", "limity-zapytan", "Limity zapytań do API", "Czym są limity i jak sprawdzić swoje.", "sprawdzić limity zapytań i poprosić o ich zwiększenie", "2026-09-25"),
  a("rozwiazywanie-problemow", "strona-nie-laduje-sie", "Strona nie ładuje się poprawnie", "Pamięć podręczna, rozszerzenia i połączenie sieciowe.", "rozwiązać problemy z ładowaniem strony", "2026-10-13"),
  a("rozwiazywanie-problemow", "kontakt-z-pomoca", "Jak skontaktować się z pomocą", "Kiedy i jak napisać do zespołu pomocy.", "skontaktować się z zespołem pomocy", "2026-10-01"),
];

export const getHelpCategory = (slug: string) => helpCategories.find((c) => c.slug === slug);
export const getHelpArticle = (slug: string) => helpArticles.find((x) => x.slug === slug);
export const getCategoryArticles = (slug: string) => helpArticles.filter((x) => x.category === slug);

/** Proste wyszukiwanie pełnotekstowe (bez polskich znaków diakrytycznych, wszystkie słowa muszą wystąpić). */
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");
export function searchHelp(query: string) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return helpArticles
    .map((art) => {
      const title = norm(art.title);
      const rest = norm([art.description, ...art.body.map((b) => ("text" in b ? b.text : b.items.join(" ")))].join(" "));
      if (!words.every((w) => title.includes(w) || rest.includes(w))) return null;
      const score = words.reduce((s, w) => s + (title.includes(w) ? 3 : 0) + (rest.includes(w) ? 1 : 0), 0);
      return { art, score };
    })
    .filter((x): x is { art: HelpArticle; score: number } => !!x)
    .sort((x, y) => y.score - x.score)
    .map((x) => x.art);
}
