"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ProductsHeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animation values for scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  // Easing values from brand guidelines
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  return (
    <section
      ref={containerRef}
      className='relative min-h-[85vh] w-full overflow-hidden bg-brand-black flex flex-col justify-center items-center'
    >
      {/* Background Ghost Logo Watermark - Minimal and refined */}
      <motion.div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0'
        style={{ scale }}
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
      >
        <Image
          src='/images/ghost_savvy_icon.svg'
          alt='Ghost Savvy Icon'
          width={800}
          height={800}
          className='w-full h-full object-contain opacity-[0.04]'
          style={{
            filter: "brightness(0) saturate(100%) invert(100%)",
          }}
          priority
        />
      </motion.div>

      {/* Subtle gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-brand-black/30 via-brand-black/60 to-brand-black pointer-events-none' />

      {/* Hero Content */}
      <motion.div
        className='relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-[90%] mx-auto py-32'
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: entryEasing, delay: 0.2 }}
          className='max-w-4xl'
        >
          <h1 className='text-3xl md:text-5xl lg:text-[64px] font-display text-brand-white leading-[1.1] mb-8 tracking-[-0.5px]'>
            The Products We Build
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: entryEasing, delay: 0.4 }}
            className='text-lg md:text-xl text-brand-white/80 max-w-3xl mx-auto leading-[1.5] mb-16'
          >
            We don&apos;t just design for clients. We build our own platforms —
            tools, apps, and marketplaces that solve real-world problems across
            travel, AI, agriculture, music, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: entryEasing, delay: 0.6 }}
            className='inline-block'
          >
            <a
              href='#products-grid'
              className='px-6 py-3 bg-brand-sage text-brand-white rounded-[4px] transition-all duration-300 font-display text-base inline-flex items-center hover:scale-[1.03] group'
            >
              See Our Process
              <svg
                className='ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProductsHeroSection;
