import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
  className?: string;
};

/** Sekcja z nagłówkiem 20px i linkiem „Zobacz wszystko” – powtarzalny blok strony głównej. */
export function Section({ title, href, linkLabel = "Zobacz wszystko", children, className = "" }: Props) {
  return (
    <section className={`@container w-full ${className}`}>
      <div className="mx-auto mb-6 flex max-w-content items-baseline justify-between gap-4 px-6 @md:px-8">
        <h2 className="text-h4">{title}</h2>
        {href && (
          <Link href={href} className="text-meta text-primary-60 transition-colors hover:text-primary-100">
            {linkLabel}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** Kontener o szerokości treści z bocznym paddingiem 24 → 32px. */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-content px-6 md:px-8 ${className}`}>{children}</div>;
}
