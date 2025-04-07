import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "../env";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // set to true for production
});

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
