"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Interface for Lab Product items from Sanity
interface LabProduct {
  _id: string;
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  icon: SanityImageSource;
  previewImage: SanityImageSource;
  link: string;
  category: string;
}

interface LabSectionProps {
  isHomePage?: boolean;
}

const ProductCard = ({ product }: { product: LabProduct }) => {
  return (
    <motion.div
      className='bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg h-full'
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={product.link} className='block h-full group'>
        <div className='relative aspect-video w-full overflow-hidden'>
          {product.previewImage && (
            <Image
              src={urlFor(product.previewImage).url()}
              alt={product.name}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
          )}
          <div className='absolute top-3 right-3'>
            <span className='bg-white/20 backdrop-blur-md text-white text-xs py-1 px-3 rounded-full'>
              {product.status}
            </span>
          </div>
        </div>

        <div className='p-5 sm:p-6'>
          <div className='flex items-center mb-3'>
            {product.icon && (
              <div className='w-8 h-8 mr-3 relative'>
                <Image
                  src={urlFor(product.icon).url()}
                  alt=''
                  fill
                  className='object-contain'
                />
              </div>
            )}
            <h3 className='text-lg sm:text-xl font-display font-medium text-white group-hover:text-[#D6FA9F] transition-colors'>
              {product.name}
            </h3>
          </div>

          <p className='text-white/80 mb-3 text-sm sm:text-base'>
            {product.tagline}
          </p>

          <div className='mt-4 flex items-center'>
            <span className='text-[#D6FA9F] text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform'>
              Explore Product
              <svg
                className='w-4 h-4 ml-1 transition-transform group-hover:translate-x-1'
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
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const LabSection = ({ isHomePage = false }: LabSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [labProducts, setLabProducts] = useState<LabProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchLabProducts = async () => {
      try {
        // Different query based on whether we're on the home page or not
        const query = isHomePage
          ? `*[_type == "labProduct" && featuredHome == true] | order(_createdAt desc)[0...6] {
              _id,
              id,
              name,
              tagline,
              description,
              status,
              icon,
              previewImage,
              link,
              category
            }`
          : `*[_type == "labProduct" && featured == true] | order(_createdAt desc)[0...6] {
              _id,
              id,
              name,
              tagline,
              description,
              status,
              icon,
              previewImage,
              link,
              category
            }`;

        const data = await client.fetch(query);
        setLabProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching lab products:", error);
        setIsLoading(false);
      }
    };

    fetchLabProducts();
  }, [isHomePage]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Loading state while fetching products
  if (isLoading) {
    return (
      <section className='py-16 sm:py-20 md:py-24 bg-[#111827]'>
        <div className='container mx-auto px-4 text-center text-white'>
          <p>Loading lab products...</p>
        </div>
      </section>
    );
  }

  // Empty state when no lab products are available
  if (labProducts.length === 0) {
    return (
      <section className='py-16 sm:py-20 md:py-24 bg-[#111827]'>
        <div className='container mx-auto px-4 text-center text-white'>
          <span className='text-[#D6FA9F] uppercase tracking-wider text-xs md:text-sm'>
            Lab
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mt-2 mb-4'>
            From Our Lab
          </h2>
          <p className='text-white/80 max-w-3xl mx-auto text-base md:text-lg mb-8'>
            No products have been featured for the lab section yet.
          </p>
          <Link
            href='/lab'
            className='inline-flex items-center px-6 py-3 bg-[#D6FA9F]/20 text-[#D6FA9F] hover:bg-[#D6FA9F]/30 transition-colors duration-300 rounded-full backdrop-blur-sm'
          >
            <span className='font-medium text-sm md:text-base'>
              Explore Our Lab
            </span>
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
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className='py-16 sm:py-20 md:py-24 bg-[#111827] relative overflow-hidden'
    >
      {/* Background decorative elements */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-[#D6FA9F]/20 to-transparent blur-3xl'></div>
        <div className='absolute left-0 bottom-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#D6FA9F]/10 to-transparent blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12 sm:mb-16'
        >
          <span className='text-[#D6FA9F] uppercase tracking-wider text-xs md:text-sm'>
            Lab
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mt-2 mb-4'>
            From Our Lab
          </h2>
          <p className='text-white/80 max-w-3xl mx-auto text-base md:text-lg'>
            Experimental products and tools we&apos;re building to explore the
            edges of what&apos;s possible.
          </p>
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-50px" }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
        >
          {labProducts.map((product) => (
            <motion.div key={product._id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className='flex justify-center mt-12 sm:mt-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href='/lab'
            className='inline-flex items-center px-6 py-3 bg-[#D6FA9F]/20 text-[#D6FA9F] hover:bg-[#D6FA9F]/30 transition-colors duration-300 rounded-full backdrop-blur-sm'
          >
            <span className='font-medium text-sm md:text-base'>
              Explore All Products
            </span>
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
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LabSection;
