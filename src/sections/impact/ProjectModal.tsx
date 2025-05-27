"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/projects";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Easing values from brand guidelines
  const exitEasing = [0.4, 0.0, 1, 1]; // cubic-bezier(0.4, 0.0, 1, 1)
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  // Close modal with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restore scrolling when modal closes
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className='fixed inset-0 bg-brand-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: exitEasing }}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            className='bg-brand-deep rounded-[4px] w-full max-w-5xl max-h-[90vh] overflow-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: entryEasing }}
          >
            {/* Header with cover image */}
            <div className='relative h-64 md:h-96'>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-brand-deep to-transparent'></div>

              {/* Close button */}
              <button
                className='absolute top-4 right-4 w-10 h-10 rounded-[4px] bg-brand-black/60 backdrop-blur-sm text-brand-white flex items-center justify-center hover:bg-brand-black transition-colors z-10'
                onClick={onClose}
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 6L6 18M6 6L18 18'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>

              {/* Project title overlay */}
              <div className='absolute bottom-0 left-0 w-full p-6 md:p-8'>
                <div className='flex flex-wrap gap-2 mb-3'>
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='inline-block bg-brand-white/10 backdrop-blur-sm text-xs px-3 py-1 rounded-[4px] text-brand-white/90'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className='text-3xl md:text-4xl text-brand-white tracking-[-0.5px] leading-[1.1]'>
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className='p-6 md:p-8'>
              {/* Description */}
              <p className='text-lg text-brand-white/90 mb-10 leading-[1.5]'>
                {project.longDescription}
              </p>

              {/* Challenge, Approach, Results */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
                <div>
                  <h3 className='text-xl mb-3 text-brand-white flex items-center tracking-[-0.5px]'>
                    <span className='text-brand-sage mr-2'>01.</span> Challenge
                  </h3>
                  <p className='text-brand-white/70 leading-[1.5]'>
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className='text-xl mb-3 text-brand-white flex items-center tracking-[-0.5px]'>
                    <span className='text-brand-sage mr-2'>02.</span> Approach
                  </h3>
                  <p className='text-brand-white/70 leading-[1.5]'>
                    {project.approach}
                  </p>
                </div>
                <div>
                  <h3 className='text-xl mb-3 text-brand-white flex items-center tracking-[-0.5px]'>
                    <span className='text-brand-sage mr-2'>03.</span> Results
                  </h3>
                  <p className='text-brand-white/70 leading-[1.5]'>
                    {project.results}
                  </p>
                </div>
              </div>

              {/* Media showcase */}
              {project.video && (
                <div className='mb-12'>
                  <h3 className='text-xl mb-6 text-brand-white tracking-[-0.5px]'>
                    Project Showcase
                  </h3>
                  <div className='relative rounded-[4px] overflow-hidden aspect-video'>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='absolute inset-0 w-full h-full object-cover'
                    >
                      <source src={project.video} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Impact section */}
              <div className='mb-10'>
                <h3 className='text-xl mb-4 text-brand-white tracking-[-0.5px]'>
                  Impact
                </h3>
                <p className='text-brand-white/80 leading-[1.5]'>
                  {project.impact}
                </p>
              </div>

              {/* CTA */}
              {project.link && (
                <div className='flex justify-center mt-10'>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center justify-center px-6 py-3 bg-brand-sage hover:bg-brand-sage/90 text-brand-white rounded-[4px] transition-colors'
                  >
                    <span>Visit Project</span>
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
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
