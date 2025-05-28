"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

// Case studies data
const caseStudies = [
  {
    id: "finaccess-global",
    title: "Revolutionizing Financial Accessibility",
    description:
      "Creating a global financial platform that bridges the accessibility gap for underserved communities worldwide.",
    image: "/images/casestudy-finance.jpg",
    link: "/savvy-impact/project/case-study/finaccess-global",
    category: "Fintech / Social Impact",
  },
  {
    id: "healthcare-connect",
    title: "Healthcare Experience Reimagined",
    description:
      "Transforming patient care with an integrated digital ecosystem that puts user needs at the center of healthcare delivery.",
    image: "/images/casestudy-healthcare.jpg",
    link: "/savvy-impact/project/case-study/healthcare-connect",
    category: "Healthcare / UX Design",
  },
  {
    id: "eco-marketplace",
    title: "Sustainable E-commerce Platform",
    description:
      "Building a marketplace that connects eco-conscious consumers with verified sustainable product options and transparent impact metrics.",
    image: "/images/casestudy-marketplace.jpg",
    link: "/savvy-impact/project/case-study/eco-marketplace",
    category: "E-commerce / Sustainability",
  },
];

export default function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div ref={containerRef} className='py-28 bg-brand-deep overflow-hidden'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: entryEasing }}
          className='max-w-4xl mx-auto text-center mb-16'
        >
          <h2 className='text-5xl md:text-6xl lg:text-7xl text-brand-white font-medium tracking-[-0.02em] leading-[1.1] mb-8'>
            Featured <span className='text-brand-sage'>Case Studies</span>
          </h2>
          <p className='text-xl md:text-2xl text-brand-white/80 leading-normal max-w-3xl mx-auto'>
            Explore in-depth analysis of our most successful projects and the
            transformative impact they&apos;ve had on our clients and their
            users.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16'>
          {caseStudies.map((study, index) => (
            <Link href={study.link} key={study.id} className='group block'>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: entryEasing,
                }}
                className='bg-brand-black/30 backdrop-blur-xs rounded-[4px] overflow-hidden group-hover:shadow-xl transition-shadow duration-300'
              >
                <div className='relative aspect-3/4 overflow-hidden'>
                  <div className='absolute inset-0 bg-linear-to-t from-brand-black to-transparent/30 z-10 opacity-90 group-hover:opacity-80 transition-opacity duration-500'></div>
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover transition-transform duration-1000 group-hover:scale-105'
                  />
                  <div className='absolute bottom-0 left-0 p-8 z-20'>
                    <span className='inline-block px-3 py-1 bg-brand-white/10 backdrop-blur-xs text-xs rounded-[4px] text-brand-white/90 mb-4'>
                      {study.category}
                    </span>
                    <h3 className='text-2xl text-brand-white mb-4 group-hover:text-brand-sage transition-colors duration-300'>
                      {study.title}
                    </h3>
                    <p className='text-brand-white/70 text-base line-clamp-3 mb-6'>
                      {study.description}
                    </p>
                    <span className='inline-flex items-center text-brand-sage'>
                      Read Case Study
                      <svg
                        className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M5 12h14M12 5l7 7-7 7' />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
