"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const FooterCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className='py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden'
    >
      {/* Background gradient */}
      <div className='absolute inset-0 bg-linear-to-br from-brand-deep to-brand-black'></div>

      {/* Abstract shapes */}
      <div className='absolute inset-0 overflow-hidden opacity-10'>
        <div className='absolute top-0 right-0 w-1/2 h-1/2 bg-brand-sage rounded-full blur-3xl -translate-y-1/4 translate-x-1/4'></div>
        <div className='absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-sage rounded-full blur-3xl translate-y-1/4 -translate-x-1/4'></div>
      </div>

      <div className='container mx-auto max-w-6xl px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='max-w-4xl mx-auto text-center px-4 sm:px-6'
        >
          <h2 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6'>
            Want a custom GPT for your business?
          </h2>
          <p className='text-white/80 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto'>
            Let&apos;s build it together. Our team can create specialized AI
            tools tailored to your unique workflows.
          </p>

          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='relative group w-full sm:w-auto'
            >
              <div className='absolute inset-0 bg-brand-sage rounded-md blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300'></div>
              <Link
                href='/contact'
                className='relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-brand-lime text-brand-deep rounded-md text-sm sm:text-base font-medium transition-all duration-300 hover:bg-brand-lime/90 hover:text-brand-black flex items-center justify-center'
              >
                Contact Ghost Savvy
                <svg
                  className='ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
