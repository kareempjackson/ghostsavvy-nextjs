"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoBackground from "@/components/VideoBackground";
import {
  ImpactProject,
  ImpactFeature,
  ImpactTestimonial,
  ImpactRelatedProject,
} from "@/types/schema";

interface ProjectContentProps {
  projectData: ImpactProject;
}

// Default theme to use if no custom theme is provided
const defaultTheme = {
  headingsFont: "'Inter', sans-serif",
  bodyFont: "'Inter', sans-serif",
  accentFont: "'Inter', sans-serif",
  primaryBackground: "#FFFFFF",
  secondaryBackground: "#F5F5F5",
  textColor: "#121212",
  accentColor: "#3B82F6",
  footerBackground: "#111827",
  footerTextColor: "#FFFFFF",
};

// Animation easing
const entryEasing = [0.2, 0.8, 0.2, 1]; // Cinematic easing curve

// Chapter Title Component
const ChapterTitle = ({
  title,
  align = "left",
  color,
  fontFamily,
}: {
  title: string;
  align?: "left" | "center" | "right";
  color?: string;
  fontFamily?: string;
}) => {
  return (
    <h2
      className='text-3xl md:text-5xl mb-10 font-light tracking-tight'
      style={{ color, textAlign: align, fontFamily }}
    >
      {title}
    </h2>
  );
};

// Chapter Intro Component
const ChapterIntro = ({
  text,
  align = "left",
  maxWidth = "3xl",
  color,
  fontFamily,
}: {
  text: string;
  align?: "left" | "center" | "right";
  maxWidth?: string;
  color?: string;
  fontFamily?: string;
}) => {
  return (
    <p
      className={`text-xl max-w-${maxWidth} leading-relaxed mb-20 opacity-90`}
      style={{ color, textAlign: align, lineHeight: 1.6, fontFamily }}
    >
      {text}
    </p>
  );
};

// Section Title Component
const SectionTitle = ({
  title,
  align = "left",
  color,
  fontFamily,
}: {
  title: string;
  align?: "left" | "center" | "right";
  color?: string;
  fontFamily?: string;
}) => {
  return (
    <h3
      className='text-2xl md:text-3xl mb-6 font-light tracking-tight'
      style={{ color, textAlign: align, fontFamily }}
    >
      {title}
    </h3>
  );
};

// Section Text Component
const SectionText = ({
  text,
  align = "left",
  maxWidth = "2xl",
  color,
  fontFamily,
}: {
  text: string;
  align?: "left" | "center" | "right";
  maxWidth?: string;
  color?: string;
  fontFamily?: string;
}) => {
  return (
    <p
      className={`text-lg max-w-${maxWidth} mb-12 opacity-80`}
      style={{ color, textAlign: align, lineHeight: 1.6, fontFamily }}
    >
      {text}
    </p>
  );
};

