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
  status: string;
  icon?: SanityImageSource;
  highlight?: string;
  link: string;
  category: string;
  slug: {
    current: string;
  };
  fixedLink?: string;
}

const LabProductsGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("all");
  const [labProducts, setLabProducts] = useState<LabProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryTabs = [
    { id: "all", label: "All Products" },
    { id: "everyone", label: "For Everyone" },
    { id: "creators", label: "For Creators" },
    { id: "developers", label: "For Developers" },
  ];

  // Fetch data from Sanity
  useEffect(() => {
    const fetchLabProducts = async () => {
      try {
        console.log("Fetching lab products...");
        const query = `*[_type == "labProduct"] | order(sortOrder asc) {
          _id,
          id,
          name,
          description,
          status,
          icon,
          highlight,
          link,
          category,
          slug,
          "fixedLink": coalesce(link, "/savvy-lab/" + slug.current)
        }`;

        const data = await client.fetch(query);
        console.log("Fetched lab products:", data);
        setLabProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching lab products:", error);
        setIsLoading(false);
      }
    };

    fetchLabProducts();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? labProducts
      : labProducts.filter((product) => product.category === activeCategory);

  // Loading state
  if (isLoading) {
    return (
      <section id='our-products' className='py-24 bg-white'>
        <div className='container mx-auto px-6 text-center'>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  // No products state
  if (labProducts.length === 0) {
    return (
      <section id='our-products' className='py-24 bg-white'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl font-bold text-gray-900 mb-6'>
            Our Product Suite
          </h2>
          <p className='text-xl text-gray-600'>
            No products available at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

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
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className='group'
            >
              <Link
                href={
                  product.fixedLink ||
                  product.link ||
                  `/savvy-lab/${product.slug?.current || product.id}`
                }
                className='block'
              >
                <div className='relative h-64 mb-6 overflow-hidden bg-gray-100'>
                  {product.icon && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Image
                        src={urlFor(product.icon).url()}
                        alt={product.name}
                        width={100}
                        height={100}
                        className='object-contain'
                      />
                    </div>
                  )}
                  <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent'></div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-start justify-between'>
                    <h3 className='text-xl font-bold text-gray-900 group-hover:text-[#3F4697] transition-colors'>
                      {product.name}
                    </h3>
                    {product.highlight && (
                      <span className='text-sm font-medium text-[#3F4697] px-3 py-1 bg-[#F4EBE0] inline-block'>
                        {product.highlight}
                      </span>
                    )}
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
