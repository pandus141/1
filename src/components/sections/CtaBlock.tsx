import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

type Props = {
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Zaokrąglony blok CTA na siatce 12-kolumnowej (gap 8 / 16 / 24px). */
export function CtaBlock({ title, primary, secondary }: Props) {
  return (
    <Container>
      <div className="relative isolate grid grid-cols-12 gap-x-2 overflow-hidden rounded-3xl bg-primary-4 px-6 py-16 md:gap-x-4 md:py-24 lg:gap-x-6">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_120%,rgb(58_131_247/0.35),transparent)]"
        />
        <div className="col-span-12 flex flex-col items-center gap-8 text-center md:col-span-8 md:col-start-3">
          <h2 className="text-h2 text-balance">{title}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href={primary.href} size="lg">{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
