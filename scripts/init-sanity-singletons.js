/**
 * Script to initialize singleton documents in Sanity
 *
 * This script creates the singleton documents (siteSettings and homePage)
 * if they don't already exist. Run this after setting up your schema.
 */

const { createClient } = require("@sanity/client");
require("dotenv").config({ path: ".env.local" });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-05-03",
  useCdn: false,
});

// Initialize site settings if it doesn't exist
async function initSiteSettings() {
  try {
    // Check if site settings document exists
    const existingSettings = await client.fetch(
      '*[_type == "siteSettings"][0]'
    );

    if (!existingSettings) {
      console.log("Creating site settings document...");
      const result = await client.create({
        _type: "siteSettings",
        _id: "siteSettings",
        title: "Ghost Savvy Studios",
        description:
          "Premium digital product studio building exceptional experiences as ghost partners for agencies and startups.",
        socialLinks: {
          instagram: "https://instagram.com/ghostsavvy",
          twitter: "https://twitter.com/ghostsavvy",
          linkedin: "https://linkedin.com/company/ghostsavvy",
        },
        contactInfo: {
          email: "hello@ghostsavvy.com",
        },
      });
      console.log("Site settings created with ID:", result._id);
    } else {
      console.log("Site settings document already exists.");
    }
  } catch (error) {
    console.error("Failed to initialize site settings:", error.message);
  }
}

// Initialize home page if it doesn't exist
async function initHomePage() {
  try {
    // Check if home page document exists
    const existingHomePage = await client.fetch('*[_type == "homePage"][0]');

    if (!existingHomePage) {
      console.log("Creating home page document...");
      const result = await client.create({
        _type: "homePage",
        _id: "homePage",
        title: "Ghost Savvy Studios | Premium Digital Product Studio",
        description:
          "Premium digital product studio building exceptional experiences as ghost partners for agencies and startups.",
        heroSection: {
          heading: "Premium Digital Product Studio",
          subheading:
            "Building exceptional experiences as ghost partners for agencies and startups.",
        },
        ctaSection: {
          heading: "Let's Build Something Exceptional",
          text: "Ready to bring your vision to life? Get in touch with our team to start a conversation.",
          buttonText: "Start a Project",
          buttonLink: "/start-project",
        },
      });
      console.log("Home page created with ID:", result._id);
    } else {
      console.log("Home page document already exists.");
    }
  } catch (error) {
    console.error("Failed to initialize home page:", error.message);
  }
}

// Run both initializations
async function initSingletons() {
  console.log("Initializing Sanity singleton documents...");
  await initSiteSettings();
  await initHomePage();
  console.log("Initialization complete!");
}

// Execute the function
initSingletons();
