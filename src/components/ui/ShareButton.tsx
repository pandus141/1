"use client";

import { useState } from "react";

/** „Udostępnij” – systemowe udostępnianie, a gdy niedostępne: kopiowanie linku. */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* anulowane przez użytkownika */
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="flex h-10 items-center gap-2 rounded px-2 text-cta text-primary-100 transition-colors hover:bg-primary-4"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M6.5 9.5l3-3M7 4.5l1-1a2.8 2.8 0 014 4l-1 1M9 11.5l-1 1a2.8 2.8 0 01-4-4l1-1" strokeLinecap="round" />
      </svg>
      <span aria-live="polite">{copied ? "Skopiowano link" : "Udostępnij"}</span>
    </button>
  );
}
