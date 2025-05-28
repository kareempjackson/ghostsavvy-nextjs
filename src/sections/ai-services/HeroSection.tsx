"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  // Parallax animations based on scroll
  const y = useTransform(scrollProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background pattern/noise (optional) */}
      <div className='absolute inset-0 bg-brand-black z-0 opacity-50'>
        {/* We'll add an actual image when it exists */}
      </div>

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className='relative z-10 container mx-auto px-5vw py-20 flex flex-col items-center text-center'
      >
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mb-8 inline-block py-1 px-4 bg-brand-deep/20 backdrop-blur-xs rounded-full text-sm font-medium text-brand-lime'
        >
          Productized AI Service
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='text-5xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-4xl'
        >
          Custom AI Agents for Real Business Impact
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className='text-lg md:text-xl leading-relaxed text-brand-white/70 mb-10 max-w-3xl'
        >
          Ghost Savvy helps forward-thinking teams design, build, and integrate
          tailored AI agents that streamline operations, enhance product
          experiences, and accelerate scale.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link
            href='/contact'
            className='inline-block bg-brand-sage text-brand-white py-3 px-6 rounded-[4px] font-semibold hover:bg-brand-sage/90 transition-colors'
          >
            Talk to Our AI Team
          </Link>
        </motion.div>

        {/* Optional: Visual element (3D graphic or illustration) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className='mt-16 relative w-full max-w-3xl h-[300px] md:h-[400px]'
        >
          {/* Replace with actual image once available */}
          <div className='w-full h-full flex items-center justify-center border border-brand-white/10 rounded-md bg-linear-to-b from-brand-deep/20 to-transparent'>
            <p className='text-brand-white/50'>AI Agent Visualization</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
