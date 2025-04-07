"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Mock project data - in a real application you would import this from a data source
const projects = [
  {
    id: "healthcare-connect",
    title: "Healthcare Connect Platform",
    subtitle: "Using technology to reimagine patient care delivery",
    description:
      "A patient-centered healthcare platform that revolutionizes communication between patients and providers.",
    fullDescription:
      "The Healthcare Connect Platform addresses the critical challenge of fragmented communication in healthcare settings. By creating a unified digital ecosystem, we've enabled seamless interaction between patients, providers, and care teams. Using human-centered design principles, we developed intuitive interfaces that work for users of all technical abilities, while our engineering team built robust backend systems that integrate securely with existing healthcare infrastructure.",
    challenge:
      "Healthcare communication is fragmented across multiple channels, leading to patient confusion, provider burnout, and inefficient care delivery.",
    approach:
      "We conducted extensive ethnographic research with both patients and providers to identify pain points and opportunities. Our design team created and tested multiple prototypes with diverse user groups before finalizing a solution that works across devices and accessibility needs.",
    results:
      "The platform has achieved a 94% patient satisfaction rate, reduced provider documentation time by 32%, and improved care coordination metrics across implementing healthcare systems.",
    image: "/images/projects/healthcare-case.jpg",
    heroImage: "/images/projects/healthcare-hero.jpg",
    additionalImages: [
      "/images/projects/healthcare-detail-1.jpg",
      "/images/projects/healthcare-detail-2.jpg",
      "/images/projects/healthcare-detail-3.jpg",
    ],
    impactMetrics: [
      { value: "94%", label: "Patient Satisfaction" },
      { value: "32%", label: "Time Saved" },
      { value: "3.8x", label: "ROI" },
    ],
    category: "healthcare",
    date: "3/15/2024",
    tags: ["Healthcare", "UX Design", "Mobile App"],
    stats: "94% patient satisfaction increase",
    metaTitle: "Healthcare Connect Platform | Savvy Impact",
    metaDescription:
      "A patient-centered healthcare platform focusing on seamless communication between patients and providers.",
    team: [
      { name: "Sarah Johnson", role: "Lead Designer" },
      { name: "Michael Chen", role: "Technical Architect" },
      { name: "Aisha Patel", role: "User Researcher" },
    ],
    relatedProjects: ["telehealth-solution", "education-platform"],
    testimonial: {
      quote:
        "The Healthcare Connect Platform has transformed how we deliver care. Our team is more efficient and our patients feel more connected than ever before.",
      author: "Dr. Maya Rodriguez",
      role: "Chief Medical Officer, Northwest Health",
    },
  },
  {
    id: "eco-marketplace",
    title: "Sustainable Marketplace",
    subtitle: "A Charter Network Writes Its Next Chapter",
    description:
      "An e-commerce platform for eco-friendly products with integrated carbon footprint tracking.",
    image: "/images/projects/sustainability-case.jpg",
    category: "sustainability",
    date: "2/12/2024",
    tags: ["Sustainability", "E-commerce"],
    stats: "120k tons CO₂ offset annually",
  },
  {
    id: "financial-wellness",
    title: "Financial Wellness App",
    subtitle: "Redefining Personal Finance Management",
    description:
      "A personal finance tool that focuses on long-term financial health and education.",
    image: "/images/projects/finance-case.jpg",
    category: "fintech",
    date: "1/8/2024",
    tags: ["Financial Services", "Mobile App"],
    stats: "$1.2M average user savings",
  },
  {
    id: "education-platform",
    title: "Adaptive Learning System",
    subtitle: "Personalized Education for the Digital Age",
    description:
      "Personalized education platform that adapts to individual learning styles and needs.",
    image: "/images/projects/education-case.jpg",
    category: "education",
    date: "12/15/2023",
    tags: ["Education", "ML/AI", "User Experience"],
    stats: "32% improvement in learning outcomes",
  },
  {
    id: "telehealth-solution",
    title: "Rural Telehealth Solution",
    subtitle: "Connecting Underserved Communities to Quality Healthcare",
    description:
      "Connecting underserved communities with quality healthcare through low-bandwidth telehealth.",
    image: "/images/projects/telehealth-case.jpg",
    category: "healthcare",
    date: "11/5/2023",
    tags: ["Healthcare", "Accessibility"],
    stats: "Healthcare access for 500k+ rural patients",
  },
  {
    id: "carbon-tracker",
    title: "Enterprise Carbon Tracker",
    subtitle: "A Climate Era Road Map for Industry",
    description:
      "Helping organizations track, report, and reduce their carbon footprint with actionable insights.",
    image: "/images/projects/carbon-case.jpg",
    category: "sustainability",
    date: "10/3/2023",
    tags: ["Sustainability", "Enterprise"],
    stats: "Average 28% emissions reduction",
  },
];

// Get project by slug
function getProjectBySlug(slug: string) {
  return projects.find((project) => project.id === slug);
}

