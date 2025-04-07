export interface ProductCard {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "Launched" | "Beta" | "Coming Soon";
  accentColor: string;
  imageUrl?: string;
  link?: string;
  size?: "small" | "medium" | "large";
  featured?: boolean;
  quote?: string;
}
