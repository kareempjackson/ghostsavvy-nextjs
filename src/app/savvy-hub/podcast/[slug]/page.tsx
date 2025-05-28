"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Sample podcast data (in a real app, you would fetch this based on the slug)
const podcast = {
  title:
    "The Art of Invisible Design: Creating Products That Speak for Themselves",
  excerpt:
    "A conversation with leading product designers about creating digital products that feel intuitive and invisible to users.",
  audioUrl: "https://example.com/podcasts/invisible-design.mp3", // Placeholder URL
  coverImage: "/images/podcast-placeholder-1.jpg",
  category: "UX Design",
  date: "May 8, 2023",
  duration: "42:15",
  episodeNumber: 12,
  season: 2,
  guests: [
    {
      name: "Eliza Chen",
      role: "UX Director at FinTech Co.",
      image: "/images/guest-placeholder-1.jpg",
    },
    {
      name: "James Rivera",
      role: "Product Lead at Ghost Savvy Studios",
      image: "/images/guest-placeholder-2.jpg",
    },
  ],
  host: {
    name: "Sophia Lee",
    role: "Head of Product Strategy",
    image: "/images/host-placeholder.jpg",
  },
  description: `
    <p>In this episode of the Ghost Savvy Podcast, we explore the concept of invisible design — the art of creating digital products that feel so intuitive they almost disappear from the user's consciousness.</p>
    
    <p>Our host Sophia Lee is joined by Eliza Chen, UX Director at a leading fintech company, and our own James Rivera, Product Lead at Ghost Savvy Studios. Together, they unpack what makes design truly invisible and how to achieve this elusive quality in complex digital products.</p>
    
    <h3>Episode Highlights:</h3>
    
    <ul>
      <li>The characteristics of "invisible" design and why it matters for user engagement</li>
      <li>Common pitfalls that make design feel obtrusive or frustrating</li>
      <li>Techniques for testing whether your design is truly invisible to users</li>
      <li>Case studies of products that exemplify invisible design principles</li>
      <li>How to balance brand presence with design invisibility</li>
    </ul>
    
    <p>This conversation offers valuable insights for designers, product managers, and anyone interested in creating digital experiences that feel natural and effortless to users. Whether you're working on consumer apps or complex enterprise software, you'll walk away with practical approaches to making your design fade into the background while your content and functionality take center stage.</p>
  `,
  chapters: [
    { title: "Introduction and guest backgrounds", timestamp: "00:00" },
    { title: "What makes design 'invisible'?", timestamp: "04:32" },
    {
      title: "Case study: Redesigning a banking interface",
      timestamp: "15:27",
    },
    { title: "Testing for design invisibility", timestamp: "26:14" },
    { title: "Balancing brand and invisibility", timestamp: "33:50" },
    { title: "Closing thoughts and resources", timestamp: "38:22" },
  ],
  tags: [
    "UX Design",
    "Product Development",
    "User Research",
    "Interface Design",
  ],
  relatedPodcasts: [
    {
      id: 2,
      title: "Design Systems That Scale: Beyond the Style Guide",
      excerpt:
        "How to build and maintain design systems that grow with your product and organization.",
      category: "Design Systems",
      duration: "38:45",
      date: "Apr 15, 2023",
      episodeNumber: 11,
      season: 2,
      slug: "design-systems-that-scale",
    },
    {
      id: 3,
      title: "The Psychology of User Onboarding",
      excerpt:
        "Understanding the cognitive aspects of introducing users to your product effectively.",
      category: "UX Psychology",
      duration: "45:18",
      date: "Mar 22, 2023",
      episodeNumber: 10,
      season: 2,
      slug: "psychology-of-user-onboarding",
    },
  ],
};

