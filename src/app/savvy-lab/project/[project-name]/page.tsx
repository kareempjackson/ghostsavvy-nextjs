import React from "react";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import { getSavvyProjectBySlugQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Header from "@/components/layout/Header";
import {
  SavvyProject,
  Feature,
  Testimonial,
  RelatedProduct,
} from "@/types/schema";

// This component must be a Server Component to use draftMode
export default async function ProjectDetailPage({
  params,
}: {
  params: { "project-name": string };
}) {
  const { "project-name": slug } = params;
  const { isEnabled } = await draftMode();

  // Fetch project data
  const projectData = await sanityFetch<SavvyProject | null>({
    query: getSavvyProjectBySlugQuery,
    params: { slug },
  });

  // If no data found, return a simple message (you could also redirect or show a 404 page)
  if (!projectData) {
    return (
      <main className='min-h-screen bg-white'>
        <Header />
        <div className='py-32 px-8 text-center'>
          <h1 className='text-4xl font-bold'>Project Not Found</h1>
          <p className='mt-4'>
            The project you are looking for does not exist or has been moved.
          </p>
          <Link
            href='/savvy-lab'
            className='mt-8 inline-flex items-center px-6 py-3 rounded-full border border-black'
          >
            Return to Savvy Lab
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white'>
      <Header />

      {/* Display draft mode indicator if enabled */}
      {isEnabled && (
        <div className='fixed top-16 left-0 right-0 bg-purple-600 text-white text-center py-2 z-50'>
          Draft Mode Active -{" "}
          <a href='/api/disable-draft' className='underline'>
            Exit Draft Mode
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className='relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden'>
        {/* Video or Image Background */}
        <div className='absolute inset-0 w-full h-full z-0'>
          {projectData.backgroundVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className='object-cover w-full h-full'
              poster={projectData.heroImageUrl}
            >
              <source src={projectData.backgroundVideo} type='video/mp4' />
            </video>
          ) : (
            <Image
              src={
                projectData.heroImageUrl ||
                "/images/projects/healthcare-case.jpg"
              }
              alt={projectData.title}
              fill
              className='object-cover'
            />
          )}
          <div className='absolute inset-0 bg-black/50 z-10'></div>
        </div>

        {/* Text Overlay */}
        <div className='absolute inset-0 flex items-center z-20'>
          <div className='px-8 md:px-20 max-w-5xl'>
            {/* Tags */}
            <div className='flex flex-wrap gap-3 mb-6'>
              {projectData.tags?.map((tag: string, i: number) => (
                <span
                  key={i}
                  className='text-xs md:text-sm text-white/80 py-1 px-3 border border-white/30 rounded-full'
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6'>
              {projectData.title}
            </h1>
            <p className='text-xl md:text-2xl max-w-2xl text-white/90 mb-10'>
              {projectData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Product Introduction */}
      <section className='px-8 md:px-20 py-32 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
            <div>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-10'>
                Product Overview
              </h2>
              <p className='text-xl leading-relaxed text-gray-700 mb-8'>
                {projectData.description}
              </p>
            </div>

            <div className='lg:mt-10'>
              <div className='aspect-[4/3] relative overflow-hidden rounded-lg'>
                <Image
                  src={
                    projectData.heroImageUrl ||
                    "/images/projects/healthcare-case.jpg"
                  }
                  alt={projectData.title}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {projectData.features && projectData.features.length > 0 && (
        <section className='py-32 bg-gray-50'>
          <div className='px-8 md:px-20'>
            <div className='max-w-7xl mx-auto mb-20'>
              <h2 className='text-5xl font-bold text-gray-900 mb-6'>
                Key Features
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl'>
                Discover what makes {projectData.title} stand out from the
                crowd.
              </p>
            </div>

            {/* Features Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
              {projectData.features.map((feature: Feature, index: number) => (
                <div key={index} className='bg-white p-10 rounded-lg shadow-sm'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {projectData.testimonials && projectData.testimonials.length > 0 && (
        <section className='py-32 bg-white'>
          <div className='px-8 md:px-20'>
            <div className='max-w-7xl mx-auto mb-20'>
              <h2 className='text-5xl font-bold text-gray-900 mb-6'>
                What People Are Saying
              </h2>
            </div>

            {/* Testimonials Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12'>
              {projectData.testimonials.map(
                (testimonial: Testimonial, index: number) => (
                  <div key={index} className='bg-gray-50 p-10 rounded-lg'>
                    <p className='text-xl italic text-gray-700 mb-8'>
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className='flex items-center'>
                      <div className='w-12 h-12 bg-gray-300 rounded-full mr-4'>
                        {testimonial.authorImageUrl && (
                          <Image
                            src={testimonial.authorImageUrl}
                            alt={testimonial.author}
                            width={48}
                            height={48}
                            className='rounded-full'
                          />
                        )}
                      </div>
                      <div>
                        <p className='font-bold text-gray-900'>
                          {testimonial.author}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {projectData.gallery && projectData.gallery.length > 0 && (
        <section className='py-32 bg-gray-900'>
          <div className='px-8 md:px-20'>
            <div className='max-w-7xl mx-auto mb-20'>
              <h2 className='text-5xl font-bold text-white mb-6'>Gallery</h2>
              <p className='text-xl text-white/70 max-w-3xl'>
                See {projectData.title} in action with these screenshots and
                images.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {projectData.gallery.map((image: string, index: number) => (
                <div
                  key={index}
                  className='aspect-[4/3] relative overflow-hidden rounded-lg'
                >
                  <Image
                    src={image}
                    alt={`${projectData.title} gallery image ${index + 1}`}
                    fill
                    className='object-cover hover:scale-105 transition-transform duration-700'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {projectData.relatedProducts &&
        projectData.relatedProducts.length > 0 && (
          <section className='py-32 bg-white'>
            <div className='px-8 md:px-20'>
              <div className='max-w-7xl mx-auto mb-20'>
                <h2 className='text-5xl font-bold text-gray-900 mb-6'>
                  Related Products
                </h2>
                <p className='text-xl text-gray-600 max-w-3xl'>
                  Explore other products that complement {projectData.title}.
                </p>
              </div>

              {/* Related Products Grid */}
              <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
                {projectData.relatedProducts.map(
                  (product: RelatedProduct, index: number) => (
                    <div key={index}>
                      <Link
                        href={`/savvy-lab/project/${product.slug}`}
                        className='group flex flex-col h-full'
                      >
                        <div className='aspect-[16/9] mb-6 overflow-hidden rounded-lg'>
                          <div
                            className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700'
                            style={{
                              backgroundImage: `url(${product.imageUrl || "/images/projects/finance-case.jpg"})`,
                            }}
                          ></div>
                        </div>

                        <div>
                          <h3 className='text-2xl font-bold text-gray-900 group-hover:text-[#CFF39E] transition-colors duration-300 mb-3'>
                            {product.title}
                          </h3>
                          <p className='text-gray-600 mb-6'>
                            {product.subtitle}
                          </p>
                          <span className='text-gray-900 font-medium group-hover:text-[#CFF39E] transition-all duration-300 flex items-center'>
                            View Product
                            <svg
                              className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                            >
                              <path d='M5 12h14M12 5l7 7-7 7' />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}

      {/* CTA Section */}
      <section className='py-32 bg-gradient-to-b from-[#111] to-[#1a1a1a] text-white'>
        <div className='px-8 md:px-20'>
          <div className='max-w-5xl mx-auto text-center'>
            <h2 className='text-5xl font-bold mb-6'>
              Ready to try {projectData.title}?
            </h2>
            <p className='text-xl text-white/70 mb-12 max-w-3xl mx-auto'>
              Join our community of early adopters to get exclusive access and
              help shape the future of this product.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center px-8 py-4 bg-[#CFF39E] text-black rounded-full font-medium hover:bg-[#CFF39E]/90 transition-all duration-300'
            >
              <span>Get Early Access</span>
              <svg
                className='ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
