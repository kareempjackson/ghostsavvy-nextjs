"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import components to avoid SSR issues with scroll animations
const ApproachIntro = dynamic(
  () => import("../components/sections/ApproachIntro"),
  { ssr: false }
);
const ApproachPillar = dynamic(
  () => import("../components/sections/ApproachPillar"),
  { ssr: false }
);
const ApproachQuote = dynamic(
  () => import("../components/sections/ApproachQuote"),
  { ssr: false }
);

const ApproachSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(1);

  // Handle section change
  const handleSectionChange = (section: number) => {
    setCurrentSection(section);
  };

  return (
    <section
      ref={containerRef}
      className='relative w-full'
      style={{
        overflowX: "hidden",
      }}
    >
      {/* Intro Section */}
      <ApproachIntro
        kicker='A Different Way to Build'
        title='Our Approach'
        subtitle='We blend creative vision with engineered precision—so every product we build is intuitive, scalable, and impactful.'
      />

      {/* Single Approach Pillar */}
      <ApproachPillar
        section={currentSection}
        onSectionChange={handleSectionChange}
      />

      {/* Quote & CTA Section */}
      <ApproachQuote
        quote="We don't just design. We don't just build. We solve problems worth solving."
        ctaText='See How It Comes to Life'
        ctaLink='/savvy-impact'
      />
    </section>
  );
};

export default ApproachSection;
