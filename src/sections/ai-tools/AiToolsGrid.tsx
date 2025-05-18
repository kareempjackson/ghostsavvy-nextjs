"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Define TypeScript interfaces
interface Tool {
  id: string;
  name: string;
  description: string;
  price: string;
  categories: string[];
  image: string;
}

interface ToolCardProps {
  tool: Tool;
  onOpenModal: (tool: Tool) => void;
}

interface ToolDetailModalProps {
  tool: Tool;
  onClose: () => void;
}

// Categories for the tools
const categories = ["All", "Business", "Marketing", "Content", "Dev Tools"];

// Sample tools data
const toolsData: Tool[] = [
  {
    id: "pitchwhiz",
    name: "PitchWhiz",
    description: "Generate compelling investor pitches in minutes",
    price: "$29",
    categories: ["Business"],
    image: "/images/tools/pitchwhiz.png",
  },
  {
    id: "scopegenie",
    name: "ScopeGenie",
    description: "Turn vague project requests into detailed technical specs",
    price: "Pro",
    categories: ["Business", "Dev Tools"],
    image: "/images/tools/scopegenie.png",
  },
  {
    id: "contentcraft",
    name: "ContentCraft",
    description: "Craft engaging social media content that converts",
    price: "Free",
    categories: ["Marketing", "Content"],
    image: "/images/tools/contentcraft.png",
  },
  {
    id: "bugslayer",
    name: "BugSlayer",
    description: "Debug code and fix errors with AI assistance",
    price: "$49",
    categories: ["Dev Tools"],
    image: "/images/tools/bugslayer.png",
  },
  {
    id: "growthgpt",
    name: "GrowthGPT",
    description: "Data-driven marketing strategies for startups",
    price: "Pro",
    categories: ["Marketing", "Business"],
    image: "/images/tools/growthgpt.png",
  },
  {
    id: "techwizard",
    name: "TechWizard",
    description: "Technical documentation writer for complex products",
    price: "Free",
    categories: ["Content", "Dev Tools"],
    image: "/images/tools/techwizard.png",
  },
];

