import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ghostsavvy.com";

// Main static routes in the application
const routes = [
  "",
  "/savvy-impact",
  "/savvy-lab",
  "/savvy-ventures",
  "/savvy-hub",
  "/ai-services",
  "/about",
  "/contact",
  "/start-project",
  "/savvy-hub/podcast",
  "/savvy-hub/blog",
  "/savvy-hub/video",
];

// TODO: Add dynamic routes from your Sanity CMS
// This would normally fetch all blog posts, podcasts, projects, etc.
const dynamicRoutes: string[] = [
  // Example dynamic routes - replace with actual data from Sanity
  "/savvy-hub/podcast/episode-07",
  "/savvy-hub/articles/ai-product-sprints",
  "/savvy-hub/build-logs/trekker-mvp",
];

// Define valid changeFrequency types
type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === ""
        ? ("weekly" as ChangeFrequency)
        : ("monthly" as ChangeFrequency),
    priority: route === "" ? 1 : 0.8,
  }));

  const dynamicSitemapEntries = dynamicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as ChangeFrequency,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicSitemapEntries];
}
