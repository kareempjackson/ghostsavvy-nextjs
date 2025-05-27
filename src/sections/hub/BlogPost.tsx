"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Mock data for blog post (in a real app, you would fetch this based on the slug)
const post = {
  title: "Why User-Centric Design Matters",
  excerpt:
    "Explore how putting users at the heart of design decisions leads to better products and experiences.",
  content: `
    <p>In the world of digital product development, there exists an intriguing phenomenon that we've come to call "ghost clients." These are organizations that require exceptional digital solutions but, for various strategic reasons, prefer to remain anonymous in their partnership with design studios like ours.</p>
    
    <h2>The Challenge of Invisible Collaboration</h2>
    
    <p>Working with ghost clients presents unique challenges that transform the traditional client-studio relationship. When a client needs to remain unnamed, our typical processes around feedback, collaboration, and portfolio building must adapt. The challenge becomes: how do we maintain our high standards of work while respecting the client's need for discretion?</p>
    
    <p>At Ghost Savvy Studios, we've built our entire business model around this concept. We design and develop digital products that shine in the marketplace, all while allowing our clients to maintain their anonymity or present the work as their own in-house creation.</p>
    
    <h2>Establishing Trust Without Public Recognition</h2>
    
    <p>The foundation of any successful ghost client relationship is trust. Without public case studies or testimonials to showcase our previous work with similar clients, we've developed alternative methods of building confidence:</p>
    
    <ul>
      <li>Detailed process documentation that demonstrates our expertise without revealing client specifics</li>
      <li>Private portfolios shared under strict NDAs</li>
      <li>Transparent communication protocols that protect client identity while ensuring project clarity</li>
      <li>Reference networks where previous clients can confidentially vouch for our work</li>
    </ul>
    
    <h2>The Ethical Dimensions</h2>
    
    <p>Working with ghost clients also presents ethical considerations. We carefully evaluate each engagement to ensure that our work aligns with our values. While we respect our clients' need for anonymity, we also maintain clear boundaries around projects that might have harmful societal impacts.</p>
    
    <p>Our team regularly discusses the ethical implications of ghost work, ensuring that we're not just technically proficient but also thoughtful about the broader impact of what we create.</p>
    
    <h2>Practical Strategies for Ghost Product Development</h2>
    
    <p>Over the years, we've refined a set of strategies that allow us to deliver exceptional work for ghost clients:</p>
    
    <ol>
      <li><strong>Rigorous onboarding and alignment</strong> - Since we can't rely on public brand recognition to attract the right clients, we invest heavily in our initial discovery processes.</li>
      <li><strong>Clear communication channels</strong> - We establish secure, dedicated communication pathways for each project.</li>
      <li><strong>Comprehensive documentation</strong> - Our deliverables include detailed documentation that allows clients to maintain and evolve the product internally.</li>
      <li><strong>Knowledge transfer protocols</strong> - We develop customized training programs that enable client teams to take full ownership of the product.</li>
    </ol>
    
    <h2>Looking Ahead</h2>
    
    <p>As the digital product landscape evolves, we anticipate that ghost development will become an increasingly important part of the industry. Organizations seeking competitive advantages will continue to value partnerships that allow them to maintain the appearance of in-house development while benefiting from specialized external expertise.</p>
    
    <p>At Ghost Savvy Studios, we're continuing to refine our approaches to this unique form of collaboration, always seeking the perfect balance between client anonymity and design excellence.</p>
  `,
  category: "Design",
  date: "Mar 15, 2024",
  author: {
    name: "Sarah Mitchell",
    role: "Head of Design",
    image: "/images/author-placeholder.jpg",
  },
  tags: ["UX Design", "Product Strategy", "Client Relations", "Ethics"],
  featureImage: "/images/blog-placeholder-1.jpg",
  relatedPosts: [
    {
      id: 2,
      title: "The Technical Architecture Behind Our Latest Fintech Solution",
      excerpt:
        "A deep dive into the tech stack and architecture decisions that powered our recent fintech project.",
      category: "Development",
      date: "Feb 28, 2024",
      slug: "fintech-technical-architecture",
    },
    {
      id: 3,
      title: "Ethical Considerations in Building AI-Powered Products",
      excerpt:
        "Exploring the ethical dimensions and responsibilities when developing AI-enhanced digital solutions.",
      category: "AI & Ethics",
      date: "Jan 20, 2024",
      slug: "ethical-ai-product-development",
    },
  ],
};

interface BlogPostProps {
  slug: string;
}

// Easing values from brand guidelines for animations
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)
const exitEasing = [0.4, 0.0, 1, 1]; // cubic-bezier(0.4, 0.0, 1, 1)

