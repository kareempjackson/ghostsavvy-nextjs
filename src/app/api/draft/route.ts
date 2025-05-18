import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";

// This route handler enables draft mode
export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Check the secret and slug parameters
  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return new Response("Invalid token or missing slug", { status: 401 });
  }

  // Check if the slug exists in Sanity by querying for it
  const query = `*[_type == "savvyProject" && slug.current == $slug][0]`;
  const project = await client.fetch(query, { slug });

  // If the slug doesn't exist, prevent draft mode from being enabled
  if (!project) {
    return new Response("Invalid slug", { status: 401 });
  }

  // Enable Draft Mode by setting the cookies
  const draft = await draftMode();
  draft.enable();

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(`/savvy-lab/project/${project.slug.current}`);
}
