import type { Metadata } from "next";
import { CenteredBlock, PageIntro, Split, WideImage } from "@/components/company/Blocks";
import { TabbedPosts } from "@/components/company/TabbedPosts";
import { about } from "@/content/company";
import { brand } from "@/content/site";

export const metadata: Metadata = { title: `O nas – ${brand.name}`, description: about.lead };

/**
 * O nas (wg openai.com/about): nagłówek → misja (tekst + kwadratowa grafika) → zdanie + szeroka grafika
 * → kariera + szeroka grafika → zakładki z wpisami → struktura → CTA.
 */
export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 md:gap-30">
      <PageIntro eyebrow={about.eyebrow} title={about.title} lead={about.lead} />
      <Split title={about.mission.title} text={about.mission.text} actions={[about.mission.primary, about.mission.secondary]} tone={about.mission.tone} />
      <div className="flex flex-col gap-12 md:gap-16">
        <CenteredBlock title={about.statement.title} />
        <WideImage tone={about.statement.tone} />
      </div>
      <div className="flex flex-col gap-12 md:gap-16">
        <CenteredBlock title={about.careers.title} text={about.careers.text} cta={about.careers.cta} />
        <WideImage tone={about.careers.tone} />
      </div>
      <TabbedPosts {...about.learnMore} />
      <Split title={about.structure.title} text={about.structure.text} actions={[about.structure.cta]} tone={about.structure.tone} />
      <CenteredBlock title={about.cta.title} cta={about.cta.primary} size="display" />
    </div>
  );
}
