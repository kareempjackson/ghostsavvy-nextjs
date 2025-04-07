"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

// Filtered project categories
const categories = [
  { id: "all", label: "All" },
  { id: "healthcare", label: "Healthcare" },
  { id: "sustainability", label: "Sustainability" },
  { id: "fintech", label: "Financial Services" },
  { id: "education", label: "Learning & Work" },
];

// Impact stats
const impactStats = [
  { value: "94%", label: "Average Customer Satisfaction" },
  { value: "$1.2M", label: "Client Cost Savings" },
  { value: "28%", label: "Emissions Reduction" },
  { value: "500K+", label: "Lives Impacted" },
];

// Projects data
const projects = [
  {
    id: "healthcare-connect",
    title: "Healthcare Connect Platform",
    subtitle: "Using technology to reimagine patient care delivery",
    description:
      "A patient-centered healthcare platform that revolutionizes communication between patients and providers.",
    image: "/images/projects/healthcare-case.jpg",
    category: "healthcare",
    date: "3/15/2024",
    tags: ["Healthcare", "UX Design"],
    highlight: true,
  },
  {
    id: "eco-marketplace",
    title: "Sustainable Marketplace",
    subtitle: "A Charter Network Writes Its Next Chapter",
    description:
      "An e-commerce platform for eco-friendly products with integrated carbon footprint tracking.",
    image: "/images/projects/sustainability-case.jpg",
    category: "sustainability",
    date: "2/12/2024",
    tags: ["Sustainability", "E-commerce"],
    highlight: false,
  },
  {
    id: "financial-wellness",
    title: "Financial Wellness App",
    subtitle: "Redefining Personal Finance Management",
    description:
      "A personal finance tool that focuses on long-term financial health and education.",
    image: "/images/projects/finance-case.jpg",
    category: "fintech",
    date: "1/8/2024",
    tags: ["Financial Services", "Mobile App"],
    highlight: true,
  },
  {
    id: "education-platform",
    title: "Adaptive Learning System",
    subtitle: "Personalized Education for the Digital Age",
    description:
      "Personalized education platform that adapts to individual learning styles and needs.",
    image: "/images/projects/education-case.jpg",
    category: "education",
    date: "12/15/2023",
    tags: ["Education", "ML/AI", "User Experience"],
    highlight: false,
  },
  {
    id: "telehealth-solution",
    title: "Rural Telehealth Solution",
    subtitle: "Connecting Underserved Communities to Quality Healthcare",
    description:
      "Connecting underserved communities with quality healthcare through low-bandwidth telehealth.",
    image: "/images/projects/telehealth-case.jpg",
    category: "healthcare",
    date: "11/5/2023",
    tags: ["Healthcare", "Accessibility"],
    highlight: false,
  },
  {
    id: "carbon-tracker",
    title: "Enterprise Carbon Tracker",
    subtitle: "A Climate Era Road Map for Industry",
    description:
      "Helping organizations track, report, and reduce their carbon footprint with actionable insights.",
    image: "/images/projects/carbon-case.jpg",
    category: "sustainability",
    date: "10/3/2023",
    tags: ["Sustainability", "Enterprise"],
    highlight: true,
  },
];

