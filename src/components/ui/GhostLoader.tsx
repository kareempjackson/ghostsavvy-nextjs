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

  return (
    <AnimatePresence mode='wait'>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
          }}
          className={`${
            fullScreen ? "fixed inset-0" : "absolute inset-0"
          } z-50 flex flex-col items-center justify-center bg-black`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
            className='relative flex flex-col items-center'
          >
            {/* Ghost Icon Container */}
            <div className='relative w-16 h-20 md:w-20 md:h-28'>
              {/* Circular pulse behind the ghost */}
              <motion.div
                className='absolute inset-0 flex items-center justify-center'
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <div className='w-full h-full rounded-full bg-white/5'></div>
              </motion.div>

              {/* Ghost SVG with animated paths */}
              <svg
                width='100%'
                height='100%'
                viewBox='0 0 165 257'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='relative z-10'
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
                          delay: 0.2,
                          duration: 1.5,
                          ease: "easeInOut",
                        },
                        opacity: { delay: 0.2, duration: 0.6 },
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
                          delay: 0.8,
                          duration: 1.5,
                          ease: "easeInOut",
                        },
                        opacity: { delay: 0.8, duration: 0.6 },
                      },
                    }}
                  />
                </g>
              </svg>

              {/* Animated dot in the center of the ghost */}
              <motion.div
                className='absolute left-1/2 top-[40%] w-1.5 h-1.5 rounded-full bg-[#00ff9d]'
                style={{ x: "-50%", y: "-50%" }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Loading text */}
            <motion.div
              className='mt-6 font-display text-sm uppercase tracking-widest text-white/60'
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.6, duration: 0.5 },
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              >
                Loading
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GhostLoader;
