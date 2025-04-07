"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  visionProjects,
  engineeringProjects,
} from "@/sections/impact/projectData";
import { Project } from "@/types/projects";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

// Mock case study data - for a real implementation, this would come from a CMS or API
interface CaseStudy extends Project {
  client: string;
  duration: string;
  year: string;
  team: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
  objectives: string[];
  process: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
  metrics: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    image?: string;
  }>;
  designArtifacts: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  techStack: string[];
  nextProject?: {
    id: string;
    title: string;
    image: string;
  };
}

// Function to convert a regular project to a case study by adding mock data
function projectToCaseStudy(project: Project): CaseStudy {
  return {
    ...project,
    client: "Client Name",
    duration: "12 weeks",
    year: "2023",
    team: [
      { name: "Alex Johnson", role: "Project Lead" },
      { name: "Morgan Smith", role: "UX Designer" },
      { name: "Taylor Brown", role: "Developer" },
    ],
    objectives: [
      "Increase user engagement by 30%",
      "Streamline the onboarding process",
      "Enhance overall user experience",
      "Improve accessibility to meet WCAG 2.1 AA standards",
    ],
    process: [
      {
        title: "Discovery & Research",
        description:
          "We conducted extensive user research, including interviews with 15 target users, competitive analysis, and heuristic evaluations to identify pain points and opportunities.",
        image: "/images/case-studies/research.jpg",
      },
      {
        title: "Strategy & Planning",
        description:
          "Based on research findings, we developed a comprehensive strategy focusing on key user journeys and business objectives. We created user personas and journey maps to guide our design decisions.",
        image: "/images/case-studies/strategy.jpg",
      },
      {
        title: "Design & Prototyping",
        description:
          "Through collaborative design workshops, we created wireframes, iterative prototypes, and comprehensive design systems that aligned with the client's brand while prioritizing usability.",
        image: "/images/case-studies/design.jpg",
      },
      {
        title: "Development & Testing",
        description:
          "Our development approach focused on creating a scalable, maintainable codebase with comprehensive testing at each stage. We conducted usability testing with real users to refine the experience.",
        image: "/images/case-studies/development.jpg",
      },
    ],
    metrics: [
      {
        label: "Engagement",
        value: "+45%",
        description: "Increase in user engagement",
      },
      {
        label: "Conversions",
        value: "+32%",
        description: "Improvement in conversion rate",
      },
      {
        label: "Retention",
        value: "+28%",
        description: "Boost in user retention",
      },
      { label: "Satisfaction", value: "92", description: "Net Promoter Score" },
    ],
    testimonials: [
      {
        quote:
          "The team at Ghost Savvy Studios transformed our vision into reality. Their attention to detail and user-focused approach resulted in a product that exceeded our expectations.",
        author: "Jamie Williams",
        role: "CEO",
        company: "TechVision Inc.",
        image: "/images/testimonials/jamie.jpg",
      },
    ],
    designArtifacts: [
      {
        title: "Design System",
        description:
          "We created a comprehensive design system to ensure consistency across all touchpoints and enable easier future development.",
        image: "/images/case-studies/design-system.jpg",
      },
      {
        title: "User Flow Diagram",
        description:
          "Detailed user flow diagrams helped us visualize and optimize the user journey from start to finish.",
        image: "/images/case-studies/user-flow.jpg",
      },
    ],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    nextProject: {
      id: project.id === "savvy-wellness" ? "artbot-gallery" : "savvy-wellness",
      title:
        project.id === "savvy-wellness" ? "ArtBot Gallery" : "Savvy Wellness",
      image:
        project.id === "savvy-wellness"
          ? "/images/projects/artbot.jpg"
          : "/images/projects/wellness.jpg",
    },
  };
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: entryEasing }}
    >
      {children}
    </motion.div>
  );
}

