"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { ProductCard } from "@/types/products";

// Sample product data with variable heights
export const productData: ProductCard[] = [
  {
    id: "trekker",
    name: "Trekker",
    category: "Travel",
    description:
      "A smart financial planner for digital nomads. Manage expenses, track spending patterns, and optimize your budget across different currencies and countries.",
    status: "Launched",
    accentColor: "bg-brand-forest",
    imageUrl: "/images/products/trekker.jpg",
    link: "/products/trekker",
    size: "large",
    featured: true,
    quote: "A new way to manage finances for the modern traveler",
  },
  {
    id: "licid",
    name: "Licid",
    category: "AI",
    description: "Neural speech processing for perfect transcription.",
    status: "Beta",
    accentColor: "bg-brand-sage",
    imageUrl: "/images/products/licid.jpg",
    link: "/products/licid",
    size: "small",
  },
  {
    id: "vynl",
    name: "Vynl",
    category: "Media",
    description:
      "Next-gen music discovery and visualization platform. Connect with artists and find new music that matches your unique taste profile.",
    status: "Coming Soon",
    accentColor: "bg-[#8E6FFF]",
    imageUrl: "/images/products/vynl.jpg",
    link: "/products/vynl",
    size: "medium",
    quote: "Reimagining how we discover and experience music",
  },
  {
    id: "harvestify",
    name: "Harvestify",
    category: "Agriculture",
    description: "Precision farming tools for small-scale producers.",
    status: "Beta",
    accentColor: "bg-[#4CAF50]",
    imageUrl: "/images/products/harvestify.jpg",
    link: "/products/harvestify",
    size: "small",
  },
  {
    id: "swift",
    name: "Swiftly",
    category: "E-commerce",
    description:
      "Seamless checkout solution for independent retailers. Optimize your conversion rates with our intelligent payment flow.",
    status: "Launched",
    accentColor: "bg-[#FF6B6B]",
    imageUrl: "/images/products/swiftly.jpg",
    link: "/products/swiftly",
    size: "large",
    featured: true,
  },
  {
    id: "mirai",
    name: "Mirai",
    category: "AI",
    description: "Generative AI assistant for creative professionals.",
    status: "Coming Soon",
    accentColor: "bg-[#00BCD4]",
    imageUrl: "/images/products/mirai.jpg",
    link: "/products/mirai",
    size: "medium",
  },
  {
    id: "nomad",
    name: "Nomad",
    category: "Travel",
    description: "Smart accommodation finder for remote workers.",
    status: "Beta",
    accentColor: "bg-brand-forest",
    imageUrl: "/images/products/nomad.jpg",
    link: "/products/nomad",
    size: "medium",
  },
  {
    id: "pulse",
    name: "Pulse",
    category: "Health",
    description:
      "Personal health monitoring dashboard with AI-powered insights.",
    status: "Coming Soon",
    accentColor: "bg-[#E91E63]",
    imageUrl: "/images/products/pulse.jpg",
    link: "/products/pulse",
    size: "small",
  },
];