// Testimonial Component
const TestimonialBlock = ({
  quote,
  person,
  accentColor,
  fontFamily,
}: {
  quote: string;
  person: string;
  accentColor?: string;
  fontFamily?: string;
}) => {
  return (
    <div
      className='py-24 px-8 md:px-12 my-16 rounded-lg bg-opacity-50 border-l-4'
      style={{ borderColor: accentColor }}
    >
      <blockquote className='max-w-4xl mx-auto'>
        <p
          className='text-2xl md:text-3xl mb-8 leading-relaxed italic text-center'
          style={{ fontFamily }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <footer className='text-lg text-center opacity-80'>
          &mdash; {person}
        </footer>
      </blockquote>
    </div>
  );
};

// Gallery Grid Component
const GalleryGrid = ({
  images,
  projectTitle,
}: {
  images: string[];
  projectTitle: string;
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12'>
      {images.map((image, index) => (
        <div
          key={index}
          className='aspect-4/3 relative overflow-hidden rounded-lg'
        >
          <Image
            src={image}
            alt={`${projectTitle} image ${index + 1}`}
            fill
            className='object-cover hover:scale-105 transition-transform duration-700'
          />
        </div>
      ))}
    </div>
  );
};

export default function ProjectContent({ projectData }: ProjectContentProps) {
  // Set up refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);

  // Determine theme - use project theme if available, otherwise use default
  const theme = projectData.theme || defaultTheme;

  // Scroll-based animations for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  // Update site logo when component mounts (if projectLogo is provided)
  useEffect(() => {
    if (!projectData.projectLogo) return;

    // Find the site logo element - adjust the selector based on your actual site structure
    const siteLogoImg = document.querySelector(
      "header .logo img"
    ) as HTMLImageElement | null;

    // Store the original logo src for restoration later
    let originalLogoSrc = "";

    if (siteLogoImg) {
      originalLogoSrc = siteLogoImg.src;
      // Update to the project logo
      siteLogoImg.src = projectData.projectLogo;
    }

    // Restore the original logo when component unmounts
    return () => {
      if (siteLogoImg && originalLogoSrc) {
        siteLogoImg.src = originalLogoSrc;
      }
    };
  }, [projectData.projectLogo]);

  // If the project has chapters, render the chapter-based layout
  if (projectData.chapters && projectData.chapters.length > 0) {
    return (
      <>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className='relative min-h-[90vh] flex items-end py-40 overflow-hidden'
          style={{
            backgroundColor:
              theme.primaryBackground || defaultTheme.primaryBackground,
            color: theme.textColor || defaultTheme.textColor,
          }}
        >
          <div className='absolute inset-0 w-full h-full z-0'>
            <VideoBackground
              videoUrl={projectData.backgroundVideo}
              imageUrl={projectData.heroImageUrl}
              alt={projectData.title}
            />
            <div className='absolute inset-0 bg-black/50 z-20'></div>
          </div>

          <div className='container mx-auto px-8 md:px-20 relative z-10 mb-20'>
            <motion.div
              className='max-w-4xl'
              style={{ y: heroTextY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: entryEasing }}
            >
              <h1
                className='text-5xl md:text-7xl lg:text-8xl mb-12 font-light tracking-tight text-white'
                style={{
                  fontFamily: theme.headingsFont || defaultTheme.headingsFont,
                }}
              >
                {projectData.title}
              </h1>
              <p
                className='text-xl md:text-2xl max-w-3xl leading-relaxed text-white/90'
                style={{ fontFamily: theme.bodyFont || defaultTheme.bodyFont }}
              >
                {projectData.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Chapters */}
        {projectData.chapters.map((chapter, chapterIndex) => (
          <section
            key={`chapter-${chapterIndex}`}
            className='py-40'
            style={{
              backgroundColor:
                chapterIndex % 2 === 0
                  ? theme.primaryBackground || defaultTheme.primaryBackground
                  : theme.secondaryBackground ||
                    defaultTheme.secondaryBackground,
            }}
          >
            <div className='container mx-auto px-8 md:px-20'>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: entryEasing }}
                className='mb-24'
              >
                <ChapterTitle
                  title={chapter.title}
                  color={theme.textColor || defaultTheme.textColor}
                  fontFamily={theme.headingsFont || defaultTheme.headingsFont}
                />
                <ChapterIntro
                  text={chapter.intro}
                  color={theme.textColor || defaultTheme.textColor}
                  fontFamily={theme.bodyFont || defaultTheme.bodyFont}
                />
              </motion.div>

              {/* Chapter Sections */}
              {chapter.sections?.map((section, sectionIndex) => (
                <motion.div
                  key={`section-${chapterIndex}-${sectionIndex}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    ease: entryEasing,
                    delay: 0.2,
                  }}
                  className='mb-40'
                  style={{
                    backgroundColor: section.backgroundColor || "transparent",
                  }}
                >
                  <SectionTitle
                    title={section.title}
                    align={section.alignment}
                    color={
                      section.textColor ||
                      theme.textColor ||
                      defaultTheme.textColor
                    }
                    fontFamily={theme.headingsFont || defaultTheme.headingsFont}
                  />
                  <SectionText
                    text={section.content}
                    align={section.alignment}
                    color={
                      section.textColor ||
                      theme.textColor ||
                      defaultTheme.textColor
                    }
                    fontFamily={theme.bodyFont || defaultTheme.bodyFont}
                  />

                  {section.media && section.media.length > 0 && (
                    <GalleryGrid
                      images={section.media}
                      projectTitle={projectData.title}
                    />
                  )}
                </motion.div>
              ))}

              {/* Chapter Testimonial */}
              {chapter.testimonial && (
                <TestimonialBlock
                  quote={chapter.testimonial.quote}
                  person={chapter.testimonial.author}
                  accentColor={theme.accentColor || defaultTheme.accentColor}
                  fontFamily={theme.bodyFont || defaultTheme.bodyFont}
                />
              )}

              {/* Chapter Media */}
              {chapter.media && chapter.media.length > 0 && (
                <GalleryGrid
                  images={chapter.media}
                  projectTitle={projectData.title}
                />
              )}
            </div>
          </section>
        ))}

        {/* Related Projects */}
        {projectData.relatedProjects &&
          projectData.relatedProjects.length > 0 && (
            <section className='py-32 bg-white'>
              <div className='px-8 md:px-20'>
                <div className='max-w-7xl mx-auto mb-20'>
                  <h2
                    className='text-5xl font-bold mb-6'
                    style={{
                      fontFamily:
                        theme.headingsFont || defaultTheme.headingsFont,
                      color: theme.textColor || defaultTheme.textColor,
                    }}
                  >
                    Related Projects
                  </h2>
                  <p
                    className='text-xl max-w-3xl'
                    style={{
                      fontFamily: theme.bodyFont || defaultTheme.bodyFont,
                      color: theme.textColor || defaultTheme.textColor,
                      opacity: 0.8,
                    }}
                  >
                    Explore other projects that complement {projectData.title}.
                  </p>
                </div>

                {/* Related Projects Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
                  {projectData.relatedProjects.map(
                    (project: ImpactRelatedProject, index: number) => (
                      <div key={index}>
                        <Link
                          href={`/savvy-impact/project/${project.slug.current}`}
                          className='group flex flex-col h-full'
                        >
                          <div className='aspect-video mb-6 overflow-hidden rounded-lg'>
                            <div
                              className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700'
                              style={{
                                backgroundImage: `url(${project.heroImageUrl || "/images/projects/placeholder.jpg"})`,
                              }}
                            ></div>
                          </div>

                          <div>
                            <h3
                              className='text-2xl font-bold mb-3 group-hover:text-indigo-700 transition-colors duration-300'
                              style={{
                                fontFamily:
                                  theme.headingsFont ||
                                  defaultTheme.headingsFont,
                                color:
                                  theme.textColor || defaultTheme.textColor,
                              }}
                            >
                              {project.title}
                            </h3>
                            <p
                              className='mb-6'
                              style={{
                                fontFamily:
                                  theme.bodyFont || defaultTheme.bodyFont,
                                color:
                                  theme.textColor || defaultTheme.textColor,
                                opacity: 0.8,
                              }}
                            >
                              {project.subtitle}
                            </p>
                            <span
                              className='font-medium flex items-center group-hover:text-indigo-700 transition-all duration-300'
                              style={{
                                color:
                                  theme.accentColor || defaultTheme.accentColor,
                              }}
                            >
                              View Project
                              <svg
                                className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path d='M5 12h14M12 5l7 7-7 7' />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          )}

        {/* CTA Section */}
        <section
          className='py-32 text-white'
          style={{
            background: `linear-gradient(to bottom, ${theme.accentColor || defaultTheme.accentColor}, ${theme.footerBackground || defaultTheme.footerBackground})`,
          }}
        >
          <div className='px-8 md:px-20'>
            <div className='max-w-5xl mx-auto text-center'>
              <h2
                className='text-5xl font-bold mb-6'
                style={{
                  fontFamily: theme.headingsFont || defaultTheme.headingsFont,
                }}
              >
                Interested in {projectData.title}?
              </h2>
              <p
                className='text-xl mb-12 max-w-3xl mx-auto'
                style={{
                  fontFamily: theme.bodyFont || defaultTheme.bodyFont,
                  opacity: 0.8,
                }}
              >
                Let&apos;s discuss how we can create similar strategic impact
                for your organization.
              </p>
              <Link
                href='/contact'
                className='inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 rounded-full font-medium transition-all duration-300'
                style={{ color: theme.accentColor || defaultTheme.accentColor }}
              >
                <span>Start a Conversation</span>
                <svg
                  className='ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Standard layout code (unchanged)
  return (
    <>
      {/* Hero Section */}
      <section className='relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden'>
        {/* Hero Video or Image Background */}
        <div className='absolute inset-0 w-full h-full z-0'>
          <VideoBackground
            videoUrl={projectData.backgroundVideo}
            imageUrl={projectData.heroImageUrl}
            alt={projectData.title}
          />
          <div className='absolute inset-0 bg-black/50 z-20'></div>
        </div>

        {/* Text Overlay */}
        <div className='absolute inset-0 flex items-center z-30'>
          <div className='px-8 md:px-20 max-w-5xl'>
            {/* Tags */}
            <div className='flex flex-wrap gap-3 mb-6'>
              {projectData.tags?.map((tag: string, i: number) => (
                <span
                  key={i}
                  className='text-xs md:text-sm text-white/80 py-1 px-3 border border-white/30 rounded-full'
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className='text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6'
              style={{
                fontFamily: theme.headingsFont || defaultTheme.headingsFont,
              }}
            >
              {projectData.title}
            </h1>
            <p
              className='text-xl md:text-2xl max-w-2xl text-white/90 mb-10'
              style={{ fontFamily: theme.bodyFont || defaultTheme.bodyFont }}
            >
              {projectData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Project Introduction */}
      <section
        className='px-8 md:px-20 py-32'
        style={{
          backgroundColor:
            theme.primaryBackground || defaultTheme.primaryBackground,
          color: theme.textColor || defaultTheme.textColor,
        }}
      >
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
            <div>
              <h2
                className='text-4xl md:text-5xl font-bold mb-10'
                style={{
                  fontFamily: theme.headingsFont || defaultTheme.headingsFont,
                }}
              >
                Project Overview
              </h2>
              <p
                className='text-xl leading-relaxed mb-8'
                style={{
                  fontFamily: theme.bodyFont || defaultTheme.bodyFont,
                  opacity: 0.9,
                }}
              >
                {projectData.description}
              </p>
            </div>

            <div className='lg:mt-10'>
              <div className='aspect-4/3 relative overflow-hidden rounded-lg'>
                <Image
                  src={
                    projectData.heroImageUrl ||
                    "/images/projects/placeholder.jpg"
                  }
                  alt={projectData.title}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {projectData.features && projectData.features.length > 0 && (
        <section
          className='py-32'
          style={{
            backgroundColor:
              theme.secondaryBackground || defaultTheme.secondaryBackground,
            color: theme.textColor || defaultTheme.textColor,
          }}
        >
          <div className='px-8 md:px-20'>
            <div className='max-w-7xl mx-auto mb-20'>
              <h2
                className='text-5xl font-bold mb-6'
                style={{
                  fontFamily: theme.headingsFont || defaultTheme.headingsFont,
                }}
              >
                Key Features
              </h2>
              <p
                className='text-xl max-w-3xl'
                style={{
                  fontFamily: theme.bodyFont || defaultTheme.bodyFont,
                  opacity: 0.9,
                }}
              >
                Discover what makes {projectData.title} stand out from the
                crowd.
              </p>
            </div>

            {/* Features Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
              {projectData.features.map(
                (feature: ImpactFeature, index: number) => (
                  <div
                    key={index}
                    className='p-10 rounded-lg shadow-xs'
                    style={{
                      backgroundColor:
                        theme.primaryBackground ||
                        defaultTheme.primaryBackground,
                    }}
                  >
                    <h3
                      className='text-2xl font-bold mb-4'
                      style={{
                        fontFamily:
                          theme.headingsFont || defaultTheme.headingsFont,
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: theme.bodyFont || defaultTheme.bodyFont,
                        opacity: 0.8,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {projectData.testimonials && projectData.testimonials.length > 0 && (
        <section className='py-32'>
          <div className='px-8 md:px-20'>
            <div className='max-w-5xl mx-auto'>
              {projectData.testimonials.map(
                (testimonial: ImpactTestimonial, index: number) => (
                  <div key={index} className='mb-20'>
                    <blockquote className='relative'>
                      <div className='text-4xl font-serif absolute -top-10 -left-16 text-gray-200'>
                        &ldquo;
                      </div>
                      <p className='text-2xl italic mb-6'>
                        {testimonial.quote}
                      </p>
                      <footer className='font-medium'>
                        &mdash; {testimonial.author}
                        {(testimonial.role || testimonial.company) && (
                          <span className='text-gray-500 ml-2'>
                            {testimonial.role && testimonial.role}
                            {testimonial.role && testimonial.company && ", "}
                            {testimonial.company && testimonial.company}
                          </span>
                        )}
                      </footer>
                    </blockquote>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {projectData.gallery && projectData.gallery.length > 0 && (
        <section className='py-32 bg-gray-50'>
          <div className='px-8 md:px-20'>
            <div className='max-w-7xl mx-auto'>
              <h2 className='text-4xl font-bold mb-16'>Project Gallery</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {projectData.gallery.map((image: string, index: number) => (
                  <div
                    key={index}
                    className='aspect-4/3 relative overflow-hidden rounded-lg'
                  >
                    <Image
                      src={image}
                      alt={`${projectData.title} gallery image ${index + 1}`}
                      fill
                      className='object-cover hover:scale-105 transition-transform duration-700'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {projectData.relatedProjects &&
        projectData.relatedProjects.length > 0 && (
          <section className='py-32'>
            <div className='px-8 md:px-20'>
              <div className='max-w-7xl mx-auto'>
                <h2 className='text-4xl font-bold mb-6'>Related Projects</h2>
                <p className='text-xl max-w-3xl mb-16'>
                  Explore other projects that complement {projectData.title}.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                  {projectData.relatedProjects.map(
                    (project: ImpactRelatedProject, index: number) => (
                      <div key={index}>
                        <Link
                          href={`/savvy-impact/project/${project.slug.current}`}
                          className='group'
                        >
                          <div className='aspect-video mb-6 overflow-hidden rounded-lg'>
                            <div
                              className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700'
                              style={{
                                backgroundImage: `url(${project.heroImageUrl})`,
                              }}
                            ></div>
                          </div>
                          <h3 className='text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300'>
                            {project.title}
                          </h3>
                          <p className='text-gray-600 mb-6'>
                            {project.subtitle}
                          </p>
                          <span className='font-medium text-blue-600 flex items-center group-hover:translate-x-2 transition-all duration-300'>
                            View Project
                            <svg
                              className='w-4 h-4 ml-2'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                            >
                              <path d='M5 12h14M12 5l7 7-7 7' />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

      {/* Call-to-Action */}
      <section className='py-32 bg-blue-600 text-white'>
        <div className='px-8 md:px-20'>
          <div className='max-w-5xl mx-auto text-center'>
            <h2 className='text-5xl font-bold mb-6'>
              Interested in {projectData.title}?
            </h2>
            <p className='text-xl mb-12 max-w-3xl mx-auto'>
              Let&apos;s discuss how we can create similar strategic impact for
              your organization.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-full font-medium'
            >
              <span>Start a Conversation</span>
              <svg
                className='ml-3 w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
