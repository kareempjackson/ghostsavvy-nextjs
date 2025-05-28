"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ExperimentIcon = () => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-[#3F4697]'
  >
    <path
      d='M9 3H15M10 14.5L5 19.5M14 14.5L19 19.5M8.5 7.5C8.5 7.5 11 9.5 12 9.5C13 9.5 15.5 7.5 15.5 7.5M7 3.5H17M16.5 14.5V7C16.5 4.79086 14.7091 3 12.5 3C10.2909 3 8.5 4.79086 8.5 7V14.5C8.5 16.7091 10.2909 18.5 12.5 18.5C14.7091 18.5 16.5 16.7091 16.5 14.5Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ResearchIcon = () => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-[#3F4697]'
  >
    <path
      d='M15.5 15.5L19 19M5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 8V14M9 11H15'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const CollaborationIcon = () => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='text-[#3F4697]'
  >
    <path
      d='M16.5 16L12 21L7.5 16M18 9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const LabPhilosophySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const philosophyPillars = [
    {
      id: "experimentation",
      title: "Experimentation",
      description:
        "We treat every challenge as an opportunity to test new ideas and approaches, taking calculated risks that lead to breakthroughs.",
      Icon: ExperimentIcon,
    },
    {
      id: "research",
      title: "Deep Research",
      description:
        "Our teams dive deep into emerging technologies, studying trends and developing proprietary insights that drive our innovation.",
      Icon: ResearchIcon,
    },
    {
      id: "collaboration",
      title: "Open Collaboration",
      description:
        "We believe in the power of diverse perspectives, bringing together experts from different fields to create better solutions.",
      Icon: CollaborationIcon,
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
                  <div className='shrink-0'>
                    <div className='w-12 h-12 flex items-center justify-center'>
                      <pillar.Icon />
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
              <div className='relative aspect-4/5 overflow-hidden bg-linear-to-br from-gray-800 to-gray-900'>
                {/* Fallback content for missing image */}
                <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent'></div>

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
