"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Head from "next/head";

// Load custom fonts based on requirements
const fontsClasses = {
  headingsFont: "font-['Montserrat',_sans-serif]",
  bodyFont: "font-['Lato',_sans-serif]",
  accentFont: "font-['Architects_Daughter',_cursive]",
};

// Define colors based on requirements
const colors = {
  primaryBackground: "#F1F1EF", // Ivory
  textColor: "#121212", // Blackish
  secondaryBackground: "#FFFFFF", // White
  accentOrange: "#E15D26", // AMH Orange
  footerBackground: "#000000", // Black
  footerTextColor: "#FFFFFF", // White
};

// Asset paths
const assets = {
  logo: "/projects/amh/logo.svg",
  homepageImage: "/projects/amh/homepage.png",
  mobileImage: "/projects/amh/mobile.png",
  desktopScreens: [
    "/projects/amh/desktop-screen-1.png",
    "/projects/amh/desktop-screen-2.png",
    "/projects/amh/desktop-screen-3.png",
  ],
  mobileScreens: [
    "/projects/amh/mobile-screen-1.png",
    "/projects/amh/mobile-screen-2.png",
    "/projects/amh/mobile-screen-3.png",
  ],
  brandSystemImages: [
    "/projects/amh/colors.png",
    "/projects/amh/typography.png",
  ],
  clarityVisuals: [
    {
      image: "/projects/amh/highlight-clarity.png",
      caption: "Expansive white space to reinforce calm authority.",
    },
    {
      image: "/projects/amh/highlight-typography.png",
      caption: "Editorial typography for cultural fluency.",
    },
    {
      image: "/projects/amh/highlight-navigation.png",
      caption: "Minimal navigation to support intuitive discovery.",
    },
  ],
};

// Animation easing
const entryEasing = [0.2, 0.8, 0.2, 1]; // More cinematic easing curve
const slowEasing = [0.1, 0.6, 0.1, 1]; // Slower, more elegant easing

// Chapter Title Component
const ChapterTitle = ({
  title,
  align = "left",
  color = colors.textColor,
}: {
  title: string;
  align?: "left" | "center" | "right";
  color?: string;
}) => {
  return (
    <h2
      className={`text-3xl md:text-5xl mb-10 ${fontsClasses.headingsFont} font-light tracking-tight`}
      style={{ color, textAlign: align }}
    >
      {title}
    </h2>
  );
};

// Chapter Intro Component
const ChapterIntro = ({
  text,
  align = "left",
  maxWidth = "3xl",
  color = colors.textColor,
}: {
  text: string;
  align?: "left" | "center" | "right";
  maxWidth?: string;
  color?: string;
}) => {
  return (
    <p
      className={`text-xl max-w-${maxWidth} leading-relaxed ${fontsClasses.bodyFont} mb-20 opacity-90`}
      style={{ color, textAlign: align, lineHeight: 1.6 }}
    >
      {text}
    </p>
  );
};

// Section Title Component
const SectionTitle = ({
  title,
  align = "left",
  color = colors.textColor,
}: {
  title: string;
  align?: "left" | "center" | "right";
  color?: string;
}) => {
  return (
    <h3
      className={`text-2xl md:text-3xl mb-6 ${fontsClasses.headingsFont} font-light tracking-tight`}
      style={{ color, textAlign: align }}
    >
      {title}
    </h3>
  );
};

// Section Text Component
const SectionText = ({
  text,
  align = "left",
  maxWidth = "2xl",
  color = colors.textColor,
}: {
  text: string;
  align?: "left" | "center" | "right";
  maxWidth?: string;
  color?: string;
}) => {
  return (
    <p
      className={`text-lg max-w-${maxWidth} ${fontsClasses.bodyFont} mb-12 opacity-80`}
      style={{ color, textAlign: align, lineHeight: 1.6 }}
    >
      {text}
    </p>
  );
};

// Testimonial Component
const TestimonialBlock = ({
  quote,
  person,
}: {
  quote: string;
  person: string;
}) => {
  return (
    <div className='py-24 px-8 md:px-12 my-16 rounded-lg bg-[#F8F8F6] border-l-4 border-[#E15D26]'>
      <blockquote className='max-w-4xl mx-auto'>
        <p
          className={`text-2xl md:text-3xl mb-8 leading-relaxed ${fontsClasses.accentFont} text-gray-800 italic text-center`}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <footer
          className={`text-lg ${fontsClasses.bodyFont} text-gray-600 text-center`}
        >
          &mdash; {person}
        </footer>
      </blockquote>
    </div>
  );
};

