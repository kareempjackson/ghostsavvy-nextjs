import HeroSection from "@/sections/HeroSection";
import PurposeSection from "@/sections/PurposeSection";
import ApproachSection from "@/sections/ApproachSection";
import ServicesSection from "@/sections/ServicesSection";
import StoriesOfImpact from "@/sections/StoriesOfImpact";
import SavvyHubSection from "@/sections/SavvyHubSection";
import CtaSection from "@/sections/CtaSection";
import SEO from "@/components/SEO";

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
      <ServicesSection />
      <ApproachSection />
      <StoriesOfImpact />
      <SavvyHubSection />
      <CtaSection />
    </>
  );
}
