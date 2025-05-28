"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

// Project type options
const projectTypes = [
  "Website Development",
  "Mobile Application",
  "Product Design",
  "Branding & Identity",
  "Custom Development",
  "Other",
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

export default function Contact() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name: boolean;
    email: boolean;
    message: boolean;
  }>({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is updated
    if (Object.hasOwn(formErrors, name)) {
      setFormErrors({
        ...formErrors,
        [name as keyof typeof formErrors]: false,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = {
      name: !formData.name.trim(),
      email:
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: !formData.message.trim(),
    };

    if (errors.name || errors.email || errors.message) {
      setFormErrors(errors);
      return;
    }

    // Form is valid, handle submission (e.g., send to API)
    console.log("Form submitted:", formData);

    // Here you would typically send the data to your backend
    // For now, we'll just reset the form
    setFormData({
      name: "",
      email: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    });

    // Show success message
    alert("Thank you for your message! We'll be in touch soon.");
  };

  return (
    <main className='bg-brand-white overflow-hidden'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='min-h-[60vh] relative overflow-hidden bg-brand-forest flex items-center pt-28'
      >
        {/* Background with parallax */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className='absolute inset-0 bg-linear-to-b from-brand-forest/90 to-brand-forest z-10'></div>
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: "url('/images/contact-hero-bg.jpg')" }}
          ></div>
        </motion.div>

        {/* Content */}
        <div className='container mx-auto px-6 py-16 relative z-20'>
          <div className='max-w-4xl mx-auto'>
            <motion.div style={{ y: heroTextY }}>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: entryEasing }}
                className='text-5xl md:text-7xl text-brand-white leading-tight tracking-[-0.5px] mb-8'
              >
                Let&apos;s Create <br />
                Something Together
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: entryEasing }}
                className='text-xl md:text-2xl text-brand-white/90 leading-[1.6] max-w-3xl mb-8'
              >
                We'd love to hear about your project. Tell us what you're
                looking to build, and we'll get back to you quickly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: entryEasing }}
                className='flex gap-6 text-brand-white/80'
              >
                <a
                  href='mailto:hello@ghostsavvystudios.com'
                  className='flex items-center hover:text-brand-white transition-colors duration-300'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  hello@ghostsavvystudios.com
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className='py-20 bg-brand-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-16'>
              {/* Form Column */}
              <div className='lg:col-span-3'>
                <FadeInSection>
                  <h2 className='text-3xl md:text-4xl text-brand-forest mb-8 tracking-[-0.5px]'>
                    Tell us about your project
                  </h2>
                  <p className='text-brand-forest/80 leading-[1.6] mb-10'>
                    Please provide as much detail as you can about your project.
                    The more information we have, the better we can understand
                    your needs and provide a tailored solution.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                      <label
                        htmlFor='name'
                        className='block text-sm text-brand-forest mb-2'
                      >
                        Your Name <span className='text-brand-error'>*</span>
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 bg-brand-white border ${
                          formErrors.name
                            ? "border-brand-error"
                            : "border-brand-forest/20"
                        } rounded-[4px] focus:border-brand-sage focus:outline-hidden transition-colors`}
                        placeholder='Jane Smith'
                      />
                      {formErrors.name && (
                        <p className='mt-1 text-sm text-brand-error'>
                          Please enter your name
                        </p>
                      )}
                    </div>

                    <div className='mb-6'>
                      <label
                        htmlFor='email'
                        className='block text-sm text-brand-forest mb-2'
                      >
                        Email Address{" "}
                        <span className='text-brand-error'>*</span>
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 bg-brand-white border ${
                          formErrors.email
                            ? "border-brand-error"
                            : "border-brand-forest/20"
                        } rounded-[4px] focus:border-brand-sage focus:outline-hidden transition-colors`}
                        placeholder='jane.smith@example.com'
                      />
                      {formErrors.email && (
                        <p className='mt-1 text-sm text-brand-error'>
                          Please enter a valid email address
                        </p>
                      )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                      <div>
                        <label
                          htmlFor='projectType'
                          className='block text-sm text-brand-forest mb-2'
                        >
                          Project Type
                        </label>
                        <select
                          id='projectType'
                          name='projectType'
                          value={formData.projectType}
                          onChange={handleChange}
                          className='w-full p-3 bg-brand-white border border-brand-forest/20 rounded-[4px] focus:border-brand-sage focus:outline-hidden transition-colors appearance-none'
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23152B24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5em",
                          }}
                        >
                          <option value=''>Select project type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor='budget'
                          className='block text-sm text-brand-forest mb-2'
                        >
                          Budget Range
                        </label>
                        <select
                          id='budget'
                          name='budget'
                          value={formData.budget}
                          onChange={handleChange}
                          className='w-full p-3 bg-brand-white border border-brand-forest/20 rounded-[4px] focus:border-brand-sage focus:outline-hidden transition-colors appearance-none'
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23152B24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5em",
                          }}
                        >
                          <option value=''>Select budget range</option>
                          <option value='< $10K'>Less than $10K</option>
                          <option value='$10K - $25K'>$10K - $25K</option>
                          <option value='$25K - $50K'>$25K - $50K</option>
                          <option value='$50K - $100K'>$50K - $100K</option>
                          <option value='$100K+'>$100K+</option>
                        </select>
                      </div>
                    </div>

                    <div className='mb-8'>
                      <label
                        htmlFor='timeline'
                        className='block text-sm text-brand-forest mb-2'
                      >
                        Timeline
                      </label>
                      <select
                        id='timeline'
                        name='timeline'
                        value={formData.timeline}
                        onChange={handleChange}
                        className='w-full p-3 bg-brand-white border border-brand-forest/20 rounded-[4px] focus:border-brand-sage focus:outline-hidden transition-colors appearance-none'
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23152B24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1.5em",
                        }}
                      >
                        <option value=''>Select timeline</option>
                        <option value='< 1 month'>Less than 1 month</option>
                        <option value='1-3 months'>1-3 months</option>
                        <option value='3-6 months'>3-6 months</option>
                        <option value='> 6 months'>More than 6 months</option>
                      </select>
                    </div>

                    <div className='mb-8'>
                      <label
                        htmlFor='message'
                        className='block text-sm text-brand-forest mb-2'
                      >
                        Project Details{" "}
                        <span className='text-brand-error'>*</span>
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        rows={7}
                        className={`w-full p-3 bg-brand-white border ${
                          formErrors.message
                            ? "border-brand-error"
                            : "border-brand-forest/20"
                        } rounded-[4px] focus:border-brand-sage focus:outline-hidden transition-colors`}
                        placeholder='Tell us about your project, goals, and specific needs...'
                      ></textarea>
                      {formErrors.message && (
                        <p className='mt-1 text-sm text-brand-error'>
                          Please describe your project
                        </p>
                      )}
                    </div>

                    <button
                      type='submit'
                      className='px-8 py-4 bg-brand-forest text-brand-white rounded-[4px] text-sm font-medium hover:bg-brand-forest/90 transition-all duration-300'
                    >
                      Send Message
                    </button>
                  </form>
                </FadeInSection>
              </div>

              {/* Info Column */}
              <div className='lg:col-span-2'>
                <FadeInSection delay={0.2}>
                  <div className='bg-brand-ivory/50 p-8 rounded-[4px]'>
                    <h3 className='text-2xl text-brand-forest mb-6 tracking-[-0.5px]'>
                      Our Process
                    </h3>

                    <div className='space-y-8'>
                      <div className='flex'>
                        <div className='w-10 h-10 bg-brand-sage/20 flex items-center justify-center rounded-[4px] mr-4 shrink-0 text-brand-forest font-medium'>
                          1
                        </div>
                        <div>
                          <h4 className='text-lg text-brand-forest mb-2'>
                            Initial Consultation
                          </h4>
                          <p className='text-brand-forest/80 leading-[1.6]'>
                            We'll discuss your project in detail to understand
                            your vision, goals, and specific requirements.
                          </p>
                        </div>
                      </div>

                      <div className='flex'>
                        <div className='w-10 h-10 bg-brand-sage/20 flex items-center justify-center rounded-[4px] mr-4 shrink-0 text-brand-forest font-medium'>
                          2
                        </div>
                        <div>
                          <h4 className='text-lg text-brand-forest mb-2'>
                            Proposal & Planning
                          </h4>
                          <p className='text-brand-forest/80 leading-[1.6]'>
                            We'll create a detailed proposal outlining scope,
                            timeline, and cost estimates for your project.
                          </p>
                        </div>
                      </div>

                      <div className='flex'>
                        <div className='w-10 h-10 bg-brand-sage/20 flex items-center justify-center rounded-[4px] mr-4 shrink-0 text-brand-forest font-medium'>
                          3
                        </div>
                        <div>
                          <h4 className='text-lg text-brand-forest mb-2'>
                            Design & Development
                          </h4>
                          <p className='text-brand-forest/80 leading-[1.6]'>
                            Our team begins crafting your solution with regular
                            check-ins and milestone approvals.
                          </p>
                        </div>
                      </div>

                      <div className='flex'>
                        <div className='w-10 h-10 bg-brand-sage/20 flex items-center justify-center rounded-[4px] mr-4 shrink-0 text-brand-forest font-medium'>
                          4
                        </div>
                        <div>
                          <h4 className='text-lg text-brand-forest mb-2'>
                            Launch & Support
                          </h4>
                          <p className='text-brand-forest/80 leading-[1.6]'>
                            We ensure a smooth launch and provide ongoing
                            support as needed for your project.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-brand-ivory/50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <FadeInSection>
              <h2 className='text-3xl md:text-4xl text-brand-forest mb-12 tracking-[-0.5px] text-center'>
                Frequently Asked Questions
              </h2>

              <div className='space-y-8'>
                <div>
                  <h3 className='text-xl text-brand-forest mb-4 tracking-[-0.5px]'>
                    How much does a typical project cost?
                  </h3>
                  <p className='text-brand-forest/80 leading-[1.6]'>
                    Project costs vary widely depending on scope, complexity,
                    and timeline. We provide detailed estimates after our
                    initial consultation once we understand your specific needs.
                    Our projects typically range from $10,000 to $100,000+.
                  </p>
                </div>

                <div>
                  <h3 className='text-xl text-brand-forest mb-4 tracking-[-0.5px]'>
                    What is your typical timeline for projects?
                  </h3>
                  <p className='text-brand-forest/80 leading-[1.6]'>
                    Timelines vary by project scope. A typical website might
                    take 6-12 weeks, while complex applications can take 3-6
                    months. We'll provide you with a detailed timeline in our
                    project proposal.
                  </p>
                </div>

                <div>
                  <h3 className='text-xl text-brand-forest mb-4 tracking-[-0.5px]'>
                    Do you offer ongoing maintenance and support?
                  </h3>
                  <p className='text-brand-forest/80 leading-[1.6]'>
                    Yes, we offer various support plans to keep your project
                    running smoothly after launch. These can include regular
                    updates, security monitoring, performance optimization, and
                    content updates.
                  </p>
                </div>

                <div>
                  <h3 className='text-xl text-brand-forest mb-4 tracking-[-0.5px]'>
                    Can you work with our existing team?
                  </h3>
                  <p className='text-brand-forest/80 leading-[1.6]'>
                    Absolutely. We're experienced in collaborating with in-house
                    teams. Whether you need us to complement your existing
                    capabilities or lead development entirely, we're flexible in
                    our working approach.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </main>
  );
}
