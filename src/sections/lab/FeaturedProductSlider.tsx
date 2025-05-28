"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Interface for Lab Product items from Sanity
interface LabProduct {
  _id: string;
  id: string;
  name: string;
  description: string;
  category: string;
  highlight?: string;
  previewImage?: SanityImageSource;
  link: string;
  featuredHome?: boolean;
  featured?: boolean;
  slug?: { current: string };
  fixedLink?: string;
}

interface CategoryWithProducts {
  id: string;
  title: string;
  description: string;
  products: LabProduct[];
}

const FeaturedProductSlider = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Category descriptions
  const categoryDescriptions = {
    everyone: "User-friendly products designed for everyday use",
    creators: "Tools that empower artists, designers, and content creators",
    developers:
      "Powerful APIs and toolkits for building innovative applications",
  };

  // Fetch data from Sanity
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Fetch featured products
        console.log("Fetching featured products...");
        const query = `*[_type == "labProduct" && featured == true] | order(sortOrder asc) {
          _id,
          id,
          name,
          description,
          category,
          highlight,
          previewImage,
          link,
          featuredHome,
          featured,
          slug,
          "fixedLink": coalesce(link, "/savvy-lab/" + slug.current)
        }`;

        const products: LabProduct[] = await client.fetch(query);
        console.log("Fetched featured products:", products);

        // Group products by category
        const groupedProducts: { [key: string]: LabProduct[] } = {};

        products.forEach((product) => {
          if (!groupedProducts[product.category]) {
            groupedProducts[product.category] = [];
          }
          groupedProducts[product.category].push(product);
        });

        // Transform into categories array for display
        const categoriesArray: CategoryWithProducts[] = Object.keys(
          groupedProducts
        ).map((categoryId) => ({
          id: categoryId,
          title: `For ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`,
          description:
            categoryDescriptions[
              categoryId as keyof typeof categoryDescriptions
            ] || `Products designed for ${categoryId}`,
          products: groupedProducts[categoryId],
        }));

        setCategories(categoriesArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className='py-28 bg-[#F9F9F9]'>
        <div className='container mx-auto px-6 text-center'>
          <p>Loading featured products...</p>
        </div>
      </section>
    );
  }

  // No products state
  if (categories.length === 0) {
    return (
      <section className='py-28 bg-[#F9F9F9]'>
        <div className='container mx-auto px-6'>
          <div className='mb-20'>
            <span className='inline-block text-[#3F4697] font-medium mb-4'>
              FEATURED PRODUCTS
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-2xl'>
              Our Most Advanced Solutions
            </h2>
            <p>
              No featured products available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {categories.map((category, index) => (
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

              {/* Featured Products */}
              {category.products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.7, delay: 0.2 + 0.1 * index }}
                >
                  <div className='grid grid-cols-1 lg:grid-cols-5 gap-12 items-center'>
                    {/* Image Section (3/5 width) */}
                    <div className='lg:col-span-3 relative'>
                      <div className='relative aspect-video overflow-hidden bg-gray-100'>
                        {product.previewImage ? (
                          <Image
                            src={urlFor(product.previewImage).url()}
                            alt={product.name}
                            fill
                            className='object-cover'
                          />
                        ) : (
                          <div className='flex items-center justify-center h-full'>
                            <span className='text-gray-400'>
                              No preview image
                            </span>
                          </div>
                        )}
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
                      {product.highlight && (
                        <div className='flex items-center mb-8'>
                          <div className='w-1 h-16 bg-[#CFF39E] mr-4'></div>
                          <span className='text-2xl font-semibold text-[#3F4697]'>
                            {product.highlight}
                          </span>
                        </div>
                      )}

                      <Link
                        href={
                          product.fixedLink ||
                          `/savvy-lab/${product.slug?.current || product.id}`
                        }
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
