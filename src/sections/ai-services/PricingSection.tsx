"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Pricing models data
const pricingModels = [
  {
    title: "Starter Project",
    price: "$5K – $15K",
    description:
      "One-off agent scoped and deployed to meet your specific needs",
    features: [
      "Custom AI agent implementation",
      "Integration with one primary data source",
      "Basic user interface",
      "Testing and deployment",
      "30 days of support post-launch",
    ],
    cta: "Book Discovery Call",
    popular: false,
    link: "/contact",
  },
  {
    title: "Ongoing Partnership",
    price: "$5K – $10K",
    period: "per month",
    description:
      "Monthly AI design and development subscription for continuous improvement",
    features: [
      "Dedicated AI development team",
      "Multiple agent development",
      "Complex integrations",
      "Advanced UI/UX design",
      "Weekly strategy calls",
      "Continuous improvements",
      "Priority support",
    ],
    cta: "Book Discovery Call",
    popular: true,
    link: "/contact",
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
      delay: 0.2 * i,
    },
  }),
};

export default function PricingSection() {
  return (
    <section className='bg-brand-black text-brand-white py-20 md:py-24'>
      <div className='container mx-auto px-5vw'>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Flexible Engagement Models
          </h2>
          <p className='text-lg text-brand-white/70 max-w-2xl mx-auto'>
            Choose the AI development approach that works best for your timeline
            and goals
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {pricingModels.map((model, index) => (
            <motion.div
              key={model.title}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className={`
                bg-brand-black border rounded-[4px] p-8 
                ${model.popular ? "border-brand-sage" : "border-brand-white/10"}
                ${model.popular ? "relative" : ""}
              `}
            >
              {/* Popular badge */}
              {model.popular && (
                <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-sage text-brand-black text-xs font-bold py-1 px-3 rounded-full'>
                  Recommended
                </div>
              )}

              <h3 className='text-2xl font-bold mb-2'>{model.title}</h3>
              <div className='mb-4'>
                <span className='text-3xl font-bold'>{model.price}</span>
                {model.period && (
                  <span className='text-brand-white/50 ml-1'>
                    {model.period}
                  </span>
                )}
              </div>
              <p className='text-brand-white/70 mb-6'>{model.description}</p>

              {/* Features */}
              <ul className='mb-8 space-y-3'>
                {model.features.map((feature, i) => (
                  <li key={i} className='flex items-start'>
                    <svg
                      className='w-5 h-5 text-brand-sage shrink-0 mr-2 mt-0.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span className='text-brand-white/80'>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Link
                href={model.link}
                className={`
                  inline-block w-full text-center py-3 px-6 rounded-[4px] font-semibold transition-colors
                  ${
                    model.popular
                      ? "bg-brand-sage text-brand-white hover:bg-brand-sage/90"
                      : "bg-brand-black text-brand-white border border-brand-white/20 hover:border-brand-sage hover:text-brand-sage"
                  }
                `}
              >
                {model.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='text-center mt-12 text-brand-white/70'
        >
          <p>
            Custom pricing based on scope and requirements.{" "}
            <Link href='/contact' className='text-brand-sage underline'>
              Contact us
            </Link>{" "}
            for a personalized quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
