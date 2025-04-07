"use client";

import { useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Categories inspired by Vox
const hubCategories = [
  { id: "design", name: "Design", color: "bg-brand-sage" },
  { id: "technology", name: "Technology", color: "bg-brand-forest" },
  { id: "development", name: "Development", color: "bg-[#3F4697]" },
  { id: "strategy", name: "Strategy", color: "bg-[#739E82]" },
  { id: "ai", name: "AI", color: "bg-[#141414]" },
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

const contentTypes = [
  { id: "all", label: "All Content" },
  { id: "article", label: "Articles" },
  { id: "video", label: "Videos" },
  { id: "case-study", label: "Case Studies" },
  { id: "podcast", label: "Podcasts" },
];

// Define proper interfaces for post types
interface BasePost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  slug: string;
  type: string;
  featured: boolean;
  coverImage: string;
  tags: string[];
}

interface VideoPost extends BasePost {
  type: "video";
  duration: string;
}

interface PodcastPost extends BasePost {
  type: "podcast";
  duration: string;
}

interface ArticlePost extends BasePost {
  type: "article" | "case-study";
  readTime: string;
}

const SavvyHubPage = () => {
  // Animation settings
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  // We no longer need these scroll animations
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

  // Combined filtering
  const filteredPosts = regularArticles.filter((post) => {
    const matchesType = selectedType === "all" || post.type === selectedType;
    const matchesCategory =
      selectedCategory === null ||
      post.category.toLowerCase() === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <main className='min-h-screen bg-brand-white' ref={containerRef}>
      {/* Top Navigation Bar (Vox-style) */}
      <section className='py-3 bg-brand-black sticky top-0 z-50 shadow-sm'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='flex gap-6 overflow-x-auto py-1 w-full lg:w-auto'>
              {hubCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      category.id === selectedCategory ? null : category.id
                    )
                  }
                  className={`px-3 py-1 text-sm font-medium whitespace-nowrap transition-all duration-300 
                    ${
                      selectedCategory === category.id
                        ? "text-white " + category.color
                        : "text-white/80 hover:text-white"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className='hidden lg:flex'>
              <button className='text-white/80 hover:text-white text-sm px-3 py-1'>
                Subscribe
              </button>
              <button className='text-white/80 hover:text-white text-sm px-3 py-1'>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Featured Article - Vox Style */}
      <section className='border-b border-gray-200'>
        <div className='container mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
            {/* Left Column - Featured Article */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: entryEasing }}
              >
                <span
                  className={`inline-block px-2 py-1 ${hubCategories.find((c) => c.name === featuredArticle.category)?.color || "bg-brand-sage"} text-white text-xs font-medium mb-4`}
                >
                  {featuredArticle.category}
                </span>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-brand-forest font-medium mb-4 tracking-[-0.5px] leading-[1.1]'>
                  {featuredArticle.title}
                </h1>
                <p className='text-lg md:text-xl text-brand-forest/80 mb-6 leading-[1.5]'>
                  {featuredArticle.excerpt}
                </p>

                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <Image
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className='flex items-center gap-2 text-sm text-brand-forest/60'>
                    <span className='font-medium'>
                      {featuredArticle.author.name}
                    </span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                    <span>•</span>
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>

                <Link
                  href={`/savvy-hub/article/${featuredArticle.slug}`}
                  className='inline-flex items-center px-5 py-2 bg-brand-forest text-white rounded-sm hover:bg-brand-forest/90 transition-all'
                >
                  <span>Read the full story</span>
                  <svg className='ml-2 w-4 h-4' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M5 12h14M12 5l7 7-7 7'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Featured Image */}
            <div className='aspect-[4/3] overflow-hidden'>
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: entryEasing }}
                className='w-full h-full relative'
              >
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className='object-cover'
                  fill
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video - Vox Style */}
      <section className='bg-brand-black py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl md:text-2xl text-white font-medium'>
                Featured Video
              </h2>
              <Link
                href='/savvy-hub/videos'
                className='text-white/80 hover:text-white text-sm flex items-center group'
              >
                See all videos
                <svg
                  className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M5 12h14M12 5l7 7-7 7'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
            </div>

            <div className='relative aspect-video mb-4 overflow-hidden rounded-sm cursor-pointer group'>
              <Image
                src={featuredVideo.coverImage}
                alt={featuredVideo.title}
                className='object-cover group-hover:scale-105 transition-transform duration-700'
                fill
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>

              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-16 h-16 rounded-full bg-brand-sage/80 flex items-center justify-center group-hover:bg-brand-sage transition-colors duration-300'>
                  <svg
                    className='w-6 h-6 text-white'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
              </div>

              <div className='absolute bottom-0 left-0 w-full p-6'>
                <span className='inline-block px-2 py-1 bg-brand-forest text-white text-xs font-medium mb-2'>
                  {featuredVideo.category}
                </span>
                <h3 className='text-xl md:text-2xl text-white font-medium mb-2'>
                  {featuredVideo.title}
                </h3>
                <p className='text-white/80 mb-2'>{featuredVideo.excerpt}</p>
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

      {/* Content Filtering Section */}
      <section className='py-8 bg-brand-white border-b border-gray-200'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            <div className='flex gap-3 overflow-x-auto pb-2 w-full md:w-auto'>
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                    selectedType === type.id
                      ? "bg-brand-forest text-white border-brand-forest"
                      : "text-brand-forest border-gray-200 hover:border-brand-forest/50"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <div className='w-full md:w-64 relative'>
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-2 border border-gray-200 text-brand-forest placeholder:text-brand-forest/40 focus:outline-none focus:border-brand-forest'
              />
              <svg
                className='w-4 h-4 text-brand-forest/50 absolute right-3 top-1/2 -translate-y-1/2'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='M21 21l-4.35-4.35' />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid - Vox Style */}
      <section className='py-16 bg-brand-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/savvy-hub/${post.type}/${post.slug}`}
                className='group flex flex-col'
              >
                <div className='aspect-[16/9] mb-4 overflow-hidden'>
                  <div
                    className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500'
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  >
                    {post.type === "video" && (
                      <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
                        <div className='w-10 h-10 rounded-full bg-brand-forest/80 flex items-center justify-center'>
                          <svg
                            className='w-4 h-4 text-white'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                          >
                            <path d='M8 5v14l11-7z' />
                          </svg>
                        </div>
                      </div>
                    )}
                    {post.type === "podcast" && (
                      <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
                        <div className='w-10 h-10 rounded-full bg-brand-forest/80 flex items-center justify-center'>
                          <svg
                            className='w-4 h-4 text-white'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                          >
                            <path d='M12 3v18c-4.97 0-9-4.03-9-9s4.03-9 9-9zm0-2c-6.07 0-11 4.93-11 11s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1z' />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className='flex-1 flex flex-col'>
                  <span
                    className={`self-start inline-block px-2 py-1 ${hubCategories.find((c) => c.name === post.category)?.color || "bg-brand-sage"} text-white text-xs font-medium mb-2`}
                  >
                    {post.category}
                  </span>

                  <h3 className='text-lg font-medium text-brand-forest group-hover:text-brand-sage transition-colors duration-300 mb-2 leading-tight'>
                    {post.title}
                  </h3>

                  <p className='text-brand-forest/70 mb-3 text-sm line-clamp-2 leading-snug'>
                    {post.excerpt}
                  </p>

                  <div className='flex items-center justify-between mt-auto text-xs text-brand-forest/60'>
                    <div className='flex items-center gap-2'>
                      <span>
                        {post.type === "video" || post.type === "podcast"
                          ? post.type === "video"
                            ? (post as unknown as VideoPost).duration
                            : (post as unknown as PodcastPost).duration
                          : (post as unknown as ArticlePost).readTime}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <span className='text-brand-sage font-medium group-hover:translate-x-1 transition-transform duration-300'>
                      {post.type === "video"
                        ? "Watch"
                        : post.type === "podcast"
                          ? "Listen"
                          : "Read"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className='py-16 text-center'>
              <p className='text-brand-forest/70 text-lg'>
                No content matches your current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedType("all");
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
                className='mt-4 px-4 py-2 bg-brand-forest text-white hover:bg-brand-forest/90 transition-colors'
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Podcast Section - Vox Style */}
      <section id='podcast' className='py-16 bg-brand-forest'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-2xl md:text-3xl text-white font-medium'>
              Beneath the Build Podcast
            </h2>
            <Link
              href='/savvy-hub/podcast'
              className='text-white/80 hover:text-white font-medium inline-flex items-center group'
            >
              All Episodes
              <svg
                className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M5 12h14M12 5l7 7-7 7'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {podcastEpisodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/savvy-hub/podcast/${episode.slug}`}
                className='group flex gap-4 bg-white/5 p-4 hover:bg-white/10 transition-colors duration-300'
              >
                <div className='w-24 h-24 flex-shrink-0 overflow-hidden'>
                  <div
                    className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500'
                    style={{ backgroundImage: `url(${episode.coverImage})` }}
                  ></div>
                </div>
                <div className='flex flex-col flex-1'>
                  <span className='text-xs font-medium text-white/60 mb-1'>
                    S{episode.season} · E{episode.episodeNumber}
                  </span>
                  <h3 className='text-lg text-white group-hover:text-brand-sage transition-colors duration-300 mb-2 font-medium leading-tight'>
                    {episode.title}
                  </h3>
                  <p className='text-white/60 mb-auto text-sm line-clamp-2'>
                    {episode.excerpt}
                  </p>
                  <div className='flex items-center justify-between mt-2 text-xs'>
                    <span className='text-white/60'>{episode.duration}</span>
                    <span className='text-brand-sage group-hover:translate-x-1 transition-transform duration-300'>
                      Listen
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Vox Style */}
      <section className='py-16 bg-brand-forest/10'>
        <div className='container mx-auto px-4'>
          <div className='max-w-xl mx-auto text-center'>
            <h2 className='text-2xl md:text-3xl text-brand-forest mb-4 font-medium'>
              Get Ghost Savvy Insights in Your Inbox
            </h2>
            <p className='text-brand-forest/80 mb-6'>
              Subscribe to receive our latest articles, podcast episodes, and
              design resources delivered straight to your inbox.
            </p>
            <form className='flex gap-2'>
              <input
                type='email'
                placeholder='Your email address'
                className='px-4 py-3 bg-white border border-gray-200 flex-1 text-brand-forest placeholder:text-brand-forest/40 focus:outline-none focus:border-brand-forest'
              />
              <button
                type='submit'
                className='px-6 py-3 bg-brand-forest text-white font-medium hover:bg-brand-forest/90 transition-colors'
              >
                Subscribe
              </button>
            </form>
            <p className='text-brand-forest/60 text-xs mt-4'>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SavvyHubPage;