// Featured Product Card
const FeaturedProductCard = ({ product }: { product: ProductCard }) => {
  // Easing values from brand guidelines
  const standardEasing = [0.25, 0.1, 0.25, 1]; // cubic-bezier(0.25, 0.1, 0.25, 1)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: standardEasing }}
      className='bg-brand-black text-brand-white rounded-[4px] overflow-hidden border border-brand-white/10 break-inside-avoid mb-8 flex flex-col'
    >
      {/* Editorial layout for featured products */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0'>
        {/* Text content */}
        <div className='p-8 flex flex-col justify-center'>
          <div className='flex items-center mb-4'>
            <span
              className={`inline-block w-2 h-2 rounded-full bg-brand-lime mr-2`}
            ></span>
            <span className='text-xs uppercase tracking-wider text-brand-white/70 font-medium letter-spacing-[0.5px]'>
              {product.category}
            </span>
          </div>

          <h2 className='text-3xl md:text-4xl font-display mb-4 text-brand-white tracking-[-0.5px] leading-[1.1]'>
            {product.name}
          </h2>

          {product.quote && (
            <blockquote className='italic text-xl text-brand-lime my-4 pl-4 border-l-2 border-brand-lime'>
              &ldquo;{product.quote}&rdquo;
            </blockquote>
          )}

          <p className='text-brand-white/80 mb-6 leading-[1.5]'>
            {product.description}
          </p>

          <div className='flex items-center'>
            <span
              className={`
              text-xs font-medium py-1 px-3 rounded-full border
              ${
                product.status === "Launched"
                  ? "border-brand-lime text-brand-lime"
                  : product.status === "Beta"
                  ? "border-brand-indigo text-brand-indigo"
                  : "border-brand-white/30 text-brand-white/70"
              }
            `}
            >
              {product.status}
            </span>

            <a
              href={product.link || `products/${product.id}`}
              className='ml-auto font-medium flex items-center text-brand-indigo hover:text-brand-white transition-colors group'
            >
              {product.status === "Coming Soon"
                ? "Join Waitlist"
                : "Learn More"}
              <svg
                className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform'
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
            </a>
          </div>
        </div>

        {/* Image */}
        <div className='relative w-full h-full min-h-[300px]'>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className='object-cover'
            />
          ) : (
            <div
              className={`absolute inset-0 ${product.accentColor} opacity-20`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Product Card Component
const ProductCard = ({ product }: { product: ProductCard }) => {
  // If product is featured, use the featured card layout
  if (product.featured) {
    return <FeaturedProductCard product={product} />;
  }

  // Define card styling based on size
  const cardHeight =
    product.size === "small"
      ? "pb-[30px]"
      : product.size === "medium"
      ? "pb-[40px]"
      : "pb-[50px]";

  const imageHeight =
    product.size === "small"
      ? "h-[180px]"
      : product.size === "medium"
      ? "h-[220px]"
      : "h-[280px]";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className={`bg-brand-white rounded-[4px] overflow-hidden border border-brand-forest/10 transition-all duration-300 flex flex-col break-inside-avoid mb-8 ${cardHeight} group`}
    >
      {/* Image container */}
      <div className={`relative w-full ${imageHeight} overflow-hidden`}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-105'
          />
        ) : (
          <div
            className={`absolute inset-0 ${product.accentColor} opacity-20`}
          />
        )}

        {/* Status pill */}
        <div className='absolute top-4 right-4'>
          <span
            className={`
            text-xs font-medium py-1 px-3 rounded-full border
            ${
              product.status === "Launched"
                ? "border-green-500 text-green-600"
                : product.status === "Beta"
                ? "border-brand-indigo text-brand-indigo"
                : "border-amber-400 text-amber-600"
            }
          `}
          >
            {product.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-6 flex flex-col flex-grow'>
        <div className='flex items-center mb-3'>
          <span
            className={`inline-block w-2 h-2 rounded-full ${product.accentColor} mr-2`}
          ></span>
          <span className='text-xs uppercase tracking-wider text-gray-500 font-medium letter-spacing-[0.5px]'>
            {product.category}
          </span>
        </div>

        <h3 className='text-2xl font-display mb-2 text-brand-forest tracking-[-0.5px] leading-[1.1]'>
          {product.name}
        </h3>

        {product.quote && (
          <blockquote className='italic text-sm text-gray-500 my-2 pl-3 border-l-2 border-gray-200'>
            &ldquo;{product.quote}&rdquo;
          </blockquote>
        )}

        <p className='text-gray-600 mb-4 flex-grow leading-[1.5]'>
          {product.description}
        </p>

        {/* CTA Link */}
        <div className='mt-auto pt-3'>
          <a
            href={product.link || `products/${product.id}`}
            className='text-brand-indigo font-medium flex items-center hover:text-brand-forest transition-colors group'
          >
            {product.status === "Coming Soon" ? "Join Waitlist" : "Learn More"}
            <svg
              className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform'
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
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Filter buttons
const FilterButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-[4px] text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-brand-limeBold text-brand-black"
          : "bg-transparent border border-brand-forest/20 text-brand-forest hover:border-brand-forest/40"
      }`}
    >
      {children}
    </button>
  );
};

// Editorial section divider with decorative elements
const SectionDivider = ({ label }: { label: string }) => (
  <div className='w-full flex items-center justify-center my-12 px-4'>
    <div className='h-[1px] bg-brand-forest/10 flex-grow'></div>
    <div className='mx-4 flex items-center'>
      <span className='mx-3 text-sm uppercase tracking-[0.5px] text-brand-forest/60 font-medium'>
        {label}
      </span>
    </div>
    <div className='h-[1px] bg-brand-forest/10 flex-grow'></div>
  </div>
);

// Pull Quote Component
const PullQuote = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className='break-inside-avoid mb-12 px-6 py-12 bg-brand-ivory rounded-[4px] relative'
  >
    <blockquote className='text-xl md:text-2xl font-display italic text-brand-forest text-center mx-auto max-w-2xl tracking-[-0.5px] leading-[1.3]'>
      We don&apos;t just design products. We build solutions that define
      categories and transform experiences.
    </blockquote>
  </motion.div>
);

// Main component
const ProductsGridSection = () => {
  const [filter, setFilter] = useState<string>("All");
  const [columns, setColumns] = useState(3);

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Filter products based on selected filter
  const filteredProducts = productData.filter((product) => {
    if (filter === "All") return true;
    if (
      filter === "Launched" ||
      filter === "Beta" ||
      filter === "Coming Soon"
    ) {
      return product.status === filter;
    }
    return product.category === filter;
  });

  // Split the products into sections for editorial layout
  const featuredProducts = filteredProducts.filter((p) => p.featured);
  const otherProducts = filteredProducts.filter((p) => !p.featured);

  // Get unique categories for filter options
  const categories = [
    "All",
    ...Array.from(new Set(productData.map((product) => product.category))),
  ];
  const statuses = ["Launched", "Beta", "Coming Soon"];

  return (
    <section id='products-grid' className='py-20 bg-brand-white'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='mb-16 text-center'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='text-4xl md:text-5xl font-display mb-4 text-brand-forest tracking-[-0.5px] leading-[1.1]'
          >
            Our Product Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='text-xl text-brand-forest/70 max-w-2xl mx-auto leading-[1.5]'
          >
            Each product is a solution to a real-world problem, crafted with
            strategy, design, and engineering.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='mb-12 flex flex-wrap justify-center gap-3'
        >
          <FilterButton
            active={filter === "All"}
            onClick={() => setFilter("All")}
          >
            All Products
          </FilterButton>

          {categories
            .filter((cat) => cat !== "All")
            .map((category) => (
              <FilterButton
                key={category}
                active={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </FilterButton>
            ))}

          {statuses.map((status) => (
            <FilterButton
              key={status}
              active={filter === status}
              onClick={() => setFilter(status)}
            >
              {status}
            </FilterButton>
          ))}
        </motion.div>

        {/* Featured Products - Full width */}
        {featuredProducts.length > 0 && (
          <>
            <div className='mb-16'>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Editorial divider */}
            <SectionDivider label='Our Products' />
          </>
        )}

        {/* Pull Quote - For editorial style */}
        <PullQuote />

        {/* Masonry Products Grid */}
        <div
          className='masonry-grid mt-8'
          style={{
            columnCount: columns,
            columnGap: "2rem",
          }}
        >
          {otherProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Decorative element - minimalist approach */}
        <div className='my-24 border-t border-brand-forest/10 pt-4'>
          <p className='text-sm text-center text-brand-forest/60 tracking-[0.5px]'>
            Crafted with precision and purpose
          </p>
        </div>

        {/* Add CSS for masonry layout in the component */}
        <style jsx global>{`
          .masonry-grid {
            display: block;
          }

          @media (max-width: 640px) {
            .masonry-grid {
              column-count: 1;
            }
          }

          @media (min-width: 641px) and (max-width: 1023px) {
            .masonry-grid {
              column-count: 2;
            }
          }

          @media (min-width: 1024px) {
            .masonry-grid {
              column-count: 3;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default ProductsGridSection;
