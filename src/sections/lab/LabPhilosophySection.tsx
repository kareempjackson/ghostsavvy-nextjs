"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const LabPhilosophySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const philosophyPillars = [
    {
      id: "experimentation",
      title: "Experimentation",
      description:
        "We treat every challenge as an opportunity to test new ideas and approaches, taking calculated risks that lead to breakthroughs.",
      icon: "/images/icons/experiment-icon.svg",
    },
    {
      id: "research",
      title: "Deep Research",
      description:
        "Our teams dive deep into emerging technologies, studying trends and developing proprietary insights that drive our innovation.",
      icon: "/images/icons/research-icon.svg",
    },
    {
      id: "collaboration",
      title: "Open Collaboration",
      description:
        "We believe in the power of diverse perspectives, bringing together experts from different fields to create better solutions.",
      icon: "/images/icons/collaboration-icon.svg",
    },
  ];

  return (
    <section id='our-philosophy' ref={sectionRef} className='py-28 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
          {/* Left Column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className='mb-16'
            >
              <span className='inline-block text-[#3F4697] font-medium mb-4'>
                OUR APPROACH
              </span>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                What Makes Us Different
              </h2>
              <p className='text-xl text-gray-700'>
                At Ghost Savvy Studios, we believe that the most impactful
                innovations come from a blend of creative thinking, technical
                excellence, and a deep understanding of human needs.
              </p>
            </motion.div>

            {/* Stats Section - Horizontal layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className='grid grid-cols-3 border-t border-b border-gray-200 py-10 mb-16'
            >
              <div>
                <span className='block text-4xl text-[#3F4697] font-bold mb-1'>
                  24+
                </span>
                <span className='text-sm text-gray-600'>Lab Projects</span>
              </div>
              <div>
                <span className='block text-4xl text-[#3F4697] font-bold mb-1'>
                  6
                </span>
                <span className='text-sm text-gray-600'>Active Products</span>
              </div>
              <div>
                <span className='block text-4xl text-[#3F4697] font-bold mb-1'>
                  15M+
                </span>
                <span className='text-sm text-gray-600'>Global Users</span>
              </div>
            </motion.div>

            {/* Philosophy Principles - Clean list */}
            <div className='space-y-12'>
              {philosophyPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className='flex gap-6'
                >
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 flex items-center justify-center'>
                      <Image
                        src={pillar.icon}
                        alt={pillar.title}
                        width={32}
                        height={32}
                        className='text-[#3F4697]'
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {pillar.title}
                    </h3>
                    <p className='text-gray-600'>{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='relative'
          >
            <div className='sticky top-24'>
              <div className='relative aspect-[4/5] overflow-hidden'>
                <Image
                  src='/images/lab-philosophy.jpg'
                  alt='Ghost Savvy Studios Lab Philosophy'
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>

                {/* Quote overlay */}
                <div className='absolute bottom-0 left-0 right-0 p-10'>
                  <blockquote className='text-white text-xl italic font-light border-l-0 pl-0'>
                    &ldquo;Our mission is to push the boundaries of what&apos;s
                    possible, creating products that not only solve problems but
                    inspire new ways of thinking.&rdquo;
                    <footer className='mt-4 text-white/80 text-sm not-italic'>
                      <strong className='font-medium'>Alex Chen</strong>, Chief
                      Innovation Officer
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LabPhilosophySection;
