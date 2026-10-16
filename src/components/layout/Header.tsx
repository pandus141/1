"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { brand, headerCtas, nav } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const OPEN_DELAY = 60; // ms – „intencja” najechania, żeby menu nie migało przy przejeżdżaniu kursorem
const CLOSE_DELAY = 120; // ms – czas na przejechanie kursorem z paska do panelu

/**
 * Header wg openai.com:
 * - zawartość w tym samym kontenerze co treść strony (max-w-content + padding 24/32px),
 * - na desktopie (od 1020px) najechanie na pozycję z podmenu rozwija panel pod paskiem:
 *   wysokość panelu animuje się 0 → wysokość treści (200ms), strona pod spodem rozmywa się
 *   i przyciemnia (overlay z blur), aktywna pozycja ma pełny kolor, pozostałe 60%,
 *   a przy przejściu między pozycjami treść płynnie się przenika, a panel zmienia wysokość.
 * - klawiatura: przycisk ze strzałką obok pozycji (widoczny po fokusie), Esc zamyka.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // mega menu
  const [active, setActive] = useState<number | null>(null); // otwarta pozycja
  const [shown, setShown] = useState<number | null>(null); // treść w panelu (zostaje na czas zamykania)
  const [height, setHeight] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const open = active !== null;

  const clear = () => clearTimeout(timer.current);
  const openMenu = useCallback((i: number) => {
    clearTimeout(timer.current);
    setActive(i);
    setShown(i);
  }, []);
  const close = useCallback(() => {
    clearTimeout(timer.current);
    setActive(null);
  }, []);
  const scheduleOpen = (i: number) => {
    clear();
    // przełączanie między pozycjami przy otwartym menu – natychmiast
    if (open) openMenu(i);
    else timer.current = setTimeout(() => openMenu(i), OPEN_DELAY);
  };
  const scheduleClose = () => {
    clear();
    timer.current = setTimeout(close, CLOSE_DELAY);
  };

  // wysokość panelu = wysokość aktywnej treści (także przy zmianie rozmiaru okna)
  useLayoutEffect(() => {
    if (active === null) {
      setHeight(0);
      return;
    }
    const el = panelRefs.current[active];
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // zmiana strony zamyka wszystko
  useEffect(() => {
    close();
    setMobileOpen(false);
  }, [pathname, close]);

  // blokada scrolla przy otwartym menu mobilnym
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && active !== null) {
      triggerRefs.current[active]?.focus();
      close();
    }
  };
  const onBlur = (e: React.FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) close();
  };

  const barBg = open
    ? "border-b border-transparent bg-background"
    : scrolled
      ? "border-b border-primary-12 bg-background/80 backdrop-blur-xl"
      : "border-b border-transparent bg-background";

  return (
    <header ref={rootRef} onKeyDown={onKeyDown} onBlur={onBlur}>
      {/* Pasek – tło na całą szerokość, zawartość w kontenerze treści */}
      <div
        onMouseLeave={scheduleClose}
        className={`fixed inset-x-0 top-0 z-50 h-header-h transition-[background-color,border-color] duration-200 ${barBg}`}
      >
        <div className="mx-auto flex h-full w-full max-w-content items-center gap-6 px-6 md:px-8">
          <Link
            href="/"
            onMouseEnter={scheduleClose}
            className="text-card font-semibold tracking-tight"
            aria-label={`${brand.name} – strona główna`}
          >
            {brand.name}
          </Link>

          {/* Nawigacja desktop (od 1020px) */}
          <nav aria-label="Główna" className="hidden h-full nav:block">
            <ul className="flex h-full items-center gap-6">
              {nav.map((item, i) => {
                const has = !!item.sections?.length;
                const color =
                  active === i ? "text-primary-100" : open ? "text-primary-60 hover:text-primary-100" : "text-primary-80 hover:text-primary-100";
                return (
                  <li
                    key={item.label}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => (has ? scheduleOpen(i) : scheduleClose())}
                  >
                    <Link href={item.href} className={`text-meta transition-colors duration-100 ${color}`}>
                      {item.label}
                    </Link>
                    {has && (
                      <button
                        ref={(el) => {
                          triggerRefs.current[i] = el;
                        }}
                        type="button"
                        aria-expanded={active === i}
                        aria-controls="header-mega-panel"
                        aria-label={`Menu ${item.label}`}
                        onClick={() => (active === i ? close() : openMenu(i))}
                        className="absolute top-1/2 -right-5 flex size-5 -translate-y-1/2 items-center justify-center rounded text-primary-60 opacity-0 focus-visible:opacity-100"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden className={`transition-transform duration-200 ${active === i ? "rotate-180" : ""}`}>
                          <path d="M2 3.5l3 3 3-3" />
                        </svg>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-2" onMouseEnter={scheduleClose}>
            <ThemeToggle />
            <div className="hidden items-center gap-2 sm:flex">
              <Button href={headerCtas.secondary.href} variant="secondary">
                {headerCtas.secondary.label}
              </Button>
              <Button href={headerCtas.primary.href}>{headerCtas.primary.label}</Button>
            </div>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full text-primary-60 hover:text-primary-100 nav:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                {mobileOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay: rozmycie + rozjaśnienie strony pod panelem */}
      <div
        aria-hidden
        // tylko realny ruch kursora – overlay pojawiający się pod nieruchomą myszą (np. menu otwarte klawiaturą) nie zamyka menu
        onPointerMove={(e) => (e.movementX || e.movementY) && scheduleClose()}
        className={`fixed inset-x-0 top-header-h bottom-0 z-40 hidden bg-primary-12 backdrop-blur-lg transition-opacity duration-200 ease-curve-a nav:block ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel mega menu – animowana wysokość, treści przenikają się */}
      <div
        id="header-mega-panel"
        onMouseEnter={clear}
        onMouseLeave={scheduleClose}
        style={{ height }}
        className="fixed inset-x-0 top-header-h z-50 hidden overflow-hidden bg-background transition-[height] duration-200 ease-curve-a nav:block"
      >
        <div className="relative">
          {nav.map((item, i) =>
            item.sections ? (
              <div
                key={item.label}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                inert={active !== i}
                className={`inset-x-0 top-0 transition-opacity duration-200 ease-curve-a ${
                  shown === i ? "relative" : "absolute"
                } ${shown === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <div className="mx-auto flex w-full max-w-content items-start gap-30 px-6 py-8 md:px-8">
                  {item.sections.map((s) => (
                    <section key={s.title} className="flex flex-col gap-3">
                      <h2 className="text-footer text-primary-60">{s.title}</h2>
                      <ul className={`flex flex-col ${s.size === "lg" ? "gap-3" : "gap-3 pt-1"}`}>
                        {s.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              href={l.href}
                              onClick={close}
                              className={`inline-block transition-colors duration-200 hover:text-primary-60 ${
                                s.size === "lg" ? "text-h3 leading-[1.2]" : "text-footer font-semibold"
                              }`}
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Menu mobilne – pełnoekranowe */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="fixed inset-0 top-header-h z-40 overflow-y-auto bg-background px-6 pb-10 nav:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((item) => (
            <li key={item.label} className="border-b border-primary-12">
              <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-4 text-h4">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-3">
          <Button href={headerCtas.secondary.href} variant="secondary" size="lg">{headerCtas.secondary.label}</Button>
          <Button href={headerCtas.primary.href} size="lg">{headerCtas.primary.label}</Button>
        </div>
      </div>
    </header>
  );
}
