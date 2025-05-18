import HeroSection from "@/sections/HeroSection";
import PurposeSection from "@/sections/PurposeSection";
import ApproachSection from "@/sections/ApproachSection";
import ImpactSection from "@/sections/ImpactSection";
import HubSection from "@/sections/HubSection";
import CtaSection from "@/sections/CtaSection";
import SEO from "@/components/SEO";

export const metadata = {
  title: "Ghost Savvy Studios | Premium Digital Product Studio",
  description:
    "Premium digital product studio building exceptional experiences as ghost partners for agencies and startups.",
};

export default function Home() {
  return (
    <>
      <SEO
        type='website'
        title='Ghost Savvy Studios | Premium Digital Product Studio'
        description='Premium digital product studio building exceptional experiences as ghost partners for agencies and startups.'
        image='/images/og-image.jpg'
      />
      <HeroSection />
      <PurposeSection />
      <ApproachSection />
      <ImpactSection isHomePage={true} />
      <HubSection isHomePage={true} />
      <CtaSection />
    </>
  );
}
