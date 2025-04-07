"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Sample video data (in a real app, you would fetch this based on the slug)
const video = {
  title: "The Future of Product Development",
  excerpt:
    "A deep dive into emerging trends and technologies shaping the future of digital product development.",
  videoUrl: "https://example.com/videos/future-product-development.mp4", // Placeholder URL
  videoPoster: "/images/blog-placeholder-2.jpg",
  category: "Development",
  date: "Mar 10, 2024",
  duration: "12:45",
  presenter: {
    name: "Alex Johnson",
    role: "Lead Developer",
    image: "/images/presenter-placeholder.jpg",
  },
  description: `
    <p>The landscape of digital product development is constantly evolving, with new technologies, methodologies, and user expectations shaping how we build and deliver experiences. In this comprehensive video, we explore the most significant trends that will define the next generation of digital products.</p>
    
    <p class="mt-8">Our Lead Developer Alex Johnson shares insights from years of experience at the cutting edge of technology, highlighting how forward-thinking teams can prepare for these changes and leverage them to build better products.</p>
    
    <h3 class="mt-12 mb-6">Key Trends Covered:</h3>
    
    <ul class="space-y-4">
      <li>The rise of AI-assisted development and what it means for traditional coding practices</li>
      <li>How edge computing is changing application architecture and enabling new types of experiences</li>
      <li>The evolution of no-code and low-code platforms and their impact on professional development</li>
      <li>Sustainable development practices and how they're becoming essential, not optional</li>
      <li>The growing importance of accessibility and inclusive design in mainstream development</li>
    </ul>
    
    <p class="mt-8">Whether you're a seasoned developer, product manager, or business leader, this exploration of future trends provides valuable insights into how the technology landscape is shifting and what you can do to stay ahead of the curve.</p>
  `,
  tags: ["Development", "Technology", "Future Trends", "AI", "Edge Computing"],
  relatedVideos: [
    {
      id: 2,
      title: "Prototyping for Conversion: Our Methodology",
      excerpt:
        "Learn our step-by-step approach to creating prototypes that convert users into customers.",
      category: "Tutorial",
      duration: "12:05",
      date: "Mar 18, 2024",
      slug: "prototyping-for-conversion",
    },
    {
      id: 3,
      title: "The Art of Anonymous Collaboration",
      excerpt:
        "How to build effective partnerships with clients who prefer to remain behind the scenes.",
      category: "Business",
      duration: "24:30",
      date: "Feb 5, 2024",
      slug: "anonymous-collaboration",
    },
  ],
};

