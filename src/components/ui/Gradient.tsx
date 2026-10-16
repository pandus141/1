import type { Tone } from "@/content/site";

// Gradienty-placeholdery na bazie palety primitive (zamiast zdjęć).
export const toneClasses: Record<Tone, string> = {
  blue: "from-[#173e76] via-[#3a83f7] to-[#a4cdfb]",
  purple: "from-[#3b2366] via-[#8952ee] to-[#ddcffa]",
  pink: "from-[#663049] via-[#f077af] to-[#fcd8e7]",
  orange: "from-[#653218] via-[#ee7c37] to-[#f7d1b8]",
  yellow: "from-[#734615] via-[#f6c543] to-[#fcefbe]",
  green: "from-[#1f4e25] via-[#53b559] to-[#c2eace]",
  teal: "from-[#055f4c] via-[#0fd9ae] to-[#c2f5eb]",
  red: "from-[#6d1b18] via-[#fa423e] to-[#ffc9c0]",
};

export function Gradient({ tone, className = "" }: { tone: Tone; className?: string }) {
  return <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${toneClasses[tone]} ${className}`} />;
}
