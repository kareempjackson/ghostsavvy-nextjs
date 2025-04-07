export interface Project {
  id: string;
  title: string;
  hook: string;
  description: string;
  tags: string[];
  image: string;
  video?: string;
  link?: string;
}
