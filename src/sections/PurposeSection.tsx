"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

const PurposeSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation values for scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.7, 1], [0, -100]);
  const ctaOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.7, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className='relative w-full bg-brand-black overflow-hidden'
    >
      {/* Background Ghost with scroll effect */}
      <motion.div
        className='absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0'
        style={{ opacity, scale }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src='/images/ghost_savvy_icon.svg'
          alt='Ghost Savvy Icon'
          width={600}
          height={600}
          className='w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain opacity-[0.15]'
          style={{
            filter:
              "brightness(0) saturate(100%) invert(91%) sepia(10%) saturate(1015%) hue-rotate(44deg) brightness(103%) contrast(96%)",
          }}
          priority
        />
      </motion.div>

      {/* Noise texture overlay */}
      <div
        className='absolute inset-0 opacity-10 mix-blend-overlay'
        style={{
          backgroundImage: "url('/images/noise-texture.png')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Gradient overlay for smooth transition */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/50 to-brand-black pointer-events-none' />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className='container-custom py-20 sm:py-24 md:py-28 lg:py-32'
      >
        <div className='flex flex-col items-center text-center space-y-10 sm:space-y-12 md:space-y-16'>
          {/* Headline Blocks */}
          <div className='space-y-4 sm:space-y-6 md:space-y-8'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: entryEasing }}
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-white leading-[1.2] sm:leading-[1.1] tracking-[-0.5px]'
            >
              We build digital products.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: entryEasing }}
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-white leading-[1.2] sm:leading-[1.1] tracking-[-0.5px]'
            >
              But not just any products.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: entryEasing }}
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-white leading-[1.2] sm:leading-[1.1] tracking-[-0.5px]'
            >
              We build what matters.
            </motion.h2>
          </div>

          {/* Mission Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: entryEasing }}
            className='text-base sm:text-lg md:text-xl text-brand-white/70 max-w-3xl leading-[1.6]'
          >
            Ghost Savvy Studios is an AI-driven product studio obsessed with
            impact. We don&apos;t just design. We don&apos;t just build. We
            solve problems that actually matter—with empathy, technology, and
            ruthless execution.
          </motion.p>

          {/* Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1, ease: entryEasing }}
            className='flex flex-col sm:flex-row items-center sm:space-x-6 pt-4 sm:pt-6 md:pt-8 space-y-4 sm:space-y-0'
          >
            <Image
              src='/images/ghost_savvy_icon.svg'
              alt='Ghost Savvy Icon'
              width={40}
              height={40}
              className='w-8 h-8 sm:w-10 sm:h-10 object-contain opacity-75'
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(91%) sepia(10%) saturate(1015%) hue-rotate(44deg) brightness(103%) contrast(96%)",
              }}
            />
            <p className='text-lg sm:text-xl md:text-2xl italic text-brand-white/90 tracking-[-0.5px]'>
              &ldquo;We build in silence. We scale in public.&rdquo;
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2, ease: entryEasing }}
            className='flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8 w-full sm:w-auto'
          >
            <Link
              href='/contact'
              className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-brand-sage text-brand-forest rounded-[4px] text-sm hover:bg-brand-sage/90 transition-all duration-300 group font-medium hover:text-brand-black'
            >
              Start a Project
              <span className='ml-2 inline-block transform group-hover:translate-x-1 transition-transform'>
                →
              </span>
            </Link>
            <Link
              href='/savvy-impact'
              className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-brand-white/30 text-brand-white rounded-[4px] text-sm hover:bg-brand-white/10 transition-all duration-300 group hover:border-brand-white font-medium hover:text-brand-white'
            >
              See Our Impact
              <span className='ml-2 inline-block transform group-hover:translate-x-1 transition-transform'>
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PurposeSection;
