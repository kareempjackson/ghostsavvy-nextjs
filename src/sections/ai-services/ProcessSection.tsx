"use client";

import { motion } from "framer-motion";

// Process steps data
const processSteps = [
  {
    number: "01",
    title: "Strategy & Scoping",
    description:
      "We identify use cases, workflows, and goals to determine the optimal AI solution for your business needs.",
  },
  {
    number: "02",
    title: "Agent Design",
    description:
      "Our team crafts custom prompt engineering, tool design, and flow logic for your specific requirements.",
  },
  {
    number: "03",
    title: "Development & Integration",
    description:
      "We build your solution with OpenAI, LangChain, or Claude APIs and integrate it with your existing systems.",
  },
  {
    number: "04",
    title: "Testing & Launch",
    description:
      "Through iteration and feedback loops, we refine and deploy your AI solution for maximum effectiveness.",
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

export default function ProcessSection() {
  return (
    <section className='bg-brand-ivory text-brand-deep py-20 md:py-24'>
      <div className='container mx-auto px-5vw'>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>Our Process</h2>
          <p className='text-lg text-brand-deep/70 max-w-2xl mx-auto'>
            A methodical approach to creating AI solutions that deliver real
            value
          </p>
        </motion.div>

        {/* Process steps */}
        <div className='max-w-5xl mx-auto'>
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className='mb-10 md:mb-16 last:mb-0'
            >
              <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
                {/* Step number */}
                <div className='flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-brand-sage/10 rounded-full'>
                  <span className='text-xl md:text-2xl font-bold text-brand-sage'>
                    {step.number}
                  </span>
                </div>

                {/* Step content */}
                <div className='flex-1'>
                  <h3 className='text-xl md:text-2xl font-semibold mb-2'>
                    {step.title}
                  </h3>
                  <p className='text-brand-deep/70'>{step.description}</p>
                </div>
              </div>

              {/* Connector line (except for last item) */}
              {index < processSteps.length - 1 && (
                <div className='w-[1px] h-12 md:h-16 bg-brand-deep/10 ml-6 md:ml-8 mt-4'></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Optional diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-16 md:mt-20 bg-brand-deep/5 rounded-[4px] p-6 md:p-8 text-center'
        >
          <p className='text-brand-deep/70 mb-4'>
            Diagram: AI agent + tools + API connections
          </p>
          <div className='h-[200px] md:h-[300px] flex items-center justify-center border border-brand-deep/10 rounded-md'>
            <p className='text-brand-deep/50'>
              Agent Architecture Visualization
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
