import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// For client-side fetching (read-only)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // set to true for production
});

// For authenticated operations (when a token is needed)
export const getClient = (token?: string) => {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
};

// Helper function to build image URLs from Sanity image references
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper to format dates
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