// Animated number counter
function CountUp({
  target,
  duration = 2,
}: {
  target: string;
  duration?: number;
}) {
  const [count, setCount] = useState("0");
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target.replace(/[^\d.-]/g, ""));
    const prefix = target.replace(/[\d.-]/g, "");

    // If target is not a pure number
    if (isNaN(end)) {
      setCount(target);
      return;
    }

    // Get animation duration based on size of number
    const incrementTime = (duration / end) * 1000;

    // Don't run if number is too high, just set the value directly
    if (end > 1000) {
      setCount(target);
      return;
    }

    const timer = setInterval(() => {
      start += 1;
      setCount(prefix + start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [target, duration, isInView]);

  return <span ref={countRef}>{count}</span>;
}

export default function SavvyImpactPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const statsRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Get featured project
  const featuredProject = projects.find(
    (project) => project.id === "healthcare-connect"
  );

  return (
    <div className='min-h-screen'>
      {/* Hero header with parallax text */}
      <div className='relative w-full bg-white overflow-hidden'>
        {/* Background accent */}
        <div className='absolute right-0 top-0 w-1/3 h-full bg-gray-50/50 z-0'></div>

        <div className='container mx-auto px-6 pt-40 pb-32 relative z-10'>
          <div className='max-w-5xl'>
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 100 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className='text-7xl md:text-8xl font-bold mb-16 leading-tight relative'>
                Our <br />
                <span className='relative'>
                  work.
                  <span className='absolute -bottom-2 left-0 w-1/3 h-2 bg-indigo-600'></span>
                </span>
              </h1>
              <p className='text-xl md:text-2xl text-gray-700 max-w-3xl mb-12'>
                For over a decade, Ghost Savvy Studios has partnered with
                organizations to design{" "}
                <span className='text-indigo-600 font-medium'>
                  human-centered solutions
                </span>{" "}
                that people love.
              </p>

              <div className='flex space-x-8 mt-16'>
                <Link
                  href='#projects'
                  className='group flex items-center text-lg font-medium text-black'
                >
                  <span className='mr-2'>View projects</span>
                  <span className='w-10 h-10 rounded-full flex items-center justify-center bg-black text-white group-hover:bg-indigo-600 transition-colors'>
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 14l-7 7m0 0l-7-7m7 7V3'
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Impact stats section */}
      <div ref={statsRef} className='w-full py-20 bg-indigo-700 text-white'>
        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isStatsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className='grid grid-cols-2 md:grid-cols-4 gap-10'
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='text-center'
              >
                <p className='text-4xl md:text-5xl font-bold mb-2'>
                  <CountUp target={stat.value} />
                </p>
                <p className='text-indigo-200'>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured project (full width) */}
      {featuredProject && (
        <div className='w-full relative'>
          <Link
            href={`/savvy-impact/project/${featuredProject.id}`}
            className='block group'
          >
            <div className='relative aspect-[16/9] w-full overflow-hidden'>
              <motion.div style={{ y }} className='absolute inset-0 z-0'>
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className='object-cover scale-110'
                  priority
                />
              </motion.div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10'></div>

              <div className='absolute bottom-0 left-0 right-0 z-20 p-12 md:p-24'>
                <div className='container mx-auto'>
                  <div className='max-w-3xl text-white'>
                    <span className='inline-block px-3 py-1 mb-4 bg-indigo-600 text-white text-sm tracking-wide'>
                      FEATURED PROJECT
                    </span>
                    <h2 className='text-3xl md:text-5xl font-bold mb-6 group-hover:text-indigo-300 transition-colors'>
                      {featuredProject.title}
                    </h2>
                    <p className='text-xl text-white/80 mb-8 max-w-2xl'>
                      {featuredProject.description}
                    </p>
                    <div className='flex items-center'>
                      <span className='text-white/80 mr-4'>
                        Explore case study
                      </span>
                      <span className='w-10 h-10 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-indigo-700 transition-all duration-300 transform group-hover:translate-x-2'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M14 5l7 7m0 0l-7 7m7-7H3'
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Category filter */}
      <div id='projects' className='container mx-auto px-6 py-20'>
        <div className='border-b border-gray-200 mb-16'>
          <div className='flex overflow-x-auto pb-4 space-x-10'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-1 py-3 text-lg font-medium border-b-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className='mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Our Impact Projects
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl'>
            Explore our portfolio of work that creates measurable impact across
            industries, demonstrating our commitment to design that matters.
          </p>
        </div>
      </div>

      {/* Projects grid - staggered layout */}
      <div className='container mx-auto px-6 pb-32'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <AnimatePresence mode='wait'>
            {filteredProjects.map((project, index) => {
              // Create a staggered layout - some items span more columns
              const isWide = project.highlight;
              const colSpan = isWide ? "lg:col-span-8" : "lg:col-span-4";

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                  className={`${colSpan}`}
                >
                  <Link
                    href={`/savvy-impact/project/${project.id}`}
                    className='block group h-full'
                  >
                    <div className='h-full flex flex-col bg-white border-b border-gray-200 hover:border-indigo-300 overflow-hidden transition-all duration-500'>
                      <div className='relative aspect-[4/3] overflow-hidden'>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className='object-cover transition-transform duration-1000 group-hover:scale-105'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                      </div>

                      <div className='flex flex-col flex-grow p-6'>
                        <div className='flex justify-between items-start mb-4'>
                          <h3 className='text-xl font-bold mb-2 group-hover:text-indigo-700 transition-colors'>
                            {project.title}
                          </h3>
                          <span className='text-sm text-gray-400'>
                            {project.date}
                          </span>
                        </div>

                        <p className='text-gray-600 mb-6 flex-grow'>
                          {project.subtitle}
                        </p>

                        <div className='mt-auto'>
                          <div className='flex flex-wrap gap-2 mb-6'>
                            {project.tags.map((tag, index) => (
                              <span
                                key={index}
                                className='text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-none'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className='flex items-center text-indigo-600'>
                            <span className='font-medium mr-2'>
                              View case study
                            </span>
                            <span className='transform transition-transform duration-300 group-hover:translate-x-2'>
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Simple footer/CTA with gradient background */}
      <div className='w-full py-32 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white'>
        <div className='container mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className='text-4xl md:text-5xl font-bold mb-8'>
              Ready to create meaningful impact?
            </h2>
            <p className='text-xl text-indigo-200 max-w-2xl mx-auto mb-12'>
              Let&apos;s collaborate on solutions that drive meaningful change
              and deliver exceptional results.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-indigo-700 hover:bg-indigo-50 transition-colors rounded-full group'
            >
              <span>Start a conversation</span>
              <svg
                className='ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