// Tool card component
const ToolCard = ({ tool, onOpenModal }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className='bg-brand-ivory rounded-lg overflow-hidden shadow-md transition-all duration-300 flex flex-col h-full'
    >
      <div className='relative h-48 w-full overflow-hidden'>
        <Image
          src={tool.image}
          alt={tool.name}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-105'
          priority
        />
        <div className='absolute top-2 right-2 px-3 py-1 bg-black/70 text-brand-white text-xs font-medium rounded-full backdrop-blur-sm'>
          {tool.price}
        </div>
      </div>

      <div className='p-5 flex flex-col flex-grow'>
        <h3 className='text-xl font-semibold text-brand-forest mb-2'>
          {tool.name}
        </h3>
        <p className='text-gray-600 mb-4 flex-grow'>{tool.description}</p>

        <div className='flex gap-2 mb-4'>
          {tool.categories.map((category: string) => (
            <span
              key={category}
              className='text-xs px-2 py-1 bg-brand-sage/20 text-brand-forest rounded-full'
            >
              {category}
            </span>
          ))}
        </div>

        <div className='flex gap-3 mt-auto'>
          <button
            className='flex-1 px-4 py-2 bg-brand-sage text-brand-forest text-sm font-medium rounded-md transition-all hover:bg-brand-sage/90'
            onClick={() => window.open("https://chat.openai.com/", "_blank")}
          >
            Try
          </button>
          <button
            className='flex-1 px-4 py-2 border border-brand-forest/20 text-brand-forest text-sm font-medium rounded-md transition-all hover:bg-brand-forest/5'
            onClick={() => onOpenModal(tool)}
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Tool detail modal component
const ToolDetailModal = ({ tool, onClose }: ToolDetailModalProps) => {
  if (!tool) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className='bg-brand-white rounded-xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='relative h-64 w-full'>
          <Image
            src={tool.image}
            alt={tool.name}
            fill
            className='object-cover'
          />
          <button
            className='absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors'
            onClick={onClose}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <div className='absolute bottom-4 left-4 px-4 py-2 bg-black/70 text-brand-white text-lg font-medium rounded-lg backdrop-blur-sm'>
            {tool.name}
          </div>
        </div>

        <div className='p-6'>
          <div className='flex flex-wrap gap-2 mb-6'>
            <span className='text-sm px-3 py-1 bg-brand-sage/20 text-brand-forest rounded-full font-medium'>
              {tool.price}
            </span>
            {tool.categories.map((category: string) => (
              <span
                key={category}
                className='text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full'
              >
                {category}
              </span>
            ))}
          </div>

          <h2 className='text-2xl font-semibold text-brand-forest mb-4'>
            {tool.name}
          </h2>
          <p className='text-gray-600 mb-6'>{tool.description}</p>

          <div className='mb-8'>
            <h3 className='text-lg font-medium text-brand-forest mb-3'>
              Key Use Cases
            </h3>
            <ul className='space-y-2 text-gray-600'>
              <li className='flex items-start'>
                <svg
                  className='w-5 h-5 text-brand-sage mr-2 flex-shrink-0 mt-0.5'
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
                <span>Generate custom content in seconds</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='w-5 h-5 text-brand-sage mr-2 flex-shrink-0 mt-0.5'
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
                <span>Optimize for your specific audience</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='w-5 h-5 text-brand-sage mr-2 flex-shrink-0 mt-0.5'
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
                <span>Save up to 10 hours per week on repetitive tasks</span>
              </li>
            </ul>
          </div>

          <div className='mb-8'>
            <h3 className='text-lg font-medium text-brand-forest mb-3'>Demo</h3>
            <div className='aspect-video bg-gray-100 rounded-lg flex items-center justify-center'>
              <p className='text-gray-500'>Demo video would be embedded here</p>
            </div>
          </div>

          <div className='mb-8'>
            <h3 className='text-lg font-medium text-brand-forest mb-3'>
              Pricing
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='border border-gray-200 rounded-lg p-4'>
                <h4 className='font-medium text-brand-forest'>Free Plan</h4>
                <ul className='mt-2 space-y-1 text-sm text-gray-600'>
                  <li>• 5 generations per day</li>
                  <li>• Basic features only</li>
                  <li>• No commercial usage</li>
                </ul>
              </div>
              <div className='border border-brand-sage/30 bg-brand-sage/5 rounded-lg p-4'>
                <h4 className='font-medium text-brand-forest'>Pro Plan</h4>
                <div className='text-xl font-semibold mt-1 text-brand-forest'>
                  $29/month
                </div>
                <ul className='mt-2 space-y-1 text-sm text-gray-600'>
                  <li>• Unlimited generations</li>
                  <li>• All premium features</li>
                  <li>• Commercial usage</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <button className='flex-1 px-5 py-3 bg-brand-sage text-brand-forest font-medium rounded-md hover:bg-brand-sage/90 transition-colors'>
              Get Access
            </button>
            <button
              className='flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main component
const AiToolsGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Filter tools based on active category
  const filteredTools =
    activeCategory === "All"
      ? toolsData
      : toolsData.filter((tool) => tool.categories.includes(activeCategory));

  return (
    <section id='tools' ref={sectionRef} className='py-16 sm:py-24 bg-white'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl sm:text-4xl font-semibold text-brand-forest mb-4'>
            Premium GPT Tools
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Carefully crafted intelligent assistants to help you work smarter,
            not harder.
          </p>
        </motion.div>

        {/* Categories filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex flex-wrap justify-center gap-2 mb-12'
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-brand-sage text-brand-forest"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Tools grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onOpenModal={setSelectedTool} />
          ))}
        </div>

        {/* Modal */}
        {selectedTool && (
          <ToolDetailModal
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
          />
        )}
      </div>
    </section>
  );
};

export default AiToolsGrid;
