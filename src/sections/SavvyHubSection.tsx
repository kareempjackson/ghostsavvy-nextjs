"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor, formatDate } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Interface for HubContent items from Sanity
interface HubContentItem {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  image: SanityImageSource;
  video?: string;
  link: string;
  ctaText: string;
  date: string;
  size?: "large" | "medium" | "small";
}

const SavvyHubSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hubContent, setHubContent] = useState<HubContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchHubContent = async () => {
      try {
        const query = `*[_type == "hubContent"] | order(date desc)[0...5] {
          _id,
          id,
          title,
          description,
          category,
          image,
          video,
          link,
          ctaText,
          date,
          size
        }`;

        const data = await client.fetch(query);
        setHubContent(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hub content:", error);
        setIsLoading(false);
      }
    };

    fetchHubContent();
  }, []);

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
      medium: "col-span-12 md:col-span-4 row-span-1",
      small: "col-span-12 md:col-span-4 row-span-1",
    };

    const aspectRatioClasses = {
      large: "aspect-[16/9]",
      medium: "aspect-[4/3]",
      small: "aspect-[1/1]",
    };

    const titleSizeClasses = {
      large: "text-2xl md:text-3xl",
      medium: "text-xl md:text-2xl",
      small: "text-lg md:text-xl",
    };

    const descriptionSizeClasses = {
      large: "text-base",
      medium: "text-base",
      small: "text-sm",
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
            className={`relative ${aspectRatioClasses[size]} rounded-lg overflow-hidden mb-4`}
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
                  src={urlFor(item.image).url()}
                  alt={item.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />
              )
            )}

            {/* Category badge */}
            <div className='absolute top-4 left-4'>
              <span className='bg-black/80 text-white text-xs py-1 px-3 rounded-full backdrop-blur-sm'>
                {item.category}
              </span>
            </div>
          </div>

          <div className='px-1'>
            <div className='mb-2'>
              <span className='text-gray-500 text-xs'>
                {item.date ? formatDate(item.date) : ""}
              </span>
            </div>

            <h3
              className={`${titleSizeClasses[size]} font-display font-medium text-gray-900 mb-2 leading-tight group-hover:text-gray-700 transition-colors duration-300`}
            >
              {item.title}
            </h3>

            <p
              className={`${descriptionSizeClasses[size]} text-gray-600 mb-4 leading-relaxed line-clamp-3`}
            >
              {item.description}
            </p>

            <div className='flex items-center'>
              <span className='text-black font-medium group-hover:translate-x-1 transform transition-transform inline-flex items-center'>
                {item.ctaText}
                <svg
                  className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1'
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
      <section className='py-28 bg-white'>
        <div className='container mx-auto px-6 lg:px-8 text-center'>
          <p>Loading latest content...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className='py-28 bg-white'>
      <div className='container mx-auto px-6 lg:px-8' ref={containerRef}>
        {/* Header with consistent styling */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <span className='text-gray-600 uppercase tracking-wider text-sm'>
            Savvy Hub
          </span>
          <h2 className='text-3xl md:text-4xl font-display font-medium text-gray-900 mt-2 mb-6'>
            From the Savvy Hub
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto mb-8'>
            Ideas. Stories. Conversations. Explore insights, behind-the-scenes
            builds, and thought leadership from the Ghost Savvy team.
          </p>

          {/* Top CTA */}
          <Link
            href='/savvy-hub'
            className='inline-flex items-center px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 group'
          >
            <span>Explore All Content</span>
            <svg
              className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform'
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
        <div className='grid grid-cols-12 gap-6 md:gap-8'>
          {hubContent.map((item, index) => renderContentItem(item, index))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className='flex justify-center mt-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href='/savvy-hub'
            className='inline-flex items-center text-gray-900 hover:text-black group'
          >
            <span className='font-medium'>View All Content</span>
            <svg
              className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform'
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

export default SavvyHubSection;
