import SEO from "@/components/SEO";
import AiToolsHero from "@/sections/ai-tools/AiToolsHero";
import AiToolsGrid from "@/sections/ai-tools/AiToolsGrid";
import EmailCTA from "@/sections/ai-tools/EmailCTA";
import FooterCTA from "@/sections/ai-tools/FooterCTA";

export const metadata = {
  title: "AI Tools | Ghost Savvy Studios",
  description:
    "Deploy specialized GPTs to streamline your workflows, spark ideas, and ship faster.",
};

export default function AiToolsPage() {
  return (
    <>
      <SEO
        type='website'
        title='AI Tools | Ghost Savvy Studios'
        description='Deploy specialized GPTs to streamline your workflows, spark ideas, and ship faster.'
        image='/images/og-image.jpg'
      />
      <AiToolsHero />
      <AiToolsGrid />
      <EmailCTA />
      <FooterCTA />
    </>
  );
}
