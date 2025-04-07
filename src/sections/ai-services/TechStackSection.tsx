"use client";

import { motion } from "framer-motion";

// Tech stack data
const techStack = [
  {
    name: "OpenAI",
    description:
      "GPT-4, GPT-3.5 Turbo, and DALL-E integration for advanced AI capabilities",
    logo: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <path
          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    name: "LangChain",
    description:
      "Framework for developing applications powered by language models",
    logo: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <path
          d='M3 6L10 13L21 2'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21 12V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    name: "Pinecone",
    description: "Vector database for building vector-based AI applications",
    logo: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
        <circle cx='12' cy='12' r='5' stroke='currentColor' strokeWidth='2' />
        <circle cx='12' cy='12' r='2' stroke='currentColor' strokeWidth='2' />
      </svg>
    ),
  },
  {
    name: "Postgres",
    description:
      "Relational database for storing and accessing structured data",
    logo: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <path
          d='M12 8.5V4M12 8.5C10.6193 8.5 9.5 7.38071 9.5 6C9.5 4.61929 10.6193 3.5 12 3.5C13.3807 3.5 14.5 4.61929 14.5 6C14.5 7.38071 13.3807 8.5 12 8.5Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 20.5V16M12 20.5C10.6193 20.5 9.5 19.3807 9.5 18C9.5 16.6193 10.6193 15.5 12 15.5C13.3807 15.5 14.5 16.6193 14.5 18C14.5 19.3807 13.3807 20.5 12 20.5Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18 14.5H20.5M18 14.5C18 13.1193 19.1193 12 20.5 12C21.8807 12 23 13.1193 23 14.5C23 15.8807 21.8807 17 20.5 17C19.1193 17 18 15.8807 18 14.5Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6 14.5H3.5M6 14.5C6 13.1193 4.88071 12 3.5 12C2.11929 12 1 13.1193 1 14.5C1 15.8807 2.11929 17 3.5 17C4.88071 17 6 15.8807 6 14.5Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    description: "React framework for building performant web applications",
    logo: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <path
          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 7L18 7'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 12L18 12'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 17L18 17'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    name: "Auth.js",
    description: "Authentication for Next.js and other frameworks",
    logo: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <path
          d='M12 12L19 19M12 5V12V5ZM12 12L5 19L12 12Z'
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

export default function TechStackSection() {
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
            Powered by the Best Tools
          </h2>
          <p className='text-lg text-brand-white/70 max-w-2xl mx-auto'>
            We leverage industry-leading technologies to build powerful,
            scalable AI solutions
          </p>
        </motion.div>

        {/* Tech stack grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto'>
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className='flex flex-col items-center text-center p-4 md:p-6 bg-brand-black border border-brand-white/10 rounded-[4px] hover:border-brand-sage/30 transition-colors'
            >
              <div className='text-brand-sage mb-4'>{tech.logo}</div>
              <h3 className='text-lg md:text-xl font-semibold mb-2'>
                {tech.name}
              </h3>
              <p className='text-sm text-brand-white/70'>{tech.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='text-center text-brand-white/70 mt-12 max-w-3xl mx-auto'
        >
          We tailor to your stack, your team, and your goals. Our solutions
          adapt to your technical environment.
        </motion.p>
      </div>
    </section>
  );
}
