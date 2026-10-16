import type { Metadata } from "next";
import Link from "next/link";
import { HelpIconTile } from "@/components/help/HelpIcon";
import { getCategoryArticles, helpCategories } from "@/content/help";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: `Centrum pomocy – ${brand.name}`,
  description: "Odpowiedzi na najczęstsze pytania, instrukcje i rozwiązywanie problemów.",
};

/** Strona główna Centrum pomocy: siatka kategorii 1/2/3 kolumny z kaflem-ikoną 64px. */
export default function HelpHome() {
  return (
    <>
      <h1 className="sr-only">Centrum pomocy</h1>
      <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
        {helpCategories.map((c) => {
          const count = getCategoryArticles(c.slug).length;
          return (
            <li key={c.slug}>
              <Link href={`/pomoc/kategoria/${c.slug}`} className="group -m-4 flex gap-4 rounded-xl p-4 transition-colors hover:bg-primary-4">
                <HelpIconTile icon={c.icon} />
                <div className="flex flex-col gap-1">
                  <h2 className="text-h4 font-semibold">{c.title}</h2>
                  <p className="text-meta font-normal text-primary-60">{c.description}</p>
                  <p className="mt-1 text-footer text-primary-44">
                    {count} {count === 1 ? "artykuł" : count < 5 ? "artykuły" : "artykułów"}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
