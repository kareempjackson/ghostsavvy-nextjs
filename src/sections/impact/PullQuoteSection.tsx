"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function PullQuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className='py-24 bg-linear-to-br from-white to-[#F4EBE0]/50 overflow-hidden'
    >
      <div className='container mx-auto px-6 relative'>
        {/* Background decorative elements */}
        <div className='absolute top-0 right-0 w-40 h-40 opacity-20 transform translate-x-20 -translate-y-10'>
          <div className='w-full h-full rounded-full bg-[#CFF39E]'></div>
        </div>
        <div className='absolute bottom-0 left-0 w-60 h-60 opacity-10 transform -translate-x-20 translate-y-10'>
          <div className='w-full h-full rounded-full bg-[#3F4697]'></div>
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl'
            >
              <Image
                src='/images/projects/impact-quote-image.jpg'
                alt='Client working with Ghost Savvy Studios'
                fill
                className='object-cover'
                priority
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/projects/placeholder-1.jpg";
                }}
              />
              <div className='absolute inset-0 bg-linear-to-t from-[#3F4697]/70 to-transparent'></div>
              <div className='absolute bottom-0 left-0 right-0 p-8'>
                <span className='text-white/80 text-sm mb-2 block'>
                  FEATURED CLIENT
                </span>
                <h4 className='text-2xl font-bold text-white mb-1'>
                  Dr. Sarah Chen
                </h4>
                <p className='text-[#CFF39E]'>
                  Chief Digital Officer, HealthTech Innovations
                </p>
              </div>
            </motion.div>

            {/* Quote side - magazine style layout */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='relative'
            >
              <div className='absolute -top-16 -left-16 text-[200px] font-bold text-[#3F4697]/10 leading-none'>
                "
              </div>

              <blockquote className='relative z-10 pt-10'>
                <p className='text-3xl md:text-4xl font-medium text-[#3F4697] leading-tight mb-8 relative'>
                  Ghost Savvy Studios didn't just build us another platform;
                  they created a digital
                  <span className='relative inline-block mx-1'>
                    <span className='relative z-10'>ecosystem</span>
                    <span className='absolute bottom-1 left-0 right-0 h-3 bg-[#CFF39E]/50 -z-10'></span>
                  </span>
                  that transformed how we deliver care. The metrics speak for
                  themselves.
                </p>

                <div className='flex items-center mb-4'>
                  <div className='w-16 h-1 bg-[#3F4697] mr-4'></div>
                  <p className='text-gray-600'>
                    Partnered with Ghost Savvy since 2021
                  </p>
                </div>

                <div className='pl-20 border-l-4 border-[#CFF39E] py-6 space-y-4'>
                  <p className='text-lg text-gray-700'>
                    "What stood out was their ability to balance technical
                    excellence with a genuine understanding of our mission. This
                    wasn't just a project for them—it was a commitment to
                    improving healthcare delivery."
                  </p>
                  <p className='text-lg text-gray-700'>
                    "The impact has been felt across our entire organization,
                    from operations to patient care. This is what technology
                    with purpose looks like."
                  </p>
                </div>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
