"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface ApproachQuoteProps {
  quote: string;
  ctaText: string;
  ctaLink: string;
}

const ApproachQuote = ({ quote, ctaText, ctaLink }: ApproachQuoteProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgb(255, 255, 255)", "rgb(17, 24, 39)"]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className='relative w-full min-h-screen flex items-center justify-center'
      style={{ backgroundColor: backgroundColor as unknown as string }}
    >
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        className='max-w-4xl mx-auto px-6 text-center'
      >
        <motion.blockquote
          variants={itemVariants}
          className='text-3xl md:text-4xl lg:text-5xl font-display leading-tight mb-16'
          style={{ color: textColor as unknown as string }}
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        <motion.div variants={itemVariants}>
          <Link
            href={ctaLink}
            className='inline-block px-8 py-3 bg-transparent border-2 border-[#00ff9d] hover:bg-[#00ff9d]/10 rounded-full transition-colors duration-300 font-display tracking-wider'
            style={{ color: textColor as unknown as string }}
          >
            {ctaText}
            <span className='ml-2'>→</span>
          </Link>
        </motion.div>

        {/* Subtle decorative elements */}
        <motion.div
          className='absolute top-1/4 left-[15%] w-20 h-20 rounded-full opacity-10 bg-[#00ff9d]'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className='absolute bottom-1/4 right-[15%] w-16 h-16 rounded-full opacity-10 bg-[#00ff9d]'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </motion.section>
  );
};

export default ApproachQuote;
