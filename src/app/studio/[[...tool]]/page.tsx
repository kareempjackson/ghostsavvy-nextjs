/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  // Dynamic import of studio components only when this page renders
  // This prevents build-time errors when Sanity packages aren't fully resolved
  const { default: Studio } = await import("../../../components/Studio");
  return <Studio />;
}
