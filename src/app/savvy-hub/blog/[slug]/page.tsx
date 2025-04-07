import { Metadata } from "next";
import BlogPost from "@/sections/hub/BlogPost";

export const metadata: Metadata = {
  title: "Blog Post | Ghost Savvy Studios",
  description:
    "Insights and perspectives on product design, development, and innovation from the Ghost Savvy Studios team.",
};

export default async function Page({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />;
}
