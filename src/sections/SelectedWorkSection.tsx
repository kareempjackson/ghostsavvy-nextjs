"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Project card data
const projects = [
  {
    title: "Evoke App",
    category: "Mobile Design + Development",
    description:
      "A meditation app using biometric feedback to personalize mindfulness practices.",
    imageUrl: "/images/projects/project-1.webp",
    slug: "/savvy-impact/evoke-app",
  },
  {
    title: "Zenith Dashboard",
    category: "SaaS Platform UI/UX",
    description:
      "Enterprise analytics dashboard for financial technology firm serving Fortune 500 clients.",
    imageUrl: "/images/projects/project-2.webp",
    slug: "/savvy-impact/zenith-dashboard",
  },
  {
    title: "Motive Health",
    category: "Brand Identity + Website",
    description:
      "Complete brand identity and marketing site for innovative healthcare startup.",
    imageUrl: "/images/projects/project-3.webp",
    slug: "/savvy-impact/motive-health",
  },
];

const SelectedWorkSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  return (
    <section ref={sectionRef} className='section bg-brand-ivory'>
      <div className='container-custom'>
        <div className='max-w-3xl mx-auto mb-16 text-center'>
          <motion.h2 variants={titleVariants} className='mb-6'>
            Selected Work
          </motion.h2>
          <motion.p
            variants={textVariants}
            className='text-brand-forest/70 max-w-xl'
          >
            We&apos;ve collaborated with forward-thinking clients to create
            digital products that solve real problems and deliver measurable
            results.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? "visible" : "hidden"}
          className='grid grid-cols-1 md:grid-cols-3 gap-8'
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants} className='group'>
              <Link href={project.slug} className='block'>
                <div className='relative aspect-[4/3] mb-5 overflow-hidden rounded-xl subtle-shadow'>
                  <div className='absolute inset-0 bg-brand-forest opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10'></div>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                </div>
                <div className='transform group-hover:translate-x-2 transition-transform duration-300'>
                  <p className='text-brand-sage font-medium text-sm mb-1'>
                    {project.category}
                  </p>
                  <h3 className='mb-2'>{project.title}</h3>
                  <p className='text-brand-forest/70 text-base'>
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWorkSection;
