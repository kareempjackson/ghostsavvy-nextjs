"use client";

import { useRef, /* useEffect, */ useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { hardcodedProjects, Project } from "@/data/projectData";

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
                src={project.image}
                alt={project.title}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            )
          )}

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300'></div>

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

const StoriesOfImpact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [projects] = useState<Project[]>(() => {
    const filtered = hardcodedProjects.filter((p) => p.featured);
    return filtered.slice(0, 5).map((project) => ({
      ...project,
      link: project.link || `/projects/${project.id}`,
    }));
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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

  const bottomBlur = useTransform(bottomScrollProgress, [0.7, 1], [0, 15]);
  const bottomScale = useTransform(bottomScrollProgress, [0.7, 1], [1, 1.05]);

  return (
    <section
      ref={sectionRef}
      className='relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden'
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

      <div className='container-custom'>
        {/* Section header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className='text-center mb-8 sm:mb-12 md:mb-16'
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mb-3 sm:mb-4'>
              Stories of Impact
            </h2>
            <p className='text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4'>
              We don&apos;t just build digital products—we create meaningful
              solutions that make a difference.
            </p>
          </motion.div>
        </motion.div>

        {/* Masonry grid */}
        {projects.length > 0 ? (
          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                size={project.size || (index === 0 ? "large" : "medium")}
              />
            ))}
          </motion.div>
        ) : (
          <div className='text-center text-white'>No projects found.</div>
        )}

        {/* CTA */}
        <motion.div
          className='text-center mt-10 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href='/impact'
            className='inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#00ff9d] text-black rounded-full hover:bg-[#00ff9d]/90 transition-all duration-300 shadow-lg shadow-[#00ff9d]/20 hover:shadow-xl hover:shadow-[#00ff9d]/30 font-medium group text-sm sm:text-base'
          >
            <span>Explore All Projects</span>
            <svg
              className='w-3 h-3 sm:w-4 sm:h-4 ml-2 transform group-hover:translate-x-1 transition-transform'
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
        className='absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none'
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
