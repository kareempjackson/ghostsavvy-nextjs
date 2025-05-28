"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  href: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  tags,
  imageSrc,
  href,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 * index }}
      className='group cursor-pointer'
    >
      <Link href={href} className='block'>
        <div className='relative rounded-lg overflow-hidden mb-6 aspect-4/3'>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-linear-to-t from-[#1C332D]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='absolute bottom-6 left-6'>
              <div className='text-white/90 text-sm font-medium'>
                View Project
              </div>
            </div>
          </div>
        </div>

        <h3 className='text-2xl font-display font-medium text-[#1C332D] mb-2 group-hover:text-[#3844A5] transition-colors'>
          {title}
        </h3>

        <p className='text-[#1C332D]/70 mb-4'>{description}</p>

        <div className='flex flex-wrap gap-2'>
          {tags.map((tag, i) => (
            <span
              key={i}
              className='text-xs py-1 px-3 bg-[#F1EEDF] text-[#1C332D]/80 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedWorkSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Lore Brand",
      description: "Creating an identity that connects deeply with users.",
      tags: ["#Vision", "#Branding"],
      imageSrc: "/images/project-lore.jpg",
      href: "/work/lore",
      category: "brand",
    },
    {
      id: 2,
      title: "Trekker",
      description:
        "Empowering nomads with a platform for financial planning and community.",
      tags: ["#Engineering", "#FinTech"],
      imageSrc: "/images/project-trekker.jpg",
      href: "/work/trekker",
      category: "app",
    },
    {
      id: 3,
      title: "Medz",
      description:
        "Simplifying access to health products through an intuitive experience.",
      tags: ["#Vision", "#HealthTech"],
      imageSrc: "/images/project-medz.jpg",
      href: "/work/medz",
      category: "web",
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <section className='py-28 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='mb-16'
          >
            <div className='h-1 w-16 bg-[#D9F4A3] mb-6'></div>
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
              <h2 className='text-4xl md:text-5xl font-display font-medium text-[#1C332D]'>
                Stories of Impact
              </h2>

              <div className='space-x-4'>
                {["all", "brand", "app", "web"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      activeTab === tab
                        ? "bg-[#1C332D] text-white"
                        : "bg-transparent text-[#1C332D]/70 hover:text-[#1C332D]"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <p className='text-[#1C332D]/70 max-w-2xl mt-4'>
              Explore our featured projects, showcasing our approach to creating
              meaningful digital experiences.
            </p>
          </motion.div>

          <div className='overflow-hidden' ref={containerRef}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12'>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  imageSrc={project.imageSrc}
                  href={project.href}
                  index={index}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-center mt-16'
          >
            <Link
              href='/work'
              className='inline-flex items-center px-8 py-4 border border-[#1C332D] text-[#1C332D] rounded-md hover:bg-[#1C332D] hover:text-white transition-all duration-300'
            >
              See More of Our Work
              <svg
                className='w-4 h-4 ml-2'
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
