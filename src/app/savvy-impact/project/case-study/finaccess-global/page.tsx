"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

// Case study animation component
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

export default function FinAccessCaseStudy() {
  // References and animations
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
  }, []);

  // FinAccess Global case study data
  const caseStudy = {
    title: "Revolutionizing Financial Accessibility",
    client: "FinAccess Global",
    description:
      "How we transformed a complex banking process into a seamless digital experience, increasing user adoption by 230%.",
    category: "Financial Technology",
    image: "/images/case-studies/fintech-case.jpg",
    accentColor: "#739E82", // brand-sage
    textAccentColor: "text-brand-sage",
    bgAccentColor: "bg-brand-sage",
    readTime: "5 min read",
    year: "2023",
    duration: "14 weeks",
    overview:
      "FinAccess Global approached us with a critical challenge: their existing system was too complex, leading to a 70% abandonment rate for new user applications. We were tasked with completely reimagining their digital banking experience to make financial services accessible to previously underserved demographics.",
    challenge:
      "The financial services industry traditionally creates products for financially savvy users, leaving behind those with limited financial literacy. FinAccess Global needed a solution that would maintain regulatory compliance while being intuitive enough for first-time banking customers.",
    approach:
      "We employed a human-centered design process that prioritized user research with diverse demographic groups. Our team conducted extensive field research, including contextual interviews with over 50 potential users across different educational backgrounds and financial literacy levels.",
    solution:
      "The result was a digital banking platform that used progressive disclosure techniques, plain language interfaces, and visual aids to guide users through complex financial decisions. We implemented a tiered account system that allowed users to start with basic features and gradually access more advanced financial tools as they gained confidence.",
    impact: [
      {
        metric: "230%",
        description: "Increase in user adoption",
      },
      {
        metric: "68%",
        description: "Reduction in application abandonment",
      },
      {
        metric: "5.2min",
        description: "Average time to complete onboarding (down from 32min)",
      },
      {
        metric: "93%",
        description: "User satisfaction score",
      },
    ],
    testimonial: {
      quote:
        "Ghost Savvy Studios delivered beyond our expectations. Their team took the time to truly understand the barriers our potential customers faced and designed an experience that made banking accessible to everyone. The result has been transformative for our business and the communities we serve.",
      author: "Sarah Chen",
      role: "Chief Digital Officer",
      company: "FinAccess Global",
      image: "/images/testimonials/sarah-chen.jpg",
    },
    process: [
      {
        title: "Research & Discovery",
        description:
          "Our team conducted extensive field research, including contextual interviews with over 50 potential users across different educational backgrounds and financial literacy levels. This research revealed key barriers to financial access and helped us map user journey pain points.",
        image: "/images/case-studies/research.jpg",
      },
      {
        title: "Strategy & Ideation",
        description:
          "We created a comprehensive digital strategy focused on progressive disclosure, enabling users to understand financial products at their own pace. Our ideation sessions focused on creating intuitive onboarding paths that adapt to different user knowledge levels.",
        image: "/images/case-studies/strategy.jpg",
      },
      {
        title: "Design & Prototyping",
        description:
          "The design phase focused on creating a visual language that demystified financial terms and processes. We prototyped multiple versions of key user flows and conducted usability testing with target users, iterating based on their feedback.",
        image: "/images/case-studies/design.jpg",
      },
      {
        title: "Development & Implementation",
        description:
          "Our engineering team built a robust platform that maintained bank-grade security while delivering a seamless user experience. We implemented an API-first architecture that allowed for future extensibility and integration with financial services.",
        image: "/images/case-studies/development.jpg",
      },
    ],
    designFeatures: [
      {
        title: "Progressive Disclosure",
        description:
          "Complex financial information is revealed gradually as users need it, preventing overwhelming experiences for new users.",
        image: "/images/case-studies/progressive-disclosure.jpg",
      },
      {
        title: "Visual Financial Education",
        description:
          "Integrated visual aids and animations help explain financial concepts in an accessible, engaging way.",
        image: "/images/case-studies/visual-education.jpg",
      },
      {
        title: "Contextual Assistance",
        description:
          "AI-powered help system provides relevant explanations and suggestions based on user behavior and needs.",
        image: "/images/case-studies/contextual-assistance.jpg",
      },
    ],
    techStack: [
      "React Native",
      "Node.js",
      "GraphQL",
      "AWS",
      "MongoDB",
      "Firebase",
    ],
    nextCaseStudy: {
      title: "Reimagining Healthcare Engagement",
      client: "MediConnect",
      slug: "mediconnect",
      image: "/images/case-studies/healthcare-case.jpg",
    },
  };

  return (
    <main className='bg-brand-white overflow-hidden'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='min-h-[90vh] relative overflow-hidden bg-brand-forest flex items-center'
      >
        {/* Background with parallax */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-b from-brand-forest/90 to-brand-forest/75 z-10'></div>

          {/* Background image */}
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${caseStudy.image})` }}
          ></div>
        </motion.div>

        {/* Content */}
        <div className='container mx-auto px-6 py-32 relative z-20'>
          <div className='max-w-5xl'>
            <motion.div style={{ y: heroTextY }}>
              <Link
                href='/savvy-impact'
                className='inline-flex items-center text-brand-white/70 hover:text-brand-white transition-colors mb-12 group'
              >
                <svg
                  className='w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300'
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
                className='mb-8'
              >
                <div className='flex items-center gap-3 mb-8 text-brand-white/70'>
                  <span className='px-3 py-1 bg-brand-white/10 rounded-[4px]'>
                    {caseStudy.category}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: entryEasing }}
                className='text-5xl md:text-6xl lg:text-7xl text-brand-white leading-tight tracking-[-0.5px] mb-8 max-w-4xl'
              >
                {caseStudy.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: entryEasing }}
                className='text-xl md:text-2xl text-brand-white/80 leading-[1.5] max-w-3xl mb-16'
              >
                {caseStudy.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: entryEasing }}
                className='mt-12 grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-brand-white/10 pt-12'
              >
                <div>
                  <h3 className='text-sm text-brand-white/50 uppercase tracking-wider mb-2'>
                    Client
                  </h3>
                  <p className='text-brand-white'>{caseStudy.client}</p>
                </div>
                <div>
                  <h3 className='text-sm text-brand-white/50 uppercase tracking-wider mb-2'>
                    Industry
                  </h3>
                  <p className='text-brand-white'>{caseStudy.category}</p>
                </div>
                <div>
                  <h3 className='text-sm text-brand-white/50 uppercase tracking-wider mb-2'>
                    Year
                  </h3>
                  <p className='text-brand-white'>{caseStudy.year}</p>
                </div>
                <div>
                  <h3 className='text-sm text-brand-white/50 uppercase tracking-wider mb-2'>
                    Duration
                  </h3>
                  <p className='text-brand-white'>{caseStudy.duration}</p>
                </div>
                <div>
                  <h3 className='text-sm text-brand-white/50 uppercase tracking-wider mb-2'>
                    Growth
                  </h3>
                  <p className='text-brand-white'>+230%</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study Overview */}
      <section className='py-24 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <FadeIn>
              <div className='mb-20'>
                <span
                  className={`inline-block ${caseStudy.textAccentColor} text-sm uppercase tracking-wider mb-4`}
                >
                  Case Study Overview
                </span>
                <h2 className='text-3xl md:text-4xl text-brand-black mb-8 tracking-[-0.5px]'>
                  The Challenge
                </h2>
                <p className='text-lg text-brand-black/80 leading-[1.7] mb-12'>
                  {caseStudy.overview}
                </p>

                {/* Project details */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-brand-black/10 pt-12'>
                  <div>
                    <h3 className='text-sm uppercase tracking-wider text-brand-black/60 mb-2'>
                      Client
                    </h3>
                    <p className='text-lg text-brand-black'>
                      {caseStudy.client}
                    </p>
                  </div>
                  <div>
                    <h3 className='text-sm uppercase tracking-wider text-brand-black/60 mb-2'>
                      Duration
                    </h3>
                    <p className='text-lg text-brand-black'>
                      {caseStudy.duration}
                    </p>
                  </div>
                  <div>
                    <h3 className='text-sm uppercase tracking-wider text-brand-black/60 mb-2'>
                      Year
                    </h3>
                    <p className='text-lg text-brand-black'>{caseStudy.year}</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Problem, Approach, Solution Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24'>
              <FadeIn delay={0.1}>
                <div>
                  <h3 className='text-2xl text-brand-black mb-6 tracking-[-0.5px] flex items-center'>
                    <div
                      className={`w-10 h-10 ${caseStudy.bgAccentColor} rounded-[4px] flex items-center justify-center text-brand-white mr-4`}
                    >
                      <span>01</span>
                    </div>
                    Problem
                  </h3>
                  <p className='text-brand-black/80 leading-[1.7]'>
                    {caseStudy.challenge}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div>
                  <h3 className='text-2xl text-brand-black mb-6 tracking-[-0.5px] flex items-center'>
                    <div
                      className={`w-10 h-10 ${caseStudy.bgAccentColor} rounded-[4px] flex items-center justify-center text-brand-white mr-4`}
                    >
                      <span>02</span>
                    </div>
                    Approach
                  </h3>
                  <p className='text-brand-black/80 leading-[1.7]'>
                    {caseStudy.approach}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className='md:col-span-2'>
                  <h3 className='text-2xl text-brand-black mb-6 tracking-[-0.5px] flex items-center'>
                    <div
                      className={`w-10 h-10 ${caseStudy.bgAccentColor} rounded-[4px] flex items-center justify-center text-brand-white mr-4`}
                    >
                      <span>03</span>
                    </div>
                    Solution
                  </h3>
                  <p className='text-brand-black/80 leading-[1.7]'>
                    {caseStudy.solution}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-32 bg-brand-ivory/50 overflow-hidden'>
        <div className='container mx-auto px-6'>
          <div className='max-w-6xl mx-auto'>
            <FadeIn>
              <div className='mb-20'>
                <h2 className='text-sm uppercase tracking-wider text-brand-black/60 mb-4 text-center'>
                  Our Approach
                </h2>
                <h3 className='text-3xl md:text-4xl lg:text-5xl text-brand-black mb-0 tracking-[-0.5px] text-center max-w-3xl mx-auto'>
                  How we transformed FinAccess Global&apos;s digital experience
                </h3>
              </div>
            </FadeIn>

            <div className='space-y-32'>
              {caseStudy.process.map((step, index) => (
                <FadeIn key={step.title} delay={0.1 * (index + 1)}>
                  <div className='flex flex-col md:flex-row gap-20 items-center'>
                    <div
                      className={`w-full md:w-1/2 ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                    >
                      <div className='relative'>
                        <div className='aspect-[4/3] rounded-[4px] overflow-hidden'>
                          <div className='absolute inset-0 bg-brand-sage/5'></div>
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={720}
                            height={540}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div className='absolute -top-6 -left-6 text-6xl font-bold text-brand-sage/10'>
                          {(index + 1).toString().padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-full md:w-1/2 ${
                        index % 2 === 1 ? "md:order-1" : ""
                      }`}
                    >
                      <div className=''>
                        <div className='inline-block mb-6 px-3 py-1 bg-brand-forest/5 text-brand-forest rounded-[4px] text-sm'>
                          Step {index + 1}
                        </div>
                        <h3 className='text-2xl md:text-3xl text-brand-black tracking-[-0.5px] mb-6'>
                          {step.title}
                        </h3>
                        <p className='text-brand-black/80 leading-[1.7] text-lg'>
                          {step.description}
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

      {/* Impact Section */}
      <section className='py-32 bg-brand-forest text-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-6xl mx-auto'>
            <FadeIn>
              <div className='mb-24 max-w-4xl mx-auto'>
                <h2 className='text-sm uppercase tracking-wider text-brand-white/60 mb-4 text-center'>
                  Impact
                </h2>
                <h3 className='text-3xl md:text-4xl lg:text-5xl text-brand-white mb-8 tracking-[-0.5px] text-center'>
                  The results speak for themselves
                </h3>
                <p className='text-xl text-brand-white/80 leading-[1.7] max-w-3xl mx-auto text-center'>
                  Our solution delivered transformative outcomes that changed
                  how FinAccess Global approached their business.
                </p>
              </div>
            </FadeIn>

            <div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-16'>
                {caseStudy.impact.map((item, index) => (
                  <FadeIn key={index} delay={0.1 * (index + 1)}>
                    <div className='bg-brand-white/5 backdrop-blur-sm py-12 px-8 text-center relative'>
                      <h3 className='text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-brand-white'>
                        {item.metric}
                      </h3>
                      <p className='text-brand-white/70 text-lg'>
                        {item.description}
                      </p>
                      <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-sage/0 via-brand-sage/70 to-brand-sage/0'></div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <FadeIn delay={0.5}>
              <div className='bg-brand-white/5 backdrop-blur-sm rounded-[4px] p-12 md:p-16 relative mt-32'>
                {/* Decorative quote mark */}
                <div className='absolute -top-8 -left-8 w-16 h-16 flex items-center justify-center rounded-[4px] bg-brand-sage'>
                  <svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5V11ZM20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V8C14 6.93913 14.4214 5.92172 15.1716 5.17157C15.9217 4.42143 16.9391 4 18 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V11ZM16.5 20C17.0909 20.0108 17.6775 19.886 18.2 19.6375C18.7225 19.389 19.1654 19.0249 19.4875 18.575C19.8096 18.1251 20.0008 17.6029 20.0445 17.0572C20.0882 16.5116 19.9829 15.9656 19.7399 15.4705C19.497 14.9754 19.1242 14.5466 18.6602 14.225C18.1962 13.9034 17.6567 13.6996 17.0947 13.6318C16.5328 13.564 15.964 13.6342 15.439 13.8363C14.914 14.0384 14.4493 14.3659 14.09 14.7875C14.026 14.1755 13.8006 13.5904 13.4406 13.0886C13.0807 12.5868 12.5989 12.1854 12.0407 11.9209C11.4825 11.6564 10.8671 11.538 10.2504 11.5776C9.63372 11.6172 9.04052 11.8136 8.52521 12.1477C8.0099 12.4817 7.59077 12.9422 7.31091 13.4793C7.03105 14.0164 6.8996 14.6127 6.92744 15.2126C6.95529 15.8125 7.14148 16.3947 7.46955 16.905C7.79761 17.4153 8.25609 17.8373 8.8 18.135C9.03858 18.045 9.29305 18 9.55 18C10.3601 18 11.1371 18.3161 11.713 18.8787C12.289 19.4413 12.6224 20.2044 12.6425 21H16.5Z'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>

                <p className='text-2xl md:text-3xl text-brand-white/90 italic mb-12 leading-[1.5] max-w-4xl'>
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </p>

                <div className='flex items-center'>
                  <div
                    className='w-16 h-16 rounded-[4px] bg-cover bg-center border border-brand-sage/30 mr-6'
                    style={{
                      backgroundImage: `url(${caseStudy.testimonial.image})`,
                    }}
                  ></div>
                  <div>
                    <h4 className='text-xl text-brand-white font-medium'>
                      {caseStudy.testimonial.author}
                    </h4>
                    <p className='text-brand-white/60'>
                      {caseStudy.testimonial.role},{" "}
                      {caseStudy.testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Design Features Section */}
      <section className='py-32 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-6xl mx-auto'>
            <FadeIn>
              <div className='mb-24 max-w-4xl mx-auto'>
                <h2 className='text-sm uppercase tracking-wider text-brand-black/60 mb-4 text-center'>
                  Solution
                </h2>
                <h3 className='text-3xl md:text-4xl lg:text-5xl text-brand-black mb-8 tracking-[-0.5px] text-center'>
                  Key Innovations
                </h3>
                <p className='text-xl text-brand-black/70 leading-[1.7] max-w-3xl mx-auto text-center'>
                  Our platform includes several groundbreaking features designed
                  specifically to address financial accessibility barriers.
                </p>
              </div>
            </FadeIn>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16'>
              {caseStudy.designFeatures.map((feature, index) => (
                <FadeIn key={feature.title} delay={0.1 * (index + 1)}>
                  <div className='group'>
                    <div className='mb-8 overflow-hidden rounded-[4px] aspect-[4/3] relative group'>
                      <div className='absolute inset-0 bg-brand-forest/5 group-hover:bg-brand-forest/0 transition-colors duration-500'></div>
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                      <div className='absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
                    </div>

                    <div className='relative'>
                      <div className='absolute -top-12 -left-6 text-4xl font-bold text-brand-forest/10'>
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                      <h3 className='text-2xl text-brand-black mb-4 tracking-[-0.5px]'>
                        {feature.title}
                      </h3>
                      <p className='text-brand-black/70 leading-[1.7]'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Tech Stack Section */}
            <FadeIn delay={0.5}>
              <div className='mt-32 pt-16 border-t border-brand-black/10'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-12'>
                  <h3 className='text-2xl text-brand-black mb-4 md:mb-0 tracking-[-0.5px]'>
                    Technology Stack
                  </h3>
                  <p className='text-brand-black/60 max-w-xl'>
                    We built the platform using modern, scalable technologies
                    that ensure security, performance, and long-term
                    maintainability.
                  </p>
                </div>

                <div className='flex flex-wrap gap-4'>
                  {caseStudy.techStack.map((tech) => (
                    <span
                      key={tech}
                      className='px-5 py-3 bg-brand-forest/5 text-brand-forest rounded-[4px] font-medium'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Next Case Study Section */}
      <section className='py-0 bg-brand-ivory'>
        <div className='w-full'>
          <FadeIn>
            <div className='pt-16 pb-8 text-center'>
              <span className='text-brand-black/60 text-sm uppercase tracking-wider'>
                Next Project
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              href={`/savvy-impact/project/case-study/${caseStudy.nextCaseStudy.slug}`}
              className='block group relative'
            >
              <div className='relative aspect-[21/9] w-full overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent z-10'></div>
                <Image
                  src={caseStudy.nextCaseStudy.image}
                  alt={caseStudy.nextCaseStudy.title}
                  fill
                  sizes='100vw'
                  className='object-cover transition-transform duration-1000 group-hover:scale-105'
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center z-20 px-6'>
                  <div className='max-w-4xl text-center'>
                    <div className='inline-block px-4 py-2 bg-brand-white/10 backdrop-blur-sm text-brand-white/90 rounded-[4px] mb-6 text-sm'>
                      {caseStudy.nextCaseStudy.client}
                    </div>
                    <h3 className='text-3xl md:text-5xl lg:text-6xl text-brand-white mb-8 tracking-[-0.5px] leading-[1.1] group-hover:text-brand-sage transition-colors duration-300'>
                      {caseStudy.nextCaseStudy.title}
                    </h3>
                    <div className='inline-flex items-center text-brand-sage text-lg font-medium mt-4 border border-brand-sage/30 rounded-[4px] px-6 py-3 group-hover:bg-brand-sage group-hover:text-brand-white transition-all duration-300'>
                      <span>View Case Study</span>
                      <svg
                        className='w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14 5l7 7m0 0l-7 7m7-7H3'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className='container mx-auto px-6'>
              <div className='max-w-6xl mx-auto text-center py-20'>
                <Link
                  href='/savvy-impact'
                  className='inline-flex items-center px-8 py-4 bg-brand-forest text-brand-white rounded-[4px] hover:bg-brand-forest/90 transition-colors'
                >
                  <span>View All Projects</span>
                  <svg
                    className='w-5 h-5 ml-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
