"use client";

import { useRef } from "react";
import { motion, useInView, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.3 });
  const parallaxY = useTransform(scrollProgress, [0, 1], [0, 300]);

  return (
    <section
      ref={heroRef}
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Background video or photo collage with parallax effect */}
      <div className='absolute inset-0 z-0'>
        <motion.div className='relative w-full h-full' style={{ y: parallaxY }}>
          {/* You can replace this with a video element if you have a background video */}
          <Image
            src='/images/projects/impact-hero-bg.jpg'
            alt='Savvy Impact Hero Background'
            fill
            priority
            className='object-cover'
          />
          <div className='absolute inset-0 bg-linear-to-b from-[#3F4697]/40 via-transparent to-[#F4EBE0]' />
        </motion.div>
      </div>

      {/* Content */}
      <div className='container mx-auto px-6 py-20 lg:py-32 relative z-10'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='mb-6 text-center'
          >
            <span className='inline-block px-4 py-1 bg-[#CFF39E] text-[#3F4697] text-sm rounded-full font-medium'>
              SAVVY IMPACT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-center text-white drop-shadow-lg'
          >
            Design with Purpose.
            <br />
            <span className='text-[#CFF39E]'>Technology with Impact.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-xl text-white drop-shadow-md mb-12 text-center max-w-2xl mx-auto'
          >
            Measurable, mission-driven results through digital product design
            and engineering excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='flex justify-center'
          >
            <a
              href='#case-studies'
              className='px-8 py-3 bg-[#3F4697] text-white rounded-full font-medium hover:bg-[#3F4697]/90 transition-all duration-300 inline-flex items-center'
            >
              Explore Our Impact
              <svg
                className='w-4 h-4 ml-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
