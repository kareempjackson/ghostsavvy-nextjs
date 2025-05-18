/**
 * Simple script to create a test project document in Sanity
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-05-03",
  useCdn: false,
});

// Simple savvy project document
const document = {
  _type: "savvyProject",
  title: "Test Savvy Project",
  subtitle: "An amazing test project for Savvy Lab",
  description:
    "This is a test project for Savvy Lab to showcase our capabilities.",
  slug: {
    _type: "slug",
    current: "test-savvy-project",
  },
  tags: ["Design", "Development", "AI"],
  isFeatured: true,
  features: [
    {
      title: "Amazing Feature 1",
      description: "This feature will blow your mind with its capabilities.",
    },
    {
      title: "Incredible Feature 2",
      description: "Nobody else has a feature like this one.",
    },
  ],
};

// Create document
async function createDocument() {
  try {
    console.log("Creating test savvy project document...");
    const result = await client.create(document);
    console.log("Savvy Project document created successfully:", result._id);
  } catch (error) {
    console.error("Failed to create savvy project document:", error.message);
  }
}

// Run the function
createDocument();
