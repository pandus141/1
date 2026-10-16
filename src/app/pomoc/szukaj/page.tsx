import type { Metadata } from "next";
import Link from "next/link";
import { ArticleList, Breadcrumbs } from "@/components/help/HelpParts";
import { searchHelp } from "@/content/help";
import { brand } from "@/content/site";

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export const metadata: Metadata = { title: `Wyniki wyszukiwania – Centrum pomocy ${brand.name}`, robots: { index: false } };

export default async function HelpSearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const results = searchHelp(q);

  return (
    <>
      <Breadcrumbs items={[{ label: "Wszystkie kategorie", href: "/pomoc" }, { label: "Wyszukiwanie" }]} />
      <h1 className="mb-8 text-h4 font-semibold md:text-h2 md:font-semibold">
        {q ? (
          <>
            Wyniki dla „{q}”
            <span className="ms-3 align-middle text-meta font-normal text-primary-60">{results.length}</span>
          </>
        ) : (
          "Wpisz szukaną frazę"
        )}
      </h1>
      {q && results.length === 0 ? (
        <div className="rounded-2xl border border-primary-12 px-6 py-10 text-center">
          <p className="text-p2">Nie znaleźliśmy artykułów pasujących do zapytania.</p>
          <p className="mt-2 text-meta font-normal text-primary-60">
            Sprawdź pisownię lub{" "}
            <Link href="/pomoc" className="underline hover:text-primary-100">
              przeglądaj kategorie
            </Link>
            .
          </p>
        </div>
      ) : (
        results.length > 0 && <ArticleList articles={results} />
      )}
    </>
  );
}
