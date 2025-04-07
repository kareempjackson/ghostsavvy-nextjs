import { Project } from "@/types";

export const featuredProjects: Project[] = [
  {
    id: "lore-brand",
    title: "Lore Brand",
    hook: "Turning values into visuals.",
    description:
      "We helped Lore craft an identity system that resonates with its audience across digital and physical touchpoints.",
    tags: ["Branding", "User-Centric Vision"],
    image: "/images/about-preview.jpg",
    link: "/impact/lore-brand",
  },
  {
    id: "trekker",
    title: "Trekker",
    hook: "Built for digital nomads.",
    description:
      "From financial tools to community features, Trekker empowers remote workers to manage their money, connections, and freedom.",
    tags: ["MVP Sprint", "AI Integration"],
    image: "/images/hub-preview.jpg",
    video: "/videos/ghostsavvy-reel.mp4",
    link: "/impact/trekker",
  },
  {
    id: "medz",
    title: "Medz",
    hook: "Streamlining access to wellness.",
    description:
      "Medz needed a modern delivery experience for medical cannabis. We delivered a product that's intuitive, secure, and scalable.",
    tags: ["Product Design", "E-commerce", "Compliance"],
    image: "/images/contact-preview.jpg",
    link: "/impact/medz",
  },
];
