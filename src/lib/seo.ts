/**
 * SEO utility functions for the Ghost Savvy Studios website
 */

// Base URL of the website
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ghostsavvy.com";

/**
 * Generate a canonical URL for a page
 * @param path - The path of the page (without leading slash)
 * @returns The full canonical URL
 */
export function getCanonicalUrl(path?: string): string {
  if (!path || path === "/") {
    return siteUrl;
  }

  // Ensure path has a leading slash but no trailing slash
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${formattedPath}`;
}

/**
 * Generate Open Graph image URL
 * @param imagePath - The path of the image (with or without leading slash)
 * @returns The full URL to the image
 */
export function getOgImageUrl(imagePath?: string): string {
  // Default OG image
  if (!imagePath) {
    return `${siteUrl}/images/ghost savvy-01.png`;
  }

  // If the image is already a full URL, return it as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Ensure path has a leading slash
  const formattedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${siteUrl}${formattedPath}`;
}

/**
 * List of routes that should not be indexed by search engines
 */
export const noIndexRoutes: string[] = [
  "/admin",
  "/preview",
  "/api",
  "/staging",
  "/dev",
];

/**
 * Check if a route should be indexed by search engines
 * @param path - The path to check
 * @returns Boolean indicating if the route should be indexed
 */
export function shouldIndexRoute(path: string): boolean {
  // Remove query parameters
  const pathWithoutQuery = path.split("?")[0];

  // Check if this path or any parent path is in the noIndexRoutes list
  return !noIndexRoutes.some(
    (route) =>
      pathWithoutQuery === route || pathWithoutQuery.startsWith(`${route}/`)
  );
}