export default function VideoPost({ params }: { params: { slug: string } }) {
  // Easing values from brand guidelines
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  // We're using the slug parameter here by logging it
  useEffect(() => {
    console.log(`Loading video with slug: ${params.slug}`);
  }, [params.slug]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"],
  });

  // Animation values for progress effects
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <main className='min-h-screen bg-brand-white text-brand-forest'>
      {/* Reading Progress Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 bg-brand-ivory z-50 ${
          isScrolled ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <motion.div
          className='h-full bg-brand-sage'
          style={{ width: progressWidth }}
        />
      </div>

      {/* Video Hero Section */}
      <section className='relative bg-brand-forest pt-40 pb-0'>
        {/* Decorative elements */}
        <div className='absolute inset-0 z-10 opacity-20 mix-blend-overlay'>
          <div className='absolute top-20 left-[10%] w-64 h-64 rounded-full border border-brand-white/10 animate-[spin_40s_linear_infinite]'></div>
          <div className='absolute bottom-20 right-[10%] w-80 h-80 rounded-full border border-brand-white/10 animate-[spin_30s_linear_infinite]'></div>
        </div>

        {/* Back button and category */}
        <div className='container mx-auto px-6 relative z-20'>
          <div className='flex justify-between items-center mb-20 border-b border-brand-white/10 pb-6'>
            <Link
              href='/savvy-hub'
              className='inline-flex items-center text-brand-white/70 hover:text-brand-white transition-colors duration-300 group text-sm'
            >
              <svg
                className='w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15 18L9 12L15 6'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              Back to Savvy Hub
            </Link>

            <span className='bg-brand-white/10 backdrop-blur-sm text-brand-white/90 text-xs font-medium px-4 py-1.5 rounded-[4px]'>
              {video.category}
            </span>
          </div>

          {/* Video Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: entryEasing }}
            className='text-brand-white text-3xl md:text-5xl lg:text-6xl tracking-[-0.5px] leading-[1.1] mb-12 max-w-4xl'
          >
            {video.title}
          </motion.h1>

          {/* Video Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: entryEasing }}
            className='flex flex-wrap items-center text-brand-white/70 space-x-6 mb-16'
          >
            <span>{video.date}</span>
            <span className='w-1 h-1 rounded-full bg-brand-white/30'></span>
            <span>{video.duration}</span>
            <span className='w-1 h-1 rounded-full bg-brand-white/30'></span>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-[4px] bg-brand-white/10 backdrop-blur-sm flex items-center justify-center mr-3 border border-brand-white/10'>
                <span className='text-brand-white text-sm'>AJ</span>
              </div>
              <span>{video.presenter.name}</span>
            </div>
          </motion.div>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: entryEasing }}
          className='relative aspect-video max-w-7xl mx-auto mb-0 overflow-hidden rounded-t-[4px] bg-brand-black shadow-2xl'
        >
          <div className='absolute inset-0 flex items-center justify-center z-10 pointer-events-none'>
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: entryEasing }}
                className='w-24 h-24 rounded-full bg-brand-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer pointer-events-auto shadow-xl shadow-brand-black/20 hover:bg-brand-white/40 transition-all duration-300 hover:scale-105'
                onClick={togglePlay}
              >
                <svg
                  className='w-10 h-10 text-brand-white ml-1'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5 3L19 12L5 21V3Z' fill='currentColor' />
                </svg>
              </motion.div>
            )}
          </div>
          <video
            ref={videoRef}
            poster={video.videoPoster}
            className='w-full h-full object-cover'
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={isPlaying}
          >
            <source src={video.videoUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </section>

      {/* Video Content */}
      <section ref={contentRef} className='py-32 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-12 gap-16'>
            {/* Social sharing sidebar - visible on desktop */}
            <div className='hidden lg:block lg:col-span-1'>
              <div className='sticky top-[120px] flex flex-col space-y-6'>
                <button
                  className='w-12 h-12 rounded-[4px] bg-brand-ivory flex items-center justify-center hover:bg-brand-sage/20 transition-colors duration-300'
                  aria-label='Share on Twitter'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button
                  className='w-12 h-12 rounded-[4px] bg-brand-ivory flex items-center justify-center hover:bg-brand-sage/20 transition-colors duration-300'
                  aria-label='Share on LinkedIn'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <rect
                      x='2'
                      y='9'
                      width='4'
                      height='12'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <circle
                      cx='4'
                      cy='4'
                      r='2'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button
                  className='w-12 h-12 rounded-[4px] bg-brand-ivory flex items-center justify-center hover:bg-brand-sage/20 transition-colors duration-300'
                  aria-label='Copy link'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className='col-span-12 lg:col-span-7'>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: entryEasing }}
                className='prose prose-lg max-w-none prose-headings:text-brand-forest prose-headings:tracking-[-0.5px] prose-headings:leading-[1.2] prose-p:text-brand-forest/80 prose-a:text-brand-sage prose-a:no-underline hover:prose-a:text-brand-sage/80 prose-p:leading-[1.6] prose-p:mb-8 prose-ul:text-brand-forest/80 prose-li:my-2 prose-li:leading-[1.6]'
                dangerouslySetInnerHTML={{ __html: video.description }}
              />

              {/* Tags */}
              <div className='mt-24 pt-10 border-t border-brand-forest/10'>
                <h4 className='text-sm uppercase text-brand-forest/60 tracking-wider mb-6 font-medium'>
                  Tags
                </h4>
                <div className='flex flex-wrap gap-3'>
                  {video.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-4 py-2 bg-brand-ivory hover:bg-brand-sage/20 text-brand-forest rounded-[4px] text-sm transition-colors duration-300 cursor-pointer'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Presenter bio */}
              <div className='mt-24 pt-10 border-t border-brand-forest/10'>
                <div className='flex flex-col md:flex-row md:items-start gap-8'>
                  <div className='w-20 h-20 rounded-[4px] bg-brand-sage/10 flex items-center justify-center overflow-hidden shrink-0 border border-brand-sage/20'>
                    <span className='text-brand-forest text-xl'>AJ</span>
                  </div>
                  <div>
                    <h4 className='text-2xl text-brand-forest mb-3 tracking-[-0.5px] leading-[1.2]'>
                      {video.presenter.name}
                    </h4>
                    <p className='text-sm text-brand-sage mb-6'>
                      {video.presenter.role}
                    </p>
                    <p className='text-brand-forest/80 leading-[1.6] mb-6'>
                      With over 10 years of experience in software development,
                      Alex specializes in creating robust, scalable applications
                      with a focus on performance and user experience. His
                      expertise spans frontend and backend technologies, with a
                      particular interest in emerging trends and future-forward
                      development practices.
                    </p>
                    <div className='flex mt-6 space-x-4'>
                      <a
                        href='#'
                        className='text-brand-forest/60 hover:text-brand-sage transition-colors duration-300'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
                        </svg>
                      </a>
                      <a
                        href='#'
                        className='text-brand-forest/60 hover:text-brand-sage transition-colors duration-300'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related content sidebar */}
            <div className='hidden lg:block lg:col-span-4'>
              <div className='sticky top-[120px]'>
                <h4 className='text-xl text-brand-forest mb-10 tracking-[-0.5px] relative inline-block'>
                  Related Videos
                  <span className='absolute -bottom-2 left-0 w-8 h-1 bg-brand-sage'></span>
                </h4>
                <div className='space-y-10'>
                  {video.relatedVideos.map((relatedVideo) => (
                    <Link
                      key={relatedVideo.id}
                      href={`/savvy-hub/video/${relatedVideo.slug}`}
                      className='group block transition-all duration-300 hover:-translate-y-1'
                    >
                      <span className='text-xs font-medium text-brand-sage mb-3 block'>
                        {relatedVideo.category}
                      </span>
                      <h5 className='text-lg text-brand-forest group-hover:text-brand-sage transition-colors duration-300 mb-3 tracking-[-0.5px] leading-[1.2]'>
                        {relatedVideo.title}
                      </h5>
                      <div className='flex items-center text-xs text-brand-forest/60'>
                        <span>{relatedVideo.date}</span>
                        <span className='mx-2 w-1 h-1 rounded-full bg-brand-forest/30'></span>
                        <span className='flex items-center'>
                          <svg
                            className='w-3 h-3 mr-1'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path
                              d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                              stroke='currentColor'
                              strokeWidth='2'
                            />
                            <path
                              d='M12 6V12L16 14'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                            />
                          </svg>
                          {relatedVideo.duration}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className='bg-brand-ivory p-8 rounded-[4px] mt-16 border border-brand-forest/5'>
                  <h4 className='text-xl text-brand-forest mb-5 tracking-[-0.5px]'>
                    Subscribe to Our Channel
                  </h4>
                  <p className='text-sm text-brand-forest/70 mb-8 leading-[1.6]'>
                    Get notified when we publish new videos about design,
                    development, and digital product strategy.
                  </p>
                  <form className='space-y-5'>
                    <input
                      type='email'
                      placeholder='Your email address'
                      className='w-full px-4 py-3 border border-brand-forest/10 rounded-[4px] focus:outline-none focus:border-brand-forest bg-brand-white transition-colors duration-300'
                    />
                    <button
                      type='submit'
                      className='w-full px-4 py-3 bg-brand-sage text-brand-white rounded-[4px] hover:bg-brand-sage/90 transition-colors font-medium'
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next/Previous Navigation */}
      <section className='py-32 bg-brand-ivory/60'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <Link
              href='/savvy-hub/video/anonymous-collaboration'
              className='group flex flex-col p-10 bg-brand-white rounded-[4px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-brand-forest/5'
            >
              <span className='text-sm text-brand-sage mb-4 flex items-center'>
                <svg className='w-4 h-4 mr-2' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M19 12H5M5 12L12 19M5 12L12 5'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Previous
              </span>
              <h3 className='text-xl text-brand-forest group-hover:text-brand-sage transition-colors duration-300 mb-4 tracking-[-0.5px] leading-[1.2]'>
                The Art of Anonymous Collaboration
              </h3>
              <div className='flex items-center text-sm text-brand-forest/60'>
                <span>Feb 5, 2024</span>
                <span className='mx-2 w-1 h-1 rounded-full bg-brand-forest/30'></span>
                <span className='flex items-center'>
                  <svg className='w-3 h-3 mr-1' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                    <path
                      d='M12 6V12L16 14'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  24:30
                </span>
              </div>
            </Link>

            <Link
              href='/savvy-hub/video/prototyping-for-conversion'
              className='group flex flex-col p-10 bg-brand-white rounded-[4px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-brand-forest/5'
            >
              <span className='text-sm text-brand-sage mb-4 flex items-center justify-end'>
                Next
                <svg className='w-4 h-4 ml-2' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M5 12H19M19 12L12 5M19 12L12 19'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <h3 className='text-xl text-brand-forest group-hover:text-brand-sage transition-colors duration-300 mb-4 tracking-[-0.5px] leading-[1.2]'>
                Prototyping for Conversion: Our Methodology
              </h3>
              <div className='flex items-center text-sm text-brand-forest/60'>
                <span>Mar 18, 2024</span>
                <span className='mx-2 w-1 h-1 rounded-full bg-brand-forest/30'></span>
                <span className='flex items-center'>
                  <svg className='w-3 h-3 mr-1' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                    <path
                      d='M12 6V12L16 14'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  12:05
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
