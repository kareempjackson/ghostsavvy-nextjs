"use client";

import { motion } from "framer-motion";

// Industry data
const industries = [
  {
    id: "travel",
    name: "Travel",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path d='M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z' />
        <path
          fillRule='evenodd'
          d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15.9a8.25 8.25 0 002.925-6.15 1.875 1.875 0 00-1.416-1.823 2.625 2.625 0 00-1.196.096 1.875 1.875 0 00-1.242 1.242l-.36.96a1.875 1.875 0 01-2.282 1.245 1.875 1.875 0 00-1.303.215l-1.9 1.06A1.875 1.875 0 119 10.77a1.875 1.875 0 01.372-1.727 1.875 1.875 0 011.102-.654l1.38-.276a1.875 1.875 0 011.777.605l.012.013c.29.305.71.465 1.128.475a1.12 1.12 0 00.751-.29l.329-.306a1.875 1.875 0 012.828.136c.218.275.334.61.334.954v.617a8.25 8.25 0 01-13.436 6.355z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
      </svg>
    ),
  },
  {
    id: "b2b",
    name: "B2B SaaS",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path
          fillRule='evenodd'
          d='M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z'
          clipRule='evenodd'
        />
        <path
          fillRule='evenodd'
          d='M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "music",
    name: "Music",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path
          fillRule='evenodd'
          d='M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "ai",
    name: "AI",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path d='M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z' />
        <path
          fillRule='evenodd'
          d='M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3H4.5a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100 1.5.75.75 0 000-1.5z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "marketplace",
    name: "Marketplaces",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path d='M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z' />
        <path
          fillRule='evenodd'
          d='M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path d='M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z' />
        <path
          fillRule='evenodd'
          d='M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "health",
    name: "Health",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-8 h-8'
      >
        <path
          fillRule='evenodd'
          d='M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
];

// Industry Card Component
const IndustryCard = ({
  industry,
  index,
}: {
  industry: (typeof industries)[0];
  index: number;
}) => {
  // Standard easing from brand guidelines
  const standardEasing = [0.25, 0.1, 0.25, 1]; // cubic-bezier(0.25, 0.1, 0.25, 1)

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: standardEasing }}
      className='flex flex-col items-center p-5 bg-brand-white rounded-[4px] border border-brand-forest/10 transition-all'
    >
      <div className='text-brand-forest mb-3'>{industry.icon}</div>
      <h3 className='text-lg font-medium text-center text-brand-forest tracking-[-0.5px]'>
        {industry.name}
      </h3>
    </motion.div>
  );
};

const BuildForSection = () => {
  // Entry easing from brand guidelines
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  return (
    <section className='py-20 bg-brand-ivory'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='mb-16 text-center'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: entryEasing }}
            className='text-4xl md:text-5xl font-display mb-4 text-brand-forest tracking-[-0.5px] leading-[1.1]'
          >
            Where We Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: entryEasing }}
            className='text-xl text-brand-forest/70 max-w-2xl mx-auto leading-[1.5]'
          >
            Our products solve problems across different verticals — all powered
            by strategy, engineering, and user-centered design.
          </motion.p>
        </div>

        {/* Industry Grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
          {industries.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} index={index} />
          ))}
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: entryEasing }}
          className='mt-20 p-10 bg-brand-black rounded-[4px] text-center text-brand-white max-w-3xl mx-auto'
        >
          <h3 className='text-2xl font-display mb-4 tracking-[-0.5px] leading-[1.1]'>
            Our Product Vision
          </h3>
          <p className='text-brand-white/80 leading-[1.5]'>
            Building our own products gives us the freedom to explore new ideas,
            push boundaries, and make a tangible impact. Each product is a
            testament to our commitment to excellence and innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildForSection;
