"use client";

import { useState } from "react";

/** „Czy ten artykuł był pomocny?” – stan lokalny; podepnij własną analitykę w onVote. */
export function Feedback({ onVote }: { onVote?: (helpful: boolean) => void }) {
  const [vote, setVote] = useState<boolean | null>(null);

  if (vote !== null) {
    return (
      <p role="status" className="text-p2 text-primary-80">
        {vote ? "Dziękujemy za opinię!" : "Dziękujemy. Postaramy się ulepszyć ten artykuł."}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="text-p2 font-medium">Czy ten artykuł był pomocny?</p>
      <div className="flex gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => {
              setVote(v);
              onVote?.(v);
            }}
            className="min-h-9 rounded-full border border-primary-12 px-4 text-cta transition-colors hover:bg-primary-4"
          >
            {v ? "Tak" : "Nie"}
          </button>
        ))}
      </div>
    </div>
  );
}
