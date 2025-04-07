"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FeaturedProductSlider = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const featuredCategories = [
    {
      id: "everyone",
      title: "For Everyone",
      description: "User-friendly products designed for everyday use",
      products: [
        {
          id: "vynl",
          name: "Vynl",
          description:
            "Discover music tailored to your unique tastes with our AI-powered platform.",
          image: "/images/products/vynl-featured.jpg",
          stats: "10M+ Monthly Active Users",
          link: "/savvy-lab/vynl",
        },
      ],
    },
    {
      id: "creators",
      title: "For Creators",
      description:
        "Tools that empower artists, designers, and content creators",
      products: [
        {
          id: "licid",
          name: "Licid",
          description:
            "Protect your creative work with our decentralized licensing platform.",
          image: "/images/products/licid-featured.jpg",
          stats: "400k+ Protected Assets",
          link: "/savvy-lab/licid",
        },
      ],
    },
    {
      id: "developers",
      title: "For Developers",
      description:
        "Powerful APIs and toolkits for building innovative applications",
      products: [
        {
          id: "procur",
          name: "Procur",
          description:
            "Accelerate your development workflow with our robust toolkit and APIs.",
          image: "/images/products/procur-featured.jpg",
          stats: "95+ Open Source Integrations",
          link: "/savvy-lab/procur",
        },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className='py-28 bg-[#F9F9F9]'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='mb-20'
        >
          <span className='inline-block text-[#3F4697] font-medium mb-4'>
            FEATURED PRODUCTS
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-2xl'>
            Our Most Advanced Solutions
          </h2>
        </motion.div>

        <div className='space-y-32'>
          {featuredCategories.map((category, index) => (
            <div key={category.id} className='relative'>
              {/* Section Divider */}
              {index > 0 && (
                <div className='absolute -top-16 left-0 right-0 h-px bg-gray-200'></div>
              )}

              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className='mb-12'
              >
                <h3 className='text-3xl font-bold text-gray-900 mb-3'>
                  {category.title}
                </h3>
                <p className='text-gray-600 max-w-3xl'>
                  {category.description}
                </p>
              </motion.div>

              {/* Featured Product */}
              {category.products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.7, delay: 0.2 + 0.1 * index }}
                >
                  <div className='grid grid-cols-1 lg:grid-cols-5 gap-12 items-center'>
                    {/* Image Section (3/5 width) */}
                    <div className='lg:col-span-3 relative'>
                      <div className='relative aspect-[16/9] overflow-hidden'>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>

                    {/* Content Section (2/5 width) */}
                    <div className='lg:col-span-2'>
                      <div className='mb-6'>
                        <h4 className='text-3xl font-bold text-[#3F4697] mb-5'>
                          {product.name}
                        </h4>
                        <p className='text-gray-700 text-lg mb-6'>
                          {product.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className='flex items-center mb-8'>
                        <div className='w-1 h-16 bg-[#CFF39E] mr-4'></div>
                        <span className='text-2xl font-semibold text-[#3F4697]'>
                          {product.stats}
                        </span>
                      </div>

                      <Link
                        href={product.link}
                        className='inline-flex items-center text-[#3F4697] font-medium group'
                      >
                        <span className='border-b border-[#3F4697] pb-1 group-hover:border-b-2 transition-all'>
                          Learn more about {product.name}
                        </span>
                        <svg
                          className='w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1'
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
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSlider;
