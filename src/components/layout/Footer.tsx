import Link from "next/link";
import { brand, footer } from "@/content/site";
import { Container } from "@/components/ui/Section";

export function Footer() {
  return (
    <footer className="@container relative mt-30 mb-8">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-primary-12 pt-12 @2xl:grid-cols-3 @5xl:grid-cols-5">
          {footer.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-footer text-primary-44">{col.title}</h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-footer transition-colors duration-200 hover:text-primary-60">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-footer text-primary-44">
          <span>
            {brand.name} © 2015–{new Date().getFullYear()}
          </span>
          <span>Polski (Polska)</span>
        </div>
      </Container>
    </footer>
  );
}
