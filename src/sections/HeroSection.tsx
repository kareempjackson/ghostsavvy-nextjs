"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

const LogoImage = ({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className='h-6 px-4 flex-shrink-0 flex items-center justify-center group'
    >
      <Image
        src={src}
        alt={alt}
        width={70}
        height={35}
        className='w-auto h-full object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100'
      />
    </Link>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animation values for scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  // Partner logos to display in the marquee
  const logoImages = [
    {
      src: "/images/logos/licid_logo_white.svg",
      alt: "LICID Logo",
      href: "/work/licid",
    },
    {
      src: "/images/logos/undr_logo_white.png",
      alt: "UNDR Logo",
      href: "/work/undr",
    },
    { src: "/images/logos/logo.svg", alt: "Procur Logo", href: "/work/procur" },
    {
      src: "/images/logos/vynl_logo.svg",
      alt: "VYNL Logo",
      href: "/work/vynl",
    },
    {
      src: "/images/logos/mishmosh_logo.svg",
      alt: "Mishmosh Logo",
      href: "/work/mishmosh",
    },
    {
      src: "/images/logos/Elee full white.svg",
      alt: "Elee Logo",
      href: "/work/elee",
    },
  ];

  return (
    <section
      ref={containerRef}
      className='relative min-h-screen w-full overflow-hidden bg-black flex flex-col justify-center'
    >
      {/* Background Video with Parallax */}
      <motion.div
        className='absolute inset-0 z-0'
        style={{ scale, filter: `blur(${blur}px)` }}
      >
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className='object-cover w-full h-full'
            onError={() => setVideoError(true)}
          >
            <source src='/videos/ghostsavvy-reel.mp4' type='video/mp4' />
            <source src='/videos/hero-background.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className='w-full h-full bg-black' />
        )}

        {/* Dark overlay for better text visibility */}
        <motion.div
          className='absolute inset-0 bg-black/30'
          style={{ opacity: backgroundOpacity }}
        />
        {/* Gradient overlay for smooth transition */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black' />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className='relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-[90%] mx-auto py-32 pt-[180px] mt-32'
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: entryEasing }}
          className='max-w-4xl'
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: entryEasing }}
            className='text-3xl md:text-4xl lg:text-6xl text-brand-white leading-[1.2] mb-16 tracking-[-0.2px]'
          >
            Solving Real-World Problems
            <br />
            <span className='mt-4 inline-block'>
              Through Design and Technology
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: entryEasing }}
            className='flex flex-wrap justify-center gap-8'
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='relative group'
            >
              <div className='absolute inset-0 bg-brand-sage rounded-[4px] blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300'></div>
              <Link
                href='/work'
                className='relative px-6 py-3 bg-brand-sage text-brand-forest rounded-[4px] transition-all duration-300 text-sm inline-flex items-center group-hover:bg-brand-sage/90 group-hover:translate-y-[-2px] group-hover:text-brand-forest/90 font-medium'
              >
                Explore Our Work
                <svg
                  className='ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='relative group'
            >
              <div className='absolute inset-0 bg-brand-white/10 rounded-[4px] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
              <Link
                href='/about'
                className='relative px-6 py-3 bg-transparent border border-white text-brand-white rounded-[4px] transition-all duration-300 text-sm inline-flex items-center group-hover:bg-brand-white/10 group-hover:translate-y-[-2px] group-hover:border-brand-white group-hover:text-brand-white font-medium'
              >
                Learn More About Us
                <svg
                  className='ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Partner Logos Marquee */}
      <motion.div
        className='relative w-full z-10 mt-auto mb-10'
        style={{ opacity }}
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='overflow-hidden py-6'>
            <motion.div
              className='flex items-center gap-16 py-10'
              animate={{
                x: [0, -2400],
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                },
              }}
            >
              {/* Duplicate logos for seamless loop */}
              {[
                ...logoImages,
                ...logoImages,
                ...logoImages,
                ...logoImages,
                ...logoImages,
                ...logoImages,
              ].map((logo, index) => (
                <LogoImage
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  href={logo.href}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
