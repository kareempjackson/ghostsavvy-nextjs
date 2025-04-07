"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MouseFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set up motion values for the mouse cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Create springs for smoother motion
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on client-side
    setIsMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Listen for hover events on interactive elements
    const handleElementHover = () => {
      setIsHovering(true);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
    };

    // Add mouse movement event listener
    window.addEventListener("mousemove", moveCursor);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, [role="button"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className='pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center will-change-transform'
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Inner circle */}
        <motion.div
          className='absolute rounded-full bg-[#3844A5] mix-blend-difference'
          initial={{ width: 8, height: 8, opacity: 0.5 }}
          animate={{
            width: isHovering ? 60 : 12,
            height: isHovering ? 60 : 12,
            opacity: 0.7,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />

        {/* Outer circle */}
        <motion.div
          className='absolute rounded-full border border-[#3844A5]/30'
          initial={{ width: 40, height: 40, opacity: 0 }}
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isHovering ? 0.4 : 0.15,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        />

        {/* Animated particles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full bg-[#3844A5]/20'
            initial={{
              width: 4,
              height: 4,
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              width: isHovering ? 8 : 4,
              height: isHovering ? 8 : 4,
              x: isHovering
                ? [i % 2 ? 20 : -20, 0, i % 2 ? -30 : 30][i % 3]
                : 0,
              y: isHovering
                ? [i > 1 ? 20 : -20, 0, i > 1 ? -30 : 30][i % 3]
                : 0,
              opacity: isHovering ? 0.7 : 0,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Hide default cursor when ours is active */}
      <style jsx global>{`
        @media (min-width: 1025px) {
          body {
            cursor: none !important;
          }

          a,
          button,
          input,
          select,
          [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default MouseFollower;
