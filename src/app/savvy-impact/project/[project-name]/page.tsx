import React from "react";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getImpactProjectBySlugQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ImpactProject } from "@/types/schema";
import Header from "@/components/layout/Header";
import ProjectContent from "./components/ProjectContent";

async function getProjectData(slug: string) {
  try {
    const project = await sanityFetch<ImpactProject>({
      query: getImpactProjectBySlugQuery,
      params: { slug },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { "project-name": string };
}): Promise<Metadata> {
  try {
    const slug = params["project-name"];
    const project = await getProjectData(slug);

    if (!project) {
      return {
        title: "Project Not Found | Ghost Savvy Studios",
        description: "The requested project could not be found.",
      };
    }

    return {
      title: `${project.title} | Ghost Savvy Studios`,
      description: project.subtitle || project.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Ghost Savvy Studios",
      description:
        "Strategic design and development for mission-driven organizations",
    };
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { "project-name": string };
}) {
  const { isEnabled } = await draftMode();
  const slug = params["project-name"];
  const projectData = await getProjectData(slug);

  // If no project is found
  if (!projectData) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Header />
        <div className='flex-1 flex flex-col items-center justify-center p-8'>
          <h1 className='text-4xl font-bold mb-4'>Project Not Found</h1>
          <p className='text-xl mb-8'>
            The project you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <a
            href='/savvy-impact'
            className='px-6 py-3 bg-indigo-600 text-white rounded-full'
          >
            Return to Projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      {isEnabled && (
        <div className='bg-amber-500 text-white p-2 text-center text-sm'>
          Draft Mode Enabled
        </div>
      )}
      <Header customLogo={projectData.projectLogo} />
      <main className='flex-1'>
        <ProjectContent projectData={projectData} />
      </main>
    </div>
  );
}
