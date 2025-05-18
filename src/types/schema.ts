export interface SavvyProject {
  _id: string;
  title: string;
  subtitle: string;
  slug: {
    current: string;
  };
  description: string;
  heroImageUrl: string;
  backgroundVideo?: string;
  tags: string[];
  features?: Feature[];
  testimonials?: Testimonial[];
  gallery?: string[];
  relatedProducts?: RelatedProduct[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  authorImageUrl?: string;
}

export interface RelatedProduct {
  title: string;
  subtitle: string;
  slug: string;
  imageUrl?: string;
}

export interface ImpactProject {
  _id: string;
  title: string;
  subtitle: string;
  slug: {
    current: string;
  };
  description: string;
  heroImageUrl: string;
  backgroundVideo?: string;
  tags: string[];
  features?: ImpactFeature[];
  testimonials?: ImpactTestimonial[];
  gallery?: string[];
  relatedProjects?: ImpactRelatedProject[];
  isFeatured: boolean;
  isHighlight: boolean;
  displayOrder: number;
  theme?: ProjectTheme;
  projectLogo?: string;
  chapters?: ProjectChapter[];
}

export interface ImpactFeature {
  title: string;
  description: string;
}

export interface ImpactTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  authorImageUrl?: string;
}

export interface ImpactRelatedProject {
  _id: string;
  title: string;
  subtitle: string;
  slug: {
    current: string;
  };
  heroImageUrl?: string;
}

export interface ProjectTheme {
  headingsFont?: string;
  bodyFont?: string;
  accentFont?: string;
  primaryBackground?: string;
  secondaryBackground?: string;
  textColor?: string;
  accentColor?: string;
  footerBackground?: string;
  footerTextColor?: string;
}

export interface ProjectChapter {
  title: string;
  intro: string;
  sections?: ProjectSection[];
  testimonial?: ImpactTestimonial;
  media?: string[];
}

export interface ProjectSection {
  title: string;
  content: string;
  alignment?: "left" | "center" | "right";
  backgroundColor?: string;
  textColor?: string;
  media?: string[];
}
