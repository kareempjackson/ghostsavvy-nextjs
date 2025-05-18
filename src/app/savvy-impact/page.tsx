import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getImpactProjectsQuery,
  getFeaturedImpactProjectQuery,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ImpactProject } from "@/types/schema";
import { draftMode } from "next/headers";
import { MotionDiv } from "@/components/MotionDiv"; // This should now be found correctly
import VideoBackground from "@/components/VideoBackground";

// This is a Server Component to fetch Sanity data
export default async function SavvyImpactPage() {
  // Check if draft mode is enabled
  const { isEnabled } = await draftMode();

  // Fetch all projects
  const projects = await sanityFetch<ImpactProject[]>({
    query: getImpactProjectsQuery,
  });

  // Fetch featured project
  const featuredProject = await sanityFetch<ImpactProject>({
    query: getFeaturedImpactProjectQuery,
  });

  // If no featured project, use the first project as featured
  const featured = featuredProject || projects[0];

  // Filter out the featured project from the rest of the projects to avoid duplication
  const nonFeaturedProjects = projects.filter(
    (project) => featured && project._id !== featured._id
  );

  // Organize projects into categories (excluding the featured project)
  const highlightProjects = nonFeaturedProjects.filter(
    (project) => project.isHighlight
  );
  const gridProjects = nonFeaturedProjects.filter(
    (project) => !project.isHighlight
  );

  // Group grid projects into pairs for layout
  const gridProjectGroups: ImpactProject[][] = [];
  for (let i = 0; i < gridProjects.length; i += 2) {
    gridProjectGroups.push(gridProjects.slice(i, i + 2));
  }

  return (
    <main className='min-h-screen bg-white'>
      {/* Display draft mode indicator if enabled */}
      {isEnabled && (
        <div className='fixed top-0 left-0 right-0 bg-purple-600 text-white text-center py-2 z-50'>
          Draft Mode Active -{" "}
          <a href='/api/disable-draft' className='underline'>
            Exit Draft Mode
          </a>
        </div>
      )}

      {/* Featured Case Study Hero Section */}
      {featured && (
        <Link
          href={`/savvy-impact/project/${featured.slug.current}`}
          className='block group'
        >
          <section className='relative w-full min-h-[60vh] md:min-h-[75vh] overflow-hidden'>
            {/* Hero Video or Image Background */}
            <div className='absolute inset-0 w-full h-full z-0'>
              <VideoBackground
                videoUrl={featured.backgroundVideo}
                imageUrl={featured.heroImageUrl}
                alt={featured.title}
              />
              <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-20'></div>
            </div>

            {/* Text Overlay */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className='absolute bottom-0 left-0 p-10 md:p-16 z-30 max-w-5xl'
            >
              {/* Tags */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className='flex flex-wrap gap-3 mb-6'
              >
                {featured.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className='text-xs md:text-sm text-white/60 py-1 px-3 border border-white/20 rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'
              >
                {featured.title}
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                className='text-base md:text-lg lg:text-xl max-w-lg text-white/80 mb-10'
              >
                {featured.subtitle}
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
              >
                <div className='inline-flex items-center px-7 py-3 rounded-full border border-white text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300'>
                  <span>Explore the Project</span>
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
                </div>
              </MotionDiv>
            </MotionDiv>
          </section>
        </Link>
      )}

      {/* Story Introduction Section */}
      <section className='px-8 md:px-20 py-32 bg-white'>
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='max-w-7xl mx-auto'
        >
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className='text-5xl md:text-6xl font-bold mb-10 leading-tight'
          >
            Stories of
            <br />
            Strategic Impact
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className='text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl'
          >
            At Ghost Savvy Studios, we build brands, products, and experiences
            that reshape the future.
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* Editorial Story Flow - Alternating Large Highlight and Grid Sections */}
      <div className='max-w-7xl mx-auto'>
        {/* Interweave highlight projects with grid sections */}
        {highlightProjects.map((highlight, highlightIndex) => (
          <React.Fragment key={highlight._id}>
            {/* Large Highlight Project Section */}
            <section
              className={`px-8 md:px-20 py-32 ${highlightIndex % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"}`}
            >
              <MotionDiv
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='max-w-7xl mx-auto'
              >
                <Link
                  href={`/savvy-impact/project/${highlight.slug.current}`}
                  className='block group'
                >
                  <div className='mb-12'>
                    <div className='relative h-[450px] w-full overflow-hidden rounded-xl mb-10'>
                      {highlight.backgroundVideo ? (
                        <VideoBackground
                          videoUrl={highlight.backgroundVideo}
                          imageUrl={highlight.heroImageUrl}
                          alt={highlight.title}
                        />
                      ) : (
                        <Image
                          src={highlight.heroImageUrl}
                          alt={highlight.title}
                          fill
                          className='object-cover transition-transform duration-1000 group-hover:scale-105'
                          sizes='(max-width: 768px) 100vw, 1280px'
                          priority={highlightIndex === 0}
                        />
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                    </div>

                    <div className='flex flex-wrap gap-3 mb-6'>
                      {highlight.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className='text-xs text-gray-500/80 py-1 px-3 border border-gray-200 rounded-full'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className='text-4xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-indigo-700 transition-colors duration-300'>
                      {highlight.title}
                    </h2>

                    <p className='text-xl md:text-2xl text-gray-600 max-w-2xl mb-8 leading-relaxed'>
                      {highlight.subtitle}
                    </p>

                    <div className='inline-flex items-center text-indigo-700 font-medium group'>
                      Explore Project
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
                    </div>
                  </div>
                </Link>
              </MotionDiv>
            </section>

            {/* Grid Projects Section - Show a pair of projects after each highlight */}
            {highlightIndex < highlightProjects.length &&
              gridProjectGroups[highlightIndex] && (
                <section
                  className={`px-8 md:px-20 py-32 ${highlightIndex % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}`}
                >
                  <MotionDiv
                    className='max-w-7xl mx-auto'
                    initial='initial'
                    whileInView='animate'
                    viewport={{ once: true }}
                    variants={{
                      animate: { transition: { staggerChildren: 0.2 } },
                    }}
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24'>
                      {gridProjectGroups[highlightIndex].map((grid) => (
                        <MotionDiv
                          key={grid._id}
                          variants={{
                            initial: { opacity: 0, y: 40 },
                            animate: { opacity: 1, y: 0 },
                            transition: { duration: 0.8, ease: "easeOut" },
                          }}
                          className='flex flex-col h-full'
                        >
                          <Link
                            href={`/savvy-impact/project/${grid.slug.current}`}
                            className='flex flex-col h-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group'
                          >
                            <div className='relative aspect-video'>
                              {grid.backgroundVideo ? (
                                <VideoBackground
                                  videoUrl={grid.backgroundVideo}
                                  imageUrl={grid.heroImageUrl}
                                  alt={grid.title}
                                />
                              ) : (
                                <Image
                                  src={grid.heroImageUrl}
                                  alt={grid.title}
                                  fill
                                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                              )}
                            </div>

                            <div className='flex flex-wrap gap-2 mb-4'>
                              {grid.tags?.map((tag, i) => (
                                <span
                                  key={i}
                                  className='text-xs text-gray-500/70'
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <h3 className='text-2xl font-bold mb-3 group-hover:text-indigo-700 transition-colors duration-300'>
                              {grid.title}
                            </h3>

                            <p className='text-base text-gray-600 mb-6'>
                              {grid.subtitle}
                            </p>

                            <div className='mt-auto inline-flex items-center text-indigo-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                              View case study
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
                            </div>
                          </Link>
                        </MotionDiv>
                      ))}
                    </div>
                  </MotionDiv>
                </section>
              )}
          </React.Fragment>
        ))}

        {/* Any remaining grid projects */}
        {gridProjectGroups
          .slice(highlightProjects.length)
          .map((group, groupIndex) => (
            <section
              key={`remaining-group-${groupIndex}`}
              className={`px-8 md:px-20 py-32 ${(highlightProjects.length + groupIndex) % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}`}
            >
              <MotionDiv
                className='max-w-7xl mx-auto'
                initial='initial'
                whileInView='animate'
                viewport={{ once: true }}
                variants={{
                  animate: { transition: { staggerChildren: 0.2 } },
                }}
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24'>
                  {group.map((grid) => (
                    <MotionDiv
                      key={grid._id}
                      variants={{
                        initial: { opacity: 0, y: 40 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.8, ease: "easeOut" },
                      }}
                      className='flex flex-col h-full'
                    >
                      <Link
                        href={`/savvy-impact/project/${grid.slug.current}`}
                        className='flex flex-col h-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group'
                      >
                        <div className='relative aspect-video'>
                          {grid.backgroundVideo ? (
                            <VideoBackground
                              videoUrl={grid.backgroundVideo}
                              imageUrl={grid.heroImageUrl}
                              alt={grid.title}
                            />
                          ) : (
                            <Image
                              src={grid.heroImageUrl}
                              alt={grid.title}
                              fill
                              className='object-cover transition-transform duration-700 group-hover:scale-105'
                            />
                          )}
                        </div>

                        <div className='flex flex-wrap gap-2 mb-4'>
                          {grid.tags?.map((tag, i) => (
                            <span key={i} className='text-xs text-gray-500/70'>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className='text-2xl font-bold mb-3 group-hover:text-indigo-700 transition-colors duration-300'>
                          {grid.title}
                        </h3>

                        <p className='text-gray-600 mb-4 line-clamp-2'>
                          {grid.subtitle}
                        </p>
                        <div className='flex flex-wrap gap-2 mt-auto'>
                          {grid.tags?.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className='text-xs text-gray-500 py-1 px-2 border border-gray-200 rounded-full'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </MotionDiv>
                  ))}
                </div>
              </MotionDiv>
            </section>
          ))}
      </div>

      {/* CTA Section */}
      <section className='relative px-8 md:px-20 py-32 bg-[#253D3D] text-white overflow-hidden'>
        {/* Background gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/10 to-transparent'></div>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center justify-center'
        >
          <h2 className='text-5xl md:text-6xl font-bold mb-10 leading-tight'>
            Ready to Create Impact?
          </h2>
          <p className='text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-16 leading-relaxed'>
            Let&apos;s collaborate on solutions that drive meaningful change and
            deliver exceptional results.
          </p>
          <div className='relative inline-block'>
            <Link
              href='/contact'
              className='inline-flex items-center px-10 py-5 rounded-full border border-white text-white hover:bg-white/10 transition-all duration-300 group text-lg'
            >
              <span>Start a New Chapter</span>
              <svg
                className='ml-3 w-5 h-5'
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
        </MotionDiv>
      </section>
    </main>
  );
}
