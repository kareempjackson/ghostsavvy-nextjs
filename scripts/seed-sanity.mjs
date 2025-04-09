/**
 * Sanity Seeding Script
 *
 * This script seeds the Sanity CMS with initial content for development and testing.
 * Run this script with: npm run seed-sanity
 *
 * Prerequisites:
 * - @sanity/client installed (npm install @sanity/client)
 * - SANITY_TOKEN environment variable set with write permissions
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // Get this from sanity.io/manage
  apiVersion: "2023-05-03",
  useCdn: false,
});

// Helper to create a slug
const createSlug = (text) => ({
  _type: "slug",
  current: text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""),
});

const generateLabProducts = () => [
  {
    _type: "labProduct",
    id: "cmdctr",
    name: "CMD CTR",
    tagline: "Command Center for Modern Development",
    description:
      "A powerful development environment with integrated tools for code organization, testing, and deployment.",
    status: "Beta",
    category: "developers",
    highlight: "Boosts developer productivity by 40%",
    link: "/savvy-lab/cmdctr",
    featured: true,
    featuredHome: true,
    slug: createSlug("cmdctr"),
    sortOrder: 1,
  },
  {
    _type: "labProduct",
    id: "vynl",
    name: "Vynl",
    tagline: "Music Discovery Reimagined",
    description:
      "AI-powered music discovery platform that analyzes your taste and introduces you to new artists.",
    status: "Live",
    category: "everyone",
    highlight: "10M+ Monthly Active Users",
    link: "/savvy-lab/vynl",
    featured: true,
    slug: createSlug("vynl"),
    sortOrder: 2,
  },
  {
    _type: "labProduct",
    id: "trekker",
    name: "Trekker",
    tagline: "Personalized Adventure Planning",
    description:
      "Smart travel planning assistant that creates custom itineraries based on your preferences and travel style.",
    status: "Live",
    category: "everyone",
    highlight: "5M+ Trips Planned",
    link: "/savvy-lab/trekker",
    featured: false,
    slug: createSlug("trekker"),
    sortOrder: 3,
  },
  {
    _type: "labProduct",
    id: "procur",
    name: "Procur",
    tagline: "Developer Toolkit for Rapid Prototyping",
    description:
      "Developer toolkit that streamlines the process of prototyping and deploying applications.",
    status: "Beta",
    category: "developers",
    highlight: "95+ Open Source Integrations",
    link: "/savvy-lab/procur",
    featured: true,
    slug: createSlug("procur"),
    sortOrder: 4,
  },
  {
    _type: "labProduct",
    id: "ghostkit",
    name: "GhostKit",
    tagline: "Design System Starter Kit",
    description:
      "Comprehensive design system starter kit for teams building modern web and mobile applications.",
    status: "Live",
    category: "creators",
    highlight: "Used by 15,000+ Designers",
    link: "/savvy-lab/ghostkit",
    featured: false,
    slug: createSlug("ghostkit"),
    sortOrder: 5,
  },
  {
    _type: "labProduct",
    id: "ghyst",
    name: "Ghyst",
    tagline: "AI Content Creation Assistant",
    description:
      "AI assistant for content creators that helps brainstorm ideas, outline content, and optimize for engagement.",
    status: "Beta",
    category: "creators",
    highlight: "Creates content in 50+ tones",
    link: "/savvy-lab/ghyst",
    featured: false,
    slug: createSlug("ghyst"),
    sortOrder: 6,
  },
  {
    _type: "labProduct",
    id: "onbrd",
    name: "Onbrd",
    tagline: "User Onboarding Automation",
    description:
      "Complete user onboarding solution that helps product teams create, test, and optimize onboarding experiences.",
    status: "Live",
    category: "developers",
    highlight: "Increases activation by 35%",
    link: "/savvy-lab/onbrd",
    featured: false,
    slug: createSlug("onbrd"),
    sortOrder: 7,
  },
  {
    _type: "labProduct",
    id: "undr",
    name: "Undr",
    tagline: "Immersive Audio Experience",
    description:
      "Spatial audio platform for creating immersive soundscapes and interactive storytelling experiences.",
    status: "Beta",
    category: "everyone",
    highlight: "8.5M Downloads",
    link: "/savvy-lab/undr",
    featured: true,
    slug: createSlug("undr"),
    sortOrder: 8,
  },
];

// Generate insights without team member references
const generateInsights = () => [
  {
    _type: "blogPost",
    title: "The Rise of AI-Assisted Design Tools",
    subtitle: "How artificial intelligence is transforming creative workflows",
    slug: createSlug("ai-assisted-design-tools"),
    mainImage: {
      _type: "image",
      asset: null,
    },
    categories: ["Design", "AI & Technology"],
    publishedAt: new Date().toISOString(),
    excerpt:
      "AI-powered design tools are revolutionizing how designers work, from automating repetitive tasks to generating creative variations and improving accessibility.",
    estimatedReadingTime: 7,
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Design tools have come a long way from simple digital drawing applications to sophisticated AI-assisted platforms...",
          },
        ],
      },
    ],
    tags: ["AI", "Design Tools", "Creative Workflow", "Productivity"],
    featured: true,
    featuredPosition: 3,
  },
  {
    _type: "blogPost",
    title: "Building Scalable Design Systems for Enterprise",
    subtitle:
      "Strategies for creating design systems that grow with your organization",
    slug: createSlug("scalable-design-systems-enterprise"),
    mainImage: {
      _type: "image",
      asset: null,
    },
    categories: ["Design", "Product"],
    publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    excerpt:
      "Learn how to build and maintain design systems that can scale across large organizations while maintaining consistency and enabling innovation.",
    estimatedReadingTime: 9,
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Enterprise design systems face unique challenges around scale, governance, and cross-team collaboration...",
          },
        ],
      },
    ],
    tags: [
      "Design Systems",
      "Enterprise",
      "Scalability",
      "Component Libraries",
    ],
    featured: false,
  },
];

// Seed function for a document type
async function seedDocuments(documents, documentType) {
  console.log(`Seeding ${documentType}...`);
  const results = [];

  for (const doc of documents) {
    try {
      const result = await client.create(doc);
      console.log(`Created ${documentType}: ${result._id}`);
      results.push(result);
    } catch (error) {
      console.error(`Failed to create ${documentType}:`, error.message);
    }
  }

  return results;
}

// Main seeding function - simplified to just seed lab products
async function seedLabProducts() {
  console.log("Starting to seed Savvy Lab products...");

  try {
    const labProducts = await seedDocuments(
      generateLabProducts(),
      "lab products"
    );

    console.log("Lab products seeding completed!");
    return { labProducts };
  } catch (error) {
    console.error("Lab products seeding failed:", error);
    throw error;
  }
}

// Main seeding function for insights
async function seedInsights() {
  console.log("Starting to seed insights...");

  try {
    const insights = await seedDocuments(generateInsights(), "insights");

    console.log("Insights seeding completed!");
    return { insights };
  } catch (error) {
    console.error("Insights seeding failed:", error);
    throw error;
  }
}

// Using a different check for ES modules
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);
console.log("Is main module:", isMainModule);

if (isMainModule) {
  console.log("Running as main module");

  if (!process.env.SANITY_API_TOKEN) {
    console.error("ERROR: SANITY_API_TOKEN environment variable is required");
    console.log("You can get a token from https://www.sanity.io/manage");
    process.exit(1);
  }

  // Choose which function to run based on argument
  const functionToRun = process.argv[2] || "all";

  if (functionToRun === "lab-products" || functionToRun === "all") {
    seedLabProducts()
      .then((result) => {
        console.log("Lab products seeding completed!", result);

        if (functionToRun !== "all") {
          process.exit(0);
        }
      })
      .catch((err) => {
        console.error("Lab products seeding failed:", err);
        if (functionToRun !== "all") {
          process.exit(1);
        }
      });
  }

  if (functionToRun === "insights" || functionToRun === "all") {
    seedInsights()
      .then((result) => {
        console.log("Insights seeding completed!", result);
        process.exit(0);
      })
      .catch((err) => {
        console.error("Insights seeding failed:", err);
        process.exit(1);
      });
  }
} else {
  console.log("Not running as main module");
}

export { seedLabProducts, seedInsights };
