"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectFeatureProps {
  project: Project;
  imageLeft: boolean;
  index: number;
}

const ProjectFeature = ({ project, imageLeft }: ProjectFeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants for text content
  const textVariants = {
    hidden: { opacity: 0, x: imageLeft ? 30 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for image/video container
  const mediaVariants = {
    hidden: { opacity: 0, x: imageLeft ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Animation variants for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${
        imageLeft ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 md:gap-12 lg:gap-20 items-center group`}
    >
      {/* Image/Video Container */}
      <motion.div
        variants={mediaVariants}
        className='w-full md:w-1/2 relative overflow-hidden rounded-xl'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={project.link || "#"} className='block'>
          <div className='relative w-full aspect-4/3 overflow-hidden group cursor-pointer'>
            {project.video ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isHovered ? "scale-105 brightness-90" : "scale-100"
                }`}
              >
                <source src={project.video} type='video/mp4' />
              </video>
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isHovered ? "scale-105 brightness-90" : "scale-100"
                }`}
              />
            )}

            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-80'></div>

            {/* Project tags positioned at bottom */}
            <div className='absolute bottom-6 left-6 flex flex-wrap gap-2'>
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='bg-black/70 backdrop-blur-xs text-white text-xs py-1 px-3 rounded-full'
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Text Content */}
      <motion.div variants={textVariants} className='w-full md:w-1/2'>
        <motion.h3
          variants={itemVariants}
          className='text-3xl md:text-4xl font-display font-medium text-gray-900 mb-3'
        >
          {project.title}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className='text-xl font-medium text-gray-800 mb-4'
        >
          {project.hook}
        </motion.p>

        <motion.p variants={itemVariants} className='text-gray-600 mb-6'>
          {project.description}
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href={project.link || "#"}
            className='inline-flex items-center font-medium text-black hover:text-gray-700 group/btn'
          >
            <span>View Full Case Study</span>
            <span className='ml-2 transition-transform duration-300 transform group-hover/btn:translate-x-1'>
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectFeature;
