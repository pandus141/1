"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

/**
 * Pełnoekranowe okno szczegółów (wg kart na openai.com/…/public-policy):
 * tło strony, kolumna 672px, płynne wejście (opacity + przesunięcie 8px, 200ms).
 * Esc / przycisk zamyka, fokus wraca na element, który otworzył okno.
 */
export function Modal({ open, onClose, title, children }: Props) {
  const [mounted, setMounted] = useState(false); // w DOM
  const [visible, setVisible] = useState(false); // klasa „wejścia”
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement;
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(r);
    }
    setVisible(false);
    const t = setTimeout(() => {
      setMounted(false);
      returnFocus.current?.focus();
    }, 200);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={`fixed inset-0 z-[70] overflow-y-auto bg-background transition-opacity duration-200 ease-curve-a ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Zamknij"
        className="fixed top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-primary-12 transition-colors hover:bg-primary-44/40 md:top-6 md:right-8"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
        </svg>
      </button>
      <div
        className={`mx-auto max-w-article px-6 py-20 transition-transform duration-200 ease-curve-a md:py-24 ${visible ? "translate-y-0" : "translate-y-2"}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
