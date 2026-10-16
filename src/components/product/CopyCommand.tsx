"use client";

import { useState } from "react";

/** Przycisk-pigułka z poleceniem do skopiowania (np. instalacja CLI). */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Skopiuj polecenie: ${command}`}
      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[2.5rem] bg-primary-12 px-4 font-mono text-xs transition-colors hover:bg-primary-44/40"
    >
      <span className="truncate">
        <span className="text-primary-60">$ </span>
        {command}
      </span>
      <span aria-live="polite" className="flex-none text-primary-60">
        {copied ? (
          "Skopiowano"
        ) : (
          <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" />
            <path d="M3 10.5V3.8C3 3.4 3.4 3 3.8 3h6.7" />
          </svg>
        )}
      </span>
    </button>
  );
}
