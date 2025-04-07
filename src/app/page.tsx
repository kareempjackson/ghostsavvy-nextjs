import HeroSection from "@/sections/HeroSection";
import PurposeSection from "@/sections/PurposeSection";
import ApproachSection from "@/sections/ApproachSection";
import StoriesOfImpact from "@/sections/StoriesOfImpact";
import SavvyHubSection from "@/sections/SavvyHubSection";

export default function Home() {
  return (
    <main className='bg-brand-white overflow-x-hidden font-sans'>
      <HeroSection />
      <PurposeSection />
      <ApproachSection />
      <StoriesOfImpact />
      <SavvyHubSection />
    </main>
  );
}
