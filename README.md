# Wzór strony – Next.js 15 + Tailwind CSS v4

Szablon odtwarzający **styl i układ** openai.com (na podstawie analizy z 15.10.2026), z neutralną treścią i bez materiałów marki.

## Start
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produkcyjny
```

## Struktura
```
src/
  app/
    globals.css        ← design tokens (kolory, typografia, spacing, motyw jasny/ciemny)
    layout.tsx         ← font Geist, header, footer, skrypt motywu
    page.tsx           ← strona główna złożona z sekcji
    blog/              ← /blog (lista) i /blog/[slug] (artykuł)
    pomoc/             ← Centrum pomocy: /pomoc, /pomoc/kategoria/[slug], /pomoc/artykul/[slug], /pomoc/szukaj
    produkt/           ← strona produktowa
    firma/             ← O nas, kariera (+ oferty), historie, wytyczne marki, polityka publiczna
  content/             ← CAŁA treść – edytuj tutaj
    site.ts            nawigacja, karty, stopka
    blog.ts            wpisy bloga (bloki: p, h2, list, figure, quote)
    help.ts            kategorie i artykuły pomocy + wyszukiwarka
    product.ts         strona produktowa
    company.ts         sekcja Firma (oferty pracy, historie, wytyczne marki, polityka)
  components/
    layout/            Header (sticky + menu mobilne), Footer, ThemeToggle
    sections/          Hero, CardRow (przewijany rząd 3 kart), CtaBlock
    ui/                Button (pill), Card, ListRow, Section, Container, TableOfContents, ShareButton
    blog/              BlogIndex, ArticleBody
    help/              HelpSearch, HelpIcon, Breadcrumbs/ArticleList, Feedback
    product/           AppWindow (makieta), CopyCommand
    company/           PageIntro/Split/WideImage, DetailCards (+ Modal), PillNav, JobsBrowser, StoriesIndex, Gallery, TabbedPosts
```

## Najważniejsze tokeny (globals.css)
| Token | Wartość |
|---|---|
| Tło / tekst | `#000` / `#fff` (tryb jasny: odwrotnie, klasa `.light` na `<html>`) |
| Hierarchia tekstu | `text-primary-100/80/60/44`, tła `bg-primary-12/4` |
| Typografia | `text-hero` 64 · `text-display` 48 · `text-h2` 32 · `text-h3` 30 · `text-h5` 22 · `text-h4` 20 · `text-quote` 18 · `text-toc` 12 · `text-card` 16 · `text-p1` 17 · `text-meta` 14 · `text-footer` 13 |
| Header | `h-header-h` = 64px |
| Kontener | `max-w-content` = 1216px, padding 24 → 32px |
| Kolumny | `max-w-article` 672 (tekst) · `max-w-wide` 896 (grafiki, H1) · `max-w-help` 1024 (pomoc) |
| Odstęp sekcji | 80px mobile / 120px desktop |
| Nawigacja desktop | wariant `nav:` od 1020px |

## Obrazy
Karty pokazują gradienty-placeholdery. Żeby dodać zdjęcie: wrzuć plik do `public/` i ustaw `image: "/plik.jpg"` w `content/site.ts`.

## Font
Oryginał używa zastrzeżonego „OpenAI Sans”. Tu jest **Geist** (pakiet `geist`, licencja OFL). Zmienisz go w `layout.tsx` i w `--font-sans`.
