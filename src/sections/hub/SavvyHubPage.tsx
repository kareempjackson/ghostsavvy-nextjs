"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/layout/FooterSection";

// Categories inspired by Vox
const hubCategories = [
  { id: "design", name: "Design", color: "bg-brand-sage" },
  { id: "technology", name: "Technology", color: "bg-brand-forest" },
  { id: "development", name: "Development", color: "bg-[#3F4697]" },
  { id: "strategy", name: "Strategy", color: "bg-[#739E82]" },
  { id: "ai", name: "AI", color: "bg-brand-black" },
  { id: "business", name: "Business", color: "bg-[#6d4c41]" },
];

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Why User-Centric Design Matters for Product Success",
    excerpt:
      "Explore how putting users at the heart of design decisions leads to better products and experiences.",
    category: "Design",
    date: "Mar 15, 2024",
    author: {
      name: "Sarah Mitchell",
      role: "Head of Design",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "user-centric-design",
    type: "feature",
    featured: true,
    coverImage: "/images/blog-placeholder-1.jpg",
    readTime: "8 min read",
    tags: ["Design", "UX", "Product Strategy"],
  },
  {
    id: 2,
    title: "The Future of Product Development",
    excerpt:
      "A deep dive into emerging trends and technologies shaping the future of digital product development.",
    category: "Development",
    date: "Mar 10, 2024",
    author: {
      name: "Alex Johnson",
      role: "Lead Developer",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "future-product-development",
    type: "video",
    featured: true,
    coverImage: "/images/blog-placeholder-2.jpg",
    duration: "12:45",
    tags: ["Development", "Technology", "Future Trends"],
  },
  {
    id: 3,
    title: "Building Impactful Products in the Age of AI",
    excerpt:
      "Learn how to create products that make a real difference in users' lives while leveraging artificial intelligence.",
    category: "AI",
    date: "Mar 5, 2024",
    author: {
      name: "Jordan Lee",
      role: "Product Strategist",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "impactful-products",
    type: "article",
    featured: false,
    coverImage: "/images/blog-placeholder-3.jpg",
    readTime: "10 min read",
    tags: ["Product Strategy", "Impact", "Innovation", "AI"],
  },
  {
    id: 4,
    title: "How We Redesigned Our Entire Design System in 8 Weeks",
    excerpt:
      "A case study on our rapid design system overhaul that improved consistency and accelerated development.",
    category: "Design",
    date: "Feb 28, 2024",
    author: {
      name: "Emily Chen",
      role: "UI Designer",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "design-system-overhaul",
    type: "case-study",
    featured: false,
    coverImage: "/images/placeholder-hero.jpg",
    readTime: "15 min read",
    tags: ["Design Systems", "Case Study", "UI/UX"],
  },
  {
    id: 5,
    title: "The Business Case for Ethical Design",
    excerpt:
      "Why investing in ethical design practices isn't just good for users—it's good for business.",
    category: "Business",
    date: "Feb 20, 2024",
    author: {
      name: "Michael Wong",
      role: "COO",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "ethical-design-business",
    type: "article",
    featured: false,
    coverImage: "/images/placeholder-hero.jpg",
    readTime: "7 min read",
    tags: ["Ethics", "Business", "Design"],
  },
  {
    id: 6,
    title: "Web3 for Product Designers: What You Need to Know",
    excerpt:
      "A primer on Web3 technologies and how they'll impact the future of product design.",
    category: "Technology",
    date: "Feb 15, 2024",
    author: {
      name: "David Park",
      role: "Tech Lead",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "web3-product-design",
    type: "article",
    featured: false,
    coverImage: "/images/placeholder-hero.jpg",
    readTime: "12 min read",
    tags: ["Web3", "Blockchain", "Design"],
  },
];

// Mock data for podcast episodes
const podcastEpisodes = [
  {
    id: 1,
    title: "Building Impactful Products with Purpose",
    excerpt:
      "Join us as we explore the stories behind impactful products with industry insiders.",
    category: "Podcast",
    date: "Mar 20, 2024",
    duration: "42:15",
    episodeNumber: 12,
    season: 2,
    host: {
      name: "Sophia Lee",
      role: "Host",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "behind-scenes-product-design",
    type: "podcast",
    featured: true,
    coverImage: "/images/podcast-placeholder-1.jpg",
    tags: ["Product Design", "Innovation", "Industry Insights"],
  },
  {
    id: 2,
    title: "Design Systems That Scale",
    excerpt:
      "How to build and maintain design systems that grow with your product and organization.",
    category: "Podcast",
    date: "Mar 15, 2024",
    duration: "38:45",
    episodeNumber: 11,
    season: 2,
    host: {
      name: "Sophia Lee",
      role: "Host",
      avatar: "/images/author-placeholder.jpg",
    },
    slug: "design-systems-that-scale",
    type: "podcast",
    featured: false,
    coverImage: "/images/podcast-placeholder-2.jpg",
    tags: ["Design Systems", "Scalability", "UI/UX"],
  },
];

const SavvyHubPage = () => {
  // Animation settings
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)
  const staggerDelay = 0.2;

  const containerRef = useRef(null);

  // Scroll animations
  useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Get main featured article (with null safety)
  const featuredArticle =
    blogPosts.find((post) => post.type === "feature" && post.featured) ||
    blogPosts[0];

  // Get featured video (with null safety)
  const featuredVideo =
    blogPosts.find((post) => post.type === "video" && post.featured) ||
    blogPosts[0];

  // Get regular articles (not featured)
  const regularArticles = blogPosts.filter((post) => !post.featured);

  return (
    <main className='min-h-screen bg-brand-white' ref={containerRef}>
      {/* Use the standard Ghost Savvy navigation */}
      <Header />

      {/* Hero Section with Featured Article - Editorial Style */}
      <section className='min-h-[60vh] md:min-h-[80vh] relative overflow-hidden'>
        {/* Background Image or Video */}
        <div className='absolute inset-0 z-0'>
          <Image
            src={featuredArticle.coverImage}
            alt={featuredArticle.title}
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-black/40'></div>
        </div>

        {/* Content Overlay */}
        <div className='container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-start py-16'>
          <div className='max-w-3xl mt-16 md:mt-24'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: entryEasing }}
            >
              <span
                className={`inline-block px-2 py-1 ${
                  hubCategories.find((c) => c.name === featuredArticle.category)
                    ?.color || "bg-brand-sage"
                } text-white text-xs font-medium mb-4`}
              >
                {featuredArticle.category}
              </span>
              <h1 className='text-5xl md:text-6xl text-white font-bold mb-6 tracking-tight leading-tight'>
                {featuredArticle.title}
              </h1>
              <p className='text-xl text-white/80 max-w-2xl mb-8 leading-relaxed'>
                {featuredArticle.excerpt}
              </p>

              <Link
                href={`/savvy-hub/article/${featuredArticle.slug}`}
                className='inline-flex items-center px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-brand-forest transition-all duration-300'
              >
                <span>Read Full Story</span>
                <svg
                  className='ml-2 w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M5 12h14M12 5l7 7-7 7' />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className='py-32 bg-brand-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: entryEasing }}
            className='text-center mb-20'
          >
            <h2 className='text-5xl font-bold text-brand-forest mb-6'>
              Latest Insights
            </h2>
            <p className='text-xl text-brand-forest/70 max-w-2xl mx-auto leading-relaxed'>
              Explore our latest articles and insights on design, development,
              and innovation.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-24'>
            {regularArticles.slice(0, 4).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: entryEasing,
                  delay: (index * staggerDelay) % (staggerDelay * 4), // Reset stagger after 4 items
                }}
              >
                <Link
                  href={`/savvy-hub/${post.type}/${post.slug}`}
                  className='group flex flex-col h-full'
                >
                  <div className='aspect-video mb-6 overflow-hidden'>
                    <div
                      className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 relative'
                      style={{ backgroundImage: `url(${post.coverImage})` }}
                    ></div>
                  </div>

                  <div className='flex-1 flex flex-col'>
                    <span
                      className={`self-start inline-block px-2 py-1 ${
                        hubCategories.find((c) => c.name === post.category)
                          ?.color || "bg-brand-sage"
                      } text-white text-xs font-medium mb-3`}
                    >
                      {post.category}
                    </span>

                    <h3 className='text-2xl font-bold text-brand-forest group-hover:text-brand-sage transition-colors duration-300 mb-3 leading-tight'>
                      {post.title}
                    </h3>

                    <p className='text-brand-forest/70 mb-6 line-clamp-2 leading-relaxed'>
                      {post.excerpt}
                    </p>

                    <span className='text-brand-sage font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center mt-auto'>
                      Read More
                      <svg
                        className='w-4 h-4 ml-1'
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className='py-32 bg-[#FAFAFA]'>
        <div className='container mx-auto px-4'>
          <div className='max-w-5xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: entryEasing }}
              className='text-center mb-16'
            >
              <h2 className='text-5xl font-bold text-brand-forest mb-6'>
                Featured Video
              </h2>
              <p className='text-xl text-brand-forest/70 max-w-2xl mx-auto leading-relaxed'>
                Watch our latest showcase of digital product design and
                development.
              </p>
            </motion.div>

            <div className='relative aspect-video mb-8 overflow-hidden rounded-xs cursor-pointer group'>
              <Image
                src={featuredVideo.coverImage}
                alt={featuredVideo.title}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 to-transparent'></div>

              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-20 h-20 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300'>
                  <svg
                    className='w-8 h-8 text-white'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
              </div>

              <div className='absolute bottom-0 left-0 w-full p-10'>
                <span className='inline-block px-2 py-1 bg-brand-forest text-white text-xs font-medium mb-3'>
                  {featuredVideo.category}
                </span>
                <h3 className='text-3xl text-white font-bold mb-3'>
                  {featuredVideo.title}
                </h3>
                <p className='text-white/80 mb-4 text-lg max-w-2xl'>
                  {featuredVideo.excerpt}
                </p>
                <div className='flex items-center gap-2 text-sm text-white/60'>
                  <span>{featuredVideo.duration}</span>
                  <span>•</span>
                  <span>{featuredVideo.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section id='podcast' className='py-32 bg-brand-white'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: entryEasing }}
            className='text-center mb-16'
          >
            <h2 className='text-5xl font-bold text-brand-forest mb-6'>
              Beneath the Build Podcast
            </h2>
            <p className='text-xl text-brand-forest/70 max-w-2xl mx-auto leading-relaxed'>
              Listen to the stories behind our most challenging builds and
              in-depth conversations with industry experts.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
            {podcastEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: entryEasing,
                  delay: index * 0.2,
                }}
              >
                <Link
                  href={`/savvy-hub/podcast/${episode.slug}`}
                  className='group flex gap-6 bg-[#FAFAFA] p-6 shadow-xs hover:shadow-md transition-all duration-300 rounded-xs h-full'
                >
                  <div className='w-32 h-32 shrink-0 overflow-hidden rounded-xs'>
                    <div
                      className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500'
                      style={{ backgroundImage: `url(${episode.coverImage})` }}
                    ></div>
                  </div>
                  <div className='flex flex-col flex-1 justify-center'>
                    <span className='text-xs font-medium text-brand-forest/60 mb-1'>
                      S{episode.season} · E{episode.episodeNumber}
                    </span>
                    <h3 className='text-xl text-brand-forest group-hover:text-brand-sage transition-colors duration-300 mb-2 font-bold leading-tight'>
                      {episode.title}
                    </h3>
                    <p className='text-brand-forest/60 mb-auto text-sm line-clamp-2'>
                      {episode.excerpt}
                    </p>
                    <div className='flex items-center justify-between mt-3 text-xs'>
                      <span className='text-brand-forest/60'>
                        {episode.duration}
                      </span>
                      <span className='text-brand-sage font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center'>
                        Listen
                        <svg
                          className='w-3 h-3 ml-1'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M5 12h14M12 5l7 7-7 7' />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className='py-32 bg-[#FAFAFA]'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: entryEasing }}
            className='max-w-3xl mx-auto text-center'
          >
            <h2 className='text-5xl font-bold text-brand-forest mb-6'>
              Get Ghost Savvy Insights In Your Inbox
            </h2>
            <p className='text-xl text-brand-forest/70 leading-relaxed mb-10'>
              Subscribe to receive the latest articles, videos, and podcasts
              direct to your email.
            </p>
            <form className='flex flex-col sm:flex-row gap-4 max-w-xl mx-auto'>
              <input
                type='email'
                placeholder='Your email address'
                className='flex-1 px-6 py-4 bg-white border border-gray-200 text-brand-forest rounded-full placeholder:text-brand-forest/40 focus:outline-hidden focus:border-brand-forest'
              />
              <button
                type='submit'
                className='px-8 py-4 bg-brand-forest text-white font-medium rounded-full hover:bg-brand-forest/90 transition-colors whitespace-nowrap'
              >
                Subscribe →
              </button>
            </form>
            <p className='text-brand-forest/60 text-sm mt-4'>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default SavvyHubPage;
