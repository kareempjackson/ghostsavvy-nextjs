/**
 * Script to create a proper sample hub content article
 * Run with: node scripts/create-hub-sample.js
 */

const { createClient } = require("@sanity/client");
require("dotenv").config({ path: ".env.local" });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-05-03",
  useCdn: false,
});

// Create a proper hubContent article
async function createSampleArticle() {
  try {
    console.log("Creating sample Hub article...");

    // First, delete existing test document if it exists
    try {
      await client.delete("Nxmef2JAguYfwqsJMn29Yg"); // ID of the test document we created earlier
      console.log("Deleted existing test document");
    } catch (error) {
      // Ignore errors if document doesn't exist
      console.log("No existing test document found or unable to delete");
    }

    // Create a new complete article
    const result = await client.create({
      _type: "hubContent",
      id: "article-001",
      title: "Building Effective Digital Products",
      description:
        "Insights on creating successful digital products that solve real user problems.",
      category: "Article",
      slug: {
        _type: "slug",
        current: "building-effective-digital-products",
      },
      link: "/hub/article/building-effective-digital-products",
      ctaText: "Read Article",
      date: new Date().toISOString().split("T")[0],
      size: "medium",
      featured: true,
      featuredPosition: 1,
      readTime: 7,
      fullContent: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Digital products are the backbone of modern businesses, serving as crucial touchpoints between companies and their users. Creating effective digital products requires a deep understanding of user needs, technical capabilities, and business goals.",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          style: "h2",
          children: [
            {
              _type: "span",
              text: "Understanding User Needs",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "The foundation of any successful digital product is a thorough understanding of user needs. This involves comprehensive research, user interviews, and testing to identify pain points and opportunities for improvement.",
            },
          ],
          markDefs: [],
        },
      ],
      excerpt:
        "Learn key strategies for building digital products that truly address user needs and drive business value.",
      authors: [],
      tags: ["Product Design", "UX", "Digital Strategy", "Development"],
      seo: {
        metaTitle: "Building Effective Digital Products | Ghost Savvy Studios",
        metaDescription:
          "Learn key strategies for building digital products that truly address user needs and deliver business value.",
      },
    });

    console.log("Sample Hub article created successfully:", result._id);
  } catch (error) {
    console.error("Failed to create sample article:", error.message);
  }
}

// Run the function
createSampleArticle();