const BlogPost = ({ slug }: BlogPostProps) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"],
  });

  // Animation values for parallax and progress effects
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const headerScale = useTransform(scrollY, [0, 250], [1, 1.1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [timeToRead, setTimeToRead] = useState("6 min read");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Estimate time to read based on content length (simplified)
  useEffect(() => {
    if (post.content) {
      const wordCount = post.content.trim().split(/\s+/).length;
      const wordsPerMinute = 200;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      setTimeToRead(`${minutes} min read`);
    }
  }, []);

  // Log the blog post slug
  useEffect(() => {
    console.log(`Loading blog post with slug: ${slug}`);

    // Example of using exitEasing for a fade-out animation
    const fadeOutElements = document.querySelectorAll(".fade-out-element");
    fadeOutElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.transition = `opacity 0.3s cubic-bezier(${exitEasing.join(
          ","
        )})`;
      }
    });
  }, [slug]);

  return (
    <main className='min-h-screen bg-brand-white text-brand-deep'>
      {/* Reading Progress Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 bg-brand-ivory z-50 ${
          isScrolled ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <motion.div
          className='h-full bg-brand-lime'
          style={{ width: progressWidth }}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className='relative h-[75vh] overflow-hidden'>
        {/* Background Image with Parallax */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          {/* Overlay Gradient */}
          <div className='absolute inset-0 bg-gradient-to-b from-brand-deep/90 via-brand-deep/70 to-brand-deep/40 z-10'></div>

          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${post.featureImage})` }}
          ></div>
        </motion.div>

        {/* Decorative elements */}
        <div className='absolute inset-0 z-10 opacity-20 mix-blend-overlay'>
          <div className='absolute top-20 left-[10%] w-64 h-64 rounded-full border border-brand-white/10 animate-[spin_40s_linear_infinite]'></div>
          <div className='absolute bottom-20 right-[10%] w-80 h-80 rounded-full border border-brand-white/10 animate-[spin_30s_linear_infinite]'></div>
        </div>

        {/* Back button and category */}
        <div className='container mx-auto px-6 pt-40 relative z-20'>
          <div className='flex justify-between items-center border-b border-brand-white/10 pb-6'>
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
              {post.category}
            </span>
          </div>

          {/* Hero Content */}
          <div className='flex flex-col justify-center h-[calc(75vh-12rem)] max-w-4xl mx-auto text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: entryEasing }}
              className='text-brand-white text-3xl md:text-5xl lg:text-6xl tracking-[-0.5px] leading-[1.1] mb-8'
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: entryEasing }}
              className='flex items-center justify-center text-brand-white/70 space-x-4 mb-8'
            >
              <span>{post.date}</span>
              <span className='w-1 h-1 rounded-full bg-brand-white/30'></span>
              <span>{timeToRead}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: entryEasing }}
              className='flex items-center justify-center'
            >
              <div className='w-12 h-12 rounded-[4px] bg-brand-white/10 backdrop-blur-sm flex items-center justify-center mr-3 border border-brand-white/20'>
                <span className='text-brand-white'>SM</span>
              </div>
              <span className='text-brand-white/70'>
                By {post.author.name} • {post.author.role}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: entryEasing }}
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className='flex flex-col items-center'
          >
            <span className='text-brand-white/60 text-sm mb-2'>
              Scroll to read
            </span>
            <svg
              className='w-6 h-6 text-brand-white/60'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7 13L12 18L17 13'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7 7L12 12L17 7'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Article Content */}
      <section ref={contentRef} className='py-32'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-12 gap-16'>
            {/* Social sharing sidebar - visible on desktop */}
            <div className='hidden lg:block lg:col-span-1'>
              <div className='sticky top-[120px] flex flex-col space-y-6'>
                <button
                  className='w-12 h-12 rounded-[4px] bg-brand-ivory flex items-center justify-center hover:bg-brand-lime/20 transition-colors duration-300'
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
                  className='w-12 h-12 rounded-[4px] bg-brand-ivory flex items-center justify-center hover:bg-brand-lime/20 transition-colors duration-300'
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
                  className='w-12 h-12 rounded-[4px] bg-brand-ivory flex items-center justify-center hover:bg-brand-lime/20 transition-colors duration-300'
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
              <div className='max-w-3xl mx-auto'>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: entryEasing }}
                  className='prose prose-lg max-w-none
                    prose-headings:font-normal prose-headings:text-brand-deep prose-headings:tracking-[-0.5px]
                    prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:leading-[1.3] prose-h2:mb-6 prose-h2:mt-20
                    prose-p:text-brand-deep/80 prose-p:text-base md:prose-p:text-lg prose-p:leading-[1.8]
                    prose-p:mb-8 prose-p:tracking-normal
                    prose-a:text-brand-lime prose-a:no-underline hover:prose-a:text-brand-lime/80
                    prose-ul:text-brand-deep/80 prose-ul:mt-6 prose-ul:mb-12 prose-ul:pl-8
                    prose-ol:text-brand-deep/80 prose-ol:mt-6 prose-ol:mb-12 prose-ol:pl-8
                    prose-li:text-base md:prose-li:text-lg prose-li:mb-4 prose-li:leading-[1.7]
                    prose-strong:text-brand-deep prose-strong:font-medium
                    [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-[1.7] [&>p:first-of-type]:mb-10
                    [&>h2+p]:mt-6 [&>p+p]:mt-8'
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              <div className='mt-24 pt-10 border-t border-brand-deep/10 max-w-3xl mx-auto'>
                <h4 className='text-sm uppercase text-brand-deep/60 tracking-wider mb-6 font-medium'>
                  Tags
                </h4>
                <div className='flex flex-wrap gap-3'>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-4 py-2 bg-brand-ivory hover:bg-brand-lime/20 text-brand-deep rounded-[4px] text-sm transition-colors duration-300 cursor-pointer'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author bio */}
              <div className='mt-24 pt-10 border-t border-brand-deep/10 max-w-3xl mx-auto'>
                <div className='flex flex-col md:flex-row md:items-start gap-8'>
                  <div className='w-20 h-20 rounded-[4px] bg-brand-lime/10 flex items-center justify-center overflow-hidden shrink-0 border border-brand-lime/20'>
                    <span className='text-brand-deep text-xl'>SM</span>
                  </div>
                  <div>
                    <h4 className='text-2xl text-brand-deep mb-3 tracking-[-0.5px] leading-[1.2]'>
                      {post.author.name}
                    </h4>
                    <p className='text-sm text-brand-lime mb-6'>
                      {post.author.role}
                    </p>
                    <p className='text-brand-deep/80 leading-[1.6] mb-6'>
                      Design strategist passionate about creating products that
                      combine aesthetic excellence with functional innovation.
                      With a background in both design and psychology, Sarah
                      helps our clients navigate the complex balance between
                      user needs and business objectives.
                    </p>
                    <div className='flex mt-6 space-x-4'>
                      <a
                        href='#'
                        className='text-brand-deep/60 hover:text-brand-lime transition-colors duration-300'
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
                        className='text-brand-deep/60 hover:text-brand-lime transition-colors duration-300'
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
                <h4 className='text-xl text-brand-deep mb-10 tracking-[-0.5px] relative inline-block'>
                  Related Articles
                  <span className='absolute -bottom-2 left-0 w-8 h-1 bg-brand-lime'></span>
                </h4>
                <div className='space-y-10'>
                  {post.relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/savvy-hub/blog/${relatedPost.slug}`}
                      className='group block transition-all duration-300 hover:-translate-y-1'
                    >
                      <span className='text-xs font-medium text-brand-lime mb-3 block'>
                        {relatedPost.category}
                      </span>
                      <h5 className='text-lg text-brand-deep group-hover:text-brand-lime transition-colors duration-300 mb-3 tracking-[-0.5px] leading-[1.2]'>
                        {relatedPost.title}
                      </h5>
                      <span className='text-xs text-brand-deep/60'>
                        {relatedPost.date}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className='bg-brand-ivory p-8 rounded-[4px] mt-16 border border-brand-deep/5'>
                  <h4 className='text-xl text-brand-deep mb-5 tracking-[-0.5px]'>
                    Subscribe to Our Newsletter
                  </h4>
                  <p className='text-sm text-brand-deep/70 mb-8 leading-[1.6]'>
                    Get the latest insights on design, development, and digital
                    product strategy delivered to your inbox.
                  </p>
                  <form className='space-y-5'>
                    <input
                      type='email'
                      placeholder='Your email address'
                      className='w-full px-4 py-3 border border-brand-deep/10 rounded-[4px] focus:outline-none focus:border-brand-deep bg-brand-white transition-colors duration-300'
                    />
                    <button
                      type='submit'
                      className='w-full px-4 py-3 bg-brand-lime text-brand-white rounded-[4px] hover:bg-brand-lime/90 transition-colors font-medium'
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
              href='/savvy-hub/blog/ethical-ai-product-development'
              className='group flex flex-col p-10 bg-brand-white rounded-[4px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-brand-deep/5'
            >
              <span className='text-sm text-brand-lime mb-4 flex items-center'>
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
              <h3 className='text-xl text-brand-deep group-hover:text-brand-lime transition-colors duration-300 mb-4 tracking-[-0.5px] leading-[1.2]'>
                Ethical Considerations in Building AI-Powered Products
              </h3>
              <span className='text-sm text-brand-deep/60'>Jan 20, 2024</span>
            </Link>

            <Link
              href='/savvy-hub/blog/fintech-technical-architecture'
              className='group flex flex-col p-10 bg-brand-white rounded-[4px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-brand-deep/5'
            >
              <span className='text-sm text-brand-lime mb-4 flex items-center justify-end'>
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
              <h3 className='text-xl text-brand-deep group-hover:text-brand-lime transition-colors duration-300 mb-4 tracking-[-0.5px] leading-[1.2]'>
                The Technical Architecture Behind Our Latest Fintech Solution
              </h3>
              <span className='text-sm text-brand-deep/60'>Feb 28, 2024</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
