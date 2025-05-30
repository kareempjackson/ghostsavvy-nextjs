"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const FooterSection = () => {
  // Easing values from brand guidelines
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  const menuLinks = [
    { name: "Swway Design", href: "/swway" },
    { name: "Savvy Impact", href: "/savvy-impact" },
    { name: "Savvy Hub", href: "/savvy-hub" },
    { name: "MVP Sprints", href: "/mvp-sprints" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "X",
      href: "https://twitter.com/ghostsavvy",
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/ghostsavvy",
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/ghostsavvy",
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/ghostsavvystudios",
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
    },
  ];

  return (
    <footer className='border-t border-brand-deep/10 bg-brand-ivory'>
      <div className='container mx-auto px-8 py-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-7 gap-20'>
            {/* Left Column - Logo */}
            <div className='lg:col-span-3'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: entryEasing }}
                className='flex flex-col'
              >
                <Link
                  href='/'
                  className='block relative w-[600px] h-[180px] mb-10'
                >
                  <Image
                    src='/images/ghost savvy-01.png'
                    alt='Ghost Savvy Studios'
                    fill
                    className='object-contain object-left'
                  />
                </Link>

                <p className='text-sm text-brand-deep/70 max-w-lg mb-8 leading-normal'>
                  We build exceptional digital products as ghost partners for
                  agencies and startups, prioritizing discretion and quality.
                </p>
              </motion.div>
            </div>

            {/* Center Column - Menu */}
            <div className='lg:col-span-3 lg:pt-8'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: entryEasing }}
                className='flex flex-col space-y-5'
              >
                {menuLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className='text-brand-deep/70 hover:text-brand-lime transition-colors text-base leading-normal'
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Social & Tagline */}
            <div className='lg:col-span-1 lg:pt-8'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: entryEasing }}
                className='flex flex-col justify-between h-full'
              >
                <div className='flex space-x-4'>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-brand-deep/70 hover:text-brand-lime transition-colors p-2 hover:bg-brand-black/5 rounded-[4px]'
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>

                <p className='text-xs text-brand-deep/60 mt-auto pt-8 hidden lg:block italic'>
                  Built in silence.
                  <br />
                  Designed for scale.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className='mt-20 pt-8 border-t border-brand-deep/5 flex flex-col md:flex-row justify-between items-center'>
            <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-6'>
              <p className='text-xs text-brand-deep/60 leading-normal'>
                &copy; {new Date().getFullYear()} Ghost Savvy Studios
              </p>

              <div className='flex space-x-6 mt-2 md:mt-0'>
                <Link
                  href='/terms'
                  className='text-xs text-brand-deep/60 hover:text-brand-lime transition-colors'
                >
                  Terms of Service
                </Link>
                <Link
                  href='/privacy'
                  className='text-xs text-brand-deep/60 hover:text-brand-lime transition-colors'
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className='flex items-center mt-4 md:mt-0'>
              <select className='bg-transparent text-xs text-brand-deep/60 focus:outline-hidden'>
                <option value='en'>English (US)</option>
                <option value='fr'>Français</option>
                <option value='es'>Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
