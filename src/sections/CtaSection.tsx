"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const CtaSection = () => {
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
        <div className='absolute top-0 right-0 w-1/2 h-1/2 bg-brand-lime rounded-full blur-3xl -translate-y-1/4 translate-x-1/4'></div>
        <div className='absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-lime rounded-full blur-3xl translate-y-1/4 -translate-x-1/4'></div>
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='max-w-4xl mx-auto text-center px-4 sm:px-6'
        >
          <h2 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6'>
            Ready to elevate your digital presence?
          </h2>
          <p className='text-white/80 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto'>
            Let&apos;s collaborate to create meaningful digital products that
            solve real problems and engage your audience.
          </p>

          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto'>
            <Link
              href='/contact'
              className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-brand-lime text-brand-deep rounded-md text-sm sm:text-base font-medium transition-all duration-300 hover:bg-brand-lime/90 hover:text-brand-black'
            >
              Start a project
            </Link>
            <Link
              href='/savvy-hub'
              className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/30 text-white rounded-md text-sm sm:text-base font-medium transition-all duration-300 hover:bg-white/10 hover:border-white hover:text-white'
            >
              Explore our insights
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
