"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Header from "@/components/layout/Header";

// Types for service categories and products
interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  link: string;
  highlights?: string[];
  stats?: { label: string; value: string }[];
  color: string;
  features?: {
    title: string;
    description: string;
  }[];
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

// Define services data
const servicesData: Category[] = [
  {
    id: "everyone",
    name: "For Everyone",
    products: [
      {
        id: "swway",
        name: "Swway",
        description:
          "The world's first AI-powered digital creative agency platform.",
        icon: "/images/ghost_savvy_icon.svg",
        link: "/swway",
        highlights: [
          "AI-powered creative solutions",
          "End-to-end marketing automation",
          "Custom growth strategies",
        ],
        stats: [
          { label: "CLIENTS SERVED", value: "100+" },
          { label: "CONVERSION INCREASE", value: "30%" },
        ],
        color: "#DEFF3C",
        features: [
          {
            title: "Custom Branding",
            description:
              "Custom AI-generated branding that captures your unique identity.",
          },
          {
            title: "Marketing Automation",
            description:
              "Automated marketing campaigns that drive consistent engagement.",
          },
          {
            title: "Growth Analytics",
            description:
              "AI-powered analytics to identify your best growth opportunities.",
          },
        ],
      },
    ],
  },
  {
    id: "businesses",
    name: "For Businesses",
    products: [
      {
        id: "savvy-shop",
        name: "Savvy Shop",
        description: "AI-powered e-commerce solution for modern businesses.",
        icon: "/images/ghost_savvy_icon.svg",
        link: "/services/savvy-shop",
        highlights: [
          "Intelligent product recommendations",
          "Automated inventory management",
          "Conversion-optimized checkout",
        ],
        color: "#FF6B35",
        features: [
          {
            title: "Smart Catalog",
            description:
              "AI-optimized product catalog for maximum discoverability.",
          },
          {
            title: "Personalized Shopping",
            description: "Tailored shopping experiences for each customer.",
          },
          {
            title: "Revenue Optimization",
            description: "Dynamic pricing and bundling to maximize revenue.",
          },
        ],
      },
      {
        id: "savvy-sites",
        name: "Savvy Sites",
        description: "Intelligent websites that adapt to visitor behavior.",
        icon: "/images/ghost_savvy_icon.svg",
        link: "/services/savvy-sites",
        highlights: [
          "Dynamic content personalization",
          "Behavior-based optimization",
          "AI-driven lead capture",
        ],
        color: "#4CC9F0",
        features: [
          {
            title: "Smart Layouts",
            description:
              "Layouts that adapt based on visitor engagement patterns.",
          },
          {
            title: "Conversion Engine",
            description:
              "AI-optimized conversion paths for different visitor segments.",
          },
          {
            title: "Content Intelligence",
            description: "Content that evolves based on performance data.",
          },
        ],
      },
    ],
  },
  {
    id: "developers",
    name: "For Developers",
    products: [
      {
        id: "savvy-cms",
        name: "Savvy CMS",
        description: "An AI-enhanced headless CMS for digital experiences.",
        icon: "/images/ghost_savvy_icon.svg",
        link: "/services/savvy-cms",
        highlights: [
          "Content intelligence",
          "Automated optimization",
          "Developer-friendly API",
        ],
        color: "#7209B7",
        features: [
          {
            title: "Content Modeling",
            description:
              "Flexible content modeling with AI-suggested improvements.",
          },
          {
            title: "GraphQL API",
            description: "Powerful GraphQL API for flexible content delivery.",
          },
          {
            title: "Smart Publishing",
            description: "AI-powered publishing workflows and scheduling.",
          },
        ],
      },
      {
        id: "ghostkit",
        name: "GhostKit",
        description: "Developer toolkit for AI-enhanced applications.",
        icon: "/images/ghost_savvy_icon.svg",
        link: "/services/ghostkit",
        highlights: [
          "AI component library",
          "Intelligent state management",
          "Performance optimization",
        ],
        color: "#3A0CA3",
        features: [
          {
            title: "AI Components",
            description: "Ready-to-use AI-powered UI components.",
          },
          {
            title: "Smart State",
            description:
              "Intelligent state management with predictive capabilities.",
          },
          {
            title: "Performance Engine",
            description:
              "Automated performance optimization for your applications.",
          },
        ],
      },
    ],
  },
  {
    id: "enterprise",
    name: "For Enterprise",
    products: [
      {
        id: "savvy-launch",
        name: "Savvy Launch",
        description: "End-to-end product launch platform for enterprise.",
        icon: "/images/ghost_savvy_icon.svg",
        link: "/services/savvy-launch",
        highlights: [
          "Go-to-market automation",
          "Launch analytics",
          "Market intelligence",
        ],
        color: "#F72585",
        features: [
          {
            title: "Launch Planning",
            description: "AI-powered launch planning and timeline management.",
          },
          {
            title: "Market Analysis",
            description: "Predictive market analysis for optimal positioning.",
          },
          {
            title: "Performance Tracking",
            description:
              "Real-time launch performance tracking and optimization.",
          },
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>(
    servicesData[0].id
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Get active category data
  const categoryData =
    servicesData.find((cat) => cat.id === activeCategory) || servicesData[0];

  return (
    <main className='min-h-screen bg-black text-white'>
      <Header />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className='relative min-h-[80vh] flex items-center justify-center overflow-hidden'
      >
        <div className='absolute inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black z-10' />
          <div className='absolute inset-0'>
            <Image
              src='/images/ai-services-bg.jpg'
              alt='AI Services Background'
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-32 pb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='max-w-5xl mx-auto text-center'
          >
            <h1 className='text-5xl md:text-7xl font-bold mb-6'>
              Pioneering AI-Powered Digital Services
            </h1>
            <p className='text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto'>
              Our suite of AI-enhanced products and services designed to
              transform the way you build, market, and grow your digital
              presence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Navigation */}
      <section className='bg-zinc-900 py-6 sticky top-0 z-30 border-b border-zinc-800'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-center space-x-4 overflow-x-auto pb-2'>
            {servicesData.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-lg font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-white text-black"
                    : "bg-transparent text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className='py-20 bg-gradient-to-b from-black to-zinc-900'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-screen-xl mx-auto'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-4xl font-bold mb-16 text-center'
            >
              {categoryData.name}
            </motion.h2>

            <div className='space-y-40'>
              {categoryData.products.map((product) => (
                <div key={product.id} className='group'>
                  <div
                    className={`rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 relative`}
                  >
                    <div
                      className='absolute inset-0 opacity-10 z-0 bg-gradient-to-r'
                      style={{
                        background: `linear-gradient(to right, ${product.color}22, transparent)`,
                      }}
                    />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 relative z-10'>
                      {/* Left Column - Product Info */}
                      <div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className='mb-8'
                        >
                          <div className='flex items-center mb-6'>
                            <div className='w-16 h-16 mr-4 relative flex-shrink-0'>
                              <Image
                                src={product.icon}
                                alt={product.name}
                                width={64}
                                height={64}
                                className='object-contain'
                              />
                            </div>
                            <h3 className='text-3xl md:text-4xl font-bold'>
                              {product.name}
                            </h3>
                          </div>
                          <p className='text-xl text-gray-300 mb-8'>
                            {product.description}
                          </p>

                          <Link
                            href={product.link}
                            className={`px-8 py-4 rounded-full text-black font-medium inline-flex items-center transition-all`}
                            style={{
                              backgroundColor: product.color,
                            }}
                          >
                            <span>Explore {product.name}</span>
                            <svg
                              className='ml-2 w-5 h-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M13 7l5 5m0 0l-5 5m5-5H6'
                              />
                            </svg>
                          </Link>
                        </motion.div>

                        {/* Highlights */}
                        {product.highlights && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className='mb-8'
                          >
                            <h4 className='text-xl font-semibold mb-4'>
                              Key Highlights
                            </h4>
                            <ul className='space-y-3'>
                              {product.highlights.map((highlight, i) => (
                                <li key={i} className='flex items-start'>
                                  <svg
                                    className={`w-5 h-5 mr-3 mt-1 flex-shrink-0`}
                                    style={{ color: product.color }}
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
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}

                        {/* Stats */}
                        {product.stats && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className='flex flex-wrap gap-8'
                          >
                            {product.stats.map((stat, i) => (
                              <div key={i}>
                                <p className='text-sm text-gray-500'>
                                  {stat.label}
                                </p>
                                <p className='text-3xl font-bold'>
                                  {stat.value}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Right Column - Features */}
                      <div>
                        {product.features && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          >
                            <div className='space-y-8'>
                              {product.features.map((feature, i) => (
                                <div
                                  key={i}
                                  className='p-6 rounded-xl bg-black/30 border border-zinc-800 backdrop-blur-sm'
                                >
                                  <h4 className='text-xl font-semibold mb-2'>
                                    {feature.title}
                                  </h4>
                                  <p className='text-gray-400'>
                                    {feature.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ghost Savvy */}
      <section className='py-24 bg-black'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto text-center mb-16'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-4xl font-bold mb-6'
            >
              Why Choose Ghost Savvy?
            </motion.h2>
            <p className='text-xl text-gray-300'>
              We combine cutting-edge AI technology with expert human creativity
              to deliver solutions that transform digital experiences.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className='bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800'
            >
              <div className='w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-bold mb-3'>AI-First Approach</h3>
              <p className='text-gray-400'>
                Our products are built with AI at their core, enabling
                intelligence, automation, and personalization by default.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800'
            >
              <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 4.354a4 4 0 110 5.292V12H5.698A5.01 5.01 0 0112 4.354z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 10.344a4 4 0 105.292 0H12v6.656a5 5 0 10-5.28-8.28l-.36.36a4.97 4.97 0 00-.584.584l-.36.36a5 5 0 105.276 7.28'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-bold mb-3'>Human Creativity</h3>
              <p className='text-gray-400'>
                We combine AI capabilities with human expertise to ensure
                creative excellence and strategic thinking.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800'
            >
              <div className='w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-bold mb-3'>Measurable Results</h3>
              <p className='text-gray-400'>
                All our services focus on driving measurable outcomes, with
                built-in analytics and performance optimization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-b from-zinc-900 to-black'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-5xl mx-auto bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-12 text-center relative overflow-hidden'>
            <div className='absolute inset-0 opacity-30'>
              <div className='absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/30 filter blur-3xl'></div>
              <div className='absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/30 filter blur-3xl'></div>
            </div>

            <div className='relative z-10'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className='text-4xl font-bold mb-6'
              >
                Ready to Transform Your Digital Presence?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className='text-xl text-white/80 mb-10 max-w-2xl mx-auto'
              >
                Get in touch with our team to discuss how our AI-powered
                services can help you achieve your goals.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Link
                  href='/contact'
                  className='px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-medium inline-flex items-center hover:bg-blue-50 transition-colors'
                >
                  <span>Start a Conversation</span>
                  <svg
                    className='ml-2 w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
