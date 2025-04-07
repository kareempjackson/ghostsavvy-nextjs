"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Easing values from brand guidelines
const entryEasing = [0.0, 0.0, 0.2, 1]; // cubic-bezier(0.0, 0.0, 0.2, 1)

// Types
interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  goals: string[];
}

// Project type options
const projectTypes = [
  "Website Development",
  "Mobile Application",
  "Product Design",
  "Branding & Identity",
  "Custom Development",
  "Other",
];

// Budget options
const budgetOptions = [
  "Under $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k+",
  "Not sure yet",
];

// Timeline options
const timelineOptions = [
  "Less than 1 month",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Not sure yet",
];

// Project goals options
const goalOptions = [
  "Increase revenue",
  "Improve user experience",
  "Automate processes",
  "Enter new market",
  "Launch new product/service",
  "Rebrand/refresh",
  "Other",
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: entryEasing },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: entryEasing },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: entryEasing,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.5,
      ease: entryEasing,
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

// Text reveal animation
const textReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: entryEasing,
    },
  },
};

// Hover button animation
const hoverButtonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    backgroundColor: "rgba(44, 182, 125, 0.9)",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.97 },
};

// Floating animation for decorative elements
const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

// Custom button component
const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
}) => {
  const baseClasses =
    "px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center";

  const variants = {
    primary: "bg-brand-forest text-white hover:bg-brand-forest/90",
    secondary: "bg-brand-sage text-brand-forest hover:bg-brand-sage/90",
    ghost:
      "bg-transparent text-brand-forest border border-brand-forest hover:bg-brand-forest/10",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom hooks
const useConfetti = () => {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#2CB67D", "#61A568", "#BADA55", "#7D56A6", "#3F7CAC"];
    const pieces = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 6,
        y: Math.random() * 3 + 2,
      },
    }));

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let stillActive = false;
      pieces.forEach((piece) => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();

        piece.x += piece.velocity.x;
        piece.y += piece.velocity.y;
        piece.rotation += 2;

        if (piece.y < canvas.height) {
          stillActive = true;
        }
      });

      if (stillActive) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsActive(false);
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive]);

  return { canvasRef, startConfetti: () => setIsActive(true) };
};

