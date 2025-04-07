/**
 * Sanity Seeding Script
 *
 * This script seeds the Sanity CMS with initial content for development and testing.
 * Run this script with: npm run seed-sanity
 *
 * Prerequisites:
 * - @sanity/client installed (npm install @sanity/client)
 * - SANITY_TOKEN environment variable set with write permissions
 */

const { createClient } = require("@sanity/client");

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_TOKEN, // Get this from sanity.io/manage
  apiVersion: "2023-05-03",
  useCdn: false,
});

// Helper to create a slug
const createSlug = (text) => ({
  _type: "slug",
  current: text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""),
});

// Date helpers
const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const nextWeek = new Date(Date.now() + 7 * 86400000)
  .toISOString()
  .split("T")[0];

// Mock data generator functions
const generateTeamMembers = () => [
  {
    _type: "teamMember",
    name: "Alex Johnson",
    role: "CEO & Founder",
    department: "Leadership",
    profileImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    bio: "Alex has over 15 years of experience in digital product development and strategy.",
    expertise: ["Product Strategy", "Business Development", "UX Design"],
    email: "alex@ghostsavvy.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
    },
    slug: createSlug("alex-johnson"),
  },
  {
    _type: "teamMember",
    name: "Jamie Smith",
    role: "Chief Technology Officer",
    department: "Engineering",
    profileImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    bio: "Jamie leads our technical strategy and engineering teams with a focus on cutting-edge technologies.",
    expertise: ["Web Development", "AI Integration", "Cloud Architecture"],
    email: "jamie@ghostsavvy.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/jamiesmith",
      github: "https://github.com/jamiesmith",
    },
    slug: createSlug("jamie-smith"),
  },
  {
    _type: "teamMember",
    name: "Taylor Wong",
    role: "Design Director",
    department: "Design",
    profileImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    bio: "Taylor brings a unique perspective to design challenges with over a decade of experience.",
    expertise: ["UI/UX Design", "Brand Strategy", "Design Systems"],
    email: "taylor@ghostsavvy.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/taylorwong",
      dribbble: "https://dribbble.com/taylorwong",
    },
    slug: createSlug("taylor-wong"),
  },
];

const generateBlogPosts = (teamMembers) => [
  {
    _type: "blogPost",
    title: "The Future of Web Development with AI Integration",
    subtitle:
      "How artificial intelligence is transforming the way we build digital products",
    slug: createSlug("future-web-development-ai-integration"),
    authors: [{ _type: "reference", _ref: teamMembers[1]._id }],
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    categories: ["AI & Technology", "Development"],
    publishedAt: new Date(yesterday).toISOString(),
    excerpt:
      "As AI technologies continue to advance, web development is experiencing a paradigm shift. This article explores how AI is being integrated into modern web development workflows.",
    estimatedReadingTime: 8,
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The landscape of web development is rapidly evolving...",
          },
        ],
      },
    ],
    tags: ["AI", "Web Development", "Future Tech", "Automation"],
    featured: true,
    featuredPosition: 1,
  },
  {
    _type: "blogPost",
    title: "Designing for Accessibility: A Comprehensive Guide",
    subtitle: "Best practices for creating inclusive digital experiences",
    slug: createSlug("designing-for-accessibility-guide"),
    authors: [{ _type: "reference", _ref: teamMembers[2]._id }],
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    categories: ["Design", "Accessibility", "UX Research"],
    publishedAt: new Date(today).toISOString(),
    excerpt:
      "Accessibility is not just a checkbox—it is a fundamental aspect of good design. Learn how to create digital products that work for everyone.",
    estimatedReadingTime: 12,
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Designing for accessibility means creating digital experiences that can be used by everyone...",
          },
        ],
      },
    ],
    tags: ["Accessibility", "Inclusive Design", "UX", "WCAG"],
    featured: true,
    featuredPosition: 2,
  },
];

