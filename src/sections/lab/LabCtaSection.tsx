"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const LabCtaSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const articles = [
    {
      id: "article1",
      title: "The Future of Digital Creation",
      date: "March 27, 2023",
      category: "Tech Insights",
      image: "/images/blogs/digital-creation.jpg",
      link: "/savvy-hub/articles/future-of-digital-creation",
    },
    {
      id: "article2",
      title: "How We Built Vynl From Concept to Launch",
      date: "February 14, 2023",
      category: "Case Study",
      image: "/images/blogs/vynl-case-study.jpg",
      link: "/savvy-hub/articles/vynl-case-study",
    },
    {
      id: "article3",
      title: "Emerging Tech Trends for Creators",
      date: "January 10, 2023",
      category: "Industry Report",
      image: "/images/blogs/tech-trends.jpg",
      link: "/savvy-hub/articles/tech-trends-for-creators",
    },
  ];

  return (
    <section ref={sectionRef} className='py-28 bg-[#F9F9F9]'>
      <div className='container mx-auto px-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Related Articles Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className='mb-28'
          >
            <div className='mb-16'>
              <span className='inline-block text-[#3F4697] font-medium mb-4'>
                LATEST INSIGHTS
              </span>
              <h2 className='text-4xl font-bold text-gray-900'>
                Related Articles
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12'>
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className='group'
                >
                  <Link href={article.link} className='block'>
                    <div className='relative h-60 mb-6 overflow-hidden'>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                    </div>
                    <div className='flex items-center text-sm text-gray-500 mb-3'>
                      <span>{article.date}</span>
                      <span className='mx-2'>•</span>
                      <span>{article.category}</span>
                    </div>
                    <h3 className='text-xl font-semibold mb-4 group-hover:text-[#3F4697] transition-colors'>
                      {article.title}
                    </h3>
                    <div className='inline-flex items-center text-[#3F4697] font-medium'>
                      Read More
                      <svg
                        className='w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1'
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
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact/Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='border-t border-gray-200 pt-20'
          >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
              <div>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                  Join Our Journey of Innovation
                </h2>
                <p className='text-xl text-gray-600 mb-8 max-w-xl'>
                  Have a project idea or want to collaborate with our lab?
                  We&apos;re always looking for new challenges and partnerships.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Link
                    href='/contact'
                    className='px-8 py-3 bg-[#3F4697] text-white rounded-none inline-block text-center hover:bg-[#3F4697]/90 transition-all duration-300'
                  >
                    Contact Us
                  </Link>
                  <Link
                    href='/about'
                    className='px-8 py-3 bg-transparent border border-gray-300 text-gray-700 hover:border-gray-700 rounded-none inline-block text-center transition-all duration-300'
                  >
                    Learn About Us
                  </Link>
                </div>
              </div>

              <div className='relative'>
                <Image
                  src='/images/cta-lab.jpg'
                  alt='Ghost Savvy Studios Lab Collaboration'
                  width={600}
                  height={400}
                  className='object-cover w-full'
                />
                <div className='absolute inset-0 bg-[#3F4697]/10'></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LabCtaSection;
