"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EmailCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (email.includes("@") && email.includes(".")) {
        setIsSuccess(true);
        setEmail("");
      } else {
        setError("Please enter a valid email address");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      className='py-16 sm:py-24 relative overflow-hidden bg-brand-ivory'
    >
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden opacity-30'>
        <div className='absolute top-0 left-1/4 w-64 h-64 bg-brand-sage rounded-full blur-3xl opacity-20'></div>
        <div className='absolute bottom-0 right-1/4 w-64 h-64 bg-brand-sage rounded-full blur-3xl opacity-20'></div>
      </div>

      <div className='container mx-auto max-w-7xl px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='max-w-4xl mx-auto'
        >
          <div className='text-center mb-8 sm:mb-12'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-forest mb-4'>
              New Tools Dropping Monthly
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Join our list to get early access to the next drop and be the
              first to try our exclusive AI tools.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10'>
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className='text-center py-6'
              >
                <div className='mx-auto w-16 h-16 bg-brand-sage/20 rounded-full flex items-center justify-center mb-6'>
                  <svg
                    className='w-8 h-8 text-brand-sage'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-medium text-brand-forest mb-2'>
                  You&apos;re on the list!
                </h3>
                <p className='text-gray-600'>
                  Thanks for subscribing. We&apos;ll notify you when new tools
                  are released.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='text-center mb-6'>
                  <h3 className='text-xl font-medium text-brand-forest mb-2'>
                    Get Exclusive Updates
                  </h3>
                  <p className='text-gray-600'>
                    Be the first to know when we launch new AI tools and get
                    special access.
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-3'>
                  <div className='grow'>
                    <input
                      type='email'
                      placeholder='Your email address'
                      className={`w-full px-4 py-3 border ${
                        error ? "border-red-400" : "border-gray-300"
                      } rounded-md focus:outline-hidden focus:ring-2 focus:ring-brand-sage/50 focus:border-brand-sage transition-colors`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {error && (
                      <p className='mt-1 text-sm text-red-500'>{error}</p>
                    )}
                  </div>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='px-6 py-3 bg-brand-sage text-brand-forest font-medium rounded-md hover:bg-brand-sage/90 transition-colors focus:outline-hidden focus:ring-2 focus:ring-brand-sage/50 disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    {isSubmitting ? (
                      <span className='flex items-center justify-center'>
                        <svg
                          className='animate-spin -ml-1 mr-2 h-4 w-4 text-brand-forest'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                <p className='text-xs text-center text-gray-500 mt-4'>
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailCTA;
