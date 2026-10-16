import type { HelpIcon as Icon } from "@/content/help";

const paths: Record<Icon, React.ReactNode> = {
  start: <path d="M5 19l4-1 10-10a2.1 2.1 0 00-3-3L6 15l-1 4zM14 7l3 3" />,
  account: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.2-3.2 3.9-5 7-5s5.8 1.8 7 5" />
    </>
  ),
  billing: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14.5h3" />
    </>
  ),
  shield: <path d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5V6l7-3zM9 12l2 2 4-4" />,
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />,
  wrench: <path d="M14.5 6.5a4 4 0 00-5.2 5.2L4 17v3h3l5.3-5.3a4 4 0 005.2-5.2l-2.4 2.4-2.4-.6-.6-2.4 2.4-2.4z" />,
};

/** Kafel z ikoną kategorii: pełne tło w kolorze tekstu, ikona w kolorze odwróconym (64px / 96px). */
export function HelpIconTile({ icon, size = "md" }: { icon: Icon; size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-16 md:size-24 [&_svg]:size-7 md:[&_svg]:size-9" : "size-12 md:size-16 [&_svg]:size-6 md:[&_svg]:size-7";
  return (
    <div aria-hidden className={`flex flex-none items-center justify-center rounded-md bg-primary-100 text-inverse transition-transform duration-200 group-hover:scale-105 ${box}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {paths[icon]}
      </svg>
    </div>
  );
}