// Get base project data by slug
function getProjectBySlug(slug: string): Project | null {
  const allProjects = [...visionProjects, ...engineeringProjects];
  return allProjects.find((project) => project.id === slug) || null;
}

export default function CaseStudyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const baseProject = getProjectBySlug(slug);

  // Move all hooks to the top level, outside of any conditions
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [slug]);

  // Exit early if project not found
  if (!baseProject) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-brand-black text-brand-white'>
        <div className='text-center'>
          <h1 className='text-3xl mb-4'>Case Study Not Found</h1>
          <p className='mb-8'>
            The case study you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href='/savvy-impact'
            className='px-6 py-3 bg-brand-sage text-brand-black rounded-[4px] inline-block hover:bg-brand-sage/90 transition-colors'
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Convert project to case study with additional data
  const caseStudy = projectToCaseStudy(baseProject);

  // Determine accent colors - use project accent color or default to brand colors
  const accentColor =
    caseStudy.accentColor ||
    (caseStudy.category === "vision" ? "bg-brand-sage" : "bg-brand-forest");
  const textAccentColor =
    caseStudy.accentColor ||
    (caseStudy.category === "vision" ? "text-brand-sage" : "text-brand-forest");

  return (
    <main className='bg-brand-white overflow-hidden'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='min-h-[80vh] relative overflow-hidden bg-brand-black flex items-center'
      >
        {/* Background with parallax */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-b from-brand-black/90 to-brand-black/75 z-10'></div>

          {/* Background image */}
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${caseStudy.image})` }}
          ></div>
        </motion.div>

        {/* Content */}
        <div className='container mx-auto px-6 py-28 relative z-20'>
          <div className='max-w-4xl'>
            <motion.div style={{ y: heroTextY }}>
              <Link
                href='/savvy-impact'
                className='inline-flex items-center text-brand-white/70 hover:text-brand-white transition-colors mb-8 group'
              >
                <svg
                  className='w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M19 12H5M5 12L12 19M5 12L12 5' />
                </svg>
                Back to Portfolio
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: entryEasing }}
                className='mb-6'
              >
                <div className='flex flex-wrap gap-3 mb-6'>
                  {caseStudy.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className='text-brand-white/90 text-sm px-4 py-1.5 rounded-[4px] bg-brand-white/10'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: entryEasing }}
                className='text-5xl md:text-7xl text-brand-white leading-tight tracking-[-0.5px] mb-8'
              >
                {caseStudy.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: entryEasing }}
                className='text-xl md:text-2xl text-brand-white/80 leading-[1.5] max-w-2xl mb-8'
              >
                {caseStudy.shortDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: entryEasing }}
                className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mt-12'
              >
                <div>
                  <h3 className='text-brand-white/60 text-sm uppercase tracking-wider mb-2'>
                    Client
                  </h3>
                  <p className='text-brand-white text-xl'>{caseStudy.client}</p>
                </div>
                <div>
                  <h3 className='text-brand-white/60 text-sm uppercase tracking-wider mb-2'>
                    Duration
                  </h3>
                  <p className='text-brand-white text-xl'>
                    {caseStudy.duration}
                  </p>
                </div>
                <div>
                  <h3 className='text-brand-white/60 text-sm uppercase tracking-wider mb-2'>
                    Year
                  </h3>
                  <p className='text-brand-white text-xl'>{caseStudy.year}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className='py-20 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <FadeIn>
              <div className='mb-16'>
                <span
                  className={`inline-block ${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                >
                  Project Overview
                </span>
                <h2 className='text-3xl md:text-4xl text-brand-black mb-8 tracking-[-0.5px]'>
                  About This Project
                </h2>
                <p className='text-lg text-brand-black/80 leading-[1.7] mb-12'>
                  {caseStudy.longDescription}
                </p>

                <h3 className='text-2xl text-brand-black mb-6 tracking-[-0.5px]'>
                  Key Objectives
                </h3>
                <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12'>
                  {caseStudy.objectives.map((objective, index) => (
                    <li key={index} className='flex items-start'>
                      <div
                        className={`${accentColor} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-3`}
                      >
                        <svg
                          className='w-3 h-3 text-brand-white'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={3}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      </div>
                      <span className='text-brand-black/80 leading-[1.7]'>
                        {objective}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {caseStudy.video && (
              <FadeIn delay={0.2}>
                <div className='mb-16'>
                  <div className='aspect-video relative rounded-[4px] overflow-hidden bg-brand-black'>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='absolute inset-0 w-full h-full object-cover'
                    >
                      <source src={caseStudy.video} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Challenge, Approach, Results Section */}
      <section className='py-20 bg-brand-ivory/50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              <FadeIn delay={0.1}>
                <div>
                  <div
                    className={`w-12 h-12 ${accentColor} flex items-center justify-center rounded-[4px] mb-6`}
                  >
                    <span className='text-brand-white text-xl font-bold'>
                      01
                    </span>
                  </div>
                  <h3 className='text-2xl text-brand-black mb-4 tracking-[-0.5px]'>
                    Challenge
                  </h3>
                  <p className='text-brand-black/80 leading-[1.7]'>
                    {caseStudy.challenge}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div>
                  <div
                    className={`w-12 h-12 ${accentColor} flex items-center justify-center rounded-[4px] mb-6`}
                  >
                    <span className='text-brand-white text-xl font-bold'>
                      02
                    </span>
                  </div>
                  <h3 className='text-2xl text-brand-black mb-4 tracking-[-0.5px]'>
                    Approach
                  </h3>
                  <p className='text-brand-black/80 leading-[1.7]'>
                    {caseStudy.approach}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  <div
                    className={`w-12 h-12 ${accentColor} flex items-center justify-center rounded-[4px] mb-6`}
                  >
                    <span className='text-brand-white text-xl font-bold'>
                      03
                    </span>
                  </div>
                  <h3 className='text-2xl text-brand-black mb-4 tracking-[-0.5px]'>
                    Results
                  </h3>
                  <p className='text-brand-black/80 leading-[1.7]'>
                    {caseStudy.results}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-20 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <FadeIn>
              <div className='text-center mb-16'>
                <span
                  className={`inline-block ${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                >
                  Our Approach
                </span>
                <h2 className='text-3xl md:text-4xl text-brand-black mb-8 tracking-[-0.5px]'>
                  The Process
                </h2>
                <p className='text-lg text-brand-black/80 leading-[1.7] max-w-3xl mx-auto'>
                  We follow a collaborative and iterative process that puts
                  users at the center of everything we do.
                </p>
              </div>
            </FadeIn>

            <div className='space-y-24'>
              {caseStudy.process.map((step, index) => (
                <FadeIn key={index} delay={0.1 * (index + 1)}>
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-12 items-center`}
                  >
                    <div className='w-full md:w-1/2'>
                      <div className='relative aspect-[4/3] rounded-[4px] overflow-hidden bg-brand-ivory'>
                        {step.image ? (
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes='(max-width: 768px) 100vw, 50vw'
                            className='object-cover'
                          />
                        ) : (
                          <div className='absolute inset-0 flex items-center justify-center bg-brand-ivory'>
                            <span className='text-brand-black/30 text-lg'>
                              [Process Image]
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='w-full md:w-1/2'>
                      <div
                        className={`${accentColor} text-brand-white text-sm px-4 py-2 rounded-[4px] inline-block mb-4`}
                      >
                        Step {index + 1}
                      </div>
                      <h3 className='text-2xl md:text-3xl text-brand-black mb-4 tracking-[-0.5px]'>
                        {step.title}
                      </h3>
                      <p className='text-brand-black/80 leading-[1.7]'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results & Metrics Section */}
      <section className='py-20 bg-brand-ivory/30'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <FadeIn>
              <div className='text-center mb-16'>
                <span
                  className={`inline-block ${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                >
                  Outcomes
                </span>
                <h2 className='text-3xl md:text-4xl text-brand-black mb-8 tracking-[-0.5px]'>
                  Results & Impact
                </h2>
                <p className='text-lg text-brand-black/80 leading-[1.7] max-w-3xl mx-auto'>
                  {caseStudy.impact}
                </p>
              </div>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {caseStudy.metrics.map((metric, index) => (
                <FadeIn key={index} delay={0.1 * (index + 1)}>
                  <div className='bg-brand-white p-8 rounded-[4px] shadow-sm'>
                    <h3
                      className={`${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                    >
                      {metric.label}
                    </h3>
                    <p className='text-4xl md:text-5xl text-brand-black font-medium mb-4'>
                      {metric.value}
                    </p>
                    <p className='text-brand-black/70'>{metric.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Artifacts Section */}
      <section className='py-20 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <FadeIn>
              <div className='text-center mb-16'>
                <span
                  className={`inline-block ${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                >
                  Design & Development
                </span>
                <h2 className='text-3xl md:text-4xl text-brand-black mb-8 tracking-[-0.5px]'>
                  Project Artifacts
                </h2>
                <p className='text-lg text-brand-black/80 leading-[1.7] max-w-3xl mx-auto'>
                  A behind-the-scenes look at the frameworks and tools we
                  created during the design and development process.
                </p>
              </div>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {caseStudy.designArtifacts.map((artifact, index) => (
                <FadeIn key={index} delay={0.1 * (index + 1)}>
                  <div>
                    <div className='relative aspect-[16/10] rounded-[4px] overflow-hidden bg-brand-ivory mb-6'>
                      {artifact.image ? (
                        <Image
                          src={artifact.image}
                          alt={artifact.title}
                          fill
                          sizes='(max-width: 768px) 100vw, 50vw'
                          className='object-cover'
                        />
                      ) : (
                        <div className='absolute inset-0 flex items-center justify-center bg-brand-ivory'>
                          <span className='text-brand-black/30 text-lg'>
                            [Artifact Image]
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className='text-2xl text-brand-black mb-3 tracking-[-0.5px]'>
                      {artifact.title}
                    </h3>
                    <p className='text-brand-black/80 leading-[1.7]'>
                      {artifact.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className='py-20 bg-brand-ivory/30'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <FadeIn>
              <div className='text-center mb-10'>
                <span
                  className={`inline-block ${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                >
                  Development
                </span>
                <h2 className='text-3xl text-brand-black mb-8 tracking-[-0.5px]'>
                  Technology Stack
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className='flex flex-wrap justify-center gap-5'>
                {caseStudy.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className='px-5 py-3 bg-brand-white rounded-[4px] text-brand-black/80 hover:shadow-md transition-shadow duration-300'
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <FadeIn>
              <div className='text-center mb-16'>
                <span
                  className={`inline-block ${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                >
                  The Team
                </span>
                <h2 className='text-3xl text-brand-black mb-8 tracking-[-0.5px]'>
                  Who Made It Happen
                </h2>
              </div>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {caseStudy.team.map((member, index) => (
                <FadeIn key={index} delay={0.1 * (index + 1)}>
                  <div className='text-center'>
                    <div className='w-24 h-24 rounded-full overflow-hidden mx-auto mb-6'>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className='object-cover w-full h-full'
                        />
                      ) : (
                        <div className='w-full h-full bg-brand-ivory flex items-center justify-center'>
                          <span className='text-brand-black/30 text-3xl'>
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className='text-xl text-brand-black mb-1'>
                      {member.name}
                    </h3>
                    <p className='text-brand-black/70'>{member.role}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {caseStudy.testimonials.length > 0 && (
        <section className='py-20 bg-brand-ivory/50'>
          <div className='container mx-auto px-6'>
            <div className='max-w-4xl mx-auto'>
              <FadeIn>
                <div className='text-center mb-12'>
                  <span
                    className={`inline-block ${textAccentColor} text-sm uppercase tracking-wider mb-4`}
                  >
                    Client Feedback
                  </span>
                  <h2 className='text-3xl text-brand-black mb-8 tracking-[-0.5px]'>
                    What They Said
                  </h2>
                </div>
              </FadeIn>

              <div className='px-8 py-12 bg-brand-white rounded-[4px] shadow-sm'>
                {caseStudy.testimonials.map((testimonial, index) => (
                  <FadeIn key={index} delay={0.2}>
                    <div className='text-center'>
                      <svg
                        className='w-12 h-12 mx-auto mb-6 text-brand-ivory'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                      </svg>
                      <blockquote className='text-xl text-brand-black italic mb-8 leading-[1.6]'>
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                      <div className='flex items-center justify-center mb-4'>
                        {testimonial.image && (
                          <div className='w-12 h-12 rounded-full overflow-hidden mr-4'>
                            <Image
                              src={testimonial.image}
                              alt={testimonial.author}
                              width={48}
                              height={48}
                              className='object-cover w-full h-full'
                            />
                          </div>
                        )}
                        <div className='text-left'>
                          <p className='font-medium text-brand-black'>
                            {testimonial.author}
                          </p>
                          <p className='text-brand-black/70 text-sm'>
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA & Project Link */}
      <section className='py-20 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <FadeIn>
              <h2 className='text-3xl text-brand-black mb-8 tracking-[-0.5px]'>
                Ready to start your own success story?
              </h2>
              <p className='text-lg text-brand-black/80 leading-[1.7] mb-12 max-w-2xl mx-auto'>
                Let us help you bring your vision to life with our user-centric
                design and development approach.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className='flex flex-col sm:flex-row gap-6 justify-center'>
                <Link
                  href='/contact'
                  className={`inline-flex items-center px-8 py-4 ${accentColor} text-brand-white rounded-[4px] hover:opacity-90 transition-opacity`}
                >
                  <span>Get in Touch</span>
                  <svg
                    className='w-5 h-5 ml-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </Link>

                {caseStudy.link && (
                  <a
                    href={caseStudy.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center px-8 py-4 bg-transparent border border-brand-black/20 text-brand-black rounded-[4px] hover:border-brand-black/50 transition-colors'
                  >
                    <span>Visit Project</span>
                    <svg
                      className='w-5 h-5 ml-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                    </svg>
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      {caseStudy.nextProject && (
        <section className='bg-brand-black'>
          <div className='container mx-auto'>
            <Link
              href={`/savvy-impact/project/case-study/${caseStudy.nextProject.id}`}
              className='block group'
            >
              <div className='relative h-64 md:h-96'>
                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-brand-black/40 z-10'></div>

                {/* Background image */}
                <div
                  className='absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105'
                  style={{
                    backgroundImage: `url(${caseStudy.nextProject.image})`,
                  }}
                ></div>

                {/* Content */}
                <div className='relative h-full flex items-center z-20'>
                  <div className='container mx-auto px-6'>
                    <div className='flex flex-col md:flex-row items-center justify-between w-full'>
                      <div>
                        <p className='text-brand-white/60 mb-2'>
                          Next Case Study
                        </p>
                        <h3 className='text-2xl md:text-3xl text-brand-white group-hover:text-brand-sage transition-colors tracking-[-0.5px]'>
                          {caseStudy.nextProject.title}
                        </h3>
                      </div>
                      <div className='mt-6 md:mt-0'>
                        <div
                          className={`w-12 h-12 ${accentColor.replace(
                            "bg-",
                            "bg-brand-sage"
                          )} rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform`}
                        >
                          <svg
                            className='w-6 h-6 text-brand-white'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M5 12h14M12 5l7 7-7 7' />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
