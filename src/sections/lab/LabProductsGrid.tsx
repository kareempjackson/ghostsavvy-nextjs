"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const LabProductsGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryTabs = [
    { id: "all", label: "All Products" },
    { id: "everyone", label: "For Everyone" },
    { id: "creators", label: "For Creators" },
    { id: "developers", label: "For Developers" },
  ];

  const products = [
    {
      id: "vynl",
      name: "Vynl",
      description:
        "A music discovery platform powered by advanced AI algorithms",
      image: "/images/products/vynl-product.jpg",
      category: "everyone",
      link: "/savvy-lab/vynl",
      logoSrc: "/images/logos/vynl_logo.svg",
      highlight: "10M+ Monthly Active Users",
    },
    {
      id: "licid",
      name: "Licid",
      description: "Decentralized licensing platform for digital creators",
      image: "/images/products/licid-product.jpg",
      category: "creators",
      link: "/savvy-lab/licid",
      logoSrc: "/images/logos/licid_logo_white.svg",
      highlight: "400k+ Protected Assets",
    },
    {
      id: "undr",
      name: "Undr",
      description: "Immersive audio experience for spatial storytelling",
      image: "/images/products/undr-product.jpg",
      category: "everyone",
      link: "/savvy-lab/undr",
      logoSrc: "/images/logos/undr_logo_white.png",
      highlight: "8.5M Downloads",
    },
    {
      id: "mishmosh",
      name: "Mishmosh",
      description: "Visual collaboration tool for creative teams",
      image: "/images/products/mishmosh-product.jpg",
      category: "creators",
      link: "/savvy-lab/mishmosh",
      logoSrc: "/images/logos/mishmosh_logo.svg",
      highlight: "Used by 3,000+ Teams",
    },
    {
      id: "elee",
      name: "Elee",
      description: "AR platform for interactive learning experiences",
      image: "/images/products/elee-product.jpg",
      category: "developers",
      link: "/savvy-lab/elee",
      logoSrc: "/images/logos/Elee full white.svg",
      highlight: "2M+ Learners Globally",
    },
    {
      id: "procur",
      name: "Procur",
      description: "Developer toolkit for rapid prototyping and deployment",
      image: "/images/products/procur-product.jpg",
      category: "developers",
      link: "/savvy-lab/procur",
      logoSrc: "/images/logos/procur_logo.png",
      highlight: "95+ Open Source Integrations",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id='our-products' ref={sectionRef} className='py-24 bg-white'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='max-w-4xl mx-auto mb-16'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-6'>
            Our Product Suite
          </h2>
          <p className='text-xl text-gray-600'>
            Empowering digital creativity with innovative, future-proof
            solutions.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='border-b border-gray-200 mb-16'
        >
          <div className='flex overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide'>
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-8 py-3 font-medium transition-colors duration-300 mx-2 first:ml-0 ${
                  activeCategory === tab.id
                    ? "text-[#3F4697] border-b-2 border-[#3F4697]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className='group'
            >
              <Link href={product.link} className='block'>
                <div className='relative h-64 mb-6 overflow-hidden'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                  <div className='absolute top-0 left-0 p-4'>
                    <div className='h-10 w-10 relative'>
                      <Image
                        src={product.logoSrc}
                        alt={`${product.name} logo`}
                        fill
                        className='object-contain'
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-start justify-between'>
                    <h3 className='text-xl font-bold text-gray-900 group-hover:text-[#3F4697] transition-colors'>
                      {product.name}
                    </h3>
                    <span className='text-sm font-medium text-[#3F4697] px-3 py-1 bg-[#F4EBE0] inline-block'>
                      {product.highlight}
                    </span>
                  </div>
                  <p className='text-gray-600'>{product.description}</p>
                  <div className='inline-flex items-center text-[#3F4697] font-medium'>
                    Explore
                    <svg
                      className='w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1'
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
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabProductsGrid;
