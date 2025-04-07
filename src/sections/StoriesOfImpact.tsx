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
        return "h-[300px] md:h-[350px]";
      case "large":
        return "h-[500px] md:h-[600px]";
      default:
        return "h-[400px] md:h-[450px]";
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
      className={`${getSpan()} relative overflow-hidden rounded-2xl shadow-xl shadow-black/10 ${getHeight()}`}
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
          <div className='absolute bottom-0 left-0 w-full p-6 md:p-8 transition-transform duration-300 group-hover:translate-y-[-10px]'>
            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-3'>
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='bg-white/10 backdrop-blur-md text-white text-xs py-1 px-3 rounded-full'
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              className={`font-display ${
                size === "large"
                  ? "text-3xl md:text-4xl"
                  : "text-2xl md:text-3xl"
              } text-white mb-2`}
            >
              {project.title}
            </h3>

            {/* Hook */}
            <p className='text-white/80 mb-4 text-lg'>{project.hook}</p>

            {/* View link */}
            <div className='inline-flex items-center text-[#00ff9d] font-medium group/btn'>
              <span>View Case Study</span>
              <span className='ml-2 transition-transform duration-300 transform group-hover/btn:translate-x-2'>
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const StoriesOfImpact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project" && featured == true] | order(_createdAt desc)[0...5] {
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
  }, []);

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
      <section className='py-24 bg-black'>
        <div className='container mx-auto px-4 text-center text-white'>
          <p>Loading featured projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className='relative py-24 bg-black overflow-hidden'
    >
      {/* Background elements */}
      <motion.div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(0, 255, 157, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 255, 157, 0.3) 0%, transparent 40%)",
          y: bgY,
        }}
      />

      <div className='container mx-auto px-4'>
        {/* Section header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className='text-4xl md:text-5xl font-display font-medium text-white mb-4'>
              Stories of Impact
            </h2>
            <p className='text-lg text-white/80 max-w-2xl mx-auto'>
              We don&apos;t just build digital products—we create meaningful
              solutions that make a difference.
            </p>
          </motion.div>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              size={project.size || "medium"}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className='text-center mt-16 mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href='/impact'
            className='inline-flex items-center px-8 py-4 bg-[#00ff9d] text-black rounded-full hover:bg-[#00ff9d]/90 transition-all duration-300 shadow-lg shadow-[#00ff9d]/20 hover:shadow-xl hover:shadow-[#00ff9d]/30 font-medium group'
          >
            <span>Explore All Projects</span>
            <svg
              className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform'
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

      {/* Bottom blur effect for transition */}
      <motion.div
        ref={bottomRef}
        className='absolute bottom-0 left-0 right-0 h-32 pointer-events-none'
        style={{
          background: "linear-gradient(to top, black, transparent)",
          filter: `blur(${bottomBlur}px)`,
          transform: `scale(${bottomScale})`,
        }}
      />
    </section>
  );
};

export default StoriesOfImpact;