// Horizontal Scroll Gallery Component for Desktop Showcase
const HorizontalScrollGallery = ({ images }: { images: string[] }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={galleryRef}
      className='flex overflow-x-auto scrollbar-hide pb-10 cursor-grab active:cursor-grabbing'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className='flex space-x-12 px-6'>
        {images.map((image, index) => (
          <div
            key={index}
            className='flex-shrink-0 w-[85vw] max-w-3xl h-auto relative'
          >
            <div className='bg-transparent overflow-hidden'>
              <div className='relative aspect-[16/9]'>
                <Image
                  src={image}
                  alt={`Desktop screen ${index + 1}`}
                  fill
                  className='object-cover rounded-lg shadow-xl'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Next Project Navigation Component
const NextProjectNav = ({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) => {
  return (
    <Link href={link} className='block group'>
      <div className='relative overflow-hidden rounded-lg'>
        <div className='relative aspect-[16/9] w-full'>
          <Image
            src={image}
            alt={`${title} Project`}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-10'>
          <div className='flex flex-col'>
            <span
              className={`text-sm text-white/80 ${fontsClasses.bodyFont} mb-2`}
            >
              Next Project
            </span>
            <h3
              className={`text-2xl md:text-3xl ${fontsClasses.headingsFont} text-white font-light`}
            >
              {title}
            </h3>
            <span
              className={`mt-4 inline-flex items-center text-white/90 ${fontsClasses.bodyFont} group-hover:translate-x-2 transition-transform duration-300`}
            >
              Explore this project{" "}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 ml-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function AMHProjectCaseStudy() {
  // Refs for scroll animations and intersection observation
  const chapter1Ref = useRef<HTMLDivElement>(null);
  const chapter2Ref = useRef<HTMLDivElement>(null);
  const chapter3Ref = useRef<HTMLDivElement>(null);
  const chapter4Ref = useRef<HTMLDivElement>(null);
  const blockquoteRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const isChapter1InView = useInView(chapter1Ref, { once: true, amount: 0.2 });
  const isChapter2InView = useInView(chapter2Ref, { once: true, amount: 0.2 });
  const isChapter3InView = useInView(chapter3Ref, { once: true, amount: 0.2 });
  const isChapter4InView = useInView(chapter4Ref, { once: true, amount: 0.2 });
  const isBlockquoteInView = useInView(blockquoteRef, {
    once: true,
    amount: 0.2,
  });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  // Scroll-based animations for hero section
  const { scrollYProgress } = useScroll({
    target: chapter1Ref,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  // Update site logo when component mounts
  useEffect(() => {
    // Find the site logo element - adjust the selector based on your actual site structure
    const siteLogoImg = document.querySelector(
      "header .logo img"
    ) as HTMLImageElement;

    // Store the original logo src for restoration later
    let originalLogoSrc = "";

    if (siteLogoImg) {
      originalLogoSrc = siteLogoImg.src;
      // Update to the AMH logo
      siteLogoImg.src = assets.logo;
    }

    // Restore the original logo when component unmounts
    return () => {
      if (siteLogoImg && originalLogoSrc) {
        siteLogoImg.src = originalLogoSrc;
      }
    };
  }, []);

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>AMH Project Solutions | Ghost Savvy Studios</title>
        <meta
          name='description'
          content='Brand, Web, Strategy for a creative consultancy that shapes clarity into culture.'
        />
      </Head>

      <main>
        {/* Chapter 1: The Ambition */}
        <section
          ref={chapter1Ref}
          className='relative min-h-[90vh] flex items-end py-40 overflow-hidden'
          style={{ backgroundColor: colors.primaryBackground }}
        >
          <div className='container mx-auto px-8 md:px-20 relative z-10 mb-20'>
            <motion.div
              className='max-w-4xl'
              style={{ y: heroTextY }}
              animate={{ opacity: isChapter1InView ? 1 : 0.8 }}
              transition={{ duration: 1, ease: entryEasing }}
            >
              <h1
                className={`text-5xl md:text-7xl lg:text-8xl mb-12 ${fontsClasses.headingsFont} font-light tracking-tight`}
              >
                The Ambition: Shaping Clarity into Culture
              </h1>
              <p
                className={`text-xl md:text-2xl max-w-3xl ${fontsClasses.bodyFont} leading-relaxed opacity-90`}
              >
                When AMH approached Ghost Savvy Studios, their vision was clear
                yet ambitious: create a brand that doesn&apos;t just tell a
                story, but shapes culture. Our mission was to craft a digital
                experience that embodied clarity, calm, and strategic leadership
                — one that would resonate with today&apos;s discerning audiences
                seeking substance and authenticity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Full Bleed Hero Image */}
        <section className='w-full py-32 mt-16'>
          <motion.div
            className='relative w-full aspect-[16/9] max-w-[1920px] mx-auto'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: entryEasing,
              delay: 0.3,
            }}
          >
            <Image
              src={assets.homepageImage}
              alt='AMH Website Hero'
              fill
              className='object-cover'
              priority
            />
            <div className='absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/30 to-transparent'>
              <p
                className={`text-sm text-white/90 ${fontsClasses.bodyFont} max-w-xl`}
              >
                Homepage design emphasizes negative space, allowing content to
                breathe and creating a sense of editorial calm.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Chapter 2: Our Approach */}
        <section
          ref={chapter2Ref}
          className='py-40'
          style={{ backgroundColor: colors.secondaryBackground }}
        >
          <div className='container mx-auto px-8 md:px-20'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                isChapter2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{ duration: 1.2, ease: entryEasing }}
              className='mb-24'
            >
              <ChapterTitle title='Our Approach: Designing with Editorial Precision' />
              <ChapterIntro text='Drawing inspiration from editorial publications, we prioritized narrative flow over rigid structure. Every layout decision — from typography choices to white space distribution — was made to slow users down, encouraging exploration and depth.' />
            </motion.div>

            {/* Building Narrative Rhythm */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                isChapter2InView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3,
                        duration: 1.2,
                        ease: entryEasing,
                      },
                    }
                  : { opacity: 0, y: 40 }
              }
              className='mb-40'
            >
              <SectionTitle title='Building Narrative Rhythm' />
              <SectionText text="We designed the homepage and service pages like chapters in a book — giving users permission to scroll slowly, absorb deeply, and connect meaningfully with AMH's strategic approach." />

              <motion.div
                className='mt-16'
                initial={{ opacity: 0 }}
                animate={
                  isChapter2InView
                    ? {
                        opacity: 1,
                        transition: {
                          delay: 0.5,
                          duration: 1,
                          ease: entryEasing,
                        },
                      }
                    : { opacity: 0 }
                }
              >
                <HorizontalScrollGallery images={assets.desktopScreens} />
                <div className='mt-4 text-center'>
                  <p
                    className={`text-sm text-[#6B6B6B] ${fontsClasses.bodyFont} max-w-2xl mx-auto italic`}
                  >
                    Desktop view showcases editorial rhythm, with each section
                    crafted as a narrative beat.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Crafting Moments of Pause */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                isChapter2InView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.6,
                        duration: 1.2,
                        ease: entryEasing,
                      },
                    }
                  : { opacity: 0, y: 40 }
              }
            >
              <SectionTitle title='Crafting Moments of Pause' />
              <SectionText text="Intentional breathing room and visual pacing allow content to feel considered and calm, creating a sense of respect for the user's time and attention." />

              {/* Clarity Visuals */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mt-16'>
                {assets.clarityVisuals.map((visual, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isChapter2InView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: 0.7 + index * 0.2,
                              duration: 0.8,
                              ease: entryEasing,
                            },
                          }
                        : { opacity: 0, y: 20 }
                    }
                    className='flex flex-col'
                  >
                    <div className='relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-6 group'>
                      <Image
                        src={visual.image}
                        alt={`Design principle ${index + 1}`}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                    </div>
                    <p
                      className={`text-base ${fontsClasses.bodyFont} text-[#6B6B6B] italic`}
                    >
                      {visual.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chapter 3: The Breakthrough Moment */}
        <section
          ref={chapter3Ref}
          className='py-32'
          style={{ backgroundColor: colors.primaryBackground }}
        >
          <div className='container mx-auto px-8 md:px-20'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isChapter3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 1, ease: entryEasing }}
              className='mb-20'
            >
              <ChapterTitle title='The Breakthrough Moment: Turning Structure into Emotion' />
              <ChapterIntro text="Halfway through development, we realized the real opportunity wasn't just clean UX — it was emotional resonance. We stripped away any remaining digital noise, focused purely on human interaction flow, and amplified AMH's cultural voice." />
            </motion.div>

            {/* Mobile: A Handheld Editorial Experience */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                isChapter3InView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.2,
                        duration: 1.2,
                        ease: entryEasing,
                      },
                    }
                  : { opacity: 0, y: 40 }
              }
              className='mb-40'
            >
              <SectionTitle title='Mobile: A Handheld Editorial Experience' />
              <SectionText text='We translated the desktop pacing into mobile-first design principles: wide margins, natural thumb scrolling patterns, and hierarchy clarity even at small scales.' />

              <div className='flex justify-center mt-16'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                  {assets.mobileScreens.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isChapter3InView
                          ? {
                              opacity: 1,
                              y: 0,
                              transition: {
                                delay: 0.3 + index * 0.15,
                                duration: 0.8,
                                ease: entryEasing,
                              },
                            }
                          : { opacity: 0, y: 20 }
                      }
                      className='flex flex-col items-center'
                    >
                      <div className='relative w-60 h-[420px] rounded-2xl overflow-hidden shadow-xl group'>
                        <Image
                          src={image}
                          alt={`Mobile screen ${index + 1}`}
                          fill
                          className='object-cover transition-transform duration-700 group-hover:scale-105'
                        />
                      </div>
                      <span
                        className={`mt-4 text-sm text-[#6B6B6B] ${fontsClasses.bodyFont}`}
                      >
                        {index === 0
                          ? "Mobile Home: Editorial layout with generous margins"
                          : index === 1
                            ? "Service Detail: Content hierarchy for easy scanning"
                            : "Project Gallery: Image-forward browsing experience"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Brand Ecosystem: Beyond Digital */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                isChapter3InView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.4,
                        duration: 1,
                        ease: entryEasing,
                      },
                    }
                  : { opacity: 0, y: 40 }
              }
              className='mb-20'
            >
              <SectionTitle title='Brand Ecosystem: Beyond Digital' />
              <SectionText text="Beyond the website, we built a visual language — a brand system of colors, typography, and interactions that could live across platforms while staying true to AMH's vision." />

              <div className='max-w-5xl mx-auto space-y-16 mt-12'>
                {assets.brandSystemImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isChapter3InView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: 0.5 + index * 0.2,
                              duration: 0.8,
                              ease: entryEasing,
                            },
                          }
                        : { opacity: 0, y: 30 }
                    }
                    className='overflow-hidden'
                  >
                    <div className='relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg'>
                      <Image
                        src={image}
                        alt={index === 0 ? "Color system" : "Typography system"}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='mt-6 text-center'>
                      <h3 className={`text-xl ${fontsClasses.headingsFont}`}>
                        {index === 0 ? "Color Palette" : "Typography Hierarchy"}
                      </h3>
                      <p
                        className={`text-sm mt-2 opacity-80 max-w-lg mx-auto ${fontsClasses.bodyFont}`}
                      >
                        {index === 0
                          ? "A thoughtful color system with earthy tones and bold accents that creates visual hierarchy and warmth"
                          : "Type selection focused on legibility, editorial quality, and subtle character"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isChapter3InView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.6,
                        duration: 1,
                        ease: entryEasing,
                      },
                    }
                  : { opacity: 0, y: 30 }
              }
            >
              <TestimonialBlock
                quote="Working with Ghost Savvy Studios wasn't just about building a website. It was about bringing our philosophy to life in ways we hadn't imagined."
                person='Founder of AMH'
              />
            </motion.div>
          </div>
        </section>

        {/* Chapter 4: The Impact */}
        <section
          ref={chapter4Ref}
          className='py-32'
          style={{ backgroundColor: colors.secondaryBackground }}
        >
          <div className='container mx-auto px-8 md:px-20'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isChapter4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 1, ease: entryEasing }}
              className='mb-20'
            >
              <ChapterTitle title='The Impact: A Digital Reflection of Cultural Leadership' />
              <ChapterIntro text='Today, the AMH website serves as a living embodiment of their mission — a digital experience crafted to elevate creative leadership, inspire strategic action, and reinforce clarity as a catalyst for change.' />
            </motion.div>

            {/* Final Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isChapter4InView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3,
                        duration: 1.2,
                        ease: entryEasing,
                      },
                    }
                  : { opacity: 0, y: 30 }
              }
              className='relative max-w-6xl mx-auto aspect-[16/9] rounded-lg overflow-hidden shadow-2xl'
            >
              <Image
                src={assets.mobileImage}
                alt="A digital experience crafted for tomorrow's creative leaders"
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
              <div className='absolute bottom-0 left-0 right-0 p-10 text-white'>
                <p className={`text-lg ${fontsClasses.bodyFont}`}>
                  A digital experience designed for tomorrow&apos;s strategic
                  leaders.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blockquote Section */}
        <section
          ref={blockquoteRef}
          className='py-40 flex items-center justify-center'
          style={{ backgroundColor: colors.primaryBackground }}
        >
          <div className='container mx-auto px-8 md:px-20 text-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isBlockquoteInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 1.4, ease: slowEasing }}
            >
              <div className='max-w-2xl mx-auto mb-8'>
                <Image
                  src='/projects/amh/quote-mark.svg'
                  alt='Quote mark'
                  width={60}
                  height={60}
                  className='mx-auto mb-8 opacity-30'
                />
              </div>
              <blockquote className='max-w-3xl mx-auto'>
                <p
                  className={`text-3xl md:text-4xl lg:text-5xl mb-12 leading-relaxed ${fontsClasses.accentFont} tracking-wide`}
                  style={{ lineHeight: 1.3 }}
                >
                  &ldquo;Elegance is when the inside is as beautiful as the
                  outside.&rdquo;
                </p>
                <footer
                  className={`text-lg ${fontsClasses.bodyFont} opacity-70`}
                >
                  &mdash; Ghost Savvy Studios
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section
          ref={ctaRef}
          className='py-40'
          style={{
            backgroundColor: colors.footerBackground,
            color: colors.footerTextColor,
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.85))",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className='container mx-auto px-8 md:px-20 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={
                isCtaInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 40, scale: 0.98 }
              }
              transition={{ duration: 1.4, ease: entryEasing }}
              className='max-w-3xl mx-auto'
            >
              <h2
                className={`text-4xl md:text-5xl mb-8 ${fontsClasses.headingsFont}`}
              >
                Explore the Project
              </h2>
              <p
                className={`text-lg md:text-xl mb-16 ${fontsClasses.bodyFont} opacity-80 leading-relaxed max-w-2xl mx-auto`}
              >
                Experience the AMH website and see how storytelling, minimalism,
                and editorial design come together to create a premium digital
                experience.
              </p>
              <div className='flex flex-col sm:flex-row gap-8 justify-center'>
                <Link
                  href='https://amh-website.vercel.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`inline-block px-10 py-5 border-2 border-white hover:bg-[${colors.accentOrange}] hover:border-[${colors.accentOrange}] transition-all duration-500 ${fontsClasses.bodyFont} tracking-wide`}
                >
                  Visit the live site →
                </Link>
                <Link
                  href='/contact'
                  className={`inline-block px-10 py-5 bg-white text-black hover:bg-gray-200 transition-all duration-500 ${fontsClasses.bodyFont} tracking-wide`}
                >
                  Start your project
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Next Project Section */}
      <section className='py-32 bg-gray-100'>
        <div className='container mx-auto px-8 md:px-20'>
          <div className='mb-16 text-center'>
            <h2
              className={`text-3xl md:text-4xl mb-4 ${fontsClasses.headingsFont} font-light`}
            >
              Continue the Journey
            </h2>
            <p
              className={`text-lg text-gray-600 ${fontsClasses.bodyFont} max-w-2xl mx-auto`}
            >
              Explore more creative storytelling in our featured projects
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: entryEasing }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <NextProjectNav
                title='Visionscape Digital Platform'
                image='/projects/visionscape/hero.jpg'
                link='/savvy-impact/project/visionscape-digital-platform'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: entryEasing }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <NextProjectNav
                title='Resonance Healthcare App'
                image='/projects/resonance/hero.jpg'
                link='/savvy-impact/project/resonance-healthcare-app'
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
