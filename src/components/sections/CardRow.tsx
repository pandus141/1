import { Card } from "@/components/ui/Card";
import type { CardItem } from "@/content/site";

/**
 * 3 karty w rzędzie. Na wąskim ekranie przewijane poziomo
 * ze scroll-snap i ukrytym paskiem przewijania.
 */
export function CardRow({ items }: { items: CardItem[] }) {
  return (
    <div className="no-scrollbar w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden">
      <ul className="mx-auto grid min-w-4xl grid-cols-3 gap-4 px-6 @3xl:min-w-0 @3xl:max-w-content @md:gap-6 @md:px-8">
        {items.map((item) => (
          <li key={item.title} className="snap-start scroll-ms-6">
            <Card item={item} aspect="portrait" />
          </li>
        ))}
      </ul>
    </div>
  );
}
