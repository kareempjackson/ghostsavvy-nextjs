/**
 * Simple script to create a test project document in Sanity
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

// Simple project document
const document = {
  _type: "project",
  title: "Test Project",
  description: "This is a test project for Stories of Impact.",
  slug: {
    _type: "slug",
    current: "test-project",
  },
  status: "Completed",
  clientName: "Test Client",
  industry: "Technology",
  services: ["Design", "Development", "Strategy"],
  featured: true,
  featuredPosition: 1,
};

// Create document
async function createDocument() {
  try {
    console.log("Creating test project document...");
    const result = await client.create(document);
    console.log("Project document created successfully:", result._id);
  } catch (error) {
    console.error("Failed to create project document:", error.message);
  }
}

// Run the function
createDocument();
