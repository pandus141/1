# Stan prac

Gotowe:
- Strona główna (Hero, karty, aktualności, rzędy kart, CTA, stopka), motyw ciemny/jasny
- /blog – lista wpisów wg openai.com/news: kategorie (?kategoria=), sortowanie, widok siatka/lista
- /blog/[slug] – artykuł wg openai.com/index/…: wyśrodkowany nagłówek (data · kategoria, H1 64px, lead),
  pasek autor/„Udostępnij”, spis treści przyklejony w lewym marginesie (od 1280px), kolumna 672px,
  śródtytuły 30px, szeroka grafika 896px, cytat 18px, tagi-pigułki, „Autorzy”, „Przeczytaj więcej” (3 karty)
- /pomoc – Centrum pomocy wg help.openai.com: wyszukiwarka (GET /pomoc/szukaj?q=), siatka kategorii z kaflem-ikoną
  - /pomoc/kategoria/[slug] – okruszki, kafel 96px, lista artykułów w ramce (radius 16px)
  - /pomoc/artykul/[slug] – H1 36px/600, treść 16/24, notka, spis treści po prawej, „Czy był pomocny?”, powiązane
  - /pomoc/szukaj – wyszukiwanie pełnotekstowe bez diakrytyków (content/help.ts → searchHelp)
- /produkt – strona produktowa wg układu openai.com/codex: hero z gradientem, logotypy-placeholdery, makieta okna
  aplikacji (CSS), plany (subgrid – przyciski w jednej linii), 4 naprzemienne wiersze funkcji, 4 karty
  „gdzie pracować” (z przyciskiem kopiowania polecenia), opinie 3×2 (placeholdery!), CTA
- Linki: menu (Produkty → /produkt, Firma → Centrum pomocy, Pomoc), stopka, karty strony głównej → wpisy blogu
- Strona 404
- Header: zawartość w kontenerze treści (max-w-content, padding 24/32px) – logo i przyciski równo z krawędziami treści.
  Mega menu na desktopie (od 1020px), wg openai.com: najechanie → panel rozwija wysokość 0→treść (200ms),
  strona pod spodem rozmywa się (overlay blur), aktywna pozycja 100%, pozostałe 60%; przejście między
  pozycjami = zmiana wysokości + przenikanie treści; zamknięcie po zjechaniu kursorem (opóźnienie 120ms).
  Klawiatura: strzałka obok pozycji (widoczna po fokusie), Esc zamyka. Dane menu: `nav[].sections` w content/site.ts

- Nawigacja (od lewej): logo → strona główna · Produkty · Blog · Firma · Pomoc (usunięte: Badania, Biznes, Deweloperzy).
  Stopka: Produkty · Firma · Zasoby · Pomoc · Zasady.
- Sekcja Firma (wg menu „Firma” na openai.com), menu: O nas, Kariera, Wiadomości, Historie | Zasoby: Wytyczne marki, Polityka publiczna
  - /firma – O nas: misja, zdanie + grafika, kariera, zakładki z wpisami bloga (działające), struktura, CTA
  - /firma/kariera – wartości i zasady, benefity, wyróżnione oferty, programy, cytat, zasoby, CTA
  - /firma/kariera/oferty – wyszukiwarka ofert: szukaj + zespół + lokalizacja, stan w URL (?q=&zespol=&lokalizacja=)
  - /firma/kariera/oferty/[slug] – oferta + „Aplikuj” (mailto z tematem; adres w company.ts → applyEmail)
  - Wiadomości → /blog?kategoria=Firma
  - /firma/historie – zakładki kategorii, sortowanie, układ wyróżniony, „Załaduj więcej”; /firma/historie/[slug]
  - /firma/marka – wytyczne marki: logo do pobrania (public/marka/*.svg), „czego nie robić”, sygnet, galeria (karuzela),
    współpraca marek, typografia, zasady języka (karty → okno szczegółów), kontakt
  - /firma/polityka-publiczna – przyklejony pasek kotwic z podświetleniem, zasady, priorytety i podejście (karty → okno)
  - Pominięte: „Supply Co.” (sklep z gadżetami – poza zakresem szablonu)

Treść: src/content/{site,blog,help,product,company}.ts

Pomysły na dalej:
- Prawdziwe obrazy (pole image w kartach / blokach figure)
- Podświetlenie aktywnej pozycji menu
- Podpowiedzi w wyszukiwarce pomocy w trakcie pisania
