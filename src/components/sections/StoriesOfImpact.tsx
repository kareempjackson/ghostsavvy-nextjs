"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface StoryCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const StoryCard = ({ title, description, image, link }: StoryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className='relative group'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={link} className='block'>
        <div className='relative h-[400px] overflow-hidden rounded-2xl'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 p-8'>
            <h3 className='text-2xl font-display text-white mb-4'>{title}</h3>
            <p className='text-white/90'>{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const StoriesOfImpact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 0]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const stories = [
    {
      title: "Transforming Healthcare",
      description:
        "Revolutionizing patient care through innovative digital solutions",
      image: "/images/healthcare-impact.jpg",
      link: "/stories/healthcare",
    },
    {
      title: "Empowering Education",
      description: "Bridging the digital divide in underserved communities",
      image: "/images/education-impact.jpg",
      link: "/stories/education",
    },
    {
      title: "Sustainable Future",
      description: "Building eco-friendly solutions for a better tomorrow",
      image: "/images/sustainability-impact.jpg",
      link: "/stories/sustainability",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className='relative py-32 bg-black overflow-hidden'
    >
      {/* Animated background elements */}
      <motion.div
        className='absolute inset-0 opacity-10'
        style={{
          background:
            "radial-gradient(circle at center, #00ff9d 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />

      <div className='container mx-auto px-4'>
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className='text-center mb-20'
        >
          <h2 className='text-4xl md:text-5xl font-display text-white mb-6'>
            Stories of Impact
          </h2>
          <p className='text-xl text-white/80 max-w-2xl mx-auto'>
            Discover how our digital solutions are making a real difference in
            people&apos;s lives
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {stories.map((story) => (
            <StoryCard key={story.title} {...story} />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity }}
          className='text-center mt-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href='/stories'
            className='inline-block px-8 py-3 bg-[#00ff9d] text-black hover:bg-[#00ff9d]/90 rounded-full transition-colors duration-300 font-display tracking-wider'
          >
            View All Stories
            <span className='ml-2'>→</span>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className='absolute top-1/4 left-[15%] w-32 h-32 rounded-full opacity-5 bg-[#00ff9d]'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className='absolute bottom-1/4 right-[15%] w-24 h-24 rounded-full opacity-5 bg-[#00ff9d]'
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
};

export default StoriesOfImpact;