export default function PodcastPost({ params }: { params: { slug: string } }) {
  // We're using the slug parameter here to log it, which prevents the unused variable error
  // In a real app, you would use it to fetch the specific podcast data
  useEffect(() => {
    console.log(`Loading podcast with slug: ${params.slug}`);
  }, [params.slug]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"],
  });

  // Animation values for progress effects
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  // Handle scroll for sticky effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);

    // Update active chapter based on current time
    const chapterIndex = podcast.chapters.findIndex((chapter, index) => {
      const currentSeconds = audioRef.current?.currentTime || 0;
      const chapterSeconds = convertTimestampToSeconds(chapter.timestamp);
      const nextChapterSeconds = podcast.chapters[index + 1]
        ? convertTimestampToSeconds(podcast.chapters[index + 1].timestamp)
        : Infinity;

      return (
        currentSeconds >= chapterSeconds && currentSeconds < nextChapterSeconds
      );
    });

    if (chapterIndex !== -1) {
      setActiveChapter(chapterIndex);
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const convertTimestampToSeconds = (timestamp: string) => {
    const [minutes, seconds] = timestamp.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const seekToTime = (timestamp: string) => {
    if (!audioRef.current) return;
    const seconds = convertTimestampToSeconds(timestamp);
    audioRef.current.currentTime = seconds;
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <main className='min-h-screen bg-white text-[#1A322A]'>
      {/* Reading Progress Bar */}
      <div
        className={`fixed top-[80px] left-0 right-0 h-1 bg-gray-100 z-40 ${
          isScrolled ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <motion.div
          className='h-full bg-[#BFE06B]'
          style={{ width: progressWidth }}
        />
      </div>

      {/* Audio player that stays fixed at the bottom when scrolled past */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-40 transition-transform duration-300 ${
          isScrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className='container mx-auto px-6 py-3'>
          <div className='flex items-center gap-4'>
            <button
              className='w-10 h-10 flex items-center justify-center bg-[#1A322A] text-white rounded-full shrink-0'
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect x='6' y='4' width='4' height='16' fill='currentColor' />
                  <rect
                    x='14'
                    y='4'
                    width='4'
                    height='16'
                    fill='currentColor'
                  />
                </svg>
              ) : (
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5 3L19 12L5 21V3Z' fill='currentColor' />
                </svg>
              )}
            </button>

            <div className='flex-1'>
              <div className='flex justify-between text-xs text-gray-500 mb-1'>
                <span>{formatTime(currentTime)}</span>
                <span>{podcast.duration}</span>
              </div>
              <div className='w-full bg-gray-200 h-1 rounded-full overflow-hidden'>
                <div
                  className='bg-[#BFE06B] h-full rounded-full'
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className='hidden md:block shrink-0'>
              <span className='text-sm font-medium truncate max-w-[200px] inline-block'>
                {podcast.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className='relative bg-linear-to-b from-[#1A322A] to-[#2F3779] pt-10 pb-16'>
        <audio
          ref={audioRef}
          src={podcast.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className='hidden'
        />

        <div className='container mx-auto px-6 relative z-20'>
          {/* Back button and category */}
          <div className='flex justify-between items-center mb-10'>
            <Link
              href='/savvy-hub'
              className='inline-flex items-center text-white/90 hover:text-white transition-colors duration-300 group'
            >
              <svg
                className='w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300'
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

            <span className='bg-white/20 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-full'>
              {podcast.category}
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-12 gap-10 items-center'>
            {/* Podcast Cover Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className='md:col-span-4 flex justify-center'
            >
              <div className='w-64 h-64 md:w-full md:h-auto max-w-xs aspect-square bg-[#F7F3E9]/10 rounded-xl overflow-hidden shadow-lg'>
                <div className="relative w-full h-full bg-[url('/images/podcast-placeholder-1.jpg')] bg-cover bg-center">
                  <div className='absolute inset-0 bg-linear-to-b from-black/30 to-transparent'></div>
                  <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1A322A] text-xs font-medium px-2 py-1 rounded-md'>
                    S{podcast.season} · E{podcast.episodeNumber}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Podcast Info */}
            <div className='md:col-span-8 text-white'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className='space-y-4'
              >
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight leading-tight'>
                  {podcast.title}
                </h1>

                <p className='text-white/80 text-lg max-w-2xl'>
                  {podcast.excerpt}
                </p>

                <div className='flex flex-wrap items-center text-white/80 space-x-4'>
                  <span>{podcast.date}</span>
                  <span className='w-1 h-1 rounded-full bg-white/50'></span>
                  <span>{podcast.duration}</span>
                </div>

                <div className='pt-4'>
                  <h4 className='text-white/90 mb-2 text-sm'>Featuring</h4>
                  <div className='flex flex-wrap gap-4'>
                    {podcast.guests.map((guest, index) => (
                      <div key={index} className='flex items-center space-x-2'>
                        <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
                          <span className='text-white text-xs'>
                            {guest.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className='text-white text-sm font-medium'>
                            {guest.name}
                          </div>
                          <div className='text-white/70 text-xs'>
                            {guest.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='pt-6'>
                  <button
                    onClick={togglePlay}
                    className='inline-flex items-center px-6 py-3 bg-[#BFE06B] text-[#1A322A] rounded-full font-medium hover:bg-[#BFE06B]/90 transition-colors duration-300'
                  >
                    {isPlaying ? (
                      <>
                        <svg
                          className='w-5 h-5 mr-2'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <rect
                            x='6'
                            y='4'
                            width='4'
                            height='16'
                            fill='currentColor'
                          />
                          <rect
                            x='14'
                            y='4'
                            width='4'
                            height='16'
                            fill='currentColor'
                          />
                        </svg>
                        Pause Episode
                      </>
                    ) : (
                      <>
                        <svg
                          className='w-5 h-5 mr-2'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M5 3L19 12L5 21V3Z' fill='currentColor' />
                        </svg>
                        Play Episode
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Content */}
      <section ref={contentRef} className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-12 gap-8'>
            {/* Social sharing sidebar - visible on desktop */}
            <div className='hidden lg:block lg:col-span-1'>
              <div className='sticky top-[120px] flex flex-col space-y-4'>
                <button
                  className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#BFE06B]/20 transition-colors duration-300'
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
                  className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#BFE06B]/20 transition-colors duration-300'
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
                  className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#BFE06B]/20 transition-colors duration-300'
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
            <div className='col-span-12 lg:col-span-8'>
              {/* Chapter markers */}
              <div className='mb-10 bg-[#F7F3E9]/30 rounded-xl p-6'>
                <h3 className='text-xl font-display font-medium text-[#1A322A] mb-4'>
                  Episode Chapters
                </h3>
                <div className='space-y-3'>
                  {podcast.chapters.map((chapter, index) => (
                    <button
                      key={index}
                      onClick={() => seekToTime(chapter.timestamp)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors duration-300 ${
                        activeChapter === index
                          ? "bg-[#BFE06B]/20 text-[#1A322A]"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className='flex items-center'>
                        <span className='w-6 text-sm text-gray-500'>
                          {index + 1}.
                        </span>
                        <span
                          className={
                            activeChapter === index ? "font-medium" : ""
                          }
                        >
                          {chapter.title}
                        </span>
                      </div>
                      <span className='text-sm text-gray-500'>
                        {chapter.timestamp}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='prose prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-[#1A322A] prose-p:text-gray-700 prose-a:text-[#2F3779] prose-a:no-underline hover:prose-a:text-[#2F3779]/80'
                dangerouslySetInnerHTML={{ __html: podcast.description }}
              />

              {/* Tags */}
              <div className='mt-12 pt-6 border-t border-gray-200'>
                <h4 className='text-sm uppercase text-gray-500 tracking-wider mb-4'>
                  Tags
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {podcast.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-gray-100 hover:bg-[#BFE06B]/20 text-[#1A322A] rounded-full text-sm transition-colors duration-300 cursor-pointer'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Host bio */}
              <div className='mt-12 pt-6 border-t border-gray-200'>
                <h4 className='text-lg font-display font-medium text-[#1A322A] mb-4'>
                  About the Host
                </h4>
                <div className='flex items-start gap-6'>
                  <div className='w-16 h-16 rounded-full bg-[#1A322A]/10 flex items-center justify-center overflow-hidden shrink-0'>
                    <span className='text-[#1A322A] text-xl'>SL</span>
                  </div>
                  <div>
                    <h4 className='text-xl font-display font-medium text-[#1A322A] mb-2'>
                      {podcast.host.name}
                    </h4>
                    <p className='text-sm text-gray-500 mb-3'>
                      {podcast.host.role}
                    </p>
                    <p className='text-gray-700'>
                      With a background in both design and business strategy,
                      Sophia brings a unique perspective to each conversation,
                      helping to bridge the gap between creative excellence and
                      strategic outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related content sidebar */}
            <div className='hidden lg:block lg:col-span-3'>
              <div className='sticky top-[120px]'>
                <h4 className='text-lg font-display font-medium text-[#1A322A] mb-6'>
                  Related Episodes
                </h4>
                <div className='space-y-6'>
                  {podcast.relatedPodcasts.map((relatedPodcast) => (
                    <Link
                      key={relatedPodcast.id}
                      href={`/savvy-hub/podcast/${relatedPodcast.slug}`}
                      className='group block'
                    >
                      <span className='text-xs text-[#2F3779] mb-1 block'>
                        S{relatedPodcast.season} · E
                        {relatedPodcast.episodeNumber} ·{" "}
                        {relatedPodcast.category}
                      </span>
                      <h5 className='text-base font-medium text-[#1A322A] group-hover:text-[#2F3779] transition-colors duration-300 mb-1 leading-tight'>
                        {relatedPodcast.title}
                      </h5>
                      <div className='flex items-center text-xs text-gray-500'>
                        <span>{relatedPodcast.date}</span>
                        <span className='mx-2 w-1 h-1 rounded-full bg-gray-300'></span>
                        <span>{relatedPodcast.duration}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className='bg-[#F7F3E9]/50 p-6 rounded-xl mt-8'>
                  <h4 className='text-lg font-display font-medium text-[#1A322A] mb-4'>
                    Subscribe to the Podcast
                  </h4>
                  <p className='text-sm text-gray-600 mb-4'>
                    Never miss an episode of our conversations with industry
                    leaders and Ghost Savvy experts.
                  </p>
                  <div className='space-y-3'>
                    <a
                      href='#'
                      className='flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      <span className='text-[#1A322A]'>Apple Podcasts</span>
                      <svg
                        className='w-5 h-5 text-gray-400'
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
                    <a
                      href='#'
                      className='flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      <span className='text-[#1A322A]'>Spotify</span>
                      <svg
                        className='w-5 h-5 text-gray-400'
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
                    <a
                      href='#'
                      className='flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      <span className='text-[#1A322A]'>Google Podcasts</span>
                      <svg
                        className='w-5 h-5 text-gray-400'
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
                    <a
                      href='#'
                      className='flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      <span className='text-[#1A322A]'>RSS Feed</span>
                      <svg
                        className='w-5 h-5 text-gray-400'
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next/Previous Navigation */}
      <section className='py-16 bg-[#F7F3E9]/30'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <Link
              href='/savvy-hub/podcast/psychology-of-user-onboarding'
              className='group flex flex-col p-8 bg-white rounded-xl shadow-xs hover:shadow-md transition-shadow duration-300'
            >
              <span className='text-sm text-[#2F3779] mb-2'>Previous</span>
              <h3 className='text-xl font-display font-medium text-[#1A322A] group-hover:text-[#2F3779] transition-colors duration-300 mb-2'>
                The Psychology of User Onboarding
              </h3>
              <div className='flex items-center text-sm text-gray-500'>
                <span>S2 · E10</span>
                <span className='mx-2 w-1 h-1 rounded-full bg-gray-300'></span>
                <span>45:18</span>
              </div>
            </Link>

            <Link
              href='/savvy-hub/podcast/design-systems-that-scale'
              className='group flex flex-col p-8 bg-white rounded-xl shadow-xs hover:shadow-md transition-shadow duration-300'
            >
              <span className='text-sm text-[#2F3779] mb-2'>Next</span>
              <h3 className='text-xl font-display font-medium text-[#1A322A] group-hover:text-[#2F3779] transition-colors duration-300 mb-2'>
                Design Systems That Scale: Beyond the Style Guide
              </h3>
              <div className='flex items-center text-sm text-gray-500'>
                <span>S2 · E11</span>
                <span className='mx-2 w-1 h-1 rounded-full bg-gray-300'></span>
                <span>38:45</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
