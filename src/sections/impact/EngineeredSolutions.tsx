"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { engineeringProjects } from "./projectData";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

export default function EngineeredSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div ref={containerRef} className='py-28 bg-brand-black overflow-hidden'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: entryEasing }}
          className='max-w-4xl ml-auto text-right'
        >
          <h2 className='text-5xl md:text-6xl lg:text-7xl text-brand-white font-medium tracking-[-0.02em] leading-[1.1] mb-8'>
            <span className='text-brand-deep'>Engineered</span> Solutions
          </h2>
          <p className='text-xl md:text-2xl text-brand-white/80 leading-normal mb-16 max-w-3xl ml-auto'>
            We build powerful, scalable solutions that transform challenges into
            opportunities through innovative engineering and technical
            excellence.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          {engineeringProjects.map((project, index) => (
            <Link
              href={`/savvy-impact/project/${project.id}`}
              key={project.id}
              className='group block'
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: entryEasing,
                }}
                className='bg-brand-white rounded-[4px] overflow-hidden group-hover:shadow-lg transition-shadow duration-300'
              >
                <div className='relative aspect-4/3 overflow-hidden'>
                  <div className='absolute inset-0 bg-linear-to-t from-brand-black/80 to-transparent/30 z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500'></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute bottom-0 left-0 p-6 z-20'>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {project.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className='text-xs px-3 py-1 bg-brand-white/10 backdrop-blur-xs text-brand-white/90 rounded-[4px]'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl text-brand-black mb-3 group-hover:text-brand-deep transition-colors'>
                    {project.title}
                  </h3>
                  <p className='text-brand-black/70 line-clamp-3'>
                    {project.shortDescription}
                  </p>
                  <div className='mt-6 pt-4 border-t border-brand-black/10'>
                    <span className='inline-flex items-center text-brand-deep'>
                      View Project
                      <svg
                        className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M5 12h14M12 5l7 7-7 7' />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
