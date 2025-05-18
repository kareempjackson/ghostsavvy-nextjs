export interface Project {
  id: string;
  title: string;
  hook: string; // One-line impact
  description: string;
  tags: string[];
  link: string; // Link to the specific project page/case study
  image: string;
  video?: string;
  featured?: boolean;
  featuredHome?: boolean;
  size?: "small" | "medium" | "large";
  category: "User-Centered Design" | "Engineered Solutions"; // Add category for filtering
}

// Replace with specific projects for the Savvy Impact page
export const hardcodedProjects: Project[] = [
  // --- User-Centered Design ---
  {
    id: "trekker",
    title: "Trekker",
    hook: "Empowering digital nomads through community & finance tools.",
    description:
      "From financial tools to community features, Trekker empowers remote workers to manage their money, connections, and freedom.",
    tags: ["Social Design", "Fintech", "Community"],
    link: "/projects/trekker", // Update with actual case study link if different
    image: "/images/hub-preview.jpg", // Placeholder - replace with actual image
    video: "/videos/ghostsavvy-reel.mp4", // Placeholder video
    size: "large",
    category: "User-Centered Design",
  },
  {
    id: "medz",
    title: "Medz",
    hook: "Streamlining access to wellness through intuitive design.",
    description:
      "Medz needed a modern delivery experience for medical cannabis. We delivered a product that's intuitive, secure, and scalable.",
    tags: ["Healthcare", "E-commerce", "Accessibility"],
    link: "/projects/medz",
    image: "/images/contact-preview.jpg", // Placeholder
    size: "medium",
    category: "User-Centered Design",
  },
  {
    id: "lore",
    title: "Lore Brand",
    hook: "Turning brand values into tangible visual behaviors.",
    description:
      "We helped Lore craft an identity system that resonates with its audience across digital and physical touchpoints.",
    tags: ["Branding", "UX Strategy", "Identity"],
    link: "/projects/lore",
    image: "/images/about-preview.jpg", // Placeholder
    size: "medium",
    category: "User-Centered Design",
  },
  {
    id: "licid",
    title: "Licid",
    hook: "Building creator empathy into a platform for artists.",
    description:
      "A platform designed around the needs of modern creators, focusing on fair compensation and community building.",
    tags: ["Creator Economy", "Web3", "UX Research"],
    link: "/projects/licid",
    image: "/images/placeholder-project-4.jpg", // Placeholder
    size: "small",
    category: "User-Centered Design",
  },
  // New projects
  {
    id: "michmosh-world",
    title: "Michmosh World",
    hook: "Crafting a distinctive digital identity for a unique clothing brand.",
    description:
      "A vibrant digital platform for Elee + Michmosh clothing brand that showcases their unique aesthetic and connects with their creative audience.",
    tags: ["Fashion", "E-commerce", "Brand Identity"],
    link: "/savvy-impact/project/michmosh-world",
    image: "/images/projects/placeholder-1.jpg",
    size: "medium",
    category: "User-Centered Design",
  },
  {
    id: "amh-project-solutions",
    title: "AMH Project Solutions",
    hook: "Streamlining project management through intuitive digital tools.",
    description:
      "A comprehensive project management platform designed to simplify complex workflows and enhance team collaboration.",
    tags: ["Project Management", "Enterprise", "UX Design"],
    link: "/savvy-impact/project/amh-project-solutions",
    image: "/images/projects/placeholder-2.jpg",
    size: "large",
    category: "Engineered Solutions",
  },
  {
    id: "medellin-dental-solutions",
    title: "Medellin Dental Solutions",
    hook: "Reimagining the dental care experience through digital innovation.",
    description:
      "A patient-centered platform connecting international patients with premium dental care services in Medellin, Colombia.",
    tags: ["Healthcare", "Multilingual", "Service Design"],
    link: "/savvy-impact/project/medellin-dental-solutions",
    image: "/images/projects/medz.jpg",
    size: "medium",
    category: "User-Centered Design",
  },
  {
    id: "ivory-bridge-group",
    title: "Ivory Bridge Group",
    hook: "Building digital bridges for international business development.",
    description:
      "A sophisticated digital presence for a consultancy specializing in connecting businesses across international markets.",
    tags: ["Consulting", "Business", "International"],
    link: "/savvy-impact/project/ivory-bridge-group",
    image: "/images/projects/placeholder-3.jpg",
    size: "medium",
    category: "Engineered Solutions",
  },
  {
    id: "lets-chill",
    title: "Let's Chill",
    hook: "Creating meaningful connections in a digital-first world.",
    description:
      "A social platform designed to help people discover and plan in-person activities with friends and like-minded individuals.",
    tags: ["Social", "Mobile App", "UX Research"],
    link: "/savvy-impact/project/lets-chill",
    image: "/images/projects/placeholder-4.jpg",
    size: "large",
    category: "User-Centered Design",
  },
  {
    id: "hava-haul",
    title: "Hava Haul",
    hook: "Revolutionizing logistics through user-centered design.",
    description:
      "A comprehensive logistics platform connecting shippers with carriers, optimized for efficiency and transparency.",
    tags: ["Logistics", "Transportation", "Marketplace"],
    link: "/savvy-impact/project/hava-haul",
    image: "/images/projects/placeholder-9.jpg",
    size: "medium",
    category: "Engineered Solutions",
  },
  {
    id: "psychologists-for-racial-justice",
    title: "Psychologists For Racial Justice",
    hook: "Amplifying advocacy through strategic digital presence.",
    description:
      "A purpose-driven platform for mental health professionals committed to advancing racial justice and equity in healthcare.",
    tags: ["Advocacy", "Mental Health", "Social Impact"],
    link: "/savvy-impact/project/psychologists-for-racial-justice",
    image: "/images/projects/placeholder-10.jpg",
    size: "medium",
    category: "User-Centered Design",
  },
  {
    id: "higher-level-accounting",
    title: "Higher Level Accounting",
    hook: "Elevating financial services through brand-focused design.",
    description:
      "A premium brand identity and digital presence for an accounting firm specializing in high-growth businesses.",
    tags: ["Finance", "Brand Identity", "Professional Services"],
    link: "/savvy-impact/project/higher-level-accounting",
    image: "/images/projects/placeholder-11.jpg",
    size: "small",
    category: "User-Centered Design",
  },
  {
    id: "lore-filmmaker",
    title: "Lore Filmmaker",
    hook: "Capturing creative vision through immersive digital storytelling.",
    description:
      "An innovative portfolio platform for a documentary filmmaker, designed to showcase their work and creative process.",
    tags: ["Film", "Portfolio", "Multimedia"],
    link: "/savvy-impact/project/lore-filmmaker",
    image: "/images/projects/lore-brand.jpg",
    size: "large",
    category: "User-Centered Design",
  },
  // --- Engineered Solutions ---
  {
    id: "swway",
    title: "Swway",
    hook: "Engineering a scalable SaaS engine for market insights.",
    description:
      "Architecting a robust platform for real-time market data analysis and visualization.",
    tags: ["SaaS", "Data Architecture", "Performance"],
    link: "/projects/swway",
    image: "/images/placeholder-project-5.jpg", // Placeholder
    size: "medium",
    category: "Engineered Solutions",
  },
  {
    id: "procur",
    title: "Procur",
    hook: "Designing a high-performance marketplace infrastructure.",
    description:
      "Building the backend systems for a complex procurement marketplace, ensuring reliability and speed.",
    tags: ["Marketplace", "Backend", "API Design"],
    link: "/projects/procur",
    image: "/images/placeholder-project-6.jpg", // Placeholder
    size: "large",
    category: "Engineered Solutions",
  },
  {
    id: "onbrd",
    title: "Onbrd",
    hook: "Developing seamless workflow systems for user onboarding.",
    description:
      "Creating automated and personalized onboarding flows to improve user activation and retention.",
    tags: ["Automation", "Workflow", "User Activation"],
    link: "/projects/onbrd",
    image: "/images/placeholder-project-7.jpg", // Placeholder
    size: "medium",
    category: "Engineered Solutions",
  },
  {
    id: "undr",
    title: "UNDR",
    hook: "Crafting resilient fintech infrastructure for secure transactions.",
    description:
      "Building the secure and scalable financial transaction backbone for a next-generation payment platform.",
    tags: ["Fintech", "Infrastructure", "Security"],
    link: "/projects/undr",
    image: "/images/placeholder-project-8.jpg", // Placeholder
    size: "small",
    category: "Engineered Solutions",
  },
];
