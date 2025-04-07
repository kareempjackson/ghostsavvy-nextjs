"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCaseStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className='py-20 bg-[#F4EBE0]'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='max-w-5xl mx-auto mb-16'
        >
          <h2 className='text-2xl font-semibold text-[#3F4697] mb-2'>
            Featured Case Study
          </h2>
          <p className='text-lg text-gray-600'>
            Highlighting exceptional results from our recent work
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='rounded-2xl overflow-hidden shadow-xl bg-white relative'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {/* Image Section */}
            <div className='relative h-[400px] lg:h-auto'>
              <Image
                src='/images/projects/featured-case-study.jpg'
                alt='Healthcare Connect Platform'
                fill
                className='object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#3F4697]/90 to-transparent lg:hidden'>
                <h3 className='text-2xl font-bold text-white mb-2'>
                  Healthcare Connect Platform
                </h3>
                <p className='text-white/80'>
                  Revolutionizing patient care through seamless communication
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className='p-8 lg:p-12 flex flex-col justify-between'>
              <div>
                <div className='hidden lg:block mb-8'>
                  <h3 className='text-3xl font-bold text-[#3F4697] mb-3'>
                    Healthcare Connect Platform
                  </h3>
                  <p className='text-gray-600 text-lg'>
                    Revolutionizing patient care through seamless communication
                  </p>
                </div>

                {/* Stat Block */}
                <div className='bg-[#CFF39E]/30 p-6 rounded-xl mb-8'>
                  <span className='block text-5xl font-bold text-[#3F4697] mb-2'>
                    94%
                  </span>
                  <span className='text-gray-700'>
                    Increase in patient satisfaction scores across 12 partner
                    hospitals
                  </span>
                </div>

                {/* Quote */}
                <blockquote className='border-l-4 border-[#3F4697] pl-6 mb-8 italic text-gray-700'>
                  "Ghost Savvy Studios transformed our patient communication
                  systems, resulting in measurably better patient outcomes and
                  operational efficiency."
                  <footer className='mt-2 text-sm text-gray-600 not-italic'>
                    <strong>Dr. Sarah Chen</strong>, Chief Digital Officer
                  </footer>
                </blockquote>
              </div>

              <Link
                href='/savvy-impact/project/healthcare-connect'
                className='px-6 py-3 bg-[#3F4697] text-white rounded-full inline-flex items-center hover:bg-[#3F4697]/90 transition-all duration-300 self-start'
              >
                View Full Case Study
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
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
