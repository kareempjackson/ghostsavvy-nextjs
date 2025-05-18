export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

// Environment variables validation
if (!projectId) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
  );
}

if (!dataset) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SANITY_DATASET");
}

// Only for server-side usage - not exposed to the browser
export const token = process.env.SANITY_API_TOKEN || "";
