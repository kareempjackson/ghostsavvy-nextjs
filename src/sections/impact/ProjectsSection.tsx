"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Vision Projects (Design-focused)
const visionProjects = [
  {
    id: "healthcare-connect",
    title: "Healthcare Connect Platform",
    shortDescription:
      "A patient-centered healthcare platform focusing on seamless communication between patients and providers.",
    tags: ["Healthcare", "UX Design", "Web App"],
    image: "/images/projects/placeholder-1.jpg",
  },
  {
    id: "eco-marketplace",
    title: "Sustainable Marketplace",
    shortDescription:
      "An e-commerce platform for eco-friendly products with carbon footprint tracking.",
    tags: ["E-commerce", "Sustainability", "Mobile App"],
    image: "/images/projects/placeholder-2.jpg",
  },
  {
    id: "smart-city-dashboard",
    title: "Smart City Dashboard",
    shortDescription:
      "An intuitive control center for urban infrastructure management and monitoring.",
    tags: ["IoT", "Data Visualization", "Dashboard"],
    image: "/images/projects/placeholder-3.jpg",
  },
  {
    id: "financial-wellness",
    title: "Financial Wellness App",
    shortDescription:
      "A personal finance tool that focuses on long-term financial health and education.",
    tags: ["Fintech", "Education", "Mobile App"],
    image: "/images/projects/placeholder-4.jpg",
  },
];

// Engineering Projects (Tech-focused)
const engineeringProjects = [
  {
    id: "ai-analytics-platform",
    title: "AI-Powered Analytics",
    shortDescription:
      "Advanced analytics platform using machine learning to deliver actionable business insights.",
    tags: ["AI/ML", "Data Science", "Enterprise"],
    image: "/images/projects/placeholder-9.jpg",
  },
  {
    id: "blockchain-identity",
    title: "Blockchain Identity Solution",
    shortDescription:
      "Secure digital identity verification system built on distributed ledger technology.",
    tags: ["Blockchain", "Security", "Identity"],
    image: "/images/projects/placeholder-10.jpg",
  },
  {
    id: "edge-computing",
    title: "Edge Computing Network",
    shortDescription:
      "Low-latency computing infrastructure for IoT devices and real-time applications.",
    tags: ["IoT", "Infrastructure", "Performance"],
    image: "/images/projects/placeholder-11.jpg",
  },
  {
    id: "quantum-simulation",
    title: "Quantum Computing Simulator",
    shortDescription:
      "Educational platform for quantum computing algorithm development and testing.",
    tags: ["Quantum", "Education", "Research"],
    image: "/images/projects/placeholder-12.jpg",
  },
];

// Combine all projects
const allProjects = [...visionProjects, ...engineeringProjects];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "all"
      ? allProjects
      : selectedCategory === "vision"
      ? visionProjects
      : engineeringProjects;

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "vision", label: "User-Centric Design" },
    { id: "engineering", label: "Engineered Solutions" },
  ];

  return (
    <section
      ref={containerRef}
      className='py-20 lg:py-28 bg-brand-black relative'
    >
      <div className='container mx-auto px-6'>
        {/* Section title and intro */}
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className='text-4xl md:text-5xl font-bold mb-6 text-brand-white'
          >
            Our <span className='text-brand-sage'>Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='text-xl text-brand-white/70'
          >
            Explore our portfolio of innovative solutions that combine
            user-centric design with engineering excellence to deliver
            exceptional results.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-wrap justify-center gap-4 mb-12'
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-brand-sage text-brand-white"
                  : "bg-brand-white/10 text-brand-white hover:bg-brand-white/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.3,
              }}
              className='group relative overflow-hidden rounded-lg'
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/savvy-impact/project/${project.id}`}>
                <div className='relative aspect-[3/4] overflow-hidden'>
                  {/* Image with hover effect */}
                  <motion.div
                    animate={{
                      scale: hoveredProject === project.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className='relative w-full h-full'
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='object-cover'
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/projects/placeholder-1.jpg";
                      }}
                    />
                  </motion.div>

                  {/* Overlay gradient */}
                  <div className='absolute inset-0 bg-gradient-to-t from-brand-black to-transparent/20 opacity-80 group-hover:opacity-70 transition-opacity duration-300' />

                  {/* Content */}
                  <div className='absolute inset-0 p-6 flex flex-col justify-end'>
                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className='text-xs bg-brand-white/10 backdrop-blur-sm text-brand-white/90 px-2 py-1 rounded-full'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className='text-xl font-semibold text-brand-white mb-2'>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className='text-sm text-brand-white/70 mb-4 line-clamp-2'>
                      {project.shortDescription}
                    </p>

                    {/* View button - only appears on hover */}
                    <motion.div
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        y: hoveredProject === project.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className='text-sm text-brand-sage font-medium inline-flex items-center'>
                        View Project
                        <svg
                          className='w-4 h-4 ml-1'
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
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
