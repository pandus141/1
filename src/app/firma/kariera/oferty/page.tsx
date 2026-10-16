import type { Metadata } from "next";
import { Suspense } from "react";
import { JobsBrowser } from "@/components/company/JobsBrowser";
import { Container } from "@/components/ui/Section";
import { brand } from "@/content/site";

export const metadata: Metadata = { title: `Oferty pracy – ${brand.name}` };

export default function JobsPage() {
  return (
    <Container className="pt-16 md:pt-22">
      <h1 className="mb-10 text-h2 md:mb-12 md:text-display">Oferty pracy</h1>
      <Suspense>
        <JobsBrowser />
      </Suspense>
    </Container>
  );
}
