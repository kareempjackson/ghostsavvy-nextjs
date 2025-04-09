/**
 * Simple script to create a test hubContent document in Sanity
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

// Simple hubContent document
const document = {
  _type: "hubContent",
  id: "test-001",
  title: "Test Hub Content",
  description: "This is a test hub content item.",
  category: "Article",
  link: "/savvy-hub/test",
  ctaText: "Read More",
  date: new Date().toISOString().split("T")[0],
  featured: true,
  featuredPosition: 1,
  slug: {
    _type: "slug",
    current: "test-hub-content",
  },
};

// Create document
async function createDocument() {
  try {
    console.log("Creating test document...");
    const result = await client.create(document);
    console.log("Document created successfully:", result._id);
  } catch (error) {
    console.error("Failed to create document:", error.message);
  }
}

// Run the function
createDocument();
