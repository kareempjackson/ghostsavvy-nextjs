import { groq } from "next-sanity";

export const getSavvyProjectsQuery = groq`
  *[_type == "savvyProject"] {
    _id,
    title,
    subtitle,
    slug,
    description,
    heroImage,
    backgroundVideo,
    tags,
    isFeatured,
    "heroImageUrl": heroImage.asset->url
  }
`;

export const getSavvyProjectBySlugQuery = groq`
  *[_type == "savvyProject" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    description,
    "heroImageUrl": heroImage.asset->url,
    backgroundVideo,
    tags,
    features[] {
      title,
      description
    },
    testimonials[] {
      quote,
      author,
      role,
      company,
      "authorImageUrl": authorImage.asset->url
    },
    "gallery": gallery[].asset->url,
    relatedProducts[] {
      title,
      subtitle,
      slug,
      "imageUrl": image.asset->url
    }
  }
`;

export const getImpactProjectsQuery = groq`
  *[_type == "impactProject"] | order(displayOrder asc) {
    _id,
    title,
    subtitle,
    slug,
    tags,
    "heroImageUrl": heroImage.asset->url,
    backgroundVideo,
    isFeatured,
    isHighlight,
    displayOrder
  }
`;

export const getFeaturedImpactProjectQuery = groq`
  *[_type == "impactProject" && isFeatured == true] | order(displayOrder asc)[0] {
    _id,
    title,
    subtitle,
    slug,
    tags,
    "heroImageUrl": heroImage.asset->url,
    backgroundVideo
  }
`;

export const getImpactProjectBySlugQuery = groq`
  *[_type == "impactProject" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    description,
    "heroImageUrl": heroImage.asset->url,
    backgroundVideo,
    tags,
    features[] {
      title,
      description
    },
    testimonials[] {
      quote,
      author,
      role,
      company,
      "authorImageUrl": authorImage.asset->url
    },
    "gallery": gallery[].asset->url,
    "relatedProjects": relatedProjects[]-> {
      _id,
      title,
      subtitle,
      slug,
      "heroImageUrl": heroImage.asset->url
    },
    "projectLogo": projectLogo.asset->url,
    theme {
      headingsFont,
      bodyFont,
      accentFont,
      primaryBackground,
      secondaryBackground,
      textColor,
      accentColor,
      footerBackground,
      footerTextColor
    },
    chapters[] {
      title,
      intro,
      sections[] {
        title,
        content,
        alignment,
        backgroundColor,
        textColor,
        "media": media[].asset->url
      },
      testimonial {
        quote,
        author,
        role,
        company,
        "authorImageUrl": authorImage.asset->url
      },
      "media": media[].asset->url
    }
  }
`;

// Savvy Lab queries
export const getLabProjectsQuery = groq`
  *[_type == "labProject"] | order(displayOrder asc) {
    _id,
    title,
    subtitle,
    slug,
    description,
    heroImage,
    backgroundVideo,
    tags,
    features,
    gallery,
    mockups,
    testimonials,
    relatedProjects,
    isFeatured,
    isHighlight,
    status,
    displayOrder,
    externalLink
  }
`;

export const getFeaturedLabProjectQuery = groq`
  *[_type == "labProject" && isFeatured == true][0] {
    _id,
    title,
    subtitle,
    slug,
    description,
    heroImage,
    backgroundVideo,
    tags,
    features,
    gallery,
    mockups,
    testimonials,
    relatedProjects,
    isFeatured,
    isHighlight,
    status,
    displayOrder,
    externalLink
  }
`;

export const getLabProjectBySlugQuery = groq`
  *[_type == "labProject" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    description,
    heroImage,
    backgroundVideo,
    tags,
    features,
    gallery,
    mockups,
    testimonials,
    relatedProjects,
    isFeatured,
    isHighlight,
    status,
    displayOrder,
    externalLink
  }
`;
