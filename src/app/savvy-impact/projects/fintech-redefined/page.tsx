"use client";

import { useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from "framer-motion";

// Component for fading in elements when they come into view
function FadeInWhenVisible({
  children,
  delay = 0,
  y = 30,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial='hidden'
      transition={{ duration: 0.8, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y },
      }}
    >
      {children}
    </motion.div>
  );
}

// Project data
const project = {
  title: "Fintech Redefined",
  subtitle: "Banking reimagined for the modern era",
  client: "Confidential Financial Technology Company",
  duration: "8 months",
  year: "2023",
  description:
    "A comprehensive digital transformation for a stealth fintech client, creating a seamless user experience across mobile and web platforms.",
  overview:
    "Our client, a leading financial technology company operating in stealth mode, approached us to reimagine their digital banking experience. The challenge was to create a platform that would differentiate them in a crowded market while balancing complex security requirements with a frictionless user experience.",
  tags: ["UX Design", "Mobile Development", "Web Platform"],
  pillars: ["Engineered Solutions", "User Centric Vision"],
  challenges: [
    "Creating a secure yet intuitive interface for complex financial operations",
    "Balancing technical requirements with an approachable user experience",
    "Implementing cutting-edge security measures while maintaining usability",
    "Designing a system that could scale to millions of users while maintaining performance",
    "Meeting strict regulatory compliance requirements while innovating",
  ],
  solutions: [
    "Developed a modular architecture allowing for rapid feature deployment",
    "Created a custom design system that scales across multiple platforms",
    "Implemented biometric authentication seamlessly integrated into the user journey",
    "Built a responsive interface that adapts to different devices while maintaining consistency",
    "Engineered a secure API layer with multiple redundancies and fallbacks",
  ],
  results: [
    "48% increase in user engagement post-launch",
    "32% reduction in abandonment rate for key financial transactions",
    "Customer satisfaction score of 4.8/5",
    "99.99% uptime with zero security incidents",
    "Successful onboarding of 250,000+ users in first quarter",
  ],
  technologies: [
    "React Native",
    "TypeScript",
    "Node.js",
    "AWS",
    "GraphQL",
    "MongoDB",
    "Redis",
  ],
  services: [
    "UX Research",
    "UI Design",
    "Mobile Development",
    "Web Development",
    "QA & Testing",
    "Security Auditing",
  ],
  process: [
    {
      title: "Discovery & Research",
      description:
        "We began with an extensive discovery phase, conducting user interviews, competitive analysis, and stakeholder workshops to understand both the business objectives and user needs.",
      image: "/images/process-discovery.jpg",
    },
    {
      title: "Ideation & Concept",
      description:
        "Our design team created multiple concept directions, exploring different approaches to solving the core challenges while maintaining the client's brand identity.",
      image: "/images/process-ideation.jpg",
    },
    {
      title: "Design System Creation",
      description:
        "We built a comprehensive design system that ensured consistency across platforms while allowing for platform-specific optimizations.",
      image: "/images/process-design-system.jpg",
    },
    {
      title: "Development & Integration",
      description:
        "Our engineering team implemented the designs with a focus on performance, security, and maintainability, working closely with the client's internal systems.",
      image: "/images/process-development.jpg",
    },
    {
      title: "Testing & Refinement",
      description:
        "Rigorous testing with real users helped us identify and address pain points, resulting in multiple iterations that continuously improved the experience.",
      image: "/images/process-testing.jpg",
    },
    {
      title: "Launch & Optimization",
      description:
        "Post-launch, we continued to monitor performance metrics and user feedback, making data-driven optimizations to improve conversion and engagement.",
      image: "/images/process-launch.jpg",
    },
  ],
  testimonials: [
    {
      quote:
        "Ghost Savvy Studios delivered beyond our expectations. They transformed our complex financial services into an intuitive digital experience that our customers love.",
      author: "Chief Digital Officer",
      company: "Client Company",
    },
    {
      quote:
        "The attention to detail in both design and engineering was impressive. Their ability to balance security requirements with user experience was exactly what we needed.",
      author: "Head of Product",
      company: "Client Company",
    },
  ],
  nextProject: {
    title: "Healthcare Companion",
    slug: "healthcare-companion",
  },
  image: "/images/portfolio-placeholder-1.jpg",
  color: "#2E3256",
  mockups: [
    "/images/fintech-mockup-1.jpg",
    "/images/fintech-mockup-2.jpg",
    "/images/fintech-mockup-3.jpg",
  ],
};

