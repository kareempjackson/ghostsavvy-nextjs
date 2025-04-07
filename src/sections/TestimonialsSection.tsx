"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The Ghost Savvy team completely reimagined our platform's experience. They delivered a design that not only looks exceptional but actually solves real problems for our users.",
    author: "Sarah Chen",
    position: "Founder",
    company: "Lore",
    image: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    quote:
      "What impressed me most was how they balanced creative vision with technical feasibility. The result was an elegant product that our developers could actually implement without compromise.",
    author: "Michael Reeves",
    position: "CEO",
    company: "Trekker",
    image: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    quote:
      "Working with Ghost Savvy transformed how we approach product development. Their focus on both aesthetics and metrics delivered a 40% increase in conversion within three months.",
    author: "Alicia Torres",
    position: "Head of Product",
    company: "Medz",
    image: "/images/testimonial-3.jpg",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);

  // Animation based on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.8], [50, 0, 0]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0, 1, 1, 0]
  );

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      ref={sectionRef}
      className='py-32 bg-[#F9F8F4] relative overflow-hidden'
    >
      {/* Subtle background patterns - more minimal */}
      <div className='absolute inset-0 overflow-hidden opacity-5'>
        <div className='absolute -left-[10%] -top-[10%] w-[50%] h-[50%] border border-[#152B24]/10'></div>
        <div className='absolute -right-[5%] -bottom-[10%] w-[40%] h-[40%] border border-[#152B24]/10'></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className='max-w-5xl mx-auto mb-24'
        >
          <div className='text-center'>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#152B24] tracking-wide mb-6'>
              Trusted by Builders
            </h2>
            <p className='text-[#152B24]/70 text-lg max-w-xl mx-auto'>
              What our partners say about working with Ghost Savvy Studios
            </p>
          </div>
        </motion.div>

        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ opacity: textOpacity, scale: bgScale }}
              className='max-w-4xl mx-auto'
            >
              <div className='flex flex-col items-center'>
                {/* Quote mark */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className='mb-8'
                >
                  <svg
                    className='h-16 w-16 text-[#D6FA9F]'
                    viewBox='0 0 32 32'
                    fill='currentColor'
                  >
                    <path d='M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.7 1.3-3 3-3h2V8h-3zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.7 1.3-3 3-3h2V8h-3z' />
                  </svg>
                </motion.div>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className='text-center mb-12'
                >
                  <p className='text-2xl md:text-3xl lg:text-4xl text-[#152B24] leading-tight md:leading-tight lg:leading-tight font-display font-light tracking-wide mb-12'>
                    {activeTestimonial.quote}
                  </p>
                </motion.div>

                {/* Author info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className='flex flex-col items-center'
                >
                  <div className='w-16 h-16 overflow-hidden mb-4 border border-[#D6FA9F]/20'>
                    <Image
                      src={activeTestimonial.image}
                      alt={activeTestimonial.author}
                      width={64}
                      height={64}
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='text-center'>
                    <h4 className='font-medium text-[#152B24] text-lg'>
                      {activeTestimonial.author}
                    </h4>
                    <p className='text-[#152B24]/70 text-sm'>
                      {activeTestimonial.position}, {activeTestimonial.company}
                    </p>
                  </div>

                  {/* Flat stylized signature underline */}
                  <motion.div
                    className='w-24 h-[2px] bg-[#D6FA9F] mt-4'
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls - flat buttons */}
          <div className='flex justify-center mt-16 items-center'>
            <button
              onClick={prevTestimonial}
              className='w-12 h-12 bg-white border border-[#152B24]/10 flex items-center justify-center text-[#152B24] hover:bg-[#D6FA9F]/20 transition-colors mr-4'
              aria-label='Previous testimonial'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            {/* Indicator dots - flatter */}
            <div className='flex space-x-2 mx-4'>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 focus:outline-none ${
                    i === activeIndex
                      ? "w-8 h-1 bg-[#152B24]"
                      : "w-2 h-1 bg-[#152B24]/20 hover:bg-[#152B24]/40"
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className='w-12 h-12 bg-white border border-[#152B24]/10 flex items-center justify-center text-[#152B24] hover:bg-[#D6FA9F]/20 transition-colors ml-4'
              aria-label='Next testimonial'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
