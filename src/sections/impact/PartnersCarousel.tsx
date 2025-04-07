"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function PartnersCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);

  const partners = [
    {
      name: "HealthTech Innovations",
      logo: "/images/partners/partner-1-logo.png",
      tag: "Healthcare Technology",
    },
    {
      name: "Sustainable Solutions",
      logo: "/images/partners/partner-2-logo.png",
      tag: "Environmental Tech",
    },
    {
      name: "Quantum Finance",
      logo: "/images/partners/partner-3-logo.png",
      tag: "Financial Services",
    },
    {
      name: "Urban Smart Systems",
      logo: "/images/partners/partner-4-logo.png",
      tag: "Smart City Solutions",
    },
    {
      name: "Global Education Network",
      logo: "/images/partners/partner-5-logo.png",
      tag: "EdTech",
    },
    {
      name: "Connected Commerce",
      logo: "/images/partners/partner-6-logo.png",
      tag: "E-commerce",
    },
  ];

  return (
    <section
      ref={ref}
      className='py-16 bg-white border-t border-b border-gray-100'
    >
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-2xl font-semibold text-[#3F4697] mb-2'>
            Partners in Impact
          </h2>
          <p className='text-gray-600'>
            Organizations we've helped create meaningful change
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='flex flex-wrap justify-center items-center gap-x-16 gap-y-10'
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className='relative'
              onMouseEnter={() => setHoveredLogo(index)}
              onMouseLeave={() => setHoveredLogo(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className='relative h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300'>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className='object-contain'
                  onError={(e) => {
                    // Fallback for missing logos
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/partners/placeholder-logo.png";
                  }}
                />
              </div>

              {/* Hover Tag */}
              {hoveredLogo === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#3F4697] text-white text-xs py-1 px-3 rounded-full whitespace-nowrap z-10'
                >
                  {partner.tag}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
