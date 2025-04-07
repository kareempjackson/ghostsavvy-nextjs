"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Service card data
const services = [
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive digital experiences that bridge aesthetics and functionality, ensuring user satisfaction and business goals align.",
    icon: (
      <svg
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='24' height='24' rx='4' fill='#F97316' fillOpacity='0.1' />
        <path
          d='M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M15 4.5C13.3431 4.5 12 5.84315 12 7.5C12 9.15685 13.3431 10.5 15 10.5C16.6569 10.5 18 9.15685 18 7.5C18 5.84315 16.6569 4.5 15 4.5Z'
          stroke='#F97316'
          strokeWidth='1.5'
        />
        <path
          d='M8 16.5H16'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M9 13.5H15'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    title: "App Development",
    description:
      "Building scalable, high-performance mobile and web applications that provide seamless experiences across all platforms.",
    icon: (
      <svg
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='24' height='24' rx='4' fill='#F97316' fillOpacity='0.1' />
        <rect
          x='3.5'
          y='3.5'
          width='17'
          height='17'
          rx='2.5'
          stroke='#F97316'
          strokeWidth='1.5'
        />
        <path d='M3.5 8.5H20.5' stroke='#F97316' strokeWidth='1.5' />
        <path d='M8.5 20.5L8.5 8.5' stroke='#F97316' strokeWidth='1.5' />
        <circle cx='6' cy='6' r='1' fill='#F97316' />
      </svg>
    ),
  },
  {
    title: "Sway",
    description:
      "Subscription-based design services providing ongoing creative support and direction for growing businesses and agencies.",
    icon: (
      <svg
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='24' height='24' rx='4' fill='#F97316' fillOpacity='0.1' />
        <path
          d='M8 5.5L16 5.5'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M6 9.5L18 9.5'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M3.5 13.5L20.5 13.5'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M6 17.5L18 17.5'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    title: "Reach",
    description:
      "Strategic B2B marketing services that amplify your brand's voice and connect with the audience that matters most to your business.",
    icon: (
      <svg
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='24' height='24' rx='4' fill='#F97316' fillOpacity='0.1' />
        <path
          d='M3.5 17.5C3.5 13.634 6.63401 10.5 10.5 10.5H13.5C17.366 10.5 20.5 7.36599 20.5 3.5'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M17.5 6.5L20.5 3.5L17.5 0.5'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.5 14.5L3.5 17.5L6.5 20.5'
          stroke='#F97316'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  return (
    <section ref={sectionRef} className='section bg-white'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='text-center mb-16'
        >
          <h2 className='mb-6 text-center'>Our Services</h2>
          <p className='text-brand-forest/70 max-w-2xl mx-auto'>
            We offer a comprehensive range of services designed to help you
            build exceptional digital products.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? "visible" : "hidden"}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='ghost-card hover:translate-y-[-4px] transition-transform duration-300'
            >
              <div className='mb-6'>{service.icon}</div>
              <h3 className='text-xl mb-3'>{service.title}</h3>
              <p className='text-brand-forest/70 text-base'>
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
