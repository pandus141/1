import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-meta text-primary-60">404</p>
      <h1 className="text-h2">Nie znaleziono strony</h1>
      <p className="max-w-narrow text-primary-60">Strona mogła zostać przeniesiona albo adres jest nieprawidłowy.</p>
      <div className="flex gap-2">
        <Button href="/" size="lg">Strona główna</Button>
        <Button href="/pomoc" variant="secondary" size="lg">Centrum pomocy</Button>
      </div>
    </Container>
  );
}
