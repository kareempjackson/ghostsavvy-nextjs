"use client";

import { motion } from "framer-motion";

// Use cases data
const useCases = [
  {
    title: "AI Concierge for Travel Sites",
    description:
      "Customized travel recommendations and itinerary planning based on user preferences",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M3.05493 11H5C6.10457 11 7 11.8954 7 13V14C7 15.1046 7.89543 16 9 16H15C16.1046 16 17 15.1046 17 14V13C17 11.8954 17.8954 11 19 11H20.9451M3.05493 11C3.45104 7.60771 6.3675 5 9.8 5H14.2C17.6325 5 20.549 7.60771 20.9451 11M3.05493 11V15.2C3.05493 18.9602 3.05493 20.8403 4.10872 21.8891C5.16251 22.938 7.05153 22.938 10.8296 22.938H13.1704C16.9485 22.938 18.8375 22.938 19.8913 21.8891C20.9451 20.8403 20.9451 18.9602 20.9451 15.2V11'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.5 11L10.5 12L14.5 8'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "AI Admin Assistant for Agencies",
    description:
      "Automate client onboarding, project management, and resource allocation",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "AI Sales Rep for SaaS",
    description:
      "Intelligent lead qualification and follow-up with seamless CRM integration",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "AI Support Bot for E-Commerce",
    description:
      "Product recommendations, order tracking, and proactive customer service",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M2 9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V9Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16 8V5C16 3.34315 14.6569 2 13 2H11C9.34315 2 8 3.34315 8 5V8'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "Internal Data QA Assistant",
    description:
      "Verify data quality and consistency across databases and reporting systems",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "Agent for Booking + Payments",
    description:
      "Streamlined appointment scheduling and payment processing via conversational AI",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1 10H23'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "GPT Copilot for Creative Tools",
    description:
      "Design assistance, code generation, and content creation with AI collaboration",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 17H12.01'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "AI Task Manager for Freelancers",
    description:
      "Prioritize tasks, manage deadlines, and optimize workflows with AI assistant",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M9 11L12 14L22 4'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.05 * i,
    },
  }),
};

export default function UseCasesSection() {
  return (
    <section className='bg-brand-ivory text-brand-deep py-20 md:py-24 relative overflow-hidden'>
      {/* Background pattern (subtle) */}
      <div className='absolute inset-0 opacity-5 pointer-events-none'>
        {/* This would be a background pattern/texture if available */}
      </div>

      <div className='container mx-auto px-5vw relative z-10'>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Built for What You Actually Need
          </h2>
          <p className='text-lg text-brand-deep/70 max-w-2xl mx-auto'>
            AI solutions crafted for specific business challenges and
            opportunities
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className='bg-brand-white border border-brand-deep/10 rounded-[4px] p-6 hover:border-brand-deep/30 transition-colors'
            >
              <div className='text-brand-sage mb-4'>{useCase.icon}</div>
              <h3 className='text-lg md:text-xl font-semibold mb-2'>
                {useCase.title}
              </h3>
              <p className='text-sm text-brand-deep/70'>
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Optional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='text-center mt-16'
        >
          <p className='text-brand-deep/70 mb-6'>
            Don&apos;t see your specific use case? We can build custom AI agents
            for any business need.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
