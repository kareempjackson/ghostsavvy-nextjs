"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ApproachIntroProps {
  kicker: string;
  title: string;
  subtitle: string;
  videoSrc?: string; // Optional video source
}

const ApproachIntro = ({
  kicker,
  title,
  subtitle,
  videoSrc,
}: ApproachIntroProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation values for scroll effects - start earlier in the scroll
  const videoOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.8]);
  const videoBlur = useTransform(scrollYProgress, [0.3, 0.6], [0, 8]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

  // Reference to the video element
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Add event listeners for debugging
      video.addEventListener("error", (e) => {
        console.error("Video error:", e);
        setVideoError("Failed to load video");
      });

      video.addEventListener("loadeddata", () => {
        console.log("Video loaded successfully");
        setVideoError(null);
      });

      // Attempt to play the video
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playing successfully");
          })
          .catch((error) => {
            console.error("Video play failed:", error);
            setVideoError("Failed to play video");
          });
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative w-full h-[85vh] sm:h-screen overflow-hidden bg-black'
      style={{ marginTop: "-1px" }}
    >
      {/* Background Video */}
      <motion.div
        className='absolute inset-0 w-full h-full z-0'
        style={{
          opacity: videoOpacity,
          filter: `blur(${videoBlur}px)`,
          transition: "filter 0.3s ease-out",
        }}
      >
        {videoError ? (
          <div className='w-full h-full bg-black flex items-center justify-center'>
            <p className='text-white/50 text-sm'>{videoError}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload='auto'
            className='w-full h-full object-cover'
            src={videoSrc || "/videos/GS2.mp4"}
          />
        )}
        {/* Enhanced dark overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black'>
          <div className='absolute inset-0 bg-[#00ff9d]/5 mix-blend-overlay' />
        </div>
      </motion.div>

      {/* Text Container with enhanced animations */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className='relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center'
      >
        <div className='max-w-4xl'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-xs sm:text-sm md:text-base font-display tracking-widest text-[#00ff9d] uppercase mb-3 sm:mb-4 font-bold'
          >
            {kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display text-white mb-4 sm:mb-6 font-bold leading-tight'
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium px-2'
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default ApproachIntro;
