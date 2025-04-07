"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className='py-24 bg-[#3F4697] text-white overflow-hidden relative'
    >
      {/* Background decorative elements */}
      <div className='absolute top-1/2 left-0 w-96 h-96 bg-[#CFF39E]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2'></div>
      <div className='absolute top-0 right-0 w-72 h-72 bg-[#CFF39E]/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3'></div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className='mb-8'
          >
            <span className='inline-block px-4 py-1 bg-white/10 text-[#CFF39E] text-sm rounded-full font-medium mb-6'>
              START YOUR JOURNEY
            </span>

            <h2 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
              Ready to create impact through
              <span className='block text-[#CFF39E]'> purposeful design?</span>
            </h2>

            <p className='text-xl text-white/80 mb-10 max-w-3xl mx-auto'>
              Partner with Ghost Savvy Studios to build digital products that
              drive measurable results and create meaningful change.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='flex flex-col md:flex-row justify-center items-center gap-6'
          >
            <Link
              href='/contact'
              className='px-8 py-4 bg-[#CFF39E] text-[#3F4697] rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 inline-flex items-center'
            >
              Start a Meaningful Project
              <svg
                className='w-5 h-5 ml-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </Link>

            <Link
              href='/savvy-hub'
              className='px-8 py-4 bg-transparent border border-white/30 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300'
            >
              Explore Our Process
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
