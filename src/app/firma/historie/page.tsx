import type { Metadata } from "next";
import { Suspense } from "react";
import { StoriesIndex } from "@/components/company/StoriesIndex";
import { brand } from "@/content/site";

export const metadata: Metadata = { title: `Historie – ${brand.name}`, description: "Historie klientów i społeczności, które korzystają z naszych produktów." };

export default function StoriesPage() {
  return (
    <Suspense>
      <StoriesIndex />
    </Suspense>
  );
}
