"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// Mock data for portfolio ventures
const portfolioVentures = [
  {
    id: 1,
    name: "Nexus Chain",
    description:
      "Enterprise blockchain infrastructure with Ghost Savvy as technical co-founder",
    category: "Web3",
    yearFounded: "2023",
    equity: "15%",
    stage: "Seed",
    image: "/images/placeholder-hero.jpg",
    logo: "/images/ghost_savvy_icon.svg",
    tags: ["Blockchain", "Enterprise", "Technical Co-founder"],
    url: "/savvy-ventures/nexus-chain",
  },
  {
    id: 2,
    name: "Quantum AI",
    description:
      "AI-powered analytics platform with Ghost Savvy providing full engineering team",
    category: "AI & Analytics",
    yearFounded: "2022",
    equity: "12%",
    stage: "Series A",
    image: "/images/projects/project-1.jpg",
    logo: "/images/ghost_savvy_icon.svg",
    tags: ["AI", "Analytics", "Engineering Partner"],
    url: "/savvy-ventures/quantum-ai",
  },
  {
    id: 3,
    name: "MetaVault",
    description:
      "Digital asset security platform with Ghost Savvy as the development partner",
    category: "Fintech",
    yearFounded: "2023",
    equity: "20%",
    stage: "Pre-seed",
    image: "/images/projects/project-2.jpg",
    logo: "/images/ghost_savvy_icon.svg",
    tags: ["Security", "Digital Assets", "MVP Development"],
    url: "/savvy-ventures/metavault",
  },
  {
    id: 4,
    name: "Hyper Protocol",
    description:
      "Decentralized identity verification with Ghost Savvy as the technical partner",
    category: "Identity",
    yearFounded: "2022",
    equity: "18%",
    stage: "Seed",
    image: "/images/projects/project-3.jpg",
    logo: "/images/ghost_savvy_icon.svg",
    tags: ["Identity", "Protocol", "CTO-as-a-Service"],
    url: "/savvy-ventures/hyper-protocol",
  },
];

