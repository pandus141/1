/**
 * Makieta okna aplikacji (czysty CSS, bez zrzutów ekranu) – placeholder dla
 * dużej grafiki produktu pod hero. Podmień na <Image> ze zrzutem własnej aplikacji.
 */
export function AppWindow() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-xl border border-white/10 bg-[#141414] text-white shadow-[0_40px_120px_-20px_rgb(0_0_0/0.6)]"
    >
      {/* pasek tytułu */}
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3">
        <span className="size-2.5 rounded-full bg-[#fa423e]" />
        <span className="size-2.5 rounded-full bg-[#f6c543]" />
        <span className="size-2.5 rounded-full bg-[#53b559]" />
      </div>
      <div className="grid aspect-[16/9] grid-cols-[minmax(0,1fr)_minmax(0,3fr)] text-[11px] sm:text-xs">
        {/* panel boczny */}
        <div className="flex flex-col gap-2 border-e border-white/10 p-3 sm:p-4">
          <span className="mb-2 h-2 w-16 rounded-full bg-white/30" />
          {[80, 64, 72, 56, 68, 48, 60].map((w, i) => (
            <span key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
          ))}
          <span className="mt-4 h-2 w-12 rounded-full bg-white/20" />
          {[70, 52, 62].map((w, i) => (
            <span key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* obszar główny */}
        <div className="flex flex-col items-center justify-center gap-4 p-4 sm:gap-6 sm:p-8">
          <span className="text-sm font-medium sm:text-xl">Co chcesz dziś zrobić?</span>
          <div className="flex w-full max-w-md flex-col gap-1.5">
            {["Pierwsza podpowiedź", "Druga podpowiedź", "Trzecia podpowiedź"].map((s) => (
              <span key={s} className="hidden rounded-md px-2 py-1 text-white/60 sm:block">
                {s}
              </span>
            ))}
          </div>
          <div className="flex w-full max-w-md items-end justify-between rounded-2xl border border-white/15 bg-white/5 p-3">
            <span className="text-white/50">Opisz zadanie…</span>
            <span className="flex size-6 items-center justify-center rounded-full bg-white text-black">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}