// Get related projects
function getRelatedProjects(currentProjectId: string) {
  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  );

  if (!currentProject || !currentProject.relatedProjects) {
    // If no related projects specified, return projects in same category
    const category = currentProject?.category;
    return projects
      .filter(
        (project) =>
          project.id !== currentProjectId && project.category === category
      )
      .slice(0, 3);
  }

  // Return specified related projects
  return projects.filter((project) =>
    currentProject.relatedProjects?.includes(project.id)
  );
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const project = getProjectBySlug(slug);
  const relatedProjects = project ? getRelatedProjects(project.id) : [];

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const isOverviewInView = useInView(overviewRef, { once: true, amount: 0.3 });
  const isApproachInView = useInView(approachRef, { once: true, amount: 0.3 });
  const isTestimonialInView = useInView(testimonialRef, {
    once: true,
    amount: 0.6,
  });
  const isResultsInView = useInView(resultsRef, { once: true, amount: 0.4 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>Project Not Found</h1>
          <p className='mb-8 text-gray-600'>
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href='/savvy-impact'
            className='px-8 py-3 bg-black text-white inline-block hover:bg-gray-800 transition-colors'
          >
            Back to Our Work
          </Link>
        </div>
      </div>
    );
  }

  // Function to determine tag color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "healthcare":
        return "bg-indigo-100 text-indigo-800";
      case "sustainability":
        return "bg-emerald-100 text-emerald-800";
      case "fintech":
        return "bg-blue-100 text-blue-800";
      case "education":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tagColor = getCategoryColor(project.category);

  return (
    <main className='bg-white'>
      {/* Sticky navigation */}
      <div className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4'>
        <div className='container mx-auto px-6 flex justify-between items-center'>
          <Link
            href='/savvy-impact'
            className='inline-flex items-center text-gray-500 hover:text-black transition-colors group'
          >
            <svg
              className='w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M19 12H5M5 12L12 19M5 12L12 5' />
            </svg>
            Back to Our Work
          </Link>

          <div className='flex space-x-8 text-sm'>
            <a href='#overview' className='hover:text-indigo-600 font-medium'>
              Overview
            </a>
            <a href='#approach' className='hover:text-indigo-600 font-medium'>
              Approach
            </a>
            <a href='#results' className='hover:text-indigo-600 font-medium'>
              Results
            </a>
          </div>
        </div>
      </div>

      {/* Hero section with parallax */}
      <div ref={heroRef} className='relative min-h-[80vh] overflow-hidden'>
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className='absolute inset-0 z-0'
        >
          <Image
            src={project.heroImage || project.image}
            alt={project.title}
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent'></div>
        </motion.div>

        <div className='container mx-auto px-6 py-32 relative z-10 h-full flex items-center'>
          <motion.div className='max-w-3xl text-white' style={{ y: heroTextY }}>
            <div className='mb-6'>
              <span
                className={`inline-block px-3 py-1 ${tagColor} text-xs font-medium`}
              >
                {project.category.charAt(0).toUpperCase() +
                  project.category.slice(1)}
              </span>
            </div>
            <h1 className='text-5xl md:text-6xl font-bold mb-6 [text-shadow:_0_1px_20px_rgb(0_0_0_/_40%)]'>
              {project.title}
            </h1>
            <p className='text-xl text-white/90 mb-8 max-w-xl [text-shadow:_0_1px_10px_rgb(0_0_0_/_40%)]'>
              {project.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Overview section */}
      <div id='overview' ref={overviewRef} className='w-full py-24'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className='sticky top-32'>
                <h2 className='text-3xl font-bold mb-8 flex items-center'>
                  <span className='w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 mr-4 text-xl'>
                    1
                  </span>
                  Overview
                </h2>
                <p className='text-lg text-gray-700 mb-10 leading-relaxed'>
                  {project.description}
                </p>

                <div className='mt-16'>
                  <h3 className='text-xl font-bold mb-6'>Project Details</h3>
                  <div className='space-y-4'>
                    <div className='flex border-b border-gray-100 pb-4'>
                      <span className='text-gray-500 w-1/3'>Category</span>
                      <span className='font-medium'>
                        {project.category.charAt(0).toUpperCase() +
                          project.category.slice(1)}
                      </span>
                    </div>
                    <div className='flex border-b border-gray-100 pb-4'>
                      <span className='text-gray-500 w-1/3'>Date</span>
                      <span className='font-medium'>{project.date}</span>
                    </div>
                    <div className='flex border-b border-gray-100 pb-4'>
                      <span className='text-gray-500 w-1/3'>Tags</span>
                      <div className='flex flex-wrap gap-2'>
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className='text-xs bg-gray-50 text-gray-700 px-3 py-1'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className='relative aspect-[4/3] mb-8 overflow-hidden'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover'
                />
              </div>

              {project.fullDescription && (
                <div className='bg-gray-50 p-8'>
                  <p className='text-gray-700 leading-relaxed'>
                    {project.fullDescription}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Challenge and approach section */}
      {(project.challenge || project.approach) && (
        <div
          id='approach'
          ref={approachRef}
          className='w-full py-24 bg-gray-50'
        >
          <div className='container mx-auto px-6'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className='max-w-3xl mx-auto text-center mb-16'
            >
              <h2 className='text-3xl font-bold mb-6 flex items-center justify-center'>
                <span className='w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 mr-4 text-xl'>
                  2
                </span>
                Our Approach
              </h2>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {project.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className='bg-white p-8 border-b border-gray-200'
                >
                  <h3 className='text-xl font-bold mb-4 text-indigo-600'>
                    The Challenge
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {project.challenge}
                  </p>
                </motion.div>
              )}

              {project.approach && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className='bg-white p-8 border-b border-gray-200'
                >
                  <h3 className='text-xl font-bold mb-4 text-indigo-600'>
                    Our Solution
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {project.approach}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Additional images grid */}
            {project.additionalImages &&
              project.additionalImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-6'
                >
                  {project.additionalImages.map((img, idx) => (
                    <div
                      key={idx}
                      className='relative aspect-[1/1] overflow-hidden'
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Detail ${idx + 1}`}
                        fill
                        className='object-cover hover:scale-105 transition-transform duration-700'
                      />
                    </div>
                  ))}
                </motion.div>
              )}
          </div>
        </div>
      )}

      {/* Testimonial section */}
      {project.testimonial && (
        <div
          ref={testimonialRef}
          className='w-full py-28 bg-indigo-700 text-white'
        >
          <div className='container mx-auto px-6'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isTestimonialInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className='max-w-4xl mx-auto text-center'
            >
              <svg
                className='w-12 h-12 mx-auto mb-8 text-indigo-300'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
              </svg>
              <p className='text-2xl md:text-3xl font-medium mb-10 italic'>
                &quot;{project.testimonial.quote}&quot;
              </p>
              <div>
                <p className='font-bold text-lg'>
                  {project.testimonial.author}
                </p>
                <p className='text-indigo-200'>{project.testimonial.role}</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Results and impact section */}
      {project.results && (
        <div id='results' ref={resultsRef} className='w-full py-24'>
          <div className='container mx-auto px-6'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className='max-w-3xl mx-auto text-center mb-16'
            >
              <h2 className='text-3xl font-bold mb-6 flex items-center justify-center'>
                <span className='w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 mr-4 text-xl'>
                  3
                </span>
                Results & Impact
              </h2>
            </motion.div>

            {project.impactMetrics && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'
              >
                {project.impactMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className='bg-gray-50 p-8 text-center border-l-2 border-indigo-100'
                  >
                    <span className='block text-4xl font-bold text-indigo-600 mb-2'>
                      {metric.value}
                    </span>
                    <span className='block text-gray-500'>{metric.label}</span>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='bg-indigo-50 p-8 md:p-12'
            >
              <div className='max-w-3xl mx-auto'>
                <h3 className='text-xl font-bold mb-6 text-indigo-700'>
                  Key Outcomes
                </h3>
                <p className='text-gray-700 leading-relaxed mb-8'>
                  {project.results}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Team section (if exists) */}
      {project.team && (
        <div className='w-full py-24 bg-gray-50'>
          <div className='container mx-auto px-6'>
            <h2 className='text-3xl font-bold mb-12 text-center'>
              Project Team
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-4xl mx-auto'>
              {project.team.map((member, idx) => (
                <motion.div
                  key={idx}
                  className='text-center bg-white p-6 border-b border-gray-200'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='w-20 h-20 mx-auto mb-4 bg-indigo-100 flex items-center justify-center'>
                    <span className='text-2xl text-indigo-600 font-bold'>
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className='font-bold'>{member.name}</h3>
                  <p className='text-gray-600'>{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div className='w-full py-24'>
          <div className='container mx-auto px-6'>
            <h2 className='text-3xl font-bold mb-12 text-center'>
              Related Work
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {relatedProjects.map((relatedProject, idx) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Link
                    href={`/savvy-impact/project/${relatedProject.id}`}
                    className='block group'
                  >
                    <div className='relative aspect-[4/3] mb-4 overflow-hidden'>
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </div>
                    <h3 className='text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors'>
                      {relatedProject.title}
                    </h3>
                    <p className='text-gray-600 mb-3'>
                      {relatedProject.subtitle}
                    </p>
                    <div className='flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <span className='font-medium mr-2'>View project</span>
                      <span className='transform transition-transform duration-300 group-hover:translate-x-2'>
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA section */}
      <div className='w-full py-32 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white'>
        <div className='container mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              Ready to create your own impact?
            </h2>
            <p className='text-xl text-indigo-200 max-w-2xl mx-auto mb-12'>
              Let&apos;s collaborate on solutions that drive meaningful change
              and deliver exceptional results.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-indigo-700 hover:bg-indigo-50 transition-colors group'
            >
              <span>Start a conversation</span>
              <svg
                className='ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1'
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
          </motion.div>
        </div>
      </div>
    </main>
  );
}
