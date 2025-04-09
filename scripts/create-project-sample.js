/**
 * Script to create a proper sample project
 * Run with: node scripts/create-project-sample.js
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-05-03",
  useCdn: false,
});

// Create a proper project document
async function createSampleProject() {
  try {
    console.log("Creating sample Impact project...");

    // First, check if we already have a project
    const existingProjects = await client.fetch('*[_type == "project"]');

    if (existingProjects.length > 0) {
      console.log("Projects already exist. Not creating a new one.");
      return;
    }

    // Create a new complete project
    const result = await client.create({
      _type: "project",
      id: "project-001",
      title: "FinTech Mobile App Redesign",
      hook: "Modernizing the banking experience",
      description:
        "A complete redesign of a leading financial institution's mobile banking experience, focusing on user experience and performance.",
      tags: [
        "UX/UI Design",
        "Mobile App",
        "Financial Services",
        "Performance Optimization",
      ],
      link: "/impact/fintech-mobile-app",
      size: "large",
      featured: true,
      featuredHome: true,
    });

    console.log("Sample project created successfully:", result._id);

    // Create a case study connected to this project
    const caseStudy = await client.create({
      _type: "caseStudy",
      title: "FinTech Mobile App Redesign: A Case Study",
      slug: {
        _type: "slug",
        current: "fintech-mobile-app-redesign",
      },
      client: "FinanceNow",
      industry: "Finance",
      projectType: ["Mobile App", "UX Research", "Design"],
      summary:
        "How we helped a leading financial institution reimagine their mobile banking experience, resulting in a 200% increase in user engagement.",
      challenge: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "The client was struggling with an outdated mobile banking app that had poor user engagement and high abandonment rates. The app was slow, difficult to navigate, and didn't meet the expectations of modern users.",
            },
          ],
          markDefs: [],
        },
      ],
      approach: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "We began with comprehensive user research to understand pain points and expectations. This informed our design process, which included rapid prototyping and iterative testing.",
            },
          ],
          markDefs: [],
        },
      ],
      solution: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "We delivered a completely redesigned mobile banking experience with an intuitive interface, streamlined workflows, and advanced security features.",
            },
          ],
          markDefs: [],
        },
      ],
      keyFeatures: [
        {
          title: "Biometric Authentication",
          description:
            "Secure and convenient access using fingerprint and facial recognition",
        },
        {
          title: "Personalized Dashboard",
          description:
            "Customizable overview of accounts, transactions, and financial insights",
        },
        {
          title: "Smart Transaction Search",
          description:
            "Natural language processing for finding transactions quickly",
        },
      ],
      featured: true,
      featuredOrder: 1,
    });

    console.log("Sample case study created successfully:", caseStudy._id);
  } catch (error) {
    console.error("Failed to create sample project:", error.message);
  }
}

// Run the function
createSampleProject();
