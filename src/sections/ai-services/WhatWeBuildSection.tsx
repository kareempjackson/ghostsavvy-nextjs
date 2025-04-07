"use client";

import { motion } from "framer-motion";

// Service data
const services = [
  {
    title: "Custom AI Agents",
    description:
      "Purpose-built LLM agents trained for your specific workflows and business needs",
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
          d='M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "AI-Powered Interfaces",
    description:
      "Design & development of chat-based or dynamic UIs that leverage AI capabilities",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M3 8L10 13L21 2'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21 12V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H15'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "Internal Tools & Ops Automation",
    description:
      "Connect AI agents to databases, CRMs, APIs, and existing workflows",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M12 12L19 19M12 5V12V5ZM12 12L5 19L12 12Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx='12' cy='3' r='2' stroke='currentColor' strokeWidth='2' />
        <circle cx='19' cy='19' r='2' stroke='currentColor' strokeWidth='2' />
        <circle cx='5' cy='19' r='2' stroke='currentColor' strokeWidth='2' />
      </svg>
    ),
  },
  {
    title: "Agent-as-a-Feature",
    description:
      "Embed AI directly into your product experience to enhance user value",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7 9H17'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7 13H17'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7 17H12'
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
      delay: 0.1 * i,
    },
  }),
};

export default function WhatWeBuildSection() {
  return (
    <section className='bg-brand-black py-20 md:py-24'>
      <div className='container mx-auto px-5vw'>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>What We Build</h2>
          <p className='text-lg text-brand-white/70 max-w-2xl mx-auto'>
            Expertly crafted AI solutions designed to integrate seamlessly with
            your business
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className='bg-brand-black border border-brand-white/10 rounded-[4px] p-6 md:p-8 hover:border-brand-sage/30 transition-colors'
            >
              <div className='text-brand-sage mb-4'>{service.icon}</div>
              <h3 className='text-xl md:text-2xl font-semibold mb-3'>
                {service.title}
              </h3>
              <p className='text-brand-white/70'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
