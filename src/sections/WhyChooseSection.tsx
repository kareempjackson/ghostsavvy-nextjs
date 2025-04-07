"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature = ({ icon, title, description, index }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className='relative p-8 md:p-10 bg-white min-w-[280px] md:min-w-[320px] flex-shrink-0 group'
    >
      {/* Subtle hover effect */}
      <div
        className='absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100'
        style={{
          background:
            "linear-gradient(to right bottom, rgba(214, 250, 159, 0.02), rgba(21, 43, 36, 0.01))",
        }}
      ></div>

      {/* Content */}
      <div className='relative z-10'>
        {/* Icon with premium styling */}
        <div className='mb-8'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            className='text-[#152B24]'
          >
            {icon}
          </motion.div>
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-display font-medium text-[#152B24] tracking-wide'>
            {title}
          </h3>

          <p className='text-[#152B24]/70 leading-relaxed text-sm'>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // For parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Handle horizontal scroll
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  // Features data with premium content
  const features = [
    {
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='6' y='6' width='36' height='36' rx='3' />
          <path d='M6 18H42' />
          <path d='M18 42V18' />
          <rect x='24' y='24' width='12' height='12' />
          <rect x='24' y='24' width='12' height='6' />
        </svg>
      ),
      title: "Crafted Architecture",
      description:
        "Bespoke systems that adapt and scale with your business vision, from initial concept to fully-realized platform.",
    },
    {
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='24' cy='24' r='20' />
          <path d='M24 13V24L31 31' />
          <path d='M6 24H8' />
          <path d='M40 24H42' />
          <path d='M24 6V8' />
          <path d='M24 40V42' />
        </svg>
      ),
      title: "Refined Efficiency",
      description:
        "Products that deliver measurable results through thoughtful design and meticulous attention to performance and usability.",
    },
    {
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M16 12L24 6L32 12L24 18L16 12Z' />
          <path d='M32 12L40 18L32 24L24 18' />
          <path d='M24 18L16 24L8 18L16 12' />
          <path d='M24 18V30' />
          <path d='M24 30L16 36L8 30' />
          <path d='M24 30L32 36L40 30' />
        </svg>
      ),
      title: "Seamless Integration",
      description:
        "We create harmony between systems, ensuring your entire technology ecosystem works together with sophisticated precision.",
    },
    {
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M6 6L42 42' />
          <path d='M33 6H42V15' />
          <path d='M15 42H6V33' />
          <path d='M14 14L34 34' />
          <rect x='26' y='6' width='6' height='6' rx='1' />
          <rect x='38' y='18' width='6' height='6' rx='1' />
          <rect x='16' y='38' width='6' height='6' rx='1' />
          <rect x='4' y='26' width='6' height='6' rx='1' />
        </svg>
      ),
      title: "Artful Excellence",
      description:
        "We maintain impeccable standards through meticulous craft and discerning attention to every aspect of product creation.",
    },
    {
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M42 18L33.5 9.5C32.8 8.8 31.9 8.3 30.9 8.1C29.9 7.9 28.9 8.1 28 8.5L22 12L14 8L6 16L10 24L6.5 31C6.2 31.9 6.1 32.9 6.3 33.9C6.5 34.9 7 35.8 7.7 36.5L16 44.8L37 25.8' />
          <circle cx='30' cy='18' r='3' />
          <path d='M19 25L25 31' />
        </svg>
      ),
      title: "Curated Experience",
      description:
        "We handcraft every interaction to ensure a smooth, delightful experience that resonates with your users.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='relative py-32 overflow-hidden bg-[#FAFAFA]'
    >
      {/* Premium subtle background texture */}
      <div
        className='absolute inset-0 z-0 opacity-[0.015]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23152B24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className='text-center mb-24'
        >
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-display font-medium text-[#152B24] tracking-wide mb-8'>
            Why Ghost Savvy
          </h2>
          <p className='text-[#152B24]/70 text-xl max-w-xl mx-auto'>
            Where vision meets exceptional craft
          </p>
        </motion.div>

        {/* Horizontal scrolling features section */}
        <div className='relative mb-24'>
          {/* Scroll buttons - premium style */}
          <div className='hidden lg:block'>
            <button
              onClick={() => handleScroll("left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-14 h-14 bg-white flex items-center justify-center text-[#152B24] hover:text-[#152B24]/70 transition-colors'
              aria-label='Scroll left'
            >
              <svg
                className='w-6 h-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-14 h-14 bg-white flex items-center justify-center text-[#152B24] hover:text-[#152B24]/70 transition-colors'
              aria-label='Scroll right'
            >
              <svg
                className='w-6 h-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className='flex gap-10 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x'
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Left padding for aesthetics */}
            <div className='w-8 md:w-[10%] lg:w-[5%] flex-shrink-0'></div>

            {/* Features */}
            {features.map((feature, index) => (
              <div key={index} className='snap-start'>
                <Feature
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              </div>
            ))}

            {/* Right padding for aesthetics */}
            <div className='w-8 md:w-[10%] lg:w-[5%] flex-shrink-0'></div>
          </div>

          {/* Scroll indicator - elegant style */}
          <div className='mt-16 flex justify-center items-center'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-[0.5px] bg-[#152B24]/20'></div>
              <span className='text-xs tracking-widest uppercase text-[#152B24]/40'>
                Explore
              </span>
              <div className='w-8 h-[0.5px] bg-[#152B24]/20'></div>
            </div>
          </div>
        </div>

        {/* CTA section - premium style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className='relative bg-white p-16 md:p-20 mt-16 max-w-5xl mx-auto'
        >
          <div className='grid grid-cols-1 md:grid-cols-5 gap-12 items-center relative z-10'>
            <div className='md:col-span-3'>
              <h3 className='text-3xl font-display font-medium text-[#152B24] mb-6'>
                Ready to build something exceptional?
              </h3>
              <p className='text-[#152B24]/70 leading-relaxed'>
                Let&apos;s create something amazing together that captivates
                your users and drives your business forward.
              </p>
            </div>

            <div className='md:col-span-2 flex flex-col sm:flex-row gap-4'>
              <Link
                href='/contact'
                className='px-8 py-3 bg-[#152B24] text-white hover:bg-[#152B24]/90 transition-all duration-300 text-center font-medium'
              >
                Start a Project
              </Link>
              <Link
                href='/process'
                className='px-8 py-3 bg-white border border-[#152B24]/10 text-[#152B24] hover:border-[#152B24]/30 transition-all duration-300 text-center'
              >
                Our Process
              </Link>
            </div>
          </div>

          {/* Premium subtle decorative accent */}
          <div className='absolute top-0 left-0 w-20 h-1 bg-[#D6FA9F]/40'></div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
