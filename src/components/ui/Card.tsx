import Link from "next/link";
import Image from "next/image";
import type { CardItem } from "@/content/site";
import { Gradient } from "./Gradient";

type Props = {
  item: CardItem;
  aspect?: "square" | "video" | "portrait";
  size?: "default" | "large";
};

const aspects = { square: "aspect-square", video: "aspect-video", portrait: "aspect-[4/5]" };

export function Card({ item, aspect = "square", size = "default" }: Props) {
  return (
    <Link href={item.href} className="group flex flex-col gap-4">
      <div className={`relative w-full overflow-hidden rounded-lg ${aspects[aspect]}`}>
        {item.image ? (
          <Image src={item.image} alt="" fill className="object-cover animate-fade-in" />
        ) : (
          <Gradient tone={item.tone} className="transition-transform duration-500 ease-curve-a group-hover:scale-[1.03]" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className={size === "large" ? "text-h4" : "text-card"}>
          <span className="transition-colors duration-200 group-hover:text-primary-60">{item.title}</span>
        </h3>
        {item.description && <p className="text-p2 text-primary-60">{item.description}</p>}
        {(item.category || item.date) && (
          <p className="flex flex-wrap gap-x-3 gap-y-2 text-meta text-primary-60">
            {item.category && <span>{item.category}</span>}
            {item.date && <span className="text-primary-44">{item.date}</span>}
          </p>
        )}
      </div>
    </Link>
  );
}

/** Wiersz listy (bez obrazka) – jak lista „Najnowsze wiadomości”. */
export function ListRow({ item }: { item: CardItem }) {
  return (
    <Link
      href={item.href}
      className="group flex items-start justify-between gap-6 border-t border-primary-12 py-5"
    >
      <span className="text-card transition-colors group-hover:text-primary-60">{item.title}</span>
      <span className="shrink-0 text-meta text-primary-44">
        {item.category} · {item.date}
      </span>
    </Link>
  );
}
