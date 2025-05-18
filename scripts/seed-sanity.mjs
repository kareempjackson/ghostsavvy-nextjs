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

// Main seeding function
async function seedSanity() {
  console.log("Starting Sanity seeding process...");

  // Seed Insights (Blog Posts)
  await seedDocuments(generateInsights(), "blogPost");

  console.log("Sanity seeding completed!");
}

seedSanity();

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
    seedSanity()
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
    seedSanity()
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

export { seedSanity };