const generatePodcastEpisodes = (teamMembers) => [
  {
    _type: "podcast",
    title: "Navigating Digital Transformation in 2023",
    episodeNumber: 1,
    seasonNumber: 1,
    description:
      "In our inaugural episode, we discuss the challenges and opportunities of digital transformation in today's rapidly evolving landscape.",
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    releaseDate: yesterday,
    duration: "45:23",
    audioFile: "https://example.com/podcast/ep1.mp3",
    externalLinks: {
      spotify: "https://spotify.com/show/example",
      apple: "https://podcasts.apple.com/show/example",
      google: "https://podcasts.google.com/feed/example",
    },
    transcript: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Welcome to the first episode of the Ghost Savvy podcast...",
          },
        ],
      },
    ],
    guests: [
      {
        name: "Dr. Sarah Chen",
        role: "Digital Innovation Consultant",
        company: "Future Innovations Inc.",
        bio: "Dr. Chen helps Fortune 500 companies navigate digital transformation.",
      },
    ],
    hosts: [{ _type: "reference", _ref: teamMembers[0]._id }],
    tags: ["Digital Transformation", "Innovation", "Technology Trends"],
    featured: true,
    slug: createSlug("ep1-navigating-digital-transformation"),
  },
  {
    _type: "podcast",
    title: "The Role of Design Systems in Modern Product Development",
    episodeNumber: 2,
    seasonNumber: 1,
    description:
      "We explore how design systems are revolutionizing product development and enabling teams to build better products faster.",
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    releaseDate: today,
    duration: "38:15",
    audioFile: "https://example.com/podcast/ep2.mp3",
    externalLinks: {
      spotify: "https://spotify.com/show/example",
      apple: "https://podcasts.apple.com/show/example",
      google: "https://podcasts.google.com/feed/example",
    },
    transcript: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Welcome back to the Ghost Savvy podcast..." },
        ],
      },
    ],
    guests: [
      {
        name: "Miguel Vasquez",
        role: "Senior Design Systems Lead",
        company: "DesignOps Co",
        bio: "Miguel has implemented design systems for companies of all sizes.",
      },
    ],
    hosts: [
      { _type: "reference", _ref: teamMembers[2]._id },
      { _type: "reference", _ref: teamMembers[0]._id },
    ],
    tags: ["Design Systems", "Product Development", "UX", "Collaboration"],
    featured: false,
    slug: createSlug("ep2-design-systems-product-development"),
  },
];

const generateCaseStudies = (teamMembers) => [
  {
    _type: "caseStudy",
    title: "Transforming E-commerce Experience for RetailPlus",
    slug: createSlug("retailplus-ecommerce-transformation"),
    client: "RetailPlus Inc.",
    clientLogo: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    industry: "E-commerce",
    projectType: ["Web Development", "UX Research", "Design"],
    featuredImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    summary:
      "We helped RetailPlus increase conversion rates by 45% through a complete redesign of their digital shopping experience.",
    projectDuration: {
      startDate: "2022-05-01",
      endDate: "2022-10-15",
      durationText: "5.5 months",
    },
    projectTeam: [
      { _type: "reference", _ref: teamMembers[0]._id },
      { _type: "reference", _ref: teamMembers[2]._id },
    ],
    challenge: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "RetailPlus was struggling with high cart abandonment rates and poor mobile conversion...",
          },
        ],
      },
    ],
    approach: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We began with extensive user research to understand the pain points in the current experience...",
          },
        ],
      },
    ],
    solution: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Our solution focused on streamlining the purchase journey and optimizing for mobile-first interactions...",
          },
        ],
      },
    ],
    results: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The redesigned experience led to a 45% increase in conversion rates and a 30% reduction in cart abandonment...",
          },
        ],
      },
    ],
    metrics: [
      {
        label: "Conversion Rate Increase",
        value: "45%",
        description: "Year-over-year improvement",
      },
      {
        label: "Cart Abandonment",
        value: "30% reduction",
        description: "Compared to previous platform",
      },
      {
        label: "Mobile Revenue",
        value: "62% increase",
        description: "First 3 months post-launch",
      },
    ],
    testimonial: {
      quote:
        "Ghost Savvy Studios transformed our e-commerce experience. The results speak for themselves with significant increases in conversion rates and customer satisfaction.",
      author: "Jane Doe",
      role: "Chief Digital Officer, RetailPlus Inc.",
    },
    featured: true,
    featuredOrder: 1,
  },
];

