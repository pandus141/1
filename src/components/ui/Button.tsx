import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-8 items-center justify-center gap-[0.3em] whitespace-nowrap rounded-[2.5rem] px-5 text-cta transition-colors duration-200 ease-curve-a";

const variants: Record<Variant, string> = {
  // biały/czarny pill – główne CTA
  primary: "bg-primary-100 text-inverse hover:bg-primary-80",
  // półprzezroczysty pill (12%)
  secondary: "bg-primary-12 text-primary-100 hover:bg-primary-44/40",
  ghost: "text-primary-100 hover:text-primary-60",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant; size?: "md" | "lg" };

export function Button({ variant = "primary", size = "md", className = "", ...props }: Props) {
  const sizeCls = size === "lg" ? "min-h-10 px-6" : "";
  return <Link className={`${base} ${variants[variant]} ${sizeCls} ${className}`} {...props} />;
}
