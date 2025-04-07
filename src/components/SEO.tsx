import Script from "next/script";

interface SEOProps {
  type?: "website" | "article" | "blog" | "product";
  title?: string;
  description?: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  authors?: {
    name: string;
    url?: string;
  }[];
  categories?: string[];
  tags?: string[];
}

export default function SEO({
  type = "website",
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  authors,
  categories = [],
  tags,
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ghostsavvy.com";
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}/images/ghost savvy-01.png`;

  // Common structured data properties
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": getSchemaType(type),
    headline: title,
    description: description,
    image: imageUrl,
    author: authors?.map((author) => ({
      "@type": "Person",
      name: author.name,
      url: author.url,
    })) || {
      "@type": "Organization",
      name: "Ghost Savvy Studios",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ghost Savvy Studios",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  // Add date-specific fields for articles and blogs
  const timeStructuredData =
    type === "article" || type === "blog"
      ? {
          datePublished: publishedAt || new Date().toISOString(),
          dateModified: updatedAt || publishedAt || new Date().toISOString(),
        }
      : {};

  // Combine structured data
  const structuredData = {
    ...baseStructuredData,
    ...timeStructuredData,
    ...(tags?.length && { keywords: tags.join(", ") }),
    ...(categories.length && { articleSection: categories[0] }),
  };

  return (
    <Script
      id='page-structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

function getSchemaType(type: SEOProps["type"]): string {
  switch (type) {
    case "article":
      return "Article";
    case "blog":
      return "BlogPosting";
    case "product":
      return "Product";
    default:
      return "WebPage";
  }
}
