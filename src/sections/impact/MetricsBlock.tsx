"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MetricsBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const metrics = [
    {
      value: "94%",
      description: "Average increase in user engagement across our products",
      delay: 0.1,
    },
    {
      value: "$12M+",
      description:
        "Revenue generated for clients through our digital solutions",
      delay: 0.2,
    },
    {
      value: "6.2x",
      description: "Average ROI for clients within the first year",
      delay: 0.3,
    },
    {
      value: "3.5M+",
      description: "Total users impacted by our solutions worldwide",
      delay: 0.4,
    },
  ];

  return (
    <section
      ref={ref}
      className='py-20 bg-linear-to-b from-[#F4EBE0] to-white'
    >
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16 max-w-4xl mx-auto'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-[#3F4697] mb-4'>
            Measurable Impact
          </h2>
          <p className='text-lg text-gray-600'>
            Our solutions deliver tangible results that drive business growth
            and enhance user experiences
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: metric.delay }}
              className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#CFF39E]/30 group'
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                transition={{ duration: 0.4, delay: metric.delay + 0.1 }}
              >
                <span className='block text-5xl md:text-6xl font-bold text-[#3F4697] mb-4 group-hover:text-[#3F4697]/90 transition-colors duration-300'>
                  {metric.value}
                </span>
                <p className='text-gray-700'>{metric.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
