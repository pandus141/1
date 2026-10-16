import { Suspense } from "react";
import { HelpSearch } from "@/components/help/HelpSearch";

/**
 * Wspólny układ Centrum pomocy (wg help.openai.com):
 * kolumna 1024px, wyszukiwarka u góry każdej podstrony, 64px odstępu do treści.
 */
export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-help px-6 pt-10 md:px-8 md:pt-14">
      <Suspense>
        <HelpSearch />
      </Suspense>
      <div className="mt-10 md:mt-16">{children}</div>
    </div>
  );
}
