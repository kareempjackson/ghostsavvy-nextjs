import { draftMode } from "next/headers";
import ClientSavvyLabPage from "./ClientSavvyLabPage";
import {
  getLabProjectsQuery,
  getFeaturedLabProjectQuery,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

// Define types
interface Product {
  _id: string;
  title: string;
  subtitle: string;
  slug: { current: string };
  heroImage: { asset: { _ref: string } };
  backgroundVideo?: string;
  isFeatured: boolean;
  isHighlight?: boolean;
  tags?: string[];
  status?: string;
}

export const metadata = {
  title: "Savvy Lab | Ghost Savvy",
  description: "Explore our innovative products and experiments at Savvy Lab",
};

export default async function SavvyLabPage() {
  const draftModeData = await draftMode();
  const isEnabled = draftModeData.isEnabled;

  // Fetch the lab projects data from Sanity
  const projectsData = await sanityFetch<Product[]>({
    query: getLabProjectsQuery,
    tags: ["labProject"],
  });

  // Fetch the featured project specifically
  const featuredProject = await sanityFetch<Product | null>({
    query: getFeaturedLabProjectQuery,
    tags: ["labProject"],
  });

  // Process the data
  const projects = projectsData.map((project: Product) => ({
    ...project,
    heroImageUrl: urlFor(project.heroImage).url() || "",
  }));

  // Set featured project
  const featuredHero = featuredProject
    ? {
        ...featuredProject,
        heroImageUrl: urlFor(featuredProject.heroImage).url() || "",
      }
    : null;

  // Filter highlighted projects (excluding the featured one)
  const highlightProjects = projects
    .filter(
      (project) => project.isHighlight && project._id !== featuredHero?._id
    )
    .slice(0, 3);

  // Get remaining projects for the grid
  const gridProjects = projects.filter(
    (project) => !project.isHighlight && project._id !== featuredHero?._id
  );

  return (
    <>
      {isEnabled && (
        <div className='fixed top-0 left-0 right-0 bg-amber-500 text-white p-2 text-center text-sm z-50'>
          Draft Mode Enabled -
          <a href='/api/disable-draft' className='underline ml-1'>
            Exit Draft Mode
          </a>
        </div>
      )}
      <ClientSavvyLabPage
        featuredHero={featuredHero}
        highlightProjects={highlightProjects}
        gridProjects={gridProjects}
      />
    </>
  );
}
