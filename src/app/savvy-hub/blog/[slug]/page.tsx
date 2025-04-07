import { Metadata } from "next";
import BlogPost from "@/sections/hub/BlogPost";
import SEO from "@/components/SEO";

// This function would normally fetch the post data from Sanity
async function getPostData(slug: string) {
  // In a real app, you would fetch the data from Sanity using the slug
  console.log(`Fetching post data for slug: ${slug}`);

  // Simulate fetching post data
  return {
    title: "Why User-Centric Design Matters",
    description:
      "Insights and perspectives on product design, development, and innovation from the Ghost Savvy Studios team.",
    featureImage: "/images/blog-placeholder-1.jpg",
    publishedAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-03-15T09:00:00Z",
    category: "Design",
    authors: [
      {
        name: "Sarah Mitchell",
        role: "Head of Design",
        image: "/images/author-placeholder.jpg",
      },
    ],
    tags: ["UX Design", "Product Strategy", "Client Relations", "Ethics"],
    slug,
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostData(params.slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ghostsavvy.com";

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.authors.map((author) => author.name),
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}${post.featureImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${siteUrl}${post.featureImage}`],
    },
  };
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostData(params.slug);

  return (
    <>
      <SEO
        type='article'
        title={post.title}
        description={post.description}
        image={post.featureImage}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        authors={post.authors.map((author) => ({ name: author.name }))}
        categories={[post.category]}
        tags={post.tags}
      />
      <BlogPost slug={params.slug} />
    </>
  );
}
