import type { Metadata } from "next";
import LabHeroSection from "../../sections/lab/LabHeroSection";
import FeaturedProductSlider from "../../sections/lab/FeaturedProductSlider";
import LabPhilosophySection from "../../sections/lab/LabPhilosophySection";
import LabProductsGrid from "../../sections/lab/LabProductsGrid";
import LabCtaSection from "../../sections/lab/LabCtaSection";

export const metadata: Metadata = {
  title: "Savvy Lab | Ghost Savvy Studios",
  description:
    "Pioneering the future of creative technology with innovative products for everyone, creators, and developers.",
};

export default function SavvyLabPage() {
  return (
    <main className='font-sans'>
      <LabHeroSection />
      <FeaturedProductSlider />
      <LabPhilosophySection />
      <LabProductsGrid />
      <LabCtaSection />
    </main>
  );
}
