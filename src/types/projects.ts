export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  tags: string[];
  challenge: string;
  approach: string;
  results: string;
  impact: string;
  image: string;
  video?: string | null;
  link?: string | null;
  accentColor?: string | null;
}

export interface VisualPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
}
