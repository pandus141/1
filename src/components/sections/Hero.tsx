import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

type Props = {
  title: string;
  lead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function Hero({ title, lead, primary, secondary }: Props) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center md:py-30">
      <h1 className="max-w-3xl animate-fade-in text-h2 text-balance md:text-display">{title}</h1>
      <p className="mt-6 max-w-narrow animate-fade-in text-p1 text-primary-60 [animation-delay:80ms]">{lead}</p>
      <div className="mt-8 flex animate-fade-in flex-wrap justify-center gap-3 [animation-delay:160ms]">
        <Button href={primary.href} size="lg">{primary.label}</Button>
        {secondary && (
          <Button href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </Button>
        )}
      </div>
    </Container>
  );
}
