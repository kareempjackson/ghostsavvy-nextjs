"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { client, formatDate } from "@/lib/mockClient";

// Interface for HubContent items
interface HubContentItem {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  video?: string;
  link: string;
  ctaText: string;
  date: string;
  size?: "large" | "medium" | "small";
}

interface HubSectionProps {
  isHomePage?: boolean;
}

const HubSection = ({ isHomePage = false }: HubSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hubContent, setHubContent] = useState<HubContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from mock client
  useEffect(() => {
    const fetchHubContent = async () => {
      try {
        // Different query based on whether we're on the home page or not
        const query = isHomePage
          ? `*[_type == "hubContent" && featuredHome == true] | order(date desc)[0...5]`
          : `*[_type == "hubContent" && featured == true] | order(date desc)[0...5]`;

        const data = await client.fetch(query);

        // Ensure all content items have required fields
        const validContent = data.map((item: any) => ({
          ...item,
          // Ensure link and ctaText are always strings
          link: item.link || `/hub/${item.id}`,
          ctaText: item.ctaText || "Read More",
        }));

        setHubContent(validContent);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hub content:", error);
        setIsLoading(false);
      }
    };

    fetchHubContent();
  }, [isHomePage]);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Helper function to render content item based on size
  const renderContentItem = (item: HubContentItem, index: number) => {
    // Determine the styling based on item size
    const sizeClasses = {
      large: "col-span-12 md:col-span-8 row-span-2",
      medium: "col-span-12 sm:col-span-6 md:col-span-4 row-span-1",
      small: "col-span-12 sm:col-span-6 md:col-span-4 row-span-1",
    };

    const aspectRatioClasses = {
      large: "aspect-video",
      medium: "aspect-4/3",
      small: "aspect-square",
    };

    const titleSizeClasses = {
      large: "text-xl sm:text-2xl md:text-3xl",
      medium: "text-lg sm:text-xl md:text-2xl",
      small: "text-base sm:text-lg md:text-xl",
    };

    const descriptionSizeClasses = {
      large: "text-sm sm:text-base",
      medium: "text-sm sm:text-base",
      small: "text-xs sm:text-sm",
    };

    const size = item.size || "medium";

    return (
      <motion.div
        key={item._id}
        className={`${sizeClasses[size]} ${index % 2 === 0 ? "md:mt-8" : ""}`}
        variants={itemVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1 }}
      >
        <Link href={item.link} className='block group h-full'>
          <div
            className={`relative ${aspectRatioClasses[size]} rounded-lg overflow-hidden mb-3 sm:mb-4`}
          >
            {item.video ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              >
                <source src={item.video} type='video/mp4' />
              </video>
            ) : (
              item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />
              )
            )}

            {/* Category badge */}
            <div className='absolute top-3 sm:top-4 left-3 sm:left-4'>
              <span className='bg-black/80 text-white text-[10px] sm:text-xs py-1 px-2 sm:px-3 rounded-full backdrop-blur-xs'>
                {item.category}
              </span>
            </div>
          </div>

          <div className='px-1'>
            <div className='mb-1 sm:mb-2'>
              <span className='text-gray-500 text-[10px] sm:text-xs'>
                {item.date ? formatDate(item.date) : ""}
              </span>
            </div>

            <h3
              className={`${titleSizeClasses[size]} font-display font-medium text-gray-900 mb-1 sm:mb-2 leading-tight group-hover:text-gray-700 transition-colors duration-300`}
            >
              {item.title}
            </h3>

            <p
              className={`${descriptionSizeClasses[size]} text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3`}
            >
              {item.description}
            </p>

            <div className='flex items-center'>
              <span className='text-black text-sm sm:text-base font-medium group-hover:translate-x-1 transform transition-transform inline-flex items-center'>
                {item.ctaText}
                <svg
                  className='w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform group-hover:translate-x-1'
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

  // Loading state while fetching content
  if (isLoading) {
    return (
      <section className='py-16 sm:py-20 md:py-28 bg-white'>
        <div className='container-custom text-center'>
          <p>Loading latest content...</p>
        </div>
      </section>
    );
  }

  // Empty state when no content is available
  if (hubContent.length === 0) {
    return (
      <section className='py-16 sm:py-20 md:py-28 bg-white'>
        <div className='container-custom text-center'>
          <span className='text-gray-600 uppercase tracking-wider text-xs sm:text-sm'>
            Hub
          </span>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-display font-medium text-gray-900 mt-1 sm:mt-2 mb-3 sm:mb-4 md:mb-6'>
            From the Hub
          </h2>
          <p className='text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4'>
            No content has been featured for the hub section yet.
          </p>
          <Link
            href='/hub'
            className='inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 group text-sm sm:text-base'
          >
            <span>Explore Hub</span>
            <svg
              className='w-3 h-3 sm:w-4 sm:h-4 ml-2 transform group-hover:translate-x-1 transition-transform'
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
    <section ref={sectionRef} className='py-16 sm:py-20 md:py-28 bg-white'>
      <div className='container-custom' ref={containerRef}>
        {/* Header with consistent styling */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-8 sm:mb-12 md:mb-16'
        >
          <span className='text-gray-600 uppercase tracking-wider text-xs sm:text-sm'>
            Hub
          </span>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-display font-medium text-gray-900 mt-1 sm:mt-2 mb-3 sm:mb-4 md:mb-6'>
            From the Hub
          </h2>
          <p className='text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4'>
            Ideas. Stories. Conversations. Explore insights, behind-the-scenes
            builds, and thought leadership from the Ghost Savvy team.
          </p>

          {/* Top CTA */}
          <Link
            href='/hub'
            className='inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 group text-sm sm:text-base'
          >
            <span>Explore All Content</span>
            <svg
              className='w-3 h-3 sm:w-4 sm:h-4 ml-2 transform group-hover:translate-x-1 transition-transform'
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

        {/* Content grid - dynamic based on screen size */}
        <div className='grid grid-cols-12 gap-4 sm:gap-6 md:gap-8'>
          {hubContent.map((item, index) => renderContentItem(item, index))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className='flex justify-center mt-8 sm:mt-12 md:mt-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href='/hub'
            className='inline-flex items-center text-gray-900 hover:text-black group text-sm sm:text-base'
          >
            <span className='font-medium'>View All Content</span>
            <svg
              className='w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform'
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

export default HubSection;
