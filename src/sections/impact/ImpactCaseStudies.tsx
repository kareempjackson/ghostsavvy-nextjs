"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ImpactCaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "healthcare", label: "Healthcare" },
    { id: "sustainability", label: "Sustainability" },
    { id: "fintech", label: "Financial Tech" },
    { id: "education", label: "Education" },
  ];

  const caseStudies = [
    {
      id: "healthcare-connect",
      title: "Healthcare Connect Platform",
      description:
        "A patient-centered healthcare platform focusing on seamless communication between patients and providers.",
      image: "/images/projects/healthcare-case.jpg",
      category: "healthcare",
      stats: "94% patient satisfaction increase",
    },
    {
      id: "eco-marketplace",
      title: "Sustainable Marketplace",
      description:
        "An e-commerce platform for eco-friendly products with carbon footprint tracking.",
      image: "/images/projects/sustainability-case.jpg",
      category: "sustainability",
      stats: "120k tons CO₂ offset annually",
    },
    {
      id: "financial-wellness",
      title: "Financial Wellness App",
      description:
        "A personal finance tool that focuses on long-term financial health and education.",
      image: "/images/projects/finance-case.jpg",
      category: "fintech",
      stats: "$1.2M average user savings",
    },
    {
      id: "education-platform",
      title: "Adaptive Learning System",
      description:
        "Personalized education platform that adapts to individual learning styles and needs.",
      image: "/images/projects/education-case.jpg",
      category: "education",
      stats: "32% improvement in learning outcomes",
    },
    {
      id: "telehealth-solution",
      title: "Rural Telehealth Solution",
      description:
        "Connecting underserved communities with quality healthcare through low-bandwidth telehealth.",
      image: "/images/projects/telehealth-case.jpg",
      category: "healthcare",
      stats: "Healthcare access for 500k+ rural patients",
    },
    {
      id: "carbon-tracker",
      title: "Enterprise Carbon Tracker",
      description:
        "Helping organizations track, report, and reduce their carbon footprint with actionable insights.",
      image: "/images/projects/carbon-case.jpg",
      category: "sustainability",
      stats: "Average 28% emissions reduction",
    },
  ];

  const filteredStudies =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((study) => study.category === activeFilter);

  return (
    <section
      id='case-studies'
      ref={ref}
      className='py-20 bg-[#F4EBE0] overflow-hidden'
    >
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16 max-w-3xl mx-auto'
        >
          <h2 className='text-4xl font-bold text-[#3F4697] mb-4'>
            Impact Case Studies
          </h2>
          <p className='text-lg text-gray-700'>
            Explore our work that creates measurable impact across industries
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='flex justify-center flex-wrap gap-3 mb-12'
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-[#3F4697] text-white"
                  : "bg-white text-gray-700 hover:bg-[#CFF39E]/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col'
              onMouseEnter={() => setHoveredProject(study.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image */}
              <div className='relative h-48 overflow-hidden'>
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className='object-cover transition-transform duration-700 ease-in-out'
                  style={{
                    transform:
                      hoveredProject === study.id ? "scale(1.05)" : "scale(1)",
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/projects/placeholder-1.jpg";
                  }}
                />

                {/* Stats Overlay */}
                <div className='absolute bottom-0 left-0 right-0 bg-[#3F4697]/80 text-white py-2 px-4 text-sm font-medium'>
                  {study.stats}
                </div>
              </div>

              {/* Content */}
              <div className='p-6 flex flex-col flex-grow'>
                <h3 className='text-xl font-bold text-[#3F4697] mb-2'>
                  {study.title}
                </h3>
                <p className='text-gray-600 mb-6 flex-grow'>
                  {study.description}
                </p>

                <Link
                  href={`/savvy-impact/project/${study.id}`}
                  className='inline-flex items-center text-[#3F4697] font-medium hover:text-[#3F4697]/80 transition-colors duration-300 group mt-auto'
                >
                  View Case Study
                  <svg
                    className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