export default function StartProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    goals: [],
  });
  const [submitted, setSubmitted] = useState(false);

  // Parallax effect for background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { canvasRef, startConfetti } = useConfetti();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => {
      const goals = [...prev.goals];
      if (goals.includes(goal)) {
        return { ...prev, goals: goals.filter((g) => g !== goal) };
      } else {
        return { ...prev, goals: [...goals, goal] };
      }
    });
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would send data to your backend
    setSubmitted(true);
    // Start confetti animation with a slight delay
    setTimeout(startConfetti, 300);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Welcome screen
        return true;
      case 1: // Name & Email
        return (
          !!formData.name &&
          !!formData.email &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        );
      case 2: // Project Type
        return !!formData.projectType;
      case 3: // Budget & Timeline
        return !!formData.budget && !!formData.timeline;
      case 4: // Project Description
        return !!formData.description && formData.description.length >= 10;
      case 5: // Project Goals
        return formData.goals.length > 0;
      default:
        return true;
    }
  };

  // Background parallax effect styles
  const backgroundStyles = {
    backgroundPositionX: `${50 + mousePosition.x * 10}%`,
    backgroundPositionY: `${50 + mousePosition.y * 10}%`,
  };

  // Scroll-based animations
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <main
      className='min-h-screen flex flex-col relative overflow-hidden bg-black text-white'
      ref={containerRef}
    >
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className='fixed inset-0 z-50 pointer-events-none'
      />

      {/* Decorative background elements */}
      <div className='fixed inset-0 -z-20 bg-black' />

      {/* Grid overlay */}
      <div className='fixed inset-0 -z-15 opacity-5'>
        <div className='h-full w-full bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40px_40px]'></div>
      </div>

      {/* Primary texture background with subtle noise */}
      <motion.div
        className='fixed inset-0 bg-cover bg-center -z-10 opacity-10'
        style={{
          backgroundImage: "url('/images/noise-texture.png')",
          ...backgroundStyles,
          scale: backgroundScale,
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className='fixed top-20 left-20 w-64 h-64 rounded-full bg-brand-forest opacity-5 blur-3xl -z-10'
        variants={floatAnimation}
        initial='initial'
        animate='animate'
      />

      <motion.div
        className='fixed bottom-40 right-20 w-80 h-80 rounded-full bg-brand-sage opacity-5 blur-3xl -z-10'
        variants={floatAnimation}
        initial='initial'
        animate='animate'
        style={{ animationDelay: "1s" }}
      />

      {/* Ghost logo watermark */}
      <div className='fixed right-0 bottom-0 opacity-[0.05] -z-10'>
        <Image
          src='/images/ghost_savvy_icon.svg'
          alt=''
          width={600}
          height={600}
          className='object-contain'
        />
      </div>

      {/* Animated glow lines */}
      <div className='fixed inset-0 -z-5 opacity-20 overflow-hidden'>
        <motion.div
          className='absolute h-[1px] w-[40%] bg-gradient-to-r from-transparent via-brand-sage to-transparent'
          style={{ top: "30%", left: 0 }}
          animate={{
            x: ["0%", "150%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute h-[1px] w-[60%] bg-gradient-to-r from-transparent via-brand-forest to-transparent'
          style={{ top: "60%", right: 0 }}
          animate={{
            x: ["0%", "-120%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main content */}
      <div className='flex flex-col flex-grow items-center justify-center w-full px-4 py-16'>
        <div className='w-full max-w-3xl mx-auto'>
          {/* Progress indicator */}
          {currentStep > 0 && !submitted && (
            <div className='mb-8'>
              <div className='flex justify-between items-center'>
                <button
                  onClick={prevStep}
                  className='text-white/80 flex items-center hover:text-brand-sage transition-all'
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
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                  Back
                </button>
                <div className='text-white/60 text-sm'>
                  Step {currentStep} of 6
                </div>
              </div>
              <div className='w-full bg-white/10 h-1 mt-4 rounded-full overflow-hidden'>
                <motion.div
                  className='h-full bg-brand-sage'
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 6) * 100}%` }}
                  transition={{ duration: 0.5, ease: entryEasing }}
                />
              </div>
            </div>
          )}

          {/* Form steps */}
          <div className='bg-black border border-white/10 rounded-2xl p-8 shadow-2xl min-h-[500px] flex flex-col backdrop-blur-sm'>
            <AnimatePresence mode='wait'>
              {submitted ? (
                <motion.div
                  key='success'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={fadeIn}
                  className='flex flex-col items-center justify-center text-center h-full py-16 relative'
                >
                  {/* Success animation */}
                  <motion.div
                    className='w-28 h-28 rounded-full bg-brand-sage/20 flex items-center justify-center mb-6 relative'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <motion.div
                      className='absolute inset-0 rounded-full'
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: [0.5, 1.2, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                      style={{
                        background:
                          "radial-gradient(circle, rgba(44, 182, 125, 0.3) 0%, rgba(44, 182, 125, 0) 70%)",
                      }}
                    />

                    <motion.svg
                      className='w-16 h-16 text-brand-sage'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h2
                    className='text-3xl font-semibold text-white mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    Thank You!
                  </motion.h2>

                  <motion.p
                    className='text-lg text-gray-300 mb-8 max-w-md'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    We&apos;ve received your project details and will be in
                    touch soon to discuss the next steps.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <Link href='/'>
                      <Button
                        variant='secondary'
                        className='hover:bg-brand-sage/90'
                      >
                        Return to Home
                        <svg
                          className='w-5 h-5 ml-2'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10 19l-7-7m0 0l7-7m-7 7h18'
                          />
                        </svg>
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Animated typing effect */}
                  <motion.div
                    className='absolute bottom-4 left-0 right-0 text-xs text-gray-500 flex justify-center items-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    <svg
                      className='w-3 h-3 mr-1 text-brand-sage animate-pulse'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ delay: 2.2, duration: 2 }}
                      className='overflow-hidden whitespace-nowrap'
                    >
                      Project reference: GS-
                      {Math.floor(Math.random() * 9000) + 1000}-
                      {new Date().getFullYear()}
                    </motion.span>
                  </motion.div>
                </motion.div>
              ) : currentStep === 0 ? (
                <motion.div
                  key='welcome'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={fadeIn}
                  className='flex flex-col h-full relative'
                >
                  {/* Decorative elements */}
                  <motion.div
                    className='absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-sage/5'
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className='absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-brand-forest/5'
                    animate={{
                      scale: [1, 1.08, 1],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />

                  {/* Ambient glow */}
                  <motion.div
                    className='absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-brand-sage/10 blur-3xl'
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      filter: ["blur(40px)", "blur(60px)", "blur(40px)"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className='absolute right-0 top-0 opacity-10'>
                    <svg
                      width='120'
                      height='120'
                      viewBox='0 0 120 120'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20 100L100 20M60 10V110M10 60H110'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>

                  <motion.h1
                    className='text-4xl md:text-5xl font-semibold text-white mb-6'
                    variants={textReveal}
                  >
                    Let&apos;s Build
                    <br />
                    <span className='relative'>
                      Something Amazing
                      <motion.div
                        className='absolute -bottom-2 left-0 h-1 bg-brand-sage'
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 1,
                          delay: 0.5,
                          ease: entryEasing,
                        }}
                      />
                    </span>
                  </motion.h1>

                  <motion.p
                    className='text-lg text-gray-400 mb-8'
                    variants={textReveal}
                    transition={{ delay: 0.2 }}
                  >
                    Welcome to the Ghost Savvy project builder. Tell us about
                    your vision, and we&apos;ll help bring it to life.
                  </motion.p>

                  <motion.div
                    className='flex flex-wrap gap-3 mb-8'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className='px-4 py-2 bg-white/5 rounded-full text-sm text-brand-sage'>
                      ✓ Custom Solutions
                    </div>
                    <div className='px-4 py-2 bg-white/5 rounded-full text-sm text-brand-sage'>
                      ✓ Expert Team
                    </div>
                    <div className='px-4 py-2 bg-white/5 rounded-full text-sm text-brand-sage'>
                      ✓ Transparent Process
                    </div>
                  </motion.div>

                  <motion.div
                    className='mt-auto'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <motion.button
                      onClick={nextStep}
                      initial='initial'
                      whileHover='hover'
                      whileTap='tap'
                      variants={hoverButtonVariants}
                      className='px-6 py-3 rounded-md font-medium bg-brand-sage text-black flex items-center justify-center hover:bg-brand-sage/90 transition-all'
                    >
                      Get Started
                      <motion.svg
                        className='w-5 h-5 ml-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </motion.svg>
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : currentStep === 1 ? (
                <motion.div
                  key='personal'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={stepVariants}
                  className='flex flex-col h-full relative'
                >
                  {/* Background decorative elements */}
                  <div className='absolute -top-8 -right-8 w-16 h-16 rounded-full bg-brand-forest/5 blur-md' />
                  <div className='absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-brand-sage/5 blur-md' />

                  <motion.h2
                    className='text-3xl font-semibold text-brand-forest mb-6'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    About You
                  </motion.h2>

                  <div className='space-y-6 mb-8'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label
                        htmlFor='name'
                        className='block text-gray-300 mb-2 flex items-center'
                      >
                        <span className='w-1 h-1 bg-brand-forest rounded-full mr-2'></span>
                        Your Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition-all text-white'
                        placeholder='Enter your full name'
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label
                        htmlFor='email'
                        className='block text-gray-300 mb-2 flex items-center'
                      >
                        <span className='w-1 h-1 bg-brand-forest rounded-full mr-2'></span>
                        Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition-all text-white'
                        placeholder='Enter your email address'
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label
                        htmlFor='company'
                        className='block text-gray-300 mb-2 flex items-center'
                      >
                        <span className='w-1 h-1 bg-brand-forest rounded-full mr-2'></span>
                        Company{" "}
                        <span className='text-gray-400 text-sm ml-1'>
                          (Optional)
                        </span>
                      </label>
                      <input
                        type='text'
                        id='company'
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition-all text-white'
                        placeholder='Your company or organization'
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className='mt-auto'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className='w-full'
                    >
                      Continue
                      <motion.svg
                        className='w-5 h-5 ml-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        animate={isStepValid() ? { x: [0, 4, 0] } : {}}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 5l7 7-7 7'
                        />
                      </motion.svg>
                    </Button>
                  </motion.div>
                </motion.div>
              ) : currentStep === 2 ? (
                <motion.div
                  key='projectType'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={stepVariants}
                  className='flex flex-col h-full relative'
                >
                  {/* Animated background elements */}
                  <motion.div
                    className='absolute right-0 top-0 w-40 h-40 opacity-5'
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg
                      viewBox='0 0 100 100'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='50'
                        cy='50'
                        r='40'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <path
                        d='M50 10V90'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <path
                        d='M10 50H90'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <circle
                        cx='50'
                        cy='50'
                        r='20'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                  </motion.div>

                  <motion.h2
                    className='text-3xl font-semibold text-brand-forest mb-6'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    What can we help you with?
                  </motion.h2>

                  <motion.p
                    className='text-gray-300 mb-6'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Select the type of project you&apos;re looking to build.
                  </motion.p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
                    {projectTypes.map((type, index) => (
                      <motion.div
                        key={type}
                        onClick={() =>
                          setFormData({ ...formData, projectType: type })
                        }
                        className={`p-5 border rounded-lg cursor-pointer transition-all ${
                          formData.projectType === type
                            ? "border-brand-forest bg-brand-forest/5"
                            : "border-gray-200 hover:border-brand-forest/30"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + index * 0.1,
                        }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className='flex items-center'>
                          <div
                            className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center transition-all ${
                              formData.projectType === type
                                ? "border-brand-forest bg-brand-forest"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.projectType === type && (
                              <motion.div
                                className='w-2 h-2 rounded-full bg-white'
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </div>
                          <span className='text-gray-800'>{type}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className='mt-auto'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className='w-full'
                    >
                      Continue
                      <motion.svg
                        className='w-5 h-5 ml-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        animate={isStepValid() ? { x: [0, 4, 0] } : {}}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 5l7 7-7 7'
                        />
                      </motion.svg>
                    </Button>
                  </motion.div>
                </motion.div>
              ) : currentStep === 3 ? (
                <motion.div
                  key='budgetTimeline'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={stepVariants}
                  className='flex flex-col h-full relative'
                >
                  {/* Background decorative elements */}
                  <motion.div
                    className='absolute -right-5 top-10 opacity-5'
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg
                      width='120'
                      height='120'
                      viewBox='0 0 120 120'
                      fill='none'
                    >
                      <circle
                        cx='60'
                        cy='60'
                        r='59'
                        stroke='currentColor'
                        strokeWidth='1'
                      />
                      <circle
                        cx='60'
                        cy='60'
                        r='40'
                        stroke='currentColor'
                        strokeWidth='1'
                      />
                    </svg>
                  </motion.div>

                  <motion.h2
                    className='text-3xl font-semibold text-white mb-6'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Budget & Timeline
                  </motion.h2>

                  <div className='space-y-8 mb-8'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3 className='text-lg font-medium text-gray-300 mb-3 flex items-center'>
                        <span className='w-2 h-2 bg-brand-sage rounded-full mr-2'></span>
                        What&apos;s your estimated budget?
                      </h3>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        {budgetOptions.map((option, index) => (
                          <motion.div
                            key={option}
                            onClick={() =>
                              setFormData({ ...formData, budget: option })
                            }
                            className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                              formData.budget === option
                                ? "border-brand-sage bg-brand-sage/10"
                                : "border-white/10 hover:border-brand-sage/30"
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.2 + index * 0.05,
                            }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className='text-gray-300'>{option}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h3 className='text-lg font-medium text-gray-300 mb-3 flex items-center'>
                        <span className='w-2 h-2 bg-brand-sage rounded-full mr-2'></span>
                        When do you need this completed?
                      </h3>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        {timelineOptions.map((option, index) => (
                          <motion.div
                            key={option}
                            onClick={() =>
                              setFormData({ ...formData, timeline: option })
                            }
                            className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                              formData.timeline === option
                                ? "border-brand-sage bg-brand-sage/10"
                                : "border-white/10 hover:border-brand-sage/30"
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.4 + index * 0.05,
                            }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className='text-gray-300'>{option}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className='mt-auto'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className='w-full'
                      variant='secondary'
                    >
                      Continue
                      <motion.svg
                        className='w-5 h-5 ml-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        animate={isStepValid() ? { x: [0, 4, 0] } : {}}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 5l7 7-7 7'
                        />
                      </motion.svg>
                    </Button>
                  </motion.div>
                </motion.div>
              ) : currentStep === 4 ? (
                <motion.div
                  key='description'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={stepVariants}
                  className='flex flex-col h-full relative'
                >
                  {/* Animated background element */}
                  <motion.div
                    className='absolute -top-10 -left-10 w-40 h-40 opacity-5'
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg viewBox='0 0 100 100' fill='none'>
                      <path
                        d='M10 50C10 27.9086 27.9086 10 50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50Z'
                        stroke='currentColor'
                        strokeWidth='1'
                      />
                      <path
                        d='M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z'
                        stroke='currentColor'
                        strokeWidth='1'
                      />
                    </svg>
                  </motion.div>

                  <motion.h2
                    className='text-3xl font-semibold text-white mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Project Description
                  </motion.h2>

                  <motion.p
                    className='text-gray-300 mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Tell us about your vision and what you&apos;re looking to
                    achieve.
                  </motion.p>

                  <motion.div
                    className='mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label
                      htmlFor='description'
                      className='block text-gray-300 mb-2 flex items-center'
                    >
                      <span className='w-2 h-2 bg-brand-sage rounded-full mr-2'></span>
                      Tell us more about your project
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      value={formData.description}
                      onChange={handleChange}
                      rows={8}
                      className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition-all resize-none text-white'
                      placeholder="Describe your project, key features, and what you're looking to achieve..."
                    ></textarea>
                    <div className='text-sm text-gray-500 mt-2 flex justify-between items-center'>
                      <div>
                        <span>{formData.description.length}</span> characters
                      </div>
                      <motion.div
                        animate={{
                          opacity: isStepValid() ? 1 : 0.5,
                          scale: isStepValid() ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                          duration: 1,
                          repeat: isStepValid() ? Infinity : 0,
                          repeatDelay: 2,
                        }}
                        className={`px-2 py-1 rounded text-xs ${isStepValid() ? "text-brand-sage" : "text-gray-400"}`}
                      >
                        {isStepValid()
                          ? "✓ Good to go!"
                          : "Please provide more details"}
                      </motion.div>
                    </div>
                  </motion.div>

                  {formData.description.length > 0 && (
                    <motion.div
                      className='flex gap-2 flex-wrap mb-4'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 1 }}
                    >
                      <div className='text-xs text-gray-500'>Keywords:</div>
                      {formData.description
                        .toLowerCase()
                        .split(/\s+/)
                        .filter((word) => word.length > 5)
                        .filter((word, i, arr) => arr.indexOf(word) === i)
                        .slice(0, 5)
                        .map((word) => (
                          <div
                            key={word}
                            className='text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400'
                          >
                            {word}
                          </div>
                        ))}
                    </motion.div>
                  )}

                  <motion.div
                    className='mt-auto'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      variant='secondary'
                      className='w-full'
                    >
                      Continue
                      <motion.svg
                        className='w-5 h-5 ml-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        animate={isStepValid() ? { x: [0, 4, 0] } : {}}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 5l7 7-7 7'
                        />
                      </motion.svg>
                    </Button>
                  </motion.div>
                </motion.div>
              ) : currentStep === 5 ? (
                <motion.div
                  key='goals'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={stepVariants}
                  className='flex flex-col h-full relative'
                >
                  {/* Animated background patterns */}
                  <div className='absolute inset-0 overflow-hidden opacity-10 pointer-events-none'>
                    <motion.div
                      className='absolute top-10 right-10 w-60 h-60'
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <svg
                        viewBox='0 0 100 100'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          cx='50'
                          cy='50'
                          r='35'
                          stroke='currentColor'
                          strokeWidth='0.5'
                        />
                        <circle
                          cx='50'
                          cy='50'
                          r='45'
                          stroke='currentColor'
                          strokeWidth='0.5'
                        />
                        <circle
                          cx='50'
                          cy='50'
                          r='25'
                          stroke='currentColor'
                          strokeWidth='0.5'
                        />
                        <circle
                          cx='50'
                          cy='50'
                          r='15'
                          stroke='currentColor'
                          strokeWidth='0.5'
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <motion.h2
                    className='text-3xl font-semibold text-white mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Project Goals
                  </motion.h2>

                  <motion.p
                    className='text-gray-300 mb-6'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    What are your primary goals for this project? (Select all
                    that apply)
                  </motion.p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-8'>
                    {goalOptions.map((goal, index) => (
                      <motion.div
                        key={goal}
                        onClick={() => handleGoalToggle(goal)}
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          formData.goals.includes(goal)
                            ? "border-brand-sage bg-brand-sage/10"
                            : "border-white/10 hover:border-brand-sage/30"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + index * 0.1,
                        }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className='flex items-center'>
                          <div
                            className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center transition-all ${
                              formData.goals.includes(goal)
                                ? "border-brand-sage bg-brand-sage"
                                : "border-gray-500"
                            }`}
                          >
                            {formData.goals.includes(goal) && (
                              <motion.svg
                                className='w-3 h-3 text-black'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                  clipRule='evenodd'
                                />
                              </motion.svg>
                            )}
                          </div>
                          <span className='text-white'>{goal}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {formData.goals.length > 0 && (
                    <motion.div
                      className='mb-8 p-4 bg-brand-sage/5 rounded-lg border border-brand-sage/20'
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className='text-sm font-medium text-brand-sage mb-2'>
                        Selected Goals:
                      </h3>
                      <div className='flex flex-wrap gap-2'>
                        {formData.goals.map((goal) => (
                          <motion.div
                            key={goal}
                            className='px-3 py-1 bg-black/30 rounded-full text-xs flex items-center border border-brand-sage/20'
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            layout
                          >
                            {goal}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleGoalToggle(goal);
                              }}
                              className='ml-2 text-gray-400 hover:text-red-500 transition-colors'
                            >
                              ×
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    className='mt-auto'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      disabled={!isStepValid()}
                      className='w-full bg-brand-sage hover:bg-brand-sage/90 text-black font-semibold'
                    >
                      Submit Project Request
                      <motion.svg
                        className='w-5 h-5 ml-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 5l7 7-7 7M5 12h15'
                        />
                      </motion.svg>
                    </Button>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
