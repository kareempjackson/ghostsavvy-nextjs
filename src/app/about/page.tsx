"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

// Team data
const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & Creative Director",
    bio: "With over 15 years of experience in digital design and branding, Alex leads the creative vision at Ghost Savvy Studios. Previously at top agencies in New York and London, Alex founded the studio with a mission to create work that drives meaningful impact.",
    image: "/images/team-alex.jpg",
    social: {
      twitter: "https://twitter.com/alexmorgandesign",
      linkedin: "https://linkedin.com/in/alexmorgandesign",
      instagram: "https://instagram.com/alexmorgandesign",
    },
  },
  {
    name: "Jordan Taylor",
    role: "Technical Director",
    bio: "Jordan brings over a decade of experience in software architecture and development. With a background in both startup and enterprise environments, Jordan oversees all technical aspects of our projects, ensuring scalable, future-proof solutions.",
    image: "/images/team-jordan.jpg",
    social: {
      twitter: "https://twitter.com/jordantaylordev",
      linkedin: "https://linkedin.com/in/jordantaylordev",
      github: "https://github.com/jordantaylor",
    },
  },
  {
    name: "Maya Chen",
    role: "Strategy Lead",
    bio: "Maya specializes in translating business objectives into compelling digital experiences. With a background in business consulting and user experience, she helps our clients navigate the intersection of brand, user needs, and business goals.",
    image: "/images/team-maya.jpg",
    social: {
      linkedin: "https://linkedin.com/in/mayachenstrategist",
      twitter: "https://twitter.com/mayachenstrategy",
    },
  },
  {
    name: "Ezra Williams",
    role: "Design Lead",
    bio: "Ezra's multidisciplinary approach combines visual design, motion, and interaction to create memorable digital experiences. With a background in film and graphic design, Ezra brings a unique perspective to every project.",
    image: "/images/team-ezra.jpg",
    social: {
      instagram: "https://instagram.com/ezrawilliamsdesign",
      dribbble: "https://dribbble.com/ezrawilliams",
      linkedin: "https://linkedin.com/in/ezrawilliamsdesign",
    },
  },
];

