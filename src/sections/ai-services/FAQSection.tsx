"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// FAQ data
const faqItems = [
  {
    question: "Do I need to know AI or LLMs to get started?",
    answer:
      "Not at all. Our team handles all the technical aspects of AI development. We'll work with you to understand your business needs and translate them into an effective AI solution. You provide the domain expertise, and we'll handle the AI implementation.",
  },
  {
    question: "Can I integrate this into my own SaaS?",
    answer:
      "Absolutely. We build custom AI solutions designed to integrate seamlessly with your existing SaaS platform. We can develop agents that connect to your API, database, or front-end UI, creating a cohesive product experience for your users.",
  },
  {
    question: "What's included in the delivery?",
    answer:
      "Our standard delivery includes the fully functional AI agent, necessary API connections, front-end interface (if applicable), documentation, and deployment to your infrastructure. We also provide training for your team and a period of post-launch support to ensure everything runs smoothly.",
  },
  {
    question: "How long does it take to launch an agent?",
    answer:
      "Most projects can be completed in 4-8 weeks, depending on complexity and integration requirements. Simple agents can be developed in as little as 2-3 weeks, while more complex solutions with multiple integrations may take 8-12 weeks. We'll provide a clear timeline during our discovery process.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We offer ongoing support and maintenance packages to ensure your AI solution continues to perform optimally. This includes monitoring, updates, performance optimization, and adding new features as your needs evolve.",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FAQSection() {
  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className='bg-brand-ivory text-brand-forest py-20 md:py-24'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className='container mx-auto px-5vw'
      >
        {/* Section title */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Frequently Asked Questions
          </h2>
          <p className='text-lg text-brand-forest/70 max-w-2xl mx-auto'>
            Everything you need to know about our AI services
          </p>
        </div>

        {/* FAQ accordions */}
        <div className='max-w-3xl mx-auto'>
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              custom={index}
              className={`
                border-b border-brand-forest/10 py-6
                ${index === 0 ? "border-t" : ""}
              `}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full flex justify-between items-center text-left focus:outline-none'
              >
                <h3 className='text-xl font-semibold'>{item.question}</h3>
                <span className='ml-4 flex-shrink-0'>
                  <svg
                    className={`w-6 h-6 transition-transform ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div
                className={`
                  mt-2 overflow-hidden transition-all duration-300 ease-in-out
                  ${activeIndex === index ? "max-h-96" : "max-h-0"}
                `}
              >
                <p className='text-brand-forest/70 pt-2 pb-1'>{item.answer}</p>
              </div>
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
          <p className='text-brand-forest/70'>
            Have more questions?{" "}
            <a href='/contact' className='text-brand-sage font-semibold'>
              Get in touch
            </a>{" "}
            and we&apos;ll be happy to help.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
