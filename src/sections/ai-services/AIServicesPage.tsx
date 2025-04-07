"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroSection from "./HeroSection";
import WhatWeBuildSection from "./WhatWeBuildSection";
import ProcessSection from "./ProcessSection";
import TechStackSection from "./TechStackSection";
import UseCasesSection from "./UseCasesSection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
import FinalCTASection from "./FinalCTASection";

export default function AIServicesPage() {
  // Container ref for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  });

  return (
    <div ref={containerRef} className='bg-brand-black text-brand-white'>
      {/* Hero Section */}
      <HeroSection scrollProgress={scrollYProgress} />

      {/* What We Build Section */}
      <WhatWeBuildSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
}
