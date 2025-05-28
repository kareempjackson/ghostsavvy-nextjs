/**
 * Simple script to create a test lab product document in Sanity
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

// Simple lab product document
const document = {
  _type: "labProduct",
  title: "Test Lab Product",
  description: "This is a test lab product for Our Lab section.",
  slug: {
    _type: "slug",
    current: "test-lab-product",
  },
  status: "In Development",
  category: "AI Tool",
  technologies: ["React", "Next.js", "AI"],
  featured: true,
  featuredPosition: 1,
};

// Create document
async function createDocument() {
  try {
    console.log("Creating test lab product document...");
    const result = await client.create(document);
    console.log("Lab product document created successfully:", result._id);
  } catch (error) {
    console.error("Failed to create lab product document:", error.message);
  }
}

// Run the function
createDocument();
