import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { Card } from "@/components/ui/Card";
import { Gradient } from "@/components/ui/Gradient";
import { Container } from "@/components/ui/Section";
import { ShareButton } from "@/components/ui/ShareButton";
import { formatDate, formatDateLong } from "@/content/blog";
import { getStory, stories } from "@/content/company";
import { brand } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = getStory((await params).slug);
  return s ? { title: `${s.title} – Historie – ${brand.name}`, description: s.excerpt } : {};
}

/** Historia klienta – układ artykułu (jak /blog/[slug]) z dużą grafiką otwierającą. */
export default async function StoryPage({ params }: Params) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  const related = stories.filter((s) => s.slug !== story.slug && s.category === story.category).concat(stories.filter((s) => s.category !== story.category)).slice(0, 3);

  return (
    <article>
      <Container className="flex flex-col items-center pt-16 text-center md:pt-22">
        <p className="flex gap-3 text-meta">
          <time dateTime={story.date}>{formatDateLong(story.date)}</time>
          <Link href={`/firma/historie?kategoria=${encodeURIComponent(story.category)}`} className="text-primary-60 transition-colors hover:text-primary-100">
            {story.category}
          </Link>
        </p>
        <h1 className="mt-8 max-w-wide text-[2.5rem] leading-[1.06] font-medium tracking-[-0.03em] text-balance md:text-hero">{story.title}</h1>
        <p className="mt-6 max-w-[37rem] text-primary-80 text-pretty">{story.excerpt}</p>
      </Container>

      <Container className="mt-14 md:mt-16">
        <div className="relative mx-auto aspect-video max-w-[70rem] overflow-hidden rounded-md">
          <Gradient tone={story.tone} />
        </div>
      </Container>

      <Container className="mt-12 md:mt-16">
        <div className="mx-auto mb-10 flex max-w-article justify-end">
          <ShareButton title={story.title} />
        </div>
        <ArticleBody blocks={story.body} />
      </Container>

      <section className="mt-30 md:mt-40">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-h5">Więcej historii</h2>
            <Link href="/firma/historie" className="flex h-10 items-center rounded px-2 text-cta transition-colors hover:bg-primary-4">
              Wyświetl wszystko
            </Link>
          </div>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Card item={{ title: s.title, href: `/firma/historie/${s.slug}`, category: s.category, date: formatDate(s.date), tone: s.tone }} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}
