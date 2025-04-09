"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Interface for Project items from Sanity
interface Project {
  _id: string;
  id: string;
  title: string;
  hook: string;
  description: string;
  tags: string[];
  image: SanityImageSource;
  video?: string;
  link: string;
  size?: "small" | "medium" | "large";
}

interface ImpactSectionProps {
  isHomePage?: boolean;
}

// Project card component in masonry style
const ProjectCard = ({
  project,
  size = "medium",
}: {
  project: Project;
  size?: "small" | "medium" | "large";
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  // Determine height based on size
  const getHeight = () => {
    switch (size) {
      case "small":
        return "h-[250px] sm:h-[300px] md:h-[350px]";
      case "large":
        return "h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]";
      default:
        return "h-[320px] sm:h-[360px] md:h-[400px] lg:h-[450px]";
    }
  };

  // Determine grid span based on size
  const getSpan = () => {
    switch (size) {
      case "small":
        return "";
      case "large":
        return "md:col-span-2 md:row-span-2";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${getSpan()} relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl shadow-black/10 ${getHeight()}`}
      style={{ y, opacity, scale }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={project.link || "#"} className='block h-full'>
        <div className='relative w-full h-full group'>
          {project.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            >
              <source src={project.video} type='video/mp4' />
            </video>
          ) : (
            project.image && (
              <Image
                src={urlFor(project.image).url()}
                alt={project.title}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            )
          )}

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300'></div>

          {/* Content */}
          <div className='absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 transition-transform duration-300 group-hover:translate-y-[-10px]'>
            {/* Tags */}
            <div className='flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3'>
              {project.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className='bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs py-1 px-2 sm:px-3 rounded-full'
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              className={`font-display ${
                size === "large"
                  ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
              } text-white mb-1 sm:mb-2 leading-tight`}
            >
              {project.title}
            </h3>

            {/* Hook */}
            <p className='text-white/80 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg line-clamp-2'>
              {project.hook}
            </p>

            {/* View link */}
            <div className='inline-flex items-center text-[#00ff9d] text-sm sm:text-base font-medium group/btn'>
              <span>View Case Study</span>
              <span className='ml-1 sm:ml-2 transition-transform duration-300 transform group-hover/btn:translate-x-2'>
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ImpactSection = ({ isHomePage = false }: ImpactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Different query based on whether we're on the home page or not
        const query = isHomePage
          ? `*[_type == "project" && featuredHome == true] | order(_createdAt desc)[0...5] {
              _id,
              id,
              title,
              hook,
              description,
              tags,
              image,
              video,
              link,
              size
            }`
          : `*[_type == "project" && featured == true] | order(_createdAt desc)[0...5] {
              _id,
              id,
              title,
              hook,
              description,
              tags,
              image,
              video,
              link,
              size
            }`;

        const data = await client.fetch(query);
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [isHomePage]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // For bottom transition effect
  const { scrollYProgress: bottomScrollProgress } = useScroll({
    target: bottomRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [30, -20]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8],
    [0, 1, 0.8]
  );
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Transition effect for bottom of section
  const bottomBlur = useTransform(bottomScrollProgress, [0.7, 1], [0, 15]);
  const bottomScale = useTransform(bottomScrollProgress, [0.7, 1], [1, 1.05]);

  // Loading state while fetching projects
  if (isLoading) {
    return (
      <section className='py-16 sm:py-20 md:py-24 bg-black'>
        <div className='container mx-auto px-4 text-center text-white'>
          <p>Loading featured projects...</p>
        </div>
      </section>
    );
  }

  // Empty state when no projects are available
  if (projects.length === 0) {
    return (
      <section className='py-16 sm:py-20 md:py-24 bg-black'>
        <div className='container mx-auto px-4 text-center text-white'>
          <span className='text-[#00ff9d] uppercase tracking-wider text-xs md:text-sm'>
            Impact
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mt-2 mb-4'>
            Stories of Impact
          </h2>
          <p className='text-white/80 max-w-3xl mx-auto text-base md:text-lg mb-8'>
            No projects have been featured for the impact section yet.
          </p>
          <Link
            href='/impact'
            className='inline-flex items-center px-6 py-3 bg-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/30 transition-colors duration-300 rounded-full backdrop-blur-sm'
          >
            <span className='font-medium text-sm md:text-base'>
              Explore Impact
            </span>
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
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className='relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden'
    >
      {/* Background elements */}
      <motion.div
        className='absolute inset-0 opacity-30'
        style={{ y: bgY }}
        aria-hidden='true'
      >
        <div className='absolute right-0 top-0 w-1/3 h-1/3 border border-white/10'></div>
        <div className='absolute left-1/4 bottom-1/4 w-1/2 h-1/2 border border-white/10'></div>
      </motion.div>

      <div className='container mx-auto px-4 relative z-10' ref={bottomRef}>
        {/* Section header */}
        <motion.div
          className='text-center mb-12 sm:mb-16 md:mb-24'
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <span className='text-[#00ff9d] uppercase tracking-wider text-xs md:text-sm'>
            Impact
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mt-2 mb-4'>
            Stories of Impact
          </h2>
          <p className='text-white/80 max-w-3xl mx-auto text-base md:text-lg'>
            Discover our work with innovative companies building the future of
            technology, finance, and society.
          </p>
        </motion.div>

        {/* Projects grid with masonry layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              size={project.size || (index === 0 ? "large" : "medium")}
            />
          ))}
        </div>

        {/* View all projects button */}
        <motion.div
          className='flex justify-center mt-12 sm:mt-16'
          style={{
            filter: `blur(${bottomBlur}px)`,
            scale: bottomScale,
          }}
        >
          <Link
            href='/impact'
            className='inline-flex items-center px-6 py-3 bg-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/30 transition-colors duration-300 rounded-full backdrop-blur-sm'
          >
            <span className='font-medium text-sm md:text-base'>
              View All Projects
            </span>
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
    </section>
  );
};

export default ImpactSection;