export default function FinTechProject() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className='bg-white overflow-hidden'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='min-h-[85vh] relative overflow-hidden bg-[#2E3256] flex items-center'
      >
        {/* Background image with parallax */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-[#2E3256]/90 to-[#2E3256]/70 z-10'></div>
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${project.image})` }}
          ></div>
        </motion.div>

        {/* Decorative elements */}
        <div className='absolute inset-0 z-10 opacity-30 mix-blend-overlay'>
          <div className='absolute top-20 left-[10%] w-64 h-64 rounded-full border border-white/10 animate-[spin_40s_linear_infinite]'></div>
          <div className='absolute bottom-20 right-[10%] w-80 h-80 rounded-full border border-white/10 animate-[spin_30s_linear_infinite]'></div>
        </div>

        {/* Hero content */}
        <div className='container mx-auto px-6 py-24 relative z-20'>
          <div className='max-w-5xl mx-auto'>
            <motion.div style={{ y: heroTextY }}>
              <Link
                href='/savvy-impact'
                className='inline-flex items-center text-white/70 hover:text-white transition-colors duration-300 group mb-8'
              >
                <svg
                  className='w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M19 12H5M5 12L12 19M5 12L12 5'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Back to Portfolio
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className='mb-6'
              >
                <div className='flex flex-wrap gap-3 mb-6'>
                  {project.pillars.map((pillar, idx) => (
                    <span
                      key={idx}
                      className='text-white/90 text-sm font-medium tracking-wide uppercase bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full'
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className='text-5xl md:text-7xl font-display font-medium text-white leading-tight tracking-tight mb-8'
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className='text-2xl md:text-3xl text-white/90 max-w-3xl leading-relaxed mb-12'
              >
                {project.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className='grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-white/80'
              >
                <div>
                  <h4 className='text-sm font-medium uppercase tracking-wider text-white/60 mb-1'>
                    Client
                  </h4>
                  <p>{project.client}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium uppercase tracking-wider text-white/60 mb-1'>
                    Year
                  </h4>
                  <p>{project.year}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium uppercase tracking-wider text-white/60 mb-1'>
                    Duration
                  </h4>
                  <p>{project.duration}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium uppercase tracking-wider text-white/60 mb-1'>
                    Role
                  </h4>
                  <p>Full-service digital partner</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className='flex flex-col items-center'
          >
            <span className='text-white/60 text-sm mb-2'>
              Scroll to explore
            </span>
            <svg
              className='w-6 h-6 text-white/60'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className='py-28 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <FadeInWhenVisible>
              <h2 className='text-4xl md:text-5xl font-display font-medium text-[#1A322A] mb-12 leading-tight'>
                Redefining digital banking for the modern financial landscape
              </h2>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className='text-xl text-gray-700 leading-relaxed mb-12'>
                {project.overview}
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-16'>
                <div>
                  <h3 className='text-xl font-display font-medium text-[#1A322A] mb-4'>
                    Services Provided
                  </h3>
                  <ul className='space-y-2'>
                    {project.services.map((service, idx) => (
                      <li key={idx} className='flex items-center text-gray-700'>
                        <svg
                          className='w-5 h-5 text-[#BFE06B] mr-3 flex-shrink-0'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <path
                            d='M5 13L9 17L19 7'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-display font-medium text-[#1A322A] mb-4'>
                    Technologies
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-display font-medium text-[#1A322A] mb-4'>
                    Key Focus Areas
                  </h3>
                  <ul className='space-y-2'>
                    {project.tags.map((tag, idx) => (
                      <li key={idx} className='flex items-center text-gray-700'>
                        <span className='w-2 h-2 rounded-full bg-[#2E3256] mr-3 flex-shrink-0'></span>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className='py-20 bg-gray-50 overflow-hidden'>
        <div className='container mx-auto px-6'>
          <FadeInWhenVisible>
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-12 md:col-span-8 relative aspect-[16/9] bg-[#2E3256] rounded-2xl overflow-hidden shadow-2xl'>
                <div className='absolute inset-0 bg-gradient-to-b from-[#2E3256]/10 to-[#2E3256]/50'></div>
                <img
                  src='/images/fintech-mockup-1.jpg'
                  alt='FinTech dashboard mockup'
                  className='w-full h-full object-cover mix-blend-overlay'
                />
              </div>
              <div className='col-span-12 md:col-span-4 relative aspect-[9/16] md:aspect-auto bg-[#2E3256] rounded-2xl overflow-hidden shadow-2xl'>
                <div className='absolute inset-0 bg-gradient-to-b from-[#2E3256]/10 to-[#2E3256]/50'></div>
                <img
                  src='/images/fintech-mockup-2.jpg'
                  alt='FinTech mobile app mockup'
                  className='w-full h-full object-cover mix-blend-overlay'
                />
              </div>
              <div className='col-span-12 md:col-span-4 relative aspect-[4/3] bg-[#2E3256] rounded-2xl overflow-hidden shadow-2xl'>
                <div className='absolute inset-0 bg-gradient-to-t from-[#2E3256]/10 to-[#2E3256]/50'></div>
                <img
                  src='/images/fintech-mockup-3.jpg'
                  alt='FinTech profile view mockup'
                  className='w-full h-full object-cover mix-blend-overlay'
                />
              </div>
              <div className='col-span-12 md:col-span-8 relative aspect-[16/9] bg-[#2E3256] rounded-2xl overflow-hidden shadow-2xl'>
                <div className='absolute inset-0 bg-gradient-to-t from-[#2E3256]/10 to-[#2E3256]/50'></div>
                <img
                  src='/images/fintech-mockup-1.jpg'
                  alt='FinTech analytics mockup'
                  className='w-full h-full object-cover mix-blend-overlay'
                />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Challenge & Solution Section */}
      <section className='py-28 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
              {/* Challenges column */}
              <div>
                <FadeInWhenVisible>
                  <div className='mb-8'>
                    <h4 className='text-lg font-medium text-[#2F3779] uppercase tracking-wide'>
                      The Challenge
                    </h4>
                    <h3 className='text-3xl md:text-4xl font-display font-medium text-[#1A322A] mt-4'>
                      Creating simplicity from complexity
                    </h3>
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2}>
                  <p className='text-lg text-gray-700 leading-relaxed mb-8'>
                    Our client faced a significant challenge: how to make
                    complex financial operations intuitive for users while
                    maintaining bank-grade security. This balancing act required
                    innovative approaches to both design and engineering.
                  </p>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.3}>
                  <div className='bg-gray-50 p-8 rounded-2xl mb-8'>
                    <h4 className='text-xl font-display font-medium text-[#1A322A] mb-6'>
                      Key Challenges
                    </h4>
                    <ul className='space-y-4'>
                      {project.challenges.map((challenge, idx) => (
                        <li key={idx} className='flex items-start'>
                          <svg
                            className='w-6 h-6 text-[#2F3779] mr-3 flex-shrink-0 mt-0.5'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <circle
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='2'
                            />
                            <circle cx='12' cy='12' r='4' fill='currentColor' />
                          </svg>
                          <span className='text-gray-700'>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInWhenVisible>
              </div>

              {/* Solutions column */}
              <div>
                <FadeInWhenVisible delay={0.2}>
                  <div className='mb-8'>
                    <h4 className='text-lg font-medium text-[#2F3779] uppercase tracking-wide'>
                      Our Solution
                    </h4>
                    <h3 className='text-3xl md:text-4xl font-display font-medium text-[#1A322A] mt-4'>
                      Engineering elegance with user-centric design
                    </h3>
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.4}>
                  <p className='text-lg text-gray-700 leading-relaxed mb-8'>
                    We approached the solution with a dual focus on technical
                    excellence and user experience, creating a platform that was
                    both powerful and accessible to users with varying levels of
                    financial literacy.
                  </p>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.5}>
                  <div className='bg-gray-50 p-8 rounded-2xl mb-8'>
                    <h4 className='text-xl font-display font-medium text-[#1A322A] mb-6'>
                      Our Approach
                    </h4>
                    <ul className='space-y-4'>
                      {project.solutions.map((solution, idx) => (
                        <li key={idx} className='flex items-start'>
                          <svg
                            className='w-6 h-6 text-[#BFE06B] mr-3 flex-shrink-0 mt-0.5'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path
                              d='M5 13L9 17L19 7'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <span className='text-gray-700'>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-28 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-7xl mx-auto'>
            <FadeInWhenVisible>
              <div className='mb-16 text-center'>
                <h4 className='text-lg font-medium text-[#2F3779] uppercase tracking-wide mb-4'>
                  Our Process
                </h4>
                <h3 className='text-3xl md:text-5xl font-display font-medium text-[#1A322A] mb-6'>
                  How we brought this vision to life
                </h3>
                <p className='text-xl text-gray-700 max-w-3xl mx-auto'>
                  Our approach combined design thinking with agile development
                  to create a solution that exceeded expectations.
                </p>
              </div>
            </FadeInWhenVisible>

            {/* Process timeline */}
            <div className='relative'>
              {/* Vertical line */}
              <div className='absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 transform -translate-x-1/2 hidden md:block'></div>

              {/* Process steps */}
              {project.process.map((step, idx) => (
                <FadeInWhenVisible key={idx} delay={0.2 * idx}>
                  <div
                    className={`flex flex-col md:flex-row items-center mb-24 last:mb-0 ${
                      idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Step number - visible on mobile only */}
                    <div className='flex md:hidden items-center justify-center w-12 h-12 rounded-full bg-[#2E3256] text-white font-bold mb-6'>
                      {idx + 1}
                    </div>

                    {/* Content side */}
                    <div className='w-full md:w-1/2 md:pr-12 md:pl-0 px-4 text-center md:text-left'>
                      <h4 className='text-2xl font-display font-medium text-[#1A322A] mb-4'>
                        {step.title}
                      </h4>
                      <p className='text-gray-700 leading-relaxed'>
                        {step.description}
                      </p>
                    </div>

                    {/* Timeline marker - visible on desktop only */}
                    <div className='hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#2E3256] text-white text-2xl font-bold z-10'>
                      {idx + 1}
                    </div>

                    {/* Image side */}
                    <div
                      className={`w-full md:w-1/2 mt-6 md:mt-0 ${
                        idx % 2 !== 0 ? "md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <div className='aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-[#2E3256]'>
                        <div className='absolute inset-0 bg-gradient-to-b from-[#2E3256]/10 to-[#2E3256]/50'></div>
                        <img
                          src={step.image}
                          alt={step.title}
                          className='w-full h-full object-cover mix-blend-overlay'
                        />
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className='py-28 bg-[#1A322A] relative overflow-hidden'>
        {/* Decorative elements */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-[10%] w-64 h-64 rounded-full border border-white/30 animate-[spin_60s_linear_infinite]'></div>
          <div className='absolute bottom-20 right-[10%] w-80 h-80 rounded-full border border-white/30 animate-[spin_50s_linear_infinite]'></div>
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-7xl mx-auto'>
            <FadeInWhenVisible>
              <div className='mb-16 text-center'>
                <h4 className='text-lg font-medium text-[#BFE06B] uppercase tracking-wide mb-4'>
                  The Impact
                </h4>
                <h3 className='text-3xl md:text-5xl font-display font-medium text-white mb-8'>
                  Measurable results that speak for themselves
                </h3>
                <p className='text-xl text-white/80 max-w-3xl mx-auto leading-relaxed'>
                  Our solution delivered significant improvements across key
                  metrics, helping our client achieve their business objectives
                  while delighting their users.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
                {project.results.slice(0, 3).map((result, idx) => (
                  <div
                    key={idx}
                    className='bg-white/10 backdrop-blur-sm p-8 rounded-2xl'
                  >
                    <div className='flex'>
                      <div className='text-5xl font-display font-medium text-white mb-4 leading-none'>
                        {result.split(" ")[0]}
                      </div>
                    </div>
                    <p className='text-white/80'>
                      {result.substring(result.indexOf(" ") + 1)}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {project.results.slice(3).map((result, idx) => (
                  <div
                    key={idx}
                    className='bg-white/5 backdrop-blur-sm p-6 rounded-xl'
                  >
                    <div className='flex items-start'>
                      <svg
                        className='w-6 h-6 text-[#BFE06B] mr-3 flex-shrink-0 mt-0.5'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M5 13L9 17L19 7'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span className='text-white/90'>{result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-28 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-7xl mx-auto'>
            <FadeInWhenVisible>
              <div className='mb-16 text-center'>
                <h4 className='text-lg font-medium text-[#2F3779] uppercase tracking-wide mb-4'>
                  Client Testimonials
                </h4>
                <h3 className='text-3xl md:text-5xl font-display font-medium text-[#1A322A] mb-8'>
                  Don&apos;t take our word for it
                </h3>
              </div>
            </FadeInWhenVisible>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              {project.testimonials.map((testimonial, idx) => (
                <FadeInWhenVisible key={idx} delay={0.2 * idx}>
                  <div className='bg-gray-50 p-10 rounded-2xl'>
                    <svg
                      className='w-12 h-12 text-[#BFE06B] mb-6'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                    </svg>
                    <p className='text-xl text-gray-700 mb-8 leading-relaxed italic'>
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className='text-[#1A322A] font-medium'>
                        {testimonial.author}
                      </p>
                      <p className='text-gray-500'>{testimonial.company}</p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project + CTA */}
      <section className='py-28 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
              {/* Next Project */}
              <FadeInWhenVisible>
                <div>
                  <h4 className='text-lg font-medium text-[#2F3779] uppercase tracking-wide mb-4'>
                    Next Project
                  </h4>
                  <h3 className='text-3xl md:text-4xl font-display font-medium text-[#1A322A] mb-6'>
                    {project.nextProject.title}
                  </h3>
                  <p className='text-gray-700 mb-8'>
                    Explore how we helped revolutionize the healthcare
                    experience with a patient-centered approach.
                  </p>
                  <Link
                    href={`/savvy-impact/projects/${project.nextProject.slug}`}
                    className='inline-flex items-center px-8 py-4 bg-[#1A322A] text-white rounded-full font-medium hover:bg-[#1A322A]/90 transition-all duration-300 group'
                  >
                    View Next Project
                    <svg
                      className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
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
                  </Link>
                </div>
              </FadeInWhenVisible>

              {/* CTA */}
              <FadeInWhenVisible delay={0.2}>
                <div className='bg-[#2E3256] p-10 rounded-2xl relative overflow-hidden'>
                  <div className='absolute inset-0 opacity-10'>
                    <div className='absolute top-0 right-0 w-40 h-40 rounded-full border border-white/30 -translate-y-1/2 translate-x-1/2'></div>
                    <div className='absolute bottom-0 left-0 w-56 h-56 rounded-full border border-white/30 translate-y-1/2 -translate-x-1/3'></div>
                  </div>

                  <div className='relative z-10'>
                    <h3 className='text-2xl md:text-3xl font-display font-medium text-white mb-4'>
                      Ready to transform your digital experience?
                    </h3>
                    <p className='text-white/80 mb-8 leading-relaxed'>
                      Let&apos;s discuss how our approach to engineered
                      solutions and user-centric design can help your
                      organization thrive in the digital landscape.
                    </p>
                    <Link
                      href='/contact'
                      className='inline-flex items-center px-8 py-4 bg-[#BFE06B] text-[#1A322A] rounded-full font-medium hover:bg-[#BFE06B]/90 transition-all duration-300 group'
                    >
                      Start a Conversation
                      <svg
                        className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
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
                    </Link>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
