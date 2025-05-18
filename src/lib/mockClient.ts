/**
 * Mock utility functions to replace Sanity client
 */

import { featuredProjects } from "@/data/projectData";
import { hubContent } from "@/data/hubContentData";
import { labProducts } from "@/data/labProductsData";

// Type for key-value mapping
interface KeyValueMap {
  [key: string]: unknown;
}

// Mock fetch function to replace Sanity client.fetch
export async function mockFetch(query: string) {
  console.log("Mock fetch query:", query);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Determine what data to return based on the query
  if (query.includes('_type == "project"')) {
    return featuredProjects.map((project) => ({
      _id: project.id,
      ...project,
      // Add Sanity-specific fields if needed
      size: project.id === "lore-brand" ? "large" : "medium",
      _createdAt: new Date().toISOString(),
    }));
  }

  if (query.includes('_type == "hubContent"')) {
    return hubContent.map((item) => ({
      _id: item.id,
      ...item,
      // Add Sanity-specific fields
      date: new Date().toISOString(),
      size: item.id === "podcast-episode-07" ? "large" : "medium",
    }));
  }

  if (query.includes('_type == "labProduct"')) {
    return labProducts.map((product) => ({
      _id: product.id,
      ...product,
      // Add Sanity-specific fields if needed
      featuredHome: true,
      featured: true,
      _createdAt: new Date().toISOString(),
    }));
  }

  // Default empty response
  return [];
}

// Mock function to replace urlFor from Sanity
export function mockUrlFor(source: string | { asset?: { _ref?: string } }) {
  // If it's already a string (our mock data uses string URLs), return it directly
  if (typeof source === "string") {
    return source;
  }

  // If it's an object (like it would be from Sanity), handle accordingly
  // This simulates the builder.image(source).url() pattern
  return {
    url: () => {
      if (source && source.asset && source.asset._ref) {
        // This would be a more complex transform in real Sanity
        return `/images/${source.asset._ref.replace("image-", "").replace("-jpg", ".jpg")}`;
      }
      // Fallback image
      return "/images/placeholder.jpg";
    },
  };
}

// Helper to format dates (same as Sanity original)
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

// Export a mock client that mimics the real Sanity client
export const client = {
  fetch: mockFetch,
};

// For authenticated operations (when a token is needed)
export const getClient = () => {
  return {
    fetch: mockFetch,
  };
};
