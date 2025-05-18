import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import type { QueryParams } from "@sanity/client";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  // draftMode() returns a Promise in Next.js 15
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN;

    if (!token) {
      throw new Error("Missing SANITY_API_READ_TOKEN");
    }

    return client
      .withConfig({ useCdn: false, token })
      .fetch<QueryResponse>(query, params, { cache: "no-store" });
  }

  return client.fetch<QueryResponse>(query, params, {
    next: { tags },
  });
}
