"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SectionContent {
  id: string;
  title: string;
  headline: string;
  cta: {
    text: string;
    link: string;
  };
}

const SECTIONS: SectionContent[] = [
  {
    id: "engineering",
    title: "Our Engineering Solution",
    headline:
      "Our technology delivers robust, scalable products that are built to perform and adapt.",
    cta: {
      text: "Let's Talk",
      link: "/contact",
    },
  },
  {
    id: "vision",
    title: "User-Centric Vision",
    headline:
      "We craft experiences that put users first, ensuring every interaction is intuitive and meaningful.",
    cta: {
      text: "View Projects",
      link: "/projects",
    },
  },
  {
    id: "ai",
    title: "AI Development",
    headline:
      "Leveraging cutting-edge AI to create intelligent solutions that evolve with your needs.",
    cta: {
      text: "Learn More",
      link: "/ai-solutions",
    },
  },
];

interface ApproachPillarProps {
  section: number; // 1-based index
  onSectionChange: (section: number) => void;
}

const ApproachPillar = ({ section, onSectionChange }: ApproachPillarProps) => {
  const sectionIndex = section - 1;
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 3 (0 = before section, 3 = after section)
  const currentSection =
    SECTIONS[Math.min(Math.floor(progress), 2)] || SECTIONS[0];

  // Handle scroll events to track progress and fix section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Section is entering viewport
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        setIsFixed(true);

        // Calculate progress (0 to 3) based on scroll position
        // This creates 3 "stops" for our section content
        const totalScrollDistance = sectionHeight - windowHeight;
        const scrollPosition = Math.abs(rect.top);
        const progress = (scrollPosition / totalScrollDistance) * 3;
        setProgress(progress);

        // Update the active section based on progress
        const newSectionIndex = Math.min(Math.floor(progress), 2);
        if (newSectionIndex !== sectionIndex) {
          onSectionChange(newSectionIndex + 1);
        }
      } else {
        // Section is not fixed when not in viewport
        setIsFixed(false);

        // Set progress to 0 when before the section
        if (rect.top > windowHeight) {
          setProgress(0);
        }
        // Set progress to 3 when after the section
        else if (rect.bottom < 0) {
          setProgress(3);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIndex, onSectionChange]);

  const handleSectionClick = (index: number) => {
    onSectionChange(index + 1);
    // Manually calculate and scroll to the position for this section
    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollDistance = sectionHeight - windowHeight;
      const targetPosition =
        sectionRef.current.offsetTop + scrollDistance * (index / 2);
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className='relative w-full min-h-[300vh] overflow-hidden bg-black'
      style={{ marginTop: "-1px" }}
    >
      {/* Fixed content container */}
      <div
        ref={contentRef}
        className={`w-full h-screen flex items-center justify-center ${
          isFixed ? "fixed top-0 left-0" : "relative"
        } ${
          progress >= 3 ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-opacity duration-300`}
        style={{
          opacity: progress >= 3 ? 0 : progress <= 0 ? 0 : 1,
          zIndex: 10,
        }}
      >
        <div className='relative z-10 h-full container mx-auto'>
          <div className='absolute top-8 left-8 flex flex-col space-y-2'>
            {SECTIONS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSectionClick(idx)}
                className={`text-left text-sm font-light transition-colors duration-300 ${
                  Math.floor(progress) === idx
                    ? "text-white"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className='flex h-full items-center'
            >
              <div className='max-w-[800px] mx-auto px-8 mt-0'>
                <motion.h2
                  className='text-5xl md:text-6xl lg:text-7xl font-display mb-20 text-white leading-tight'
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {currentSection.headline}
                </motion.h2>

                <motion.div className='mb-20'>
                  <Link
                    href={currentSection.cta.link}
                    className='inline-flex items-center space-x-4 text-white hover:text-[#00ff9d] transition-colors duration-300 text-lg group'
                  >
                    <span>{currentSection.cta.text}</span>
                    <span className='text-2xl transform group-hover:translate-x-1 transition-transform'>
                      →
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className='absolute bottom-8 left-8 flex items-center space-x-3 text-white/60'>
            <div className='w-6 h-6 rounded-full border border-white/60 flex items-center justify-center text-sm'>
              {Math.min(Math.floor(progress) + 1, 3)}
            </div>
            <span>-</span>
            <div className='text-sm'>3</div>
          </div>

          <div className='absolute bottom-8 right-8 text-white/60 text-sm'>
            &ldquo;Built to perform. Engineered to adapt.&rdquo;
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachPillar;
