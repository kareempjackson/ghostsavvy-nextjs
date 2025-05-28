"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    },
    slug: "building-impactful-products",
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
    },
    slug: "design-systems-that-scale",
    type: "podcast",
    featured: false,
    coverImage: "/images/podcast-placeholder-2.jpg",
    tags: ["Design Systems", "Scalability", "UI/UX"],
  },
  // Add more episodes as needed
];

const PodcastPage = () => {
  // Easing values from brand guidelines
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  const [selectedSeason, setSelectedSeason] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const seasons = [
    { id: "all", label: "All Seasons" },
    { id: "2", label: "Season 2" },
    { id: "1", label: "Season 1" },
  ];

  const filteredEpisodes = podcastEpisodes.filter((episode) => {
    const matchesSeason =
      selectedSeason === "all" || episode.season.toString() === selectedSeason;
    const matchesSearch =
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSeason && matchesSearch;
  });

  return (
    <main className='min-h-screen bg-brand-ivory'>
      {/* Hero Section */}
      <section className='relative py-32 bg-brand-forest overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-[10%] w-64 h-64 rounded-full border border-brand-white/20 animate-[spin_40s_linear_infinite]'></div>
          <div className='absolute bottom-20 right-[10%] w-80 h-80 rounded-full border border-brand-white/20 animate-[spin_30s_linear_infinite]'></div>
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: entryEasing }}
            >
              <h1 className='text-4xl md:text-5xl lg:text-6xl text-brand-white mb-8 tracking-[-0.5px] leading-[1.1]'>
                Beneath the Build
              </h1>
              <p className='text-xl md:text-2xl text-brand-white/90 mb-8 leading-normal'>
                Dive deep into the stories behind impactful products with
                industry insiders.
              </p>
              <div className='flex items-center justify-center gap-4 text-brand-white/70 text-sm'>
                <span>Hosted by Sophia Lee</span>
                <span>•</span>
                <span>New episodes every week</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className='py-12 bg-brand-white sticky top-0 z-50 border-b border-brand-forest/5'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col md:flex-row gap-6 items-center justify-between'>
            <div className='flex gap-4 overflow-x-auto pb-2 w-full md:w-auto'>
              {seasons.map((season) => (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeason(season.id)}
                  className={`px-6 py-2 rounded-[4px] text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedSeason === season.id
                      ? "bg-brand-sage text-brand-forest"
                      : "text-brand-forest hover:text-brand-forest/80"
                  }`}
                >
                  {season.label}
                </button>
              ))}
            </div>
            <div className='w-full md:w-96'>
              <input
                type='text'
                placeholder='Search episodes...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-6 py-3 bg-brand-ivory border border-brand-forest/10 rounded-[4px] text-brand-forest placeholder:text-brand-forest/40 focus:outline-hidden focus:border-brand-forest'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className='py-32 bg-brand-ivory'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {filteredEpisodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/savvy-hub/podcast/${episode.slug}`}
                className='group'
              >
                <div className='flex items-center p-8 bg-brand-white rounded-[4px] shadow-xs hover:shadow-lg transition-all duration-500 hover:-translate-y-2'>
                  <div className='w-32 h-32 shrink-0 overflow-hidden rounded-[4px] bg-gray-100'>
                    <div
                      className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700'
                      style={{ backgroundImage: `url(${episode.coverImage})` }}
                    ></div>
                  </div>
                  <div className='ml-8'>
                    <span className='text-sm font-medium text-brand-forest/60 mb-3 block'>
                      S{episode.season} · E{episode.episodeNumber}
                    </span>
                    <h3 className='text-2xl text-brand-forest group-hover:text-brand-sage transition-colors duration-300 mb-3 tracking-[-0.5px] leading-[1.2]'>
                      {episode.title}
                    </h3>
                    <p className='text-brand-forest/60 mb-6 line-clamp-2 text-lg leading-normal'>
                      {episode.excerpt}
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-brand-forest/60 font-medium'>
                        {episode.duration}
                      </span>
                      <span className='text-brand-sage font-medium group-hover:translate-x-2 transition-transform duration-300'>
                        Listen Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-32 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-4xl md:text-5xl text-brand-forest mb-8 tracking-[-0.5px] leading-[1.1]'>
              Never Miss an Episode
            </h2>
            <p className='text-brand-forest/80 text-xl mb-12 leading-normal'>
              Subscribe to our newsletter to receive new episode notifications
              and exclusive content.
            </p>
            <form className='flex flex-col sm:flex-row gap-6'>
              <input
                type='email'
                placeholder='Your email address'
                className='px-8 py-5 bg-brand-ivory border border-brand-forest/10 rounded-[4px] text-brand-forest placeholder:text-brand-forest/40 focus:outline-hidden focus:border-brand-forest flex-1 text-lg'
              />
              <button
                type='submit'
                className='px-10 py-5 bg-brand-sage text-brand-white rounded-[4px] font-medium hover:bg-brand-sage/90 transition-all duration-300 text-lg'
              >
                Subscribe
              </button>
            </form>
            <p className='text-brand-forest/60 text-sm mt-8 leading-normal'>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PodcastPage;
