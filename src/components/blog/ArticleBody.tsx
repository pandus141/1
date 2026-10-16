import Image from "next/image";
import type { Block } from "@/content/blog";
import { slugify } from "@/content/blog";
import { Gradient } from "@/components/ui/Gradient";

/**
 * Treść artykułu wg openai.com/index/…:
 * kolumna 672px, akapity 17/28 co 24px, śródtytuł 30px (64px nad),
 * grafika szersza od kolumny (896px), cytat 18px/500 z podpisem 14px.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mx-auto mb-6 w-full max-w-article last:mb-0">
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)} className="mx-auto mt-10 mb-6 w-full max-w-article scroll-mt-24 text-h4 first:mt-0 md:mt-16 md:text-h3">
                {b.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="mx-auto mb-6 flex w-full max-w-article list-disc flex-col gap-2 ps-6 marker:text-primary-60">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "figure":
            return (
              <figure key={i} className="mx-auto my-10 w-full max-w-wide md:my-16">
                <div className="relative aspect-video overflow-hidden rounded-md">
                  {b.image ? <Image src={b.image} alt={b.caption ?? ""} fill className="object-cover" /> : <Gradient tone={b.tone} />}
                </div>
                {b.caption && <figcaption className="mt-3 text-meta text-primary-60">{b.caption}</figcaption>}
              </figure>
            );
          case "quote":
            return (
              <figure key={i} className="mx-auto my-12 w-full max-w-[53rem] md:my-20">
                <blockquote className="text-quote">
                  <span aria-hidden className="me-1">“</span>
                  {b.text}
                </blockquote>
                {b.cite && <figcaption className="mt-5 text-meta text-primary-60">— {b.cite}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
