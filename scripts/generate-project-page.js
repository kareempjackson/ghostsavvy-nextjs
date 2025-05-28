#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if project ID is provided
if (process.argv.length < 3) {
  console.error("Please provide a project ID");
  process.exit(1);
}

const projectId = process.argv[2];

// Template for the project page
const template = `"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { savvyLabProjects } from "../../../../data/savvyLabProjectsData";

// Get project data
const project = savvyLabProjects.find(p => p.id === "${projectId}");

export default function ProjectDetail() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const isOverviewInView = useInView(overviewRef, { once: true, amount: 0.3 });
  const isApproachInView = useInView(approachRef, { once: true, amount: 0.3 });
  const isTestimonialInView = useInView(testimonialRef, {
    once: true,
    amount: 0.6,
  });
  const isResultsInView = useInView(resultsRef, { once: true, amount: 0.4 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to determine tag color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hr":
        return "bg-purple-100 text-purple-800";
      case "data":
        return "bg-blue-100 text-blue-800";
      case "fintech":
        return "bg-green-100 text-green-800";
      case "travel":
        return "bg-amber-100 text-amber-800";
      case "social":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/savvy-lab"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Savvy Lab
          </Link>
        </div>
      </div>
    );
  }

  const tagColor = getCategoryColor(project.category);

  return (
    <main className='bg-white'>
      {/* Sticky navigation */}
      <div className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4'>
        <div className='container mx-auto px-6 flex justify-between items-center'>
          <Link
            href='/savvy-lab'
            className='inline-flex items-center text-gray-500 hover:text-black transition-colors group'
          >
            <svg
              className='w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M19 12H5M5 12L12 19M5 12L12 5' />
            </svg>
            Back to Savvy Lab
          </Link>

          <div className='hidden md:flex space-x-8 text-sm'>
            <a href='#overview' className='hover:text-indigo-600 font-medium'>
              Overview
            </a>
            <a href='#approach' className='hover:text-indigo-600 font-medium'>
              Approach
            </a>
            <a href='#results' className='hover:text-indigo-600 font-medium'>
              Results
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative bg-gray-900 text-white overflow-hidden'
      >
        <motion.div
          className='absolute inset-0 w-full h-full'
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className='object-cover opacity-60'
            priority
          />
        </motion.div>

        <div className='relative min-h-[70vh] flex items-center'>
          <div className='container mx-auto px-6 py-20 md:py-32'>
            <motion.div className='max-w-3xl' style={{ y: heroTextY }}>
              <span
                className={\`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 \${tagColor}\`}
              >
                {project.category.charAt(0).toUpperCase() +
                  project.category.slice(1)}
              </span>
              <h1 className='text-4xl md:text-6xl font-bold mb-6'>
                {project.title}
              </h1>
              <p className='text-xl md:text-2xl text-white/80 mb-8 max-w-2xl'>
                {project.subtitle}
              </p>
              <div className='flex flex-wrap gap-2'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id='overview' ref={overviewRef} className='py-20 md:py-32'>
        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1] }}
            className='max-w-3xl mx-auto'
          >
            <p className='text-gray-700 text-lg leading-relaxed mb-12'>
              {project.fullDescription}
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
              {project.impactMetrics.map((metric, index) => (
                <div key={index} className='text-center'>
                  <div className='text-4xl font-bold text-indigo-600 mb-2'>
                    {metric.value}
                  </div>
                  <div className='text-gray-500'>{metric.label}</div>
                </div>
              ))}
            </div>

            <div className='bg-gray-50 p-8 rounded-xl'>
              <h3 className='text-xl font-semibold mb-4'>The Challenge</h3>
              <p className='text-gray-700'>{project.challenge}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section
        id='approach'
        ref={approachRef}
        className='py-20 md:py-32 bg-gray-50'
      >
        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold mb-8'>Our Approach</h2>
              <p className='text-gray-700 text-lg leading-relaxed mb-16'>
                {project.approach}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
              {project.process.map((step, index) => (
                <div
                  key={index}
                  className='bg-white rounded-xl shadow-xs overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1'
                >
                  <div className='h-48 relative'>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='p-6'>
                    <div className='flex items-center mb-3'>
                      <div className='w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold mr-3'>
                        {index + 1}
                      </div>
                      <h3 className='font-semibold text-lg'>{step.title}</h3>
                    </div>
                    <p className='text-gray-600'>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        ref={testimonialRef}
        className='py-20 md:py-32 bg-indigo-900 text-white'
      >
        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isTestimonialInView ? { opacity: 1, scale: 1 } : {}
            }
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1] }}
            className='max-w-4xl mx-auto text-center'
          >
            <svg
              className='w-16 h-16 mx-auto mb-8 text-indigo-500 opacity-30'
              fill='currentColor'
              viewBox='0 0 32 32'
              aria-hidden='true'
            >
              <path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
            </svg>
            <p className='text-xl md:text-2xl font-light leading-relaxed mb-8'>
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <div>
              <div className='font-medium text-white'>
                {project.testimonial.author}
              </div>
              <div className='text-indigo-300'>
                {project.testimonial.role}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section id='results' ref={resultsRef} className='py-20 md:py-32'>
        <div className='container mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1] }}
            className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'
          >
            <div>
              <h2 className='text-3xl font-bold mb-8'>Results</h2>
              <p className='text-gray-700 text-lg leading-relaxed mb-8'>
                {project.results}
              </p>

              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='rounded-full bg-green-100 p-2 mr-4'>
                    <svg
                      className='w-5 h-5 text-green-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 13l4 4L19 7'
                      ></path>
                    </svg>
                  </div>
                  <div className='text-gray-700'>
                    <strong>Technologies Used:</strong>{' '}
                    {project.technologies.join(', ')}
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='rounded-full bg-blue-100 p-2 mr-4'>
                    <svg
                      className='w-5 h-5 text-blue-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      ></path>
                    </svg>
                  </div>
                  <div className='text-gray-700'>
                    <strong>Services Provided:</strong>{' '}
                    {project.services.join(', ')}
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='rounded-full bg-purple-100 p-2 mr-4'>
                    <svg
                      className='w-5 h-5 text-purple-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      ></path>
                    </svg>
                  </div>
                  <div className='text-gray-700'>
                    <strong>Project Timeline:</strong> Completed on {project.date}
                  </div>
                </div>
              </div>
            </div>

            <div className='aspect-video relative rounded-2xl overflow-hidden shadow-lg'>
              <Image
                src={project.additionalImages[0]}
                alt='Project Results'
                fill
                className='object-cover'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 md:py-32 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto mb-16 text-center'>
            <h2 className='text-3xl font-bold mb-6'>Meet the Team</h2>
            <p className='text-gray-600'>
              The talented individuals who brought this project to life
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {project.team.map((member, index) => (
              <div
                key={index}
                className='text-center bg-white p-8 rounded-xl shadow-xs'
              >
                <div className='w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-2xl text-gray-500'>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className='font-semibold text-lg'>{member.name}</h3>
                <p className='text-gray-500'>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className='py-20 md:py-32'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl font-bold mb-16 text-center'>
            Related Projects
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
            {savvyLabProjects
              .filter(p => project.relatedProjects.includes(p.id))
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={\`/savvy-lab/project/\${relatedProject.id}\`}
                  className='group'
                >
                  <div className='rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1'>
                    <div className='h-64 relative'>
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='p-6'>
                      <span
                        className={\`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 \${getCategoryColor(
                          relatedProject.category
                        )}\`}
                      >
                        {relatedProject.category.charAt(0).toUpperCase() +
                          relatedProject.category.slice(1)}
                      </span>
                      <h3 className='text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors'>
                        {relatedProject.title}
                      </h3>
                      <p className='text-gray-600 mb-4'>
                        {relatedProject.description}
                      </p>
                      <div className='inline-flex items-center text-indigo-600 font-medium group-hover:underline'>
                        View Project <FiArrowRight className='ml-2' />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 md:py-32 bg-indigo-900 text-white'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            Ready to build something amazing?
          </h2>
          <p className='text-xl text-indigo-200 max-w-3xl mx-auto mb-12'>
            Let&#39;s discuss how we can help bring your ideas to life with innovative solutions
          </p>
          <Link
            href='/contact'
            className='inline-block bg-white text-indigo-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors'
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}`;

// Create directory structure if it doesn't exist
const dirPath = path.join(
  __dirname,
  "..",
  "src/app/savvy-lab/project",
  projectId
);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Create the page file
const filePath = path.join(dirPath, "page.tsx");
fs.writeFileSync(filePath, template, "utf8");

console.log(`Created project page for ${projectId} at ${filePath}`);
