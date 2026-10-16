import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = { title: "Blog – Marka" };

export default function BlogPage() {
  return (
    <Suspense>
      <BlogIndex />
    </Suspense>
  );
}
