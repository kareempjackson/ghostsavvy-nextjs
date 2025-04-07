"use client";

import { motion } from "framer-motion";

interface ScrollingMarqueeProps {
  text: string;
  repeat?: number;
  direction?: "left" | "right";
  className?: string;
}

const ScrollingMarquee = ({
  text,
  repeat = 6,
  direction = "left",
  className = "",
}: ScrollingMarqueeProps) => {
  const marqueeVariants = {
    animate: {
      x: direction === "left" ? [0, -1000] : [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <motion.div
        className='whitespace-nowrap flex'
        variants={marqueeVariants}
        animate='animate'
      >
        {Array(repeat)
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              className='inline-block mx-8 text-sm tracking-widest font-light text-[#1C332D]/60'
            >
              {text}
            </span>
          ))}
      </motion.div>
    </div>
  );
};

export default ScrollingMarquee;
