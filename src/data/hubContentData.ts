interface HubContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  video?: string;
  link: string;
  ctaText: string;
}

export const hubContent: HubContentItem[] = [
  {
    id: "podcast-episode-07",
    title: "Building While Broke: How to Stay Creative Under Pressure",
    description:
      "We explore what it means to keep momentum when money, motivation, and morale are low.",
    category: "🎙️ Podcast",
    image: "/images/hub-preview.jpg", // Using a placeholder
    link: "/savvy-hub/podcast/episode-07",
    ctaText: "Listen Now",
  },
  {
    id: "article-ai-sprints",
    title: "How We Use GPT-4 to Accelerate Client Work",
    description:
      "A breakdown of our AI-first workflows and how we go from idea to prototype in days, not weeks.",
    category: "📘 Article",
    image: "/images/about-preview.jpg", // Using a placeholder
    link: "/savvy-hub/articles/ai-product-sprints",
    ctaText: "Read More",
  },
  {
    id: "build-log-trekker",
    title: "From FigJam to Functioning App in 30 Days",
    description:
      "The story behind our internal sprint to build Trekker's MVP—what worked, what didn't, and what's next.",
    category: "🛠️ Build Log",
    image: "/images/contact-preview.jpg", // Using a placeholder
    video: "/videos/ghostsavvy-reel.mp4", // Using a placeholder video
    link: "/savvy-hub/build-logs/trekker-mvp",
    ctaText: "Explore Build",
  },
];