const generateEvents = (teamMembers) => [
  {
    _type: "event",
    title: "Future of AI in Product Design Webinar",
    slug: createSlug("future-ai-product-design-webinar"),
    eventType: "webinar",
    status: "upcoming",
    format: "online",
    summary:
      "Join us for an insightful discussion on how AI is transforming product design and what it means for designers and product managers.",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Artificial intelligence is rapidly changing how we approach product design...",
          },
        ],
      },
    ],
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    dateTime: {
      startDateTime: new Date(nextWeek + "T18:00:00Z").toISOString(),
      endDateTime: new Date(nextWeek + "T19:30:00Z").toISOString(),
      timeZone: "ET",
    },
    virtualEventLinks: {
      registrationLink: "https://example.com/register",
      platform: "zoom",
    },
    featuredSpeakers: [
      {
        name: "Dr. Maya Patel",
        role: "AI Product Design Specialist",
        company: "TechInnovate",
        bio: "Dr. Patel specializes in integrating AI capabilities into human-centered design processes.",
      },
      { _type: "reference", _ref: teamMembers[1]._id },
    ],
    agenda: [
      {
        time: "6:00 PM - 6:15 PM",
        title: "Introduction & Overview",
        speakers: ["Alex Johnson"],
      },
      {
        time: "6:15 PM - 7:00 PM",
        title: "AI in Product Design: Current Landscape & Future Trends",
        speakers: ["Dr. Maya Patel"],
      },
      {
        time: "7:00 PM - 7:30 PM",
        title: "Q&A and Discussion",
        speakers: ["Dr. Maya Patel", "Jamie Smith"],
      },
    ],
    registration: {
      isRequired: true,
      deadline: new Date(nextWeek + "T17:00:00Z").toISOString(),
      maxAttendees: 500,
      registrationUrl: "https://example.com/register",
      price: {
        isFree: true,
      },
    },
    tags: ["AI", "Product Design", "UX", "Innovation"],
    featured: true,
  },
];

const generateHubContent = (teamMembers) => [
  {
    _type: "hubContent",
    id: "hub-001",
    title: "The Evolution of Digital Experiences in 2023",
    description:
      "Explore the latest trends shaping digital experiences and what they mean for your business.",
    category: "Article",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    link: "/savvy-hub/articles/evolution-digital-experiences-2023",
    ctaText: "Read Article",
    date: today,
    size: "large",
    featured: true,
    featuredPosition: 1,
    fullContent: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The digital landscape continues to evolve at a rapid pace...",
          },
        ],
      },
    ],
    authors: [{ _type: "reference", _ref: teamMembers[0]._id }],
    tags: ["Digital Experience", "Trends", "Innovation"],
    slug: createSlug("evolution-digital-experiences-2023"),
  },
  {
    _type: "hubContent",
    id: "hub-002",
    title: "Case Study: Reimagining the Mobile Banking Experience",
    description:
      "How we helped FinanceNow increase user engagement by 200% with a redesigned mobile app.",
    category: "Case Study",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: "image-placeholder" },
    },
    link: "/savvy-hub/case-studies/financenow-mobile-banking",
    ctaText: "View Case Study",
    date: yesterday,
    size: "medium",
    featured: true,
    featuredPosition: 2,
    authors: [{ _type: "reference", _ref: teamMembers[2]._id }],
    tags: ["Mobile App", "UX Design", "Banking", "Case Study"],
    slug: createSlug("financenow-mobile-banking"),
  },
];

// Seed function for a document type
async function seedDocuments(documents, documentType) {
  console.log(`Seeding ${documentType}...`);
  const results = [];

  for (const doc of documents) {
    try {
      const result = await client.create(doc);
      console.log(`Created ${documentType}: ${result._id}`);
      results.push(result);
    } catch (error) {
      console.error(`Failed to create ${documentType}:`, error.message);
    }
  }

  return results;
}

// Main seeding function
async function seedSanity() {
  console.log("Starting Sanity CMS seeding...");

  try {
    // First, create a placeholder image if you don't have real images
    // In a real scenario, you'd upload actual images first
    console.log("Setting up placeholder image...");

    // Then seed team members
    const teamMembers = await seedDocuments(
      generateTeamMembers(),
      "team members"
    );

    // Seed other content types using the created team member references
    const blogPosts = await seedDocuments(
      generateBlogPosts(teamMembers),
      "blog posts"
    );
    const podcastEpisodes = await seedDocuments(
      generatePodcastEpisodes(teamMembers),
      "podcast episodes"
    );
    const caseStudies = await seedDocuments(
      generateCaseStudies(teamMembers),
      "case studies"
    );
    const events = await seedDocuments(generateEvents(teamMembers), "events");
    const hubContent = await seedDocuments(
      generateHubContent(teamMembers),
      "hub content"
    );

    console.log("Seeding completed successfully!");

    return {
      teamMembers,
      blogPosts,
      podcastEpisodes,
      caseStudies,
      events,
      hubContent,
    };
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
}

// Run the seeding if this script is executed directly
if (require.main === module) {
  if (!process.env.SANITY_TOKEN) {
    console.error("ERROR: SANITY_TOKEN environment variable is required");
    console.log("You can get a token from https://www.sanity.io/manage");
    process.exit(1);
  }

  seedSanity()
    .then(() => {
      console.log("Seeding completed!");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}

module.exports = { seedSanity };
