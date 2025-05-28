"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Header from "@/components/layout/Header";

interface Product {
  _id: string;
  title: string;
  subtitle: string;
  slug: { current: string };
  heroImageUrl: string;
  backgroundVideo?: string;
  isFeatured: boolean;
  isHighlight?: boolean;
  tags?: string[];
  status?: string;
}

interface ClientSavvyLabPageProps {
  featuredHero: Product | null;
  highlightProjects: Product[];
  gridProjects: Product[];
}

export default function ClientSavvyLabPage({
  featuredHero,
  highlightProjects,
  gridProjects,
}: ClientSavvyLabPageProps) {
  // Create refs for sections
  const featuredHeroRef = useRef<HTMLElement>(null);
  const isFeaturedHeroInView = useInView(featuredHeroRef, { once: true });
  const storyIntroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Group grid products into pairs for layout
  const gridProductGroups: Product[][] = [];
  for (let i = 0; i < gridProjects.length; i += 2) {
    gridProductGroups.push(gridProjects.slice(i, i + 2));
  }

  // Animation variants for consistent motion
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  if (!featuredHero) {
    // Fallback if no featured project is found
    return (
      <main className='min-h-screen bg-white'>
        <Header />
        <div className='flex items-center justify-center min-h-screen'>
          <h1 className='text-2xl font-medium'>No projects available</h1>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white'>
      <Header />

      {/* Featured Product Hero Section */}
      <Link
        href={`/savvy-lab/project/${featuredHero.slug.current}`}
        className='block group'
      >
        <section
          ref={featuredHeroRef}
          className='relative w-full min-h-[60vh] md:min-h-screen-75 overflow-hidden'
        >
          {/* Video Background */}
          <div className='absolute inset-0 w-full h-full z-0'>
            {featuredHero.backgroundVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className='object-cover w-full h-full'
                poster={featuredHero.heroImageUrl}
              >
                <source src={featuredHero.backgroundVideo} type='video/mp4' />
              </video>
            ) : (
              <Image
                src={featuredHero.heroImageUrl}
                alt={featuredHero.title}
                fill
                className='object-cover'
                priority
              />
            )}
            <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10'></div>
          </div>

          {/* Text Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isFeaturedHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className='absolute bottom-0 left-0 p-10 md:p-16 z-20 max-w-5xl'
          >
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturedHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className='flex flex-wrap gap-3 mb-6'
            >
              {featuredHero.tags?.map((tag, i) => (
                <span
                  key={i}
                  className='text-xs md:text-sm text-white/60 py-1 px-3 border border-white/20 rounded-full'
                >
                  {tag}
                </span>
              ))}
              {featuredHero.status && (
                <span className='text-xs md:text-sm text-white bg-blue-500 py-1 px-3 rounded-full'>
                  {featuredHero.status}
                </span>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturedHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
              className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'
            >
              {featuredHero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturedHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className='text-base md:text-lg lg:text-xl max-w-lg text-white/80 mb-10'
            >
              {featuredHero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturedHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
            >
              <div className='inline-flex items-center px-7 py-3 rounded-full border border-white text-white hover:bg-[#CFF39E] hover:text-black hover:border-[#CFF39E] transition-all duration-300'>
                <span>Explore the Product</span>
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
              </div>
            </motion.div>
          </motion.div>
        </section>
      </Link>

      {/* Story Introduction Section */}
      <section ref={storyIntroRef} className='px-8 md:px-20 py-32 bg-white'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='max-w-7xl mx-auto'
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='text-5xl font-bold text-gray-900 mb-12'
          >
            Crafting Products
          </motion.h2>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-16'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Exploring Tomorrow
              </h3>
              <p className='text-lg text-gray-600'>
                Savvy Lab is our creative playground where we experiment with
                emerging technologies and design concepts, crafting products
                that challenge conventional thinking.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Smart Prototyping
              </h3>
              <p className='text-lg text-gray-600'>
                From concept to prototype, we rapidly iterate on ideas that
                address key challenges in creative industries, refining
                solutions with practical applications.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Human-Centered
              </h3>
              <p className='text-lg text-gray-600'>
                Every Savvy Lab project centers on enhancing human experiences,
                prioritizing usability, accessibility, and meaningful
                interaction above all else.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Highlight Projects Section */}
      {highlightProjects.length > 0 && (
        <section className='px-8 md:px-20 py-24 bg-gray-50'>
          <div className='max-w-7xl mx-auto'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='text-4xl font-bold text-gray-900 mb-16'
            >
              Featured Products
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {highlightProjects.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                >
                  <Link
                    href={`/savvy-lab/project/${product.slug.current}`}
                    className='block group h-full'
                  >
                    <div className='relative overflow-hidden rounded-lg aspect-4/3 mb-5'>
                      <Image
                        src={product.heroImageUrl}
                        alt={product.title}
                        fill
                        className='object-cover transform group-hover:scale-105 transition-transform duration-700'
                      />
                      <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300'></div>
                    </div>
                    <h3 className='text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                      {product.title}
                    </h3>
                    <p className='text-gray-600 mb-4'>{product.subtitle}</p>
                    {product.tags && product.tags.length > 0 && (
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {product.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className='text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className='text-blue-600 font-medium flex items-center'>
                      View Project
                      <svg
                        className='w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M14 5l7 7-7 7'
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      {gridProductGroups.length > 0 && (
        <section className='px-8 md:px-20 py-32 bg-white'>
          <div className='max-w-7xl mx-auto'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='text-4xl font-bold text-gray-900 mb-16'
            >
              Explore All Products
            </motion.h2>

            <div className='space-y-24'>
              {gridProductGroups.map((group, groupIndex) => (
                <div
                  key={`group-${groupIndex}`}
                  className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'
                >
                  {group.map((product, productIndex) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: productIndex * 0.1,
                      }}
                    >
                      <Link
                        href={`/savvy-lab/project/${product.slug.current}`}
                        className='block group'
                      >
                        <div className='relative overflow-hidden rounded-lg aspect-video mb-5'>
                          <Image
                            src={product.heroImageUrl}
                            alt={product.title}
                            fill
                            className='object-cover transform group-hover:scale-105 transition-transform duration-700'
                          />
                          <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300'></div>
                        </div>
                        <h3 className='text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                          {product.title}
                        </h3>
                        <p className='text-gray-600 mb-4'>{product.subtitle}</p>
                        {product.tags && product.tags.length > 0 && (
                          <div className='flex flex-wrap gap-2 mb-4'>
                            {product.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className='text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className='text-blue-600 font-medium flex items-center'>
                          View Project
                          <svg
                            className='w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M14 5l7 7-7 7'
                            />
                          </svg>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Innovation Approach Section */}
      <section className='px-8 md:px-20 py-32 bg-gray-50'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='mb-20'
          >
            <h2 className='text-4xl font-bold text-gray-900 mb-8'>
              Our Approach to Innovation
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl'>
              We combine strategic thinking with creative exploration to build
              products that make a measurable impact.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Discovery & Research
              </h3>
              <p className='text-lg text-gray-600 mb-6'>
                Every project starts with understanding the problem space. We
                immerse ourselves in research, interviewing potential users and
                stakeholders to uncover insights that inform our approach.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-3 mt-1 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>User interviews and contextual research</span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-3 mt-1 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>Market analysis and opportunity mapping</span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-3 mt-1 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>Technology evaluation and feasibility studies</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Prototyping & Iteration
              </h3>
              <p className='text-lg text-gray-600 mb-6'>
                We believe in making ideas tangible quickly. Our rapid
                prototyping approach allows us to test concepts with real users
                early and often, refining based on feedback.
              </p>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-3 mt-1 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>Low-fidelity wireframes and sketches</span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-3 mt-1 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>Interactive prototypes and user testing</span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-3 mt-1 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>Iterative development and continuous improvement</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className='relative px-8 md:px-20 py-32 bg-linear-to-br from-blue-900 to-indigo-800 text-white overflow-hidden'
      >
        {/* Background Pattern */}
        <div className='absolute inset-0 z-0 opacity-10'>
          <div className='absolute -top-24 -right-24 w-96 h-96 rounded-full bg-linear-to-r from-blue-400 to-indigo-400 filter blur-3xl'></div>
          <div className='absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-linear-to-r from-indigo-400 to-purple-400 filter blur-3xl'></div>
        </div>

        <div className='max-w-7xl mx-auto relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='text-center'
          >
            <h2 className='text-4xl md:text-5xl font-bold mb-8'>
              Have a Product Idea?
            </h2>
            <p className='text-xl text-white/80 max-w-2xl mx-auto mb-12'>
              We're always looking for new challenges and innovations. Share
              your concept with us, and let's explore how we can bring it to
              life together.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center px-8 py-4 bg-white text-indigo-800 rounded-full hover:bg-opacity-90 transition-all duration-300 font-medium'
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
          </motion.div>
        </div>
      </section>
    </main>
  );
}
