"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Gradient } from "@/components/ui/Gradient";
import type { Tone } from "@/content/site";

type Item = { title: string; text: string; supports?: string; tone?: Tone };

/**
 * Siatka kart 1/2/3 kolumny. Cała karta jest przyciskiem otwierającym pełnoekranowe okno
 * ze szczegółami (wzór: karty „Nasze priorytety” na stronie polityki publicznej).
 */
export function DetailCards({ items, detail, supportsLabel = "Wspierane zasady" }: { items: Item[]; detail: string[]; supportsLabel?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const current = open !== null ? items[open] : null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {items.map((it, i) => (
          <li key={it.title}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open === i}
              onClick={() => setOpen(i)}
              className="group flex h-full w-full flex-col items-start gap-3 rounded-md bg-primary-4 p-6 text-left transition-colors hover:bg-primary-12"
            >
              {it.tone && (
                <span aria-hidden className="relative mb-3 block size-10 overflow-hidden rounded-full">
                  <Gradient tone={it.tone} />
                </span>
              )}
              <span className="text-h5">{it.title}</span>
              <span className="flex-1 text-meta font-normal text-primary-60">{it.text}</span>
              <span className="mt-4 inline-flex min-h-10 items-center gap-1 rounded-[2.5rem] text-cta transition-colors group-hover:text-primary-60">
                Czytaj więcej
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M4.5 2.5L8 6l-3.5 3.5" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={open !== null} onClose={() => setOpen(null)} title={current?.title ?? ""}>
        {current && (
          <article>
            {current.tone && (
              <span aria-hidden className="relative mb-8 block size-12 overflow-hidden rounded-full">
                <Gradient tone={current.tone} />
              </span>
            )}
            <h2 className="text-h4 md:text-h3">{current.title}</h2>
            {current.supports && (
              <p className="mt-6 text-p2">
                <span className="font-medium">{supportsLabel}:</span> <span className="text-primary-80">{current.supports}</span>
              </p>
            )}
            <div className="mt-8 flex flex-col gap-6 text-primary-80">
              <p>{current.text}</p>
              {detail.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          </article>
        )}
      </Modal>
    </>
  );
}
