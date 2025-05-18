export interface LabProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  icon: string;
  previewImage: string;
  link: string;
  category: string;
}

export const labProducts: LabProduct[] = [
  {
    id: "ghostwriter",
    name: "GhostWriter AI",
    tagline: "AI writing assistant for product teams",
    description:
      "An AI writing assistant specifically designed for product teams, helping with documentation, PRDs, and user stories.",
    status: "Beta",
    icon: "/images/lab/ghostwriter-icon.svg",
    previewImage: "/images/lab/ghostwriter-preview.jpg",
    link: "/savvy-lab/ghostwriter",
    category: "Productivity",
  },
  {
    id: "designsprint",
    name: "DesignSprint",
    tagline: "Virtual design sprint collaboration tool",
    description:
      "A virtual workshop platform for running remote design sprints with distributed teams.",
    status: "Launched",
    icon: "/images/lab/designsprint-icon.svg",
    previewImage: "/images/lab/designsprint-preview.jpg",
    link: "/savvy-lab/designsprint",
    category: "Collaboration",
  },
  {
    id: "promptcraft",
    name: "PromptCraft",
    tagline: "Create, test, and share AI prompts",
    description:
      "A tool for creating, testing, and sharing LLM prompts with your team to improve AI workflow efficiency.",
    status: "Coming Soon",
    icon: "/images/lab/promptcraft-icon.svg",
    previewImage: "/images/lab/promptcraft-preview.jpg",
    link: "/savvy-lab/promptcraft",
    category: "AI Tools",
  },
  {
    id: "featurelab",
    name: "FeatureLab",
    tagline: "Feature prioritization framework",
    description:
      "A data-driven tool that helps product teams prioritize features based on impact, effort, and user value.",
    status: "Beta",
    icon: "/images/lab/featurelab-icon.svg",
    previewImage: "/images/lab/featurelab-preview.jpg",
    link: "/savvy-lab/featurelab",
    category: "Product Management",
  },
  {
    id: "visualflow",
    name: "VisualFlow",
    tagline: "Generate user flows with AI",
    description:
      "AI-powered tool for creating beautiful user flows and diagrams from text descriptions.",
    status: "Coming Soon",
    icon: "/images/lab/visualflow-icon.svg",
    previewImage: "/images/lab/visualflow-preview.jpg",
    link: "/savvy-lab/visualflow",
    category: "Design Tools",
  },
  {
    id: "onbrd",
    name: "Onbrd",
    tagline: "Streamlining employee onboarding for remote-first teams",
    description:
      "An intuitive platform that helps HR teams create personalized onboarding experiences for remote employees.",
    status: "Launched",
    icon: "/images/lab/onbrd-icon.svg",
    previewImage: "/images/lab/onbrd-preview.jpg",
    link: "/savvy-lab/project/onbrd",
    category: "HR Tech",
  },
  {
    id: "undr",
    name: "Undr",
    tagline: "Reinventing data visualization for complex business insights",
    description:
      "A breakthrough data visualization platform that makes complex data accessible through innovative 3D interfaces.",
    status: "Beta",
    icon: "/images/lab/undr-icon.svg",
    previewImage: "/images/lab/undr-preview.jpg",
    link: "/savvy-lab/project/undr",
    category: "Data Visualization",
  },
  {
    id: "trekker",
    name: "Trekker",
    tagline: "Revolutionizing adventure planning for outdoor enthusiasts",
    description:
      "A comprehensive platform connecting adventure seekers with unique outdoor experiences and local guides worldwide.",
    status: "Launched",
    icon: "/images/lab/trekker-icon.svg",
    previewImage: "/images/lab/trekker-preview.jpg",
    link: "/savvy-lab/project/trekker",
    category: "Travel",
  },
  {
    id: "vynl",
    name: "Vynl",
    tagline: "Bringing music discovery back to its community roots",
    description:
      "A social music platform that connects music lovers through shared discoveries, recommendations, and live listening events.",
    status: "Beta",
    icon: "/images/lab/vynl-icon.svg",
    previewImage: "/images/lab/vynl-preview.jpg",
    link: "/savvy-lab/project/vynl",
    category: "Social",
  },
  {
    id: "licid",
    name: "Licid",
    tagline: "Simplifying licensing management for creative professionals",
    description:
      "A comprehensive platform that helps creators manage, track, and monetize their intellectual property across multiple channels.",
    status: "Launched",
    icon: "/images/lab/licid-icon.svg",
    previewImage: "/images/lab/licid-preview.jpg",
    link: "/savvy-lab/project/licid",
    category: "IP Management",
  },
  {
    id: "procur",
    name: "Procur",
    tagline: "Transforming procurement for modern businesses",
    description:
      "A streamlined procurement platform that simplifies purchasing workflows, increases transparency, and optimizes spending.",
    status: "Beta",
    icon: "/images/lab/procur-icon.svg",
    previewImage: "/images/lab/procur-preview.jpg",
    link: "/savvy-lab/project/procur",
    category: "Enterprise",
  },
  {
    id: "escro",
    name: "Escro",
    tagline: "Secure digital escrow for the modern economy",
    description:
      "A trusted platform facilitating secure transactions between parties through automated, transparent escrow services.",
    status: "Coming Soon",
    icon: "/images/lab/escro-icon.svg",
    previewImage: "/images/lab/escro-preview.jpg",
    link: "/savvy-lab/project/escro",
    category: "FinTech",
  },
  {
    id: "cmdctr",
    name: "CmdCtr",
    tagline: "Mission control for distributed engineering teams",
    description:
      "A comprehensive platform that helps engineering teams collaborate, track progress, and maintain visibility across distributed workflows.",
    status: "Beta",
    icon: "/images/lab/cmdctr-icon.svg",
    previewImage: "/images/lab/cmdctr-preview.jpg",
    link: "/savvy-lab/project/cmdctr",
    category: "Productivity",
  },
];
