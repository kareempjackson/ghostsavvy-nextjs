"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

const AiToolsHero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animation values for scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <section
      ref={containerRef}
      className='relative min-h-[60vh] w-full overflow-hidden bg-brand-forest flex flex-col justify-center'
    >
      {/* Background gradient */}
      <div className='absolute inset-0 z-0 bg-gradient-to-br from-brand-forest to-brand-black'>
        {/* Abstract AI-themed pattern overlay */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 right-0 w-1/2 h-1/2 bg-brand-sage rounded-full blur-3xl -translate-y-1/4 translate-x-1/4'></div>
          <div className='absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-sage rounded-full blur-3xl translate-y-1/4 -translate-x-1/4'></div>
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        className='relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-[95%] sm:max-w-[90%] mx-auto py-16 sm:py-24 md:py-32 mt-16 sm:mt-24 md:mt-32'
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: entryEasing }}
          className='max-w-4xl'
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: entryEasing }}
            className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-brand-white leading-[1.2] mb-6 sm:mb-8 tracking-[-0.2px]'
          >
            Intelligent Tools.
            <br className='hidden sm:block' />
            <span className='mt-2 sm:mt-4 inline-block'>Ghost Built.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: entryEasing }}
            className='text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto'
          >
            Deploy specialized GPTs to streamline your workflows, spark ideas,
            and ship faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: entryEasing }}
            className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-8'
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='relative group w-full sm:w-auto'
            >
              <div className='absolute inset-0 bg-brand-sage rounded-[4px] blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300'></div>
              <Link
                href='#tools'
                className='relative w-full sm:w-auto px-5 sm:px-6 py-3 bg-brand-sage text-brand-forest rounded-[4px] transition-all duration-300 text-sm inline-flex items-center justify-center group-hover:bg-brand-sage/90 group-hover:translate-y-[-2px] group-hover:text-brand-forest/90 font-medium'
              >
                Explore Tools
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
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Neural network visual effect (decorative) */}
      <div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-brand-black to-transparent z-10'></div>
    </section>
  );
};

export default AiToolsHero;