// Partnership focus areas
const focusAreas = [
  {
    id: 1,
    title: "Technical Co-founder",
    description:
      "We join as technical co-founders for startups that need engineering leadership",
    icon: (
      <svg
        className='w-8 h-8 text-brand-sage'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M2 12H22'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Full-Stack Development",
    description:
      "We provide the entire engineering team to build and scale your product",
    icon: (
      <svg
        className='w-8 h-8 text-brand-sage'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 2L2 7L12 12L22 7L12 2Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M2 17L12 22L22 17'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M2 12L12 17L22 12'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "MVP Development",
    description:
      "We build your minimum viable product from concept to launch in exchange for equity",
    icon: (
      <svg
        className='w-8 h-8 text-brand-sage'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 1V23'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "CTO-as-a-Service",
    description:
      "We provide fractional CTO leadership and technical strategy for startups",
    icon: (
      <svg
        className='w-8 h-8 text-brand-sage'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5 3V7'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M19 17V21'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3 5H7'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17 19H21'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9 7L15 17'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
];

// Team members
const teamMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Technical Partner",
    image: "/images/author-placeholder.jpg",
    bio: "Technical architect with expertise in scaling startups from MVP to acquisition",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Engineering Partner",
    image: "/images/author-placeholder.jpg",
    bio: "Full-stack engineer specializing in AI integration and cloud infrastructure",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Product Partner",
    image: "/images/author-placeholder.jpg",
    bio: "Product strategist who has built multiple successful digital products from scratch",
  },
];

const SavvyVenturesPage = () => {
  // Animation settings
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  // Refs for scroll animations
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.1]);

  // State for filter
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtered ventures
  const filteredVentures =
    activeCategory === "All"
      ? portfolioVentures
      : portfolioVentures.filter(
          (venture) => venture.category === activeCategory
        );

  // Unique categories for filter
  const categories = [
    "All",
    ...new Set(portfolioVentures.map((venture) => venture.category)),
  ];

  return (
    <main className='min-h-screen bg-brand-black text-brand-white'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative min-h-[90vh] flex items-center justify-center overflow-hidden'
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className='absolute inset-0'
        >
          <div className='absolute inset-0 bg-linear-to-b from-brand-black/90 to-brand-black/70 z-10'></div>
          <div
            className='w-full h-full bg-cover bg-center'
            style={{ backgroundImage: `url(/images/placeholder-hero.jpg)` }}
          ></div>
        </motion.div>

        <div className='container mx-auto px-6 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: entryEasing }}
            className='max-w-3xl mx-auto text-center'
          >
            <span className='inline-block py-1 px-3 border border-brand-sage text-brand-sage text-sm font-medium tracking-wider uppercase mb-8'>
              Savvy Ventures
            </span>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-medium mb-8 tracking-tight leading-[1.1]'>
              Tech Partner for Ambitious Startups
            </h1>
            <p className='text-xl md:text-2xl text-brand-white/80 mb-12 leading-relaxed'>
              We partner with early-stage startups as a technical co-founder,
              providing world-class engineering expertise in exchange for
              equity.
            </p>
            <div className='flex flex-wrap justify-center gap-6'>
              <Link
                href='#portfolio'
                className='px-8 py-4 bg-brand-sage text-brand-white rounded-[4px] font-medium hover:bg-brand-sage/90 transition-all duration-300'
              >
                Explore Portfolio
              </Link>
              <Link
                href='#approach'
                className='px-8 py-4 bg-transparent border border-brand-white/20 text-brand-white rounded-[4px] font-medium hover:border-brand-white/50 transition-all duration-300'
              >
                Partnership Model
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: entryEasing }}
          className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center'
        >
          <motion.p
            className='text-brand-white/70 text-sm mb-3 tracking-wider uppercase'
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Discover
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              className='w-6 h-6 text-brand-white/70'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M7 13L12 18L17 13'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7 7L12 12L17 7'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Partnership Model */}
      <section id='approach' className='py-32 bg-brand-black'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: entryEasing }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className='text-brand-sage text-sm font-medium tracking-wider uppercase mb-4 block'>
                  Our Partnership Model
                </span>
                <h2 className='text-4xl md:text-5xl font-medium mb-8 tracking-tight leading-[1.1]'>
                  Engineering expertise for equity
                </h2>
                <p className='text-xl text-brand-white/80 mb-6 leading-relaxed'>
                  We take equity in exchange for providing technical leadership,
                  development resources, and product expertise—drastically
                  reducing the cash burn for early-stage startups.
                </p>
                <p className='text-xl text-brand-white/80 mb-12 leading-relaxed'>
                  Our skin-in-the-game approach means we&apos;re fully aligned
                  with your success. We act as your technical co-founder, CTO,
                  or engineering team without the cash outlay.
                </p>
                <Link
                  href='/savvy-ventures/approach'
                  className='inline-flex items-center text-brand-sage hover:text-brand-white group transition-all duration-300'
                >
                  <span className='mr-2'>
                    Learn more about our equity model
                  </span>
                  <svg
                    className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M5 12h14M12 5l7 7-7 7'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: entryEasing,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className='p-6 border border-brand-white/10 hover:border-brand-sage/30 rounded-[4px] transition-all duration-300'
                >
                  <div className='mb-4'>{area.icon}</div>
                  <h3 className='text-xl font-medium mb-2'>{area.title}</h3>
                  <p className='text-brand-white/70'>{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id='portfolio'
        className='py-32 bg-linear-to-b from-brand-black to-brand-forest'
      >
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: entryEasing }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className='text-brand-sage text-sm font-medium tracking-wider uppercase mb-4 block'>
                Our Portfolio
              </span>
              <h2 className='text-4xl md:text-5xl font-medium mb-8 tracking-tight leading-[1.1]'>
                Startups we&apos;ve helped build
              </h2>
              <p className='text-xl text-brand-white/80 max-w-2xl mx-auto mb-12 leading-relaxed'>
                We partner with visionary founders, providing the technical
                expertise to turn their ideas into market-ready products.
              </p>
            </motion.div>

            {/* Category Filters */}
            <div className='flex flex-wrap justify-center gap-4 mb-16'>
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: entryEasing,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-[4px] text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-brand-sage text-brand-white"
                      : "bg-transparent border border-brand-white/20 text-brand-white hover:border-brand-white/50"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {filteredVentures.map((venture, index) => (
              <motion.div
                key={venture.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: entryEasing,
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Link href={venture.url} className='group block'>
                  <div className='relative overflow-hidden bg-brand-white/5 border border-brand-white/10 group-hover:border-brand-sage/30 rounded-[4px] transition-all duration-500'>
                    <div className='aspect-video overflow-hidden'>
                      <div
                        className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700'
                        style={{ backgroundImage: `url(${venture.image})` }}
                      >
                        <div className='absolute inset-0 bg-linear-to-t from-brand-black/90 to-transparent'></div>
                      </div>
                    </div>

                    <div className='absolute bottom-0 left-0 right-0 p-8'>
                      <div className='flex items-start justify-between mb-4'>
                        <div>
                          <span className='inline-block py-1 px-2 bg-brand-sage/20 text-brand-sage rounded-[4px] text-xs font-medium mb-3'>
                            {venture.category}
                          </span>
                          <h3 className='text-2xl font-medium text-brand-white group-hover:text-brand-sage transition-colors duration-300'>
                            {venture.name}
                          </h3>
                        </div>
                        <div className='w-12 h-12 bg-brand-white/10 rounded-[4px] flex items-center justify-center overflow-hidden'>
                          {/* Placeholder for logo */}
                          <span className='text-xl font-bold text-brand-white'>
                            {venture.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <p className='text-brand-white/70 mb-4 leading-relaxed'>
                        {venture.description}
                      </p>

                      <div className='flex flex-wrap gap-2 mb-6'>
                        {venture.tags.map((tag) => (
                          <span
                            key={tag}
                            className='py-1 px-2 border border-brand-white/20 rounded-[4px] text-xs text-brand-white/60'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <span className='text-sm text-brand-white/70'>
                            {venture.yearFounded}
                          </span>
                          <span className='text-brand-white/30'>•</span>
                          <span className='text-sm text-brand-white/70'>
                            {venture.stage}
                          </span>
                          <span className='text-brand-white/30'>•</span>
                          <span className='text-sm text-brand-sage font-semibold'>
                            {venture.equity} Equity
                          </span>
                        </div>
                        <span className='text-brand-sage font-medium group-hover:translate-x-2 transition-transform duration-300'>
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className='text-center mt-16'>
            <Link
              href='/savvy-ventures/portfolio'
              className='inline-flex items-center px-8 py-4 bg-transparent border border-brand-white/20 text-brand-white rounded-[4px] font-medium hover:border-brand-white/50 transition-all duration-300'
            >
              View All Portfolio Companies
              <svg className='w-5 h-5 ml-2' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M5 12h14M12 5l7 7-7 7'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-32 bg-brand-forest'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: entryEasing }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className='text-brand-sage text-sm font-medium tracking-wider uppercase mb-4 block'>
                Our Engineering Team
              </span>
              <h2 className='text-4xl md:text-5xl font-medium mb-8 tracking-tight leading-[1.1]'>
                Your technical co-founders
              </h2>
              <p className='text-xl text-brand-white/80 max-w-2xl mx-auto mb-12 leading-relaxed'>
                Our team brings decades of experience building successful
                digital products across various industries.
              </p>
            </motion.div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: entryEasing,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className='group'
              >
                <div className='aspect-w-3 aspect-h-4 mb-6 overflow-hidden rounded-[4px]'>
                  <div
                    className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700'
                    style={{ backgroundImage: `url(${member.image})` }}
                  ></div>
                </div>
                <h3 className='text-2xl font-medium mb-1'>{member.name}</h3>
                <p className='text-brand-sage mb-4'>{member.role}</p>
                <p className='text-brand-white/70 leading-relaxed'>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-32 bg-brand-black'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: entryEasing }}
              viewport={{ once: true, margin: "-100px" }}
              className='text-center'
            >
              <span className='text-brand-sage text-sm font-medium tracking-wider uppercase mb-4 block'>
                How It Works
              </span>
              <h2 className='text-4xl md:text-5xl font-medium mb-8 tracking-tight leading-[1.1]'>
                Our equity partnership process
              </h2>
              <p className='text-xl text-brand-white/80 mb-12 leading-relaxed'>
                From initial conversation to long-term partnership, here&apos;s
                how we&apos;ll work together.
              </p>
            </motion.div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: entryEasing }}
              viewport={{ once: true, margin: "-100px" }}
              className='p-8 border border-white/10 rounded-[4px] relative'
            >
              <div className='absolute -top-5 -left-5 w-10 h-10 bg-brand-sage rounded-full flex items-center justify-center text-black font-bold'>
                1
              </div>
              <h3 className='text-xl font-medium mb-4 mt-2'>
                Initial Assessment
              </h3>
              <p className='text-brand-white/70 mb-4'>
                We evaluate your idea, market opportunity, and technical
                requirements to determine if we&apos;re a good fit.
              </p>
              <p className='text-brand-white/70'>Time frame: 1-2 weeks</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: entryEasing }}
              viewport={{ once: true, margin: "-100px" }}
              className='p-8 border border-white/10 rounded-[4px] relative'
            >
              <div className='absolute -top-5 -left-5 w-10 h-10 bg-brand-sage rounded-full flex items-center justify-center text-black font-bold'>
                2
              </div>
              <h3 className='text-xl font-medium mb-4 mt-2'>Deal Structure</h3>
              <p className='text-brand-white/70 mb-4'>
                We agree on equity percentage, scope of work, and timeline based
                on the project&apos;s complexity and potential.
              </p>
              <p className='text-brand-white/70'>Time frame: 2-4 weeks</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: entryEasing }}
              viewport={{ once: true, margin: "-100px" }}
              className='p-8 border border-white/10 rounded-[4px] relative'
            >
              <div className='absolute -top-5 -left-5 w-10 h-10 bg-brand-sage rounded-full flex items-center justify-center text-black font-bold'>
                3
              </div>
              <h3 className='text-xl font-medium mb-4 mt-2'>
                Development & Launch
              </h3>
              <p className='text-brand-white/70 mb-4'>
                Our team builds your product using agile methodology, from MVP
                to market-ready solution.
              </p>
              <p className='text-brand-white/70'>Time frame: 3-6 months</p>
            </motion.div>
          </div>

          <div className='text-center'>
            <Link
              href='/savvy-ventures/process'
              className='inline-flex items-center text-brand-sage hover:text-brand-white group transition-all duration-300'
            >
              <span className='mr-2'>Learn more about our process</span>
              <svg
                className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M5 12h14M12 5l7 7-7 7'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-32 bg-linear-to-b from-brand-black to-brand-forest'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: entryEasing }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className='text-4xl md:text-5xl font-medium mb-8 tracking-tight leading-[1.1]'>
                Need a technical co-founder?
              </h2>
              <p className='text-xl text-brand-white/80 mb-12 leading-relaxed'>
                Let&apos;s discuss how Ghost Savvy can help build your product
                in exchange for equity, eliminating the need for large upfront
                development costs.
              </p>
              <Link
                href='/start-project'
                className='inline-block px-8 py-4 bg-brand-sage text-brand-white rounded-[4px] font-medium hover:bg-brand-sage/90 transition-all duration-300'
              >
                Apply for Partnership
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SavvyVenturesPage;
