import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpIconTile } from "@/components/help/HelpIcon";
import { ArticleList, Breadcrumbs } from "@/components/help/HelpParts";
import { getCategoryArticles, getHelpCategory, helpCategories } from "@/content/help";
import { brand } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return helpCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cat = getHelpCategory((await params).slug);
  return cat ? { title: `${cat.title} – Centrum pomocy ${brand.name}`, description: cat.description } : {};
}

/** Kategoria: okruszki → kafel 96px + tytuł 32px + opis → lista artykułów w ramce. */
export default async function HelpCategoryPage({ params }: Params) {
  const cat = getHelpCategory((await params).slug);
  if (!cat) notFound();
  const articles = getCategoryArticles(cat.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: "Wszystkie kategorie", href: "/pomoc" }, { label: cat.title }]} />
      <header className="mb-10 flex items-center gap-4 md:mb-12 md:gap-6">
        <HelpIconTile icon={cat.icon} size="lg" />
        <div className="flex flex-col gap-1">
          <h1 className="text-h4 font-semibold md:text-h2 md:font-semibold">{cat.title}</h1>
          <p className="text-meta font-normal text-primary-60 md:text-p2">{cat.description}</p>
        </div>
      </header>
      <ArticleList articles={articles} />
    </>
  );
}
