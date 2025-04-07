"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GhostLoaderProps {
  isLoading?: boolean;
  onLoadingComplete?: () => void;
  fullScreen?: boolean;
  delay?: number;
  minDuration?: number;
}

const GhostLoader = ({
  isLoading: propIsLoading,
  onLoadingComplete,
  fullScreen = true,
  delay = 0,
  minDuration = 1500,
}: GhostLoaderProps) => {
  const [isLoading, setIsLoading] = useState(
    propIsLoading !== undefined ? propIsLoading : true
  );
  const hasCompletedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const minDurationTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only start the timer if we're using the component for page transitions
    if (propIsLoading === undefined) {
      // Set a delay before we start the minimum duration timer
      timerRef.current = setTimeout(() => {
        // Set a minimum duration for the loading animation
        minDurationTimerRef.current = setTimeout(() => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setIsLoading(false);
            if (onLoadingComplete) onLoadingComplete();
          }
        }, minDuration);
      }, delay);
    } else {
      // If isLoading is provided as a prop, respect it directly
      setIsLoading(propIsLoading);
      if (!propIsLoading && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 800); // Slight delay to allow exit animation
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (minDurationTimerRef.current)
        clearTimeout(minDurationTimerRef.current);
    };
  }, [propIsLoading, onLoadingComplete, minDuration, delay]);

  // Enhanced glitch effect variants
  const glitchVariants = {
    initial: { x: 0, y: 0, opacity: 1 },
    glitch: {
      x: [0, -3, 5, -2, 0, 4, -4, 1, -1, 0],
      y: [0, 2, -2, 3, -1, 0, 2, -3, 1, 0],
      opacity: [1, 0.7, 1, 0.8, 1, 0.9, 0.7, 1, 0.8, 1],
      scale: [1, 1.02, 0.98, 1.01, 1, 0.99, 1.03, 0.97, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
      },
    },
  };

  // Enhanced RGB split variants
  const rgbSplitVariants = {
    initial: { x: 0, opacity: 0 },
    animate: {
      opacity: [0, 0.5, 0.2, 0.4, 0, 0.3, 0.1, 0],
      x: [-3, 2, -2, 0, 3, -2, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      },
    },
  };

  // Noise overlay animation
  const noiseVariants = {
    animate: {
      opacity: [0.05, 0.1, 0.05, 0.15, 0.05],
      backgroundPosition: [
        "0% 0%",
        "100% 100%",
        "200% 50%",
        "0% 100%",
        "0% 0%",
      ],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  return (
    <AnimatePresence mode='wait'>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
          }}
          className={`${
            fullScreen ? "fixed inset-0" : "absolute inset-0"
          } z-50 flex flex-col items-center justify-center bg-black`}
        >
          {/* Noise overlay */}
          <motion.div
            className='absolute inset-0 z-0 opacity-5'
            style={{
              backgroundImage: 'url("/images/noise-texture.png")',
              backgroundSize: "200px",
              mixBlendMode: "overlay",
            }}
            variants={noiseVariants}
            animate='animate'
          />

          {/* Occasional scan lines */}
          <motion.div
            className='absolute inset-0 z-0 opacity-10'
            style={{
              backgroundImage:
                "linear-gradient(transparent 50%, rgba(0, 255, 255, 0.05) 50%)",
              backgroundSize: "4px 4px",
              mixBlendMode: "overlay",
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
            className='relative flex flex-col items-center'
          >
            {/* Ghost Icon Container - Smaller size */}
            <div className='relative w-10 h-14 sm:w-11 sm:h-15'>
              {/* RGB Split effect - Red channel */}
              <motion.div
                className='absolute inset-0 left-[-3px]'
                style={{
                  filter: "brightness(1.3) contrast(1.7)",
                  mixBlendMode: "screen",
                }}
                variants={rgbSplitVariants}
                initial='initial'
                animate='animate'
              >
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 165 257'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  style={{ opacity: 0.7, color: "#ff0000" }}
                >
                  <g>
                    <path
                      d='M82.5 0C36.9371 0 0 36.9371 0 82.5C0 128.063 36.9371 165 82.5 165C128.063 165 165 128.063 165 82.5C165 36.9371 128.063 0 82.5 0ZM82.5 114.737C68.3844 114.737 56.9393 100.305 56.9393 82.5C56.9393 64.6953 68.3844 50.263 82.5 50.263C96.6156 50.263 108.061 64.6953 108.061 82.5C108.061 100.305 96.6156 114.737 82.5 114.737Z'
                      fill='currentColor'
                    />
                    <path
                      d='M108.01 176.018C107.212 192.911 96.0953 206.301 82.4985 206.301C68.9017 206.301 57.7847 192.911 56.9874 176.018H0.0175781C1.05527 220.68 37.5842 256.56 82.4985 256.56C127.413 256.56 163.934 220.68 164.972 176.018H108.01Z'
                      fill='currentColor'
                    />
                  </g>
                </svg>
              </motion.div>

              {/* RGB Split effect - Blue channel */}
              <motion.div
                className='absolute inset-0 left-[3px]'
                style={{
                  filter: "brightness(1.3) contrast(1.7)",
                  mixBlendMode: "screen",
                }}
                variants={rgbSplitVariants}
                initial='initial'
                animate='animate'
                custom={1}
              >
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 165 257'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  style={{ opacity: 0.7, color: "#0000ff" }}
                >
                  <g>
                    <path
                      d='M82.5 0C36.9371 0 0 36.9371 0 82.5C0 128.063 36.9371 165 82.5 165C128.063 165 165 128.063 165 82.5C165 36.9371 128.063 0 82.5 0ZM82.5 114.737C68.3844 114.737 56.9393 100.305 56.9393 82.5C56.9393 64.6953 68.3844 50.263 82.5 50.263C96.6156 50.263 108.061 64.6953 108.061 82.5C108.061 100.305 96.6156 114.737 82.5 114.737Z'
                      fill='currentColor'
                    />
                    <path
                      d='M108.01 176.018C107.212 192.911 96.0953 206.301 82.4985 206.301C68.9017 206.301 57.7847 192.911 56.9874 176.018H0.0175781C1.05527 220.68 37.5842 256.56 82.4985 256.56C127.413 256.56 163.934 220.68 164.972 176.018H108.01Z'
                      fill='currentColor'
                    />
                  </g>
                </svg>
              </motion.div>

              {/* Main ghost SVG with enhanced glitch animation */}
              <motion.div
                className='relative z-10'
                variants={glitchVariants}
                initial='initial'
                animate='glitch'
              >
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 165 257'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g>
                    <motion.path
                      d='M82.5 0C36.9371 0 0 36.9371 0 82.5C0 128.063 36.9371 165 82.5 165C128.063 165 165 128.063 165 82.5C165 36.9371 128.063 0 82.5 0ZM82.5 114.737C68.3844 114.737 56.9393 100.305 56.9393 82.5C56.9393 64.6953 68.3844 50.263 82.5 50.263C96.6156 50.263 108.061 64.6953 108.061 82.5C108.061 100.305 96.6156 114.737 82.5 114.737Z'
                      fill='white'
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: {
                            delay: 0.1,
                            duration: 1.2,
                            ease: "easeInOut",
                          },
                          opacity: { delay: 0.1, duration: 0.5 },
                        },
                      }}
                    />
                    <motion.path
                      d='M108.01 176.018C107.212 192.911 96.0953 206.301 82.4985 206.301C68.9017 206.301 57.7847 192.911 56.9874 176.018H0.0175781C1.05527 220.68 37.5842 256.56 82.4985 256.56C127.413 256.56 163.934 220.68 164.972 176.018H108.01Z'
                      fill='white'
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: {
                            delay: 0.6,
                            duration: 1.2,
                            ease: "easeInOut",
                          },
                          opacity: { delay: 0.6, duration: 0.5 },
                        },
                      }}
                    />
                  </g>
                </svg>
              </motion.div>

              {/* Enhanced glitch lines - more of them, more random */}
              <motion.div
                className='absolute inset-0 overflow-hidden opacity-20'
                animate={{ opacity: [0.2, 0.1, 0.3, 0, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className='absolute h-[1px] bg-cyan-400 w-full'
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: 0,
                      height: `${Math.random() * 2 + 1}px`,
                    }}
                    animate={{
                      scaleX: [0, 1, 0],
                      x: ["-100%", "100%"],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: Math.random() * 0.3 + 0.2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 3 + 1,
                    }}
                  />
                ))}
              </motion.div>

              {/* Enhanced animated dot in the center of the ghost */}
              <motion.div
                className='absolute left-1/2 top-[40%] w-[3px] h-[3px] rounded-full bg-[#00fff2]'
                style={{ x: "-50%", y: "-50%" }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 1, 0.7],
                  filter: [
                    "drop-shadow(0 0 1px #00fff2)",
                    "drop-shadow(0 0 5px #00fff2)",
                    "drop-shadow(0 0 1px #00fff2)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Loading text with enhanced glitch effect */}
            <motion.div
              className='mt-3 font-mono text-[10px] uppercase tracking-widest text-white/70'
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.4, duration: 0.4 },
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className='relative inline-block'
              >
                <span className='relative z-10'>Loading</span>
                <motion.span
                  className='absolute left-0 top-0 text-cyan-400'
                  animate={{
                    x: [0, -2, 2, -1, 0],
                    y: [0, 1, -1, 0],
                    opacity: [0, 0.7, 0, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    repeatDelay: 1.5,
                  }}
                >
                  Loading
                </motion.span>
                <motion.span
                  className='absolute left-0 top-0 text-red-400'
                  animate={{
                    x: [0, 2, -2, 1, 0],
                    y: [0, -1, 1, 0],
                    opacity: [0, 0.5, 0, 0.7, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    repeatDelay: 1.2,
                  }}
                >
                  Loading
                </motion.span>
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GhostLoader;
