"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { productData } from "../../../sections/products/ProductsGridSection";
import type { ProductCard } from "../../../types/products";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: entryEasing }}
    >
      {children}
    </motion.div>
  );
}

// Get product data by slug
function getProductBySlug(slug: string): ProductCard | null {
  return (
    productData.find((product: ProductCard) => product.id === slug) || null
  );
}

// Get related products (excluding current product)
function getRelatedProducts(currentProduct: ProductCard): ProductCard[] {
  return productData
    .filter(
      (product: ProductCard) =>
        product.id !== currentProduct.id &&
        product.category === currentProduct.category
    )
    .slice(0, 3);
}

export default function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  const relatedProducts = product ? getRelatedProducts(product) : [];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-brand-black text-brand-white'>
        <div className='text-center'>
          <h1 className='text-3xl mb-4'>Product Not Found</h1>
          <p className='mb-8'>
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href='/savvy-lab'
            className='px-6 py-3 bg-brand-lime text-brand-black rounded-[4px] inline-block hover:bg-brand-lime/90 transition-colors'
          >
            View All Products
          </Link>
        </div>
      </div>
    );
  }

  // Determine accent colors - use product accent color or default to brand colors
  const accentColor = product.accentColor || "bg-brand-lime";
  const textAccentColor =
    product.accentColor?.replace("bg-", "text-") || "text-brand-lime";

  return (
    <main className='bg-brand-white overflow-hidden'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='min-h-[90vh] relative overflow-hidden bg-brand-black flex items-center'
      >
        {/* Background with parallax */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-b from-brand-black/90 to-brand-black/75 z-10'></div>

          {/* Background image */}
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          ></div>
        </motion.div>

        {/* Content */}
        <div className='container mx-auto px-6 py-32 relative z-20'>
          <div className='max-w-5xl'>
            <motion.div style={{ y: heroTextY }}>
              <Link
                href='/savvy-lab'
                className='inline-flex items-center text-brand-white/70 hover:text-brand-white transition-colors mb-12 group'
              >
                <svg
                  className='w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M19 12H5M5 12L12 19M5 12L12 5' />
                </svg>
                Back to Savvy Lab
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: entryEasing }}
                className='mb-8'
              >
                <div className='flex flex-wrap gap-3 mb-8'>
                  <span className='px-3 py-1 bg-brand-white/10 backdrop-blur-sm rounded-[4px] text-brand-white/90'>
                    {product.category}
                  </span>
                  <span
                    className={`
                      px-3 py-1 rounded-[4px] backdrop-blur-sm
                      ${
                        product.status === "Launched"
                          ? "bg-brand-lime/20 text-brand-lime"
                          : product.status === "Beta"
                            ? "bg-brand-indigo/20 text-brand-indigo"
                            : "bg-brand-white/10 text-brand-white/70"
                      }
                    `}
                  >
                    {product.status}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: entryEasing }}
                className='text-5xl md:text-6xl lg:text-7xl text-brand-white leading-tight tracking-[-0.5px] mb-8 max-w-4xl'
              >
                {product.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: entryEasing }}
                className='text-xl md:text-2xl text-brand-white/80 leading-[1.5] max-w-3xl mb-16'
              >
                {product.description}
              </motion.p>

              {product.quote && (
                <motion.blockquote
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: entryEasing }}
                  className='italic text-xl text-brand-lime my-8 pl-6 border-l-2 border-brand-lime max-w-2xl'
                >
                  &ldquo;{product.quote}&rdquo;
                </motion.blockquote>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className='py-24 md:py-32 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <FadeIn>
            <h2 className='text-3xl md:text-4xl font-bold mb-16'>
              Key Features
            </h2>
          </FadeIn>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
            {product.features?.map((feature, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1}>
                <div className='flex flex-col h-full'>
                  <div
                    className={`w-12 h-12 ${accentColor} rounded-lg flex items-center justify-center mb-6`}
                  >
                    <span className='text-white text-xl font-bold'>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className='text-xl font-semibold mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      {product.techStack && (
        <section className='py-24 md:py-32 bg-brand-black/5'>
          <div className='container mx-auto px-6'>
            <FadeIn>
              <h2 className='text-3xl md:text-4xl font-bold mb-16'>
                Technology Stack
              </h2>
            </FadeIn>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12'>
              {product.techStack.map((tech, index) => (
                <FadeIn key={index} delay={0.2 + index * 0.05}>
                  <div className='flex flex-col items-center'>
                    <div className='w-16 h-16 mb-4 relative'>
                      <Image
                        src={tech.icon || "/images/logo-placeholder.svg"}
                        alt={tech.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <h3 className='text-center font-medium'>{tech.name}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Screenshots Section */}
      {product.screenshots && (
        <section className='py-24 md:py-32 bg-brand-white'>
          <div className='container mx-auto px-6'>
            <FadeIn>
              <h2 className='text-3xl md:text-4xl font-bold mb-16'>
                Screenshots
              </h2>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              {product.screenshots.map((screenshot, index) => (
                <FadeIn key={index} delay={0.2 + index * 0.1}>
                  <div className='aspect-video relative rounded-lg overflow-hidden shadow-xl'>
                    <Image
                      src={screenshot.url}
                      alt={
                        screenshot.caption ||
                        `${product.name} screenshot ${index + 1}`
                      }
                      fill
                      className='object-cover'
                    />
                  </div>
                  {screenshot.caption && (
                    <p className='mt-4 text-center text-sm text-gray-500'>
                      {screenshot.caption}
                    </p>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {product.team && (
        <section className='py-24 md:py-32 bg-brand-black/5'>
          <div className='container mx-auto px-6'>
            <FadeIn>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                Meet the Team
              </h2>
              <p className='text-xl text-gray-600 mb-16 max-w-3xl'>
                The brilliant minds behind {product.name}
              </p>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
              {product.team.map((member, index) => (
                <FadeIn key={index} delay={0.2 + index * 0.1}>
                  <div className='text-center'>
                    <div className='relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden'>
                      <Image
                        src={member.avatar || "/images/avatar-placeholder.jpg"}
                        alt={member.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <h3 className='text-xl font-semibold mb-1'>
                      {member.name}
                    </h3>
                    <p className={`${textAccentColor} mb-4`}>{member.role}</p>
                    {member.bio && (
                      <p className='text-gray-600 text-sm'>{member.bio}</p>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className='py-24 md:py-32 bg-brand-black text-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <FadeIn>
              <h2 className='text-3xl md:text-5xl font-bold mb-8'>
                Interested in {product.name}?
              </h2>
              <p className='text-xl text-brand-white/80 mb-12 max-w-2xl mx-auto'>
                {product.cta?.description ||
                  `Learn more about how ${product.name} can help you or your organization.`}
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center'>
                <Link
                  href={product.cta?.primaryLink || "/contact"}
                  className='px-8 py-4 bg-brand-lime text-brand-black rounded-[4px] font-medium hover:bg-brand-lime/90 transition-colors'
                >
                  {product.cta?.primaryText || "Get in Touch"}
                </Link>
                {product.cta?.secondaryText && (
                  <Link
                    href={product.cta.secondaryLink || "#"}
                    className='px-8 py-4 border border-brand-white/30 rounded-[4px] font-medium hover:bg-brand-white/10 transition-colors'
                  >
                    {product.cta.secondaryText}
                  </Link>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className='py-24 md:py-32 bg-brand-white'>
          <div className='container mx-auto px-6'>
            <FadeIn>
              <h2 className='text-3xl md:text-4xl font-bold mb-16'>
                Related Products
              </h2>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
              {relatedProducts.map((relatedProduct, index) => (
                <FadeIn key={relatedProduct.id} delay={0.2 + index * 0.1}>
                  <Link
                    href={`/savvy-lab/${relatedProduct.id}`}
                    className='block group transition-all duration-300'
                  >
                    <div className='relative aspect-video mb-6 overflow-hidden rounded-lg'>
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                      <div className='absolute bottom-0 left-0 p-6'>
                        <span className='px-2 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-[4px]'>
                          {relatedProduct.category}
                        </span>
                      </div>
                    </div>
                    <h3 className='text-xl font-semibold group-hover:text-brand-indigo transition-colors'>
                      {relatedProduct.name}
                    </h3>
                    <p className='text-gray-600 mt-2'>
                      {relatedProduct.description}
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
