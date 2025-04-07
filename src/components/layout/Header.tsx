"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className='relative font-display text-sm md:text-base text-white/90 hover:text-white transition-colors duration-200 group'
    >
      {children}
      <span className='absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center' />
    </Link>
  );
};

const MenuLink = ({
  href,
  label,
  image,
  video,
  onHover,
}: {
  href: string;
  label: string;
  image?: string;
  video?: string;
  onHover: (media: { image?: string; video?: string } | null) => void;
}) => {
  return (
    <motion.div
      className='relative group z-10'
      onMouseEnter={() => onHover({ image, video })}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        href={href}
        className='relative font-display text-3xl md:text-4xl text-white/90 hover:text-white transition-colors duration-300 inline-block'
      >
        {label}
        <span className='absolute left-0 right-0 bottom-0 h-0.5 bg-[#00ff9d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left' />
      </Link>
    </motion.div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [activeMedia, setActiveMedia] = useState<{
    image?: string;
    video?: string;
  } | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Navigation items with media
  const menuItems = [
    {
      name: "Home",
      path: "/",
      video: "/videos/ghostsavvy-reel.mp4",
    },
    {
      name: "Swway",
      path: "/swway",
      video: "/videos/sway-preview.mp4",
    },
    {
      name: "Savvy Impact",
      path: "/savvy-impact",
      video: "/videos/impact-preview.mp4",
    },
    {
      name: "Savvy Lab",
      path: "/savvy-lab",
      image: "/images/lab-preview.jpg",
    },
    {
      name: "Savvy Hub",
      path: "/savvy-hub",
      image: "/images/about-preview.jpg",
    },
    {
      name: "Savvy Ventures",
      path: "/savvy-ventures",
      image: "/images/about-preview.jpg",
    },
    {
      name: "About",
      path: "/about",
      image: "/images/about-preview.jpg",
    },
    {
      name: "Start a Project",
      path: "/start-project",
      image: "/images/contact-preview.jpg",
    },
    {
      name: "Contact",
      path: "/contact",
      image: "/images/contact-preview.jpg",
    },
  ];

  // Compact nav items for header
  const mainNavItems = [
    menuItems[1], // Swway
    menuItems[2], // Savvy Impact
    menuItems[3], // Savvy Lab
    menuItems[4], // Savvy Hub
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Set scrolled state based on scroll position
      setIsScrolled(scrollPosition > 20);

      // Hide header when scrolling begins (only if menu is not open)
      if (!isMenuOpen) {
        setIsHeaderVisible(false);
      }

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        // Show header when scrolling stops (only if menu is not open)
        if (!isMenuOpen) {
          setIsHeaderVisible(true);
        }
      }, 200); // Wait 200ms after scrolling stops
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isMenuOpen]);

  // Disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      // Always show header when menu is open
      setIsHeaderVisible(true);
    } else {
      document.body.style.overflow = "";
      // Reset active media when menu is closed
      setActiveMedia(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Only display dropdown menu based on menu state, not scrolling state
  const shouldShowMenu = isMenuOpen;

  const handleMenuItemHover = (
    media: { image?: string; video?: string } | null
  ) => {
    setActiveMedia(media);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled ? "bg-black py-0" : "bg-transparent py-2"
        } ${
          isHeaderVisible || isMenuOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-[-100%] opacity-0"
        }`}
      >
        <div className='container mx-auto px-4 lg:px-10 relative'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='flex-shrink-0 -ml-6 md:-ml-8'>
              <Link href='/' className='relative z-40'>
                <div
                  className={`relative transition-all duration-500 ${
                    isScrolled
                      ? "w-[480px] h-[70px] md:w-[560px] md:h-[90px]"
                      : "w-[420px] h-[105px] md:w-[500px] md:h-[125px]"
                  }`}
                >
                  <Image
                    src='/images/ghost savvy-02.png'
                    alt='Ghost Savvy Studios'
                    fill
                    className='object-contain object-left'
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav
              className={`hidden ${
                isMenuOpen ? "xl:hidden" : "xl:flex"
              } items-center absolute left-[45%] transform -translate-x-1/2`}
            >
              <ul className='flex items-center space-x-6'>
                {mainNavItems.map((item) => (
                  <li key={item.path}>
                    <NavItem href={item.path}>{item.name}</NavItem>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Button */}
            <div className='flex items-center space-x-4'>
              {/* Start a Project Button */}
              <Link
                href='/start-project'
                className='hidden md:flex items-center px-4 py-2 bg-transparent border border-white/30 text-white rounded-[4px] text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/60 mr-2'
              >
                Start a Project
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='flex items-center space-x-3 focus:outline-none group'
                aria-label='Toggle menu'
              >
                <span className='hidden md:block text-white/70 text-sm font-display tracking-wider group-hover:text-white transition-colors duration-300'>
                  {isMenuOpen ? "Close" : "Menu"}
                </span>
                <div className='w-8 h-8 flex items-center justify-center transition-colors duration-300 group-hover:bg-white/10 rounded-full'>
                  <div className='flex flex-col justify-center items-center w-5 h-5 relative'>
                    <motion.span
                      animate={
                        isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }
                      }
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className='absolute w-5 h-[1px] bg-white'
                    />
                    <motion.span
                      animate={{
                        opacity: isMenuOpen ? 0 : 1,
                        scaleX: isMenuOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className='absolute w-5 h-[1px] bg-white'
                    />
                    <motion.span
                      animate={
                        isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }
                      }
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className='absolute w-5 h-[1px] bg-white'
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu */}
      <AnimatePresence>
        {shouldShowMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className='fixed inset-0 z-40 bg-black/95 backdrop-blur-xl overflow-hidden'
          >
            {/* Background Media */}
            <AnimatePresence>
              {activeMedia && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className='absolute inset-0 z-0 pointer-events-none'
                >
                  {activeMedia.video ? (
                    <div className='absolute inset-0 bg-black/80'>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className='w-full h-full object-cover opacity-50'
                      >
                        <source src={activeMedia.video} type='video/mp4' />
                      </video>
                    </div>
                  ) : activeMedia.image ? (
                    <div className='absolute inset-0 bg-black/80'>
                      <Image
                        src={activeMedia.image}
                        alt=''
                        fill
                        className='object-cover opacity-50'
                      />
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background Icon (always visible, with different opacity depending on active media) */}
            <div className='absolute inset-0 z-1 pointer-events-none transition-opacity duration-500'>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] opacity-[0.08]'>
                <Image
                  src='/images/ghost_savvy_icon.svg'
                  alt=''
                  fill
                  className='object-contain'
                />
              </div>
            </div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='container mx-auto px-5 lg:px-12 h-full flex flex-col relative z-10'
            >
              {/* Menu Content */}
              <div className='flex-1 grid grid-cols-1 lg:grid-cols-2 gap-16 pt-32 pb-20'>
                {/* Left Column - Menu Items */}
                <div className='flex flex-col justify-center'>
                  <motion.nav
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.2,
                        },
                      },
                    }}
                  >
                    <ul className='space-y-8'>
                      {menuItems.map((item) => (
                        <motion.li
                          key={item.path}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <MenuLink
                            href={item.path}
                            label={item.name}
                            video={item.video}
                            image={item.image}
                            onHover={handleMenuItemHover}
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.nav>
                </div>

                {/* Right Column - Preview Content */}
                <div className='hidden lg:flex items-center justify-center'>
                  {/* Preview content here (empty now since we're using full-screen backgrounds) */}
                </div>
              </div>

              {/* Footer Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='py-8 border-t border-white/5'
              >
                <div className='grid grid-cols-12 gap-8'>
                  {/* Contact & Social */}
                  <div className='col-span-12 md:col-span-4'>
                    <div className='flex items-center space-x-4'>
                      {[
                        {
                          name: "Instagram",
                          href: "#",
                          icon: (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
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
                          ),
                        },
                        {
                          name: "Twitter",
                          href: "#",
                          icon: (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
                            </svg>
                          ),
                        },
                        {
                          name: "LinkedIn",
                          href: "#",
                          icon: (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                              <rect x='2' y='9' width='4' height='12'></rect>
                              <circle cx='4' cy='4' r='2'></circle>
                            </svg>
                          ),
                        },
                      ].map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          className='text-white/40 hover:text-white transition-colors duration-300'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Subscribe Form */}
                  <div className='col-span-12 md:col-span-5'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                      className='relative'
                    >
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Subscribe to Savvy Hub'
                        className='w-full bg-transparent border-b border-white/10 px-0 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#00ff9d]/30 transition-colors text-sm font-display'
                      />
                      <button
                        type='submit'
                        className='absolute right-0 top-1/2 -translate-y-1/2 text-sm text-white/40 hover:text-[#00ff9d] transition-colors font-display tracking-wider'
                      >
                        →
                      </button>
                    </form>
                  </div>

                  {/* Legal Links */}
                  <div className='col-span-12 md:col-span-3 flex md:justify-end items-center'>
                    <div className='flex space-x-4 text-xs'>
                      <Link
                        href='/terms'
                        className='text-white/40 hover:text-white transition-colors font-display tracking-wider'
                      >
                        Terms
                      </Link>
                      <Link
                        href='/privacy'
                        className='text-white/40 hover:text-white transition-colors font-display tracking-wider'
                      >
                        Privacy
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
