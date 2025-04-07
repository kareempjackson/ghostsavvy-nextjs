"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const LabHeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className='bg-gradient-to-b from-[#111] to-[#1a1a1a] py-24 md:py-32 overflow-hidden relative'
    >
      {/* Subtle background pattern */}
      <div className='absolute inset-0 opacity-10 pointer-events-none'>
        <div className='absolute top-0 right-0 w-full h-full'>
          <div className="w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-20"></div>
        </div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <span className='inline-block text-[#CFF39E] font-medium mb-6'>
                SAVVY LAB
              </span>
              <h1 className='text-5xl md:text-7xl font-bold text-white mb-8 leading-tight'>
                Pioneering the Future of Creative Technology
              </h1>
              <p className='text-xl md:text-2xl text-white/80 max-w-xl mb-10'>
                Explore our in-house experiments and innovative products that
                push the boundaries of what&apos;s possible.
              </p>

              <div className='flex flex-col sm:flex-row gap-5'>
                <Link
                  href='#our-products'
                  className='px-8 py-4 bg-[#CFF39E] text-black rounded-none inline-flex items-center hover:bg-[#CFF39E]/90 transition-all duration-300 font-medium'
                >
                  Explore Our Products
                </Link>
                <Link
                  href='#our-philosophy'
                  className='px-8 py-4 border border-white/30 text-white rounded-none inline-flex items-center hover:bg-white/10 transition-all duration-300 font-medium'
                >
                  Our Philosophy
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98],
                delay: 0.2,
              }}
              className='hidden lg:block'
            >
              <div className='relative aspect-[4/3] overflow-hidden'>
                <Image
                  src='/images/hero-lab.jpg'
                  alt='Ghost Savvy Labs Innovation'
                  fill
                  className='object-cover'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>

                <div className='absolute bottom-0 left-0 w-full p-8'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='border-l-2 border-[#CFF39E] pl-4'>
                      <p className='text-white font-semibold'>Experiment</p>
                    </div>
                    <div className='border-l-2 border-[#CFF39E] pl-4'>
                      <p className='text-white font-semibold'>Innovate</p>
                    </div>
                    <div className='border-l-2 border-[#CFF39E] pl-4'>
                      <p className='text-white font-semibold'>Launch</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className='absolute bottom-0 left-0 right-0 h-px bg-white/10'></div>
    </section>
  );
};

export default LabHeroSection;