// Values data
const values = [
  {
    title: "Discretion",
    description:
      "We understand the sensitive nature of our clients' work. Confidentiality is built into our process, allowing us to operate quietly in the background while you take center stage.",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16 21H8C5.79086 21 4 19.2091 4 17C4 14.7909 5.79086 13 8 13H16C18.2091 13 20 14.7909 20 17C20 19.2091 18.2091 21 16 21Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 13V21'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 17H16'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description:
      "Every pixel, line of code, and interaction is crafted with precision and intention. We relentlessly pursue the highest quality in everything we create.",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 17H12.01'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "Partnership",
    description:
      "We believe in true collaboration—becoming an extension of your team rather than just a vendor. Your success is our success, and we're committed to the journey together.",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M20.42 4.58C19.9183 4.07658 19.3222 3.67714 18.6658 3.40459C18.0094 3.13204 17.3058 2.99178 16.595 2.99178C15.8842 2.99178 15.1806 3.13204 14.5242 3.40459C13.8678 3.67714 13.2717 4.07658 12.77 4.58L12 5.36L11.23 4.58C10.7283 4.07658 10.1322 3.67714 9.47582 3.40459C8.81944 3.13204 8.11581 2.99178 7.40499 2.99178C6.69417 2.99178 5.99055 3.13204 5.33416 3.40459C4.67778 3.67714 4.0817 4.07658 3.57999 4.58C2.55182 5.61223 1.99652 7.01367 1.99652 8.475C1.99652 9.93633 2.55182 11.3378 3.57999 12.37L4.35999 13.15L12 20.79L19.64 13.15L20.42 12.37C20.9234 11.8683 21.3228 11.2722 21.5954 10.6158C21.8679 9.95944 22.0082 9.25581 22.0082 8.545C22.0082 7.83418 21.8679 7.13055 21.5954 6.47417C21.3228 5.81778 20.9234 5.2217 20.42 4.72V4.58Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "We constantly explore new technologies and approaches, staying ahead of trends to deliver solutions that don't just meet current needs but anticipate future ones.",
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-8 h-8'>
        <path
          d='M9.66347 17H14.3364M11.9999 3V4M18.3639 5.63604L17.6568 6.34315M21 11.9999H20M4 11.9999H3M6.34309 6.34315L5.63599 5.63604M8.46441 15.5356C6.51179 13.5829 6.51179 10.4171 8.46441 8.46449C10.417 6.51187 13.5829 6.51187 15.5355 8.46449C17.4881 10.4171 17.4881 13.5829 15.5355 15.5356L14.9884 16.0827C14.3555 16.7155 13.9999 17.5739 13.9999 18.469V19C13.9999 20.1046 13.1045 21 11.9999 21C10.8954 21 9.99995 20.1046 9.99995 19V18.469C9.99995 17.5739 9.6444 16.7155 9.01151 16.0827L8.46441 15.5356Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
];

// Animation component for sections
function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: entryEasing }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <main className='bg-brand-white overflow-hidden'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='min-h-[70vh] relative overflow-hidden bg-brand-forest flex items-center'
      >
        {/* Background with parallax */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-brand-forest/90 to-brand-forest/80 z-10'></div>
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: "url('/images/about-hero-bg.jpg')" }}
          ></div>
        </motion.div>

        {/* Content */}
        <div className='container mx-auto px-6 py-24 relative z-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div style={{ y: heroTextY }}>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: entryEasing }}
                className='text-5xl md:text-7xl text-brand-white leading-tight tracking-[-0.5px] mb-8'
              >
                The Team Behind <br />
                Ghost Savvy Studios
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: entryEasing }}
                className='text-xl md:text-2xl text-brand-white/90 leading-[1.6] max-w-3xl mx-auto mb-12'
              >
                We are a studio of strategists, designers and engineers
                dedicated to crafting extraordinary digital experiences that
                elevate and transform.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className='flex flex-col items-center'
          >
            <span className='text-brand-white/60 text-sm mb-2'>
              Scroll to explore
            </span>
            <svg
              className='w-6 h-6 text-brand-white/60'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-24 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <FadeInSection>
              <div className='text-center mb-16'>
                <h2 className='text-4xl text-brand-forest mb-8 tracking-[-0.5px]'>
                  Our Mission
                </h2>
                <p className='text-xl text-brand-forest/80 leading-[1.6]'>
                  Ghost Savvy Studios was founded with a mission to create
                  impactful digital products without seeking the spotlight. We
                  believe in letting our work—and our clients' success—speak for
                  itself.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <p className='text-lg text-brand-forest/80 leading-[1.8] mb-8'>
                In an industry that often prioritizes credit and visibility, we
                choose to operate differently. We build digital products that
                solve real problems, designed to be claimed as your own in-house
                work when needed. This approach allows us to focus entirely on
                creating exceptional experiences without the distractions of
                self-promotion.
              </p>
              <p className='text-lg text-brand-forest/80 leading-[1.8]'>
                Our team combines deep expertise in design, technology, and
                business strategy to deliver solutions that aren't just
                beautiful, but strategically sound and technically robust. We
                measure our success not by our own visibility, but by the impact
                our work has on your business and users.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-24 bg-brand-ivory/50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <FadeInSection>
              <div className='text-center mb-20'>
                <h2 className='text-4xl text-brand-forest mb-8 tracking-[-0.5px]'>
                  Our Values
                </h2>
                <p className='text-xl text-brand-forest/80 leading-[1.6] max-w-3xl mx-auto'>
                  Our values guide every decision and interaction, shaping the
                  work we create and the partnerships we build.
                </p>
              </div>
            </FadeInSection>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
              {values.map((value, index) => (
                <FadeInSection key={value.title} delay={0.2 + index * 0.1}>
                  <div className='flex'>
                    <div className='flex-shrink-0 mr-6'>
                      <div className='w-16 h-16 bg-brand-sage/20 rounded-[4px] flex items-center justify-center text-brand-forest'>
                        {value.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className='text-2xl text-brand-forest mb-4 tracking-[-0.5px]'>
                        {value.title}
                      </h3>
                      <p className='text-brand-forest/80 leading-[1.6]'>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-24 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <FadeInSection>
              <div className='text-center mb-20'>
                <h2 className='text-4xl text-brand-forest mb-8 tracking-[-0.5px]'>
                  Meet the Team
                </h2>
                <p className='text-xl text-brand-forest/80 leading-[1.6] max-w-3xl mx-auto'>
                  While our studio may operate in the background, our team is
                  made up of experienced professionals with diverse expertise
                  and backgrounds.
                </p>
              </div>
            </FadeInSection>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {teamMembers.map((member, index) => (
                <FadeInSection key={member.name} delay={0.2 + index * 0.1}>
                  <div className='bg-brand-white border border-brand-forest/5 p-8 rounded-[4px] shadow-sm'>
                    <div className='flex items-start'>
                      <div className='w-24 h-24 mr-6 rounded-[4px] overflow-hidden flex-shrink-0 bg-brand-sage/10'>
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div>
                        <h3 className='text-2xl text-brand-forest mb-1 tracking-[-0.5px]'>
                          {member.name}
                        </h3>
                        <p className='text-brand-sage mb-4 text-sm'>
                          {member.role}
                        </p>
                        <p className='text-brand-forest/80 leading-[1.6] mb-6'>
                          {member.bio}
                        </p>
                        <div className='flex space-x-4'>
                          {Object.entries(member.social).map(
                            ([platform, url]) => (
                              <a
                                key={platform}
                                href={url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-brand-forest/70 hover:text-brand-sage transition-colors duration-300'
                              >
                                {platform === "twitter" && (
                                  <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
                                  </svg>
                                )}
                                {platform === "linkedin" && (
                                  <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                                    <rect
                                      x='2'
                                      y='9'
                                      width='4'
                                      height='12'
                                    ></rect>
                                    <circle cx='4' cy='4' r='2'></circle>
                                  </svg>
                                )}
                                {platform === "instagram" && (
                                  <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <rect
                                      x='2'
                                      y='2'
                                      width='20'
                                      height='20'
                                      rx='5'
                                      ry='5'
                                    ></rect>
                                    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
                                    <line
                                      x1='17.5'
                                      y1='6.5'
                                      x2='17.51'
                                      y2='6.5'
                                    ></line>
                                  </svg>
                                )}
                                {platform === "github" && (
                                  <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
                                  </svg>
                                )}
                                {platform === "dribbble" && (
                                  <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <circle cx='12' cy='12' r='10'></circle>
                                    <path d='M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32'></path>
                                  </svg>
                                )}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-brand-forest text-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <FadeInSection>
              <h2 className='text-4xl text-brand-white mb-8 tracking-[-0.5px]'>
                Ready to work together?
              </h2>
              <p className='text-xl text-brand-white/80 leading-[1.6] mb-12 max-w-2xl mx-auto'>
                Let&apos;s collaborate to create products that solve real
                problems and deliver exceptional experiences.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  href='/contact'
                  className='px-8 py-4 bg-brand-sage text-brand-forest rounded-[4px] text-sm font-medium hover:bg-brand-sage/90 transition-all duration-300 hover:text-brand-black'
                >
                  Get in Touch
                </Link>
                <Link
                  href='/services'
                  className='px-8 py-4 bg-transparent border border-brand-white/30 text-brand-white rounded-[4px] text-sm font-medium hover:bg-brand-white/10 transition-all duration-300 hover:border-brand-white'
                >
                  Explore Our Services
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </main>
  );
}
