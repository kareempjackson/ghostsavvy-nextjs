"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Easing values from brand guidelines
  const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

  return (
    <footer className='relative bg-brand-black text-brand-white'>
      {/* Top border line */}
      <div className='w-full h-px bg-brand-white/10'></div>

      <div className='container-custom pb-12 sm:pb-16 md:pb-20 pt-16 sm:pt-20 md:pt-28 relative z-10'>
        {/* Main content sections */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-16 md:gap-20'>
          {/* Logo column - moderately sized */}
          <div className='col-span-1 md:col-span-4'>
            <Link href='/'>
              <motion.img
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: entryEasing }}
                src='/images/ghost savvy-02.png'
                alt='Ghost Savvy Studios'
                className='h-28 sm:h-32 md:h-40 w-auto'
              />
            </Link>
            <p className='text-brand-white/60 mt-4 sm:mt-6 text-sm leading-relaxed max-w-xs'>
              We design and develop digital products that solve real-world
              problems while maintaining your brand&apos;s anonymity.
            </p>
          </div>

          {/* Links section */}
          <div className='col-span-1 md:col-span-8'>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-14'>
              {/* Navigation Links */}
              <div>
                <h3 className='text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 font-medium text-brand-white tracking-wider uppercase'>
                  Navigation
                </h3>
                <ul className='space-y-3 sm:space-y-4'>
                  {[
                    { name: "About", href: "/about" },
                    { name: "Contact", href: "/contact" },
                    { name: "Projects", href: "/work" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <span className='text-brand-white/60 hover:text-brand-lime transition-colors duration-300 text-sm leading-[1.5]'>
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Links */}
              <div>
                <h3 className='text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 font-medium text-brand-white tracking-wider uppercase'>
                  Products
                </h3>
                <ul className='space-y-3 sm:space-y-4'>
                  {[
                    { name: "Savvy Hub", href: "/savvy-hub" },
                    { name: "Savvy Impact", href: "/savvy-impact" },
                    { name: "Swway", href: "/swway" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <span className='text-brand-white/60 hover:text-brand-lime transition-colors duration-300 text-sm leading-[1.5]'>
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className='col-span-2 sm:col-span-1 mt-6 sm:mt-0'>
                <h3 className='text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 font-medium text-brand-white tracking-wider uppercase'>
                  Connect
                </h3>
                <ul className='space-y-3 sm:space-y-4'>
                  {[
                    { name: "Instagram", href: "https://instagram.com" },
                    { name: "Twitter", href: "https://twitter.com" },
                    { name: "LinkedIn", href: "https://linkedin.com" },
                  ].map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span className='text-brand-white/60 hover:text-brand-lime transition-colors duration-300 text-sm leading-[1.5]'>
                          {item.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with location and copyright */}
        <div className='mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 md:pt-12 border-t border-brand-white/5 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10'>
          {/* Location */}
          <div className='col-span-1 md:col-span-4'>
            <h3 className='text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6 font-medium text-brand-white tracking-wider uppercase'>
              New York
            </h3>
            <address className='not-italic text-brand-white/60 text-sm leading-[1.5]'>
              123 Design District
              <br />
              Suite 456
              <br />
              New York, NY 10001
            </address>
          </div>

          {/* Copyright centered on mobile, right-aligned on desktop */}
          <div className='col-span-1 md:col-span-8 flex flex-col items-start md:items-end justify-end mt-8 md:mt-0'>
            <div className='text-left md:text-right'>
              <p className='text-brand-white/40 text-sm mb-4 leading-[1.5]'>
                © {currentYear} Ghost Savvy Studios. All rights reserved.
              </p>
              <div className='flex space-x-8'>
                <Link
                  href='/privacy'
                  className='text-brand-white/60 hover:text-brand-lime transition-colors duration-300 text-sm'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='text-brand-white/60 hover:text-brand-lime transition-colors duration-300 text-sm'
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
