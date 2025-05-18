export interface SavvyLabProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  challenge: string;
  approach: string;
  results: string;
  image: string;
  heroImage: string;
  additionalImages: string[];
  impactMetrics: { value: string; label: string }[];
  category: string;
  date: string;
  tags: string[];
  stats: string;
  metaTitle: string;
  metaDescription: string;
  team: { name: string; role: string }[];
  relatedProjects: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  technologies: string[];
  services: string[];
  process: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const savvyLabProjects: SavvyLabProject[] = [
  {
    id: "onbrd",
    title: "Onbrd",
    subtitle: "Streamlining employee onboarding for remote-first teams",
    description:
      "An intuitive platform that helps HR teams create personalized onboarding experiences for remote employees.",
    fullDescription:
      "Onbrd is a comprehensive solution designed to transform how remote-first companies welcome new team members. By digitizing and automating the entire onboarding process, Onbrd ensures every new hire has a consistent, engaging, and informative experience regardless of their location.",
    challenge:
      "Remote work has made traditional onboarding processes obsolete. Companies struggle to create cohesive experiences for distributed teams, leading to inconsistent training, delayed productivity, and lower employee retention.",
    approach:
      "We built Onbrd with a modular architecture that allows HR teams to create customized onboarding journeys. The platform integrates with existing HR systems, delivers personalized content based on roles, and provides progress tracking for both managers and employees.",
    results:
      "Companies using Onbrd have reported 45% faster time-to-productivity for new hires, 78% improvement in onboarding satisfaction scores, and significant reductions in HR administrative time. The platform has been particularly successful with technology companies and global enterprises managing distributed teams.",
    image: "/images/projects/onbrd.jpg",
    heroImage: "/images/projects/onbrd.jpg",
    additionalImages: [
      "/images/projects/onbrd.jpg",
      "/images/projects/onbrd.jpg",
      "/images/projects/onbrd.jpg",
    ],
    impactMetrics: [
      { value: "45%", label: "Faster Productivity" },
      { value: "78%", label: "Satisfaction Improvement" },
      { value: "65%", label: "Admin Time Reduction" },
    ],
    category: "hr",
    date: "3/15/2023",
    tags: ["HR Tech", "Remote Work", "Employee Experience"],
    stats: "Used by 200+ companies across 14 countries",
    metaTitle: "Onbrd | Savvy Lab",
    metaDescription:
      "How we transformed remote employee onboarding with Onbrd, creating personalized and efficient experiences for distributed teams.",
    team: [
      { name: "Maya Johnson", role: "Product Lead" },
      { name: "Theo Richards", role: "UX Designer" },
      { name: "Zara Patel", role: "Frontend Developer" },
    ],
    relatedProjects: ["procur", "cmdctr"],
    testimonial: {
      quote:
        "Onbrd has completely transformed how we welcome new team members. Our global team now has a consistent experience regardless of location, and we've seen significant improvements in new hire satisfaction and productivity.",
      author: "Elena Vega",
      role: "Head of People Operations, TechSpace",
    },
    technologies: [
      "React Native",
      "Node.js",
      "GraphQL",
      "HubSpot Integration",
      "SSO Authentication",
    ],
    services: [
      "UX Research",
      "UI/UX Design",
      "Full-Stack Development",
      "System Integration",
      "Analytics Implementation",
    ],
    process: [
      {
        title: "HR Research",
        description:
          "We interviewed HR professionals and new hires to understand pain points in remote onboarding processes.",
        image: "/images/projects/onbrd.jpg",
      },
      {
        title: "Journey Mapping",
        description:
          "We created comprehensive journey maps for different types of employees and roles to ensure the platform could adapt to various scenarios.",
        image: "/images/projects/onbrd.jpg",
      },
      {
        title: "System Design",
        description:
          "We architected a flexible system that could integrate with existing HR tools while providing a cohesive experience.",
        image: "/images/projects/onbrd.jpg",
      },
      {
        title: "Prototype Testing",
        description:
          "We tested early prototypes with HR teams and new employees to refine the user experience.",
        image: "/images/projects/onbrd.jpg",
      },
      {
        title: "Beta Program",
        description:
          "We launched with select companies for three months, gathering feedback and making improvements before the full release.",
        image: "/images/projects/onbrd.jpg",
      },
    ],
  },
  {
    id: "undr",
    title: "Undr",
    subtitle: "Reinventing data visualization for complex business insights",
    description:
      "A breakthrough data visualization platform that makes complex data accessible through innovative 3D interfaces.",
    fullDescription:
      "Undr transforms how organizations interpret and communicate complex data by moving beyond traditional charts and graphs to immersive 3D visualizations. The platform provides intuitive interfaces that reveal connections and insights that would otherwise remain hidden in conventional data presentations.",
    challenge:
      "Organizations today are drowning in data but struggle to extract meaningful insights. Traditional visualization tools are limited in their ability to represent complex, multidimensional relationships, making it difficult for stakeholders to understand critical business patterns.",
    approach:
      "We created Undr with a focus on spatial data representation, allowing users to interact with data in three dimensions. The platform uses innovative mapping techniques and natural interaction patterns to make complex relationships intuitive, even for non-technical users.",
    results:
      "Organizations using Undr have reported discovering insights that were previously invisible, with 85% of users saying they identified actionable business opportunities within the first two weeks. Decision-making cycles shortened by an average of 37%, and cross-department data communication improved significantly.",
    image: "/images/projects/undr.jpg",
    heroImage: "/images/projects/undr.jpg",
    additionalImages: [
      "/images/projects/undr.jpg",
      "/images/projects/undr.jpg",
      "/images/projects/undr.jpg",
    ],
    impactMetrics: [
      { value: "85%", label: "New Insight Discovery" },
      { value: "37%", label: "Faster Decision Making" },
      { value: "64%", label: "Improved Data Literacy" },
    ],
    category: "data",
    date: "5/22/2023",
    tags: ["Data Visualization", "Business Intelligence", "3D Interface"],
    stats: "Processing over 5TB of business data daily",
    metaTitle: "Undr | Savvy Lab",
    metaDescription:
      "How Undr is transforming data visualization with immersive 3D interfaces that reveal hidden connections and insights for businesses.",
    team: [
      { name: "Aiden Zhou", role: "Data Scientist" },
      { name: "Leila Washington", role: "UX Designer" },
      { name: "Marcus Chen", role: "3D Developer" },
    ],
    relatedProjects: ["licid", "cmdctr"],
    testimonial: {
      quote:
        "Undr has fundamentally changed how we understand our business. We've discovered correlations and patterns that were completely invisible in our traditional dashboards, leading to several million dollars in operational improvements.",
      author: "Jonathan Reid",
      role: "Chief Data Officer, Global Retail Corp",
    },
    technologies: [
      "WebGL",
      "Three.js",
      "Python",
      "TensorFlow",
      "BigQuery Integration",
    ],
    services: [
      "Data Architecture",
      "3D Interface Design",
      "Algorithm Development",
      "Performance Optimization",
      "User Training",
    ],
    process: [
      {
        title: "Data Research",
        description:
          "We analyzed how humans naturally interpret spatial relationships and applied these principles to data visualization.",
        image: "/images/projects/undr.jpg",
      },
      {
        title: "Prototype Development",
        description:
          "We created early prototypes using real business datasets to test visualization effectiveness.",
        image: "/images/projects/undr.jpg",
      },
      {
        title: "Interface Iteration",
        description:
          "We refined the interface through multiple rounds of testing with data analysts and business users.",
        image: "/images/projects/undr.jpg",
      },
      {
        title: "Performance Optimization",
        description:
          "We optimized the platform to handle large datasets while maintaining smooth interaction on standard hardware.",
        image: "/images/projects/undr.jpg",
      },
      {
        title: "Cognitive Testing",
        description:
          "We conducted studies to measure insight generation and retention compared to traditional visualization methods.",
        image: "/images/projects/undr.jpg",
      },
    ],
  },
  {
    id: "trekker",
    title: "Trekker",
    subtitle: "Revolutionizing adventure planning for outdoor enthusiasts",
    description:
      "A comprehensive platform connecting adventure seekers with unique outdoor experiences and local guides worldwide.",
    fullDescription:
      "Trekker is an all-in-one platform designed for outdoor enthusiasts to discover, plan, and book authentic adventures around the world. The platform connects travelers with local guides and unique experiences while providing tools for creating detailed itineraries, managing gear lists, and sharing adventures with a like-minded community.",
    challenge:
      "The adventure travel market was highly fragmented, with disconnected resources for finding trails, connecting with guides, creating plans, and tracking experiences. Users had to juggle multiple apps and websites, making the planning process cumbersome and time-consuming.",
    approach:
      "We built Trekker using a community-driven approach, combining powerful planning tools with a social platform. The experience centers around interactive maps, user-generated content, and AI-powered recommendations while facilitating direct connections between travelers and local experts.",
    results:
      "Since launch, Trekker has facilitated over 50,000 adventures across 45 countries. The platform has onboarded 1,200+ verified local guides and maintains an impressive 93% satisfaction rate among users. Revenue for guide partners has increased by an average of 42% after joining the platform.",
    image: "/images/projects/trekker.jpg",
    heroImage: "/images/projects/trekker.jpg",
    additionalImages: [
      "/images/projects/trekker.jpg",
      "/images/projects/trekker.jpg",
      "/images/projects/trekker.jpg",
    ],
    impactMetrics: [
      { value: "50K+", label: "Adventures Booked" },
      { value: "93%", label: "User Satisfaction" },
      { value: "42%", label: "Guide Revenue Increase" },
    ],
    category: "travel",
    date: "4/12/2023",
    tags: ["Adventure Travel", "Community Platform", "Local Experiences"],
    stats: "Present in 45 countries with 1,200+ local guides",
    metaTitle: "Trekker | Savvy Lab",
    metaDescription:
      "How Trekker is connecting adventure seekers with authentic outdoor experiences and local guides through an innovative travel platform.",
    team: [
      { name: "Liam Torres", role: "Product Manager" },
      { name: "Sophie Anderson", role: "Experience Designer" },
      { name: "Raj Patel", role: "Full-Stack Developer" },
    ],
    relatedProjects: ["vynl", "escro"],
    testimonial: {
      quote:
        "Trekker has completely transformed my guiding business. I've connected with clients from around the world who are specifically looking for the types of experiences I offer, and the platform makes it so easy to manage bookings and communicate with travelers.",
      author: "Carlos Mendoza",
      role: "Mountain Guide, Patagonia Adventures",
    },
    technologies: [
      "React Native",
      "Node.js",
      "MongoDB",
      "MapBox API",
      "Stripe Connect",
    ],
    services: [
      "Market Research",
      "UX/UI Design",
      "Full-Stack Development",
      "Payment System Integration",
      "Community Building",
    ],
    process: [
      {
        title: "Adventure Market Analysis",
        description:
          "We conducted extensive research with both travelers and guides to understand the gaps in the adventure planning ecosystem.",
        image: "/images/projects/trekker.jpg",
      },
      {
        title: "Community-Centered Design",
        description:
          "We designed the platform around community needs, focusing on meaningful connections between travelers and local experts.",
        image: "/images/projects/trekker.jpg",
      },
      {
        title: "Map-Based Experience",
        description:
          "We built an interactive mapping system that forms the core of the Trekker experience, allowing visual exploration of adventures.",
        image: "/images/projects/trekker.jpg",
      },
      {
        title: "Guide Onboarding System",
        description:
          "We created a comprehensive vetting and onboarding process to ensure quality experiences across the platform.",
        image: "/images/projects/trekker.jpg",
      },
      {
        title: "Beta Community Launch",
        description:
          "We launched with a core group of adventure enthusiasts who helped shape the platform through continuous feedback.",
        image: "/images/projects/trekker.jpg",
      },
    ],
  },
  {
    id: "vynl",
    title: "Vynl",
    subtitle: "Bringing music discovery back to its community roots",
    description:
      "A social music platform that connects music lovers through shared discoveries, recommendations, and live listening events.",
    fullDescription:
      "Vynl reinvents music discovery by combining the best aspects of streaming platforms with the community feeling of record stores and music blogs. The platform helps users discover new music through community recommendations rather than algorithms, creating a more authentic and diverse listening experience connected to real people and stories.",
    challenge:
      "Despite having instant access to millions of songs, music lovers were struggling with discovery fatigue and missing the human connection that once made finding new music exciting. Algorithm-based recommendations were creating echo chambers and making it harder to discover truly new and diverse sounds.",
    approach:
      "We built Vynl around the concept of human curation, enabling users to create and share collections, stories behind discoveries, and live listening rooms. The platform emphasizes the storytellers behind music recommendations and facilitates connections between users with complementary taste profiles.",
    results:
      "Vynl has grown to over 350,000 active users who have created more than 900,000 curated collections. Users report discovering 3x more new artists compared to traditional streaming platforms, and 78% say they feel more connected to music through the community aspect. Independent artists on the platform have seen an average 127% increase in streaming numbers.",
    image: "/images/projects/vynl.jpg",
    heroImage: "/images/projects/vynl.jpg",
    additionalImages: [
      "/images/projects/vynl.jpg",
      "/images/projects/vynl.jpg",
      "/images/projects/vynl.jpg",
    ],
    impactMetrics: [
      { value: "350K", label: "Active Users" },
      { value: "3x", label: "New Artist Discovery" },
      { value: "127%", label: "Artist Streaming Increase" },
    ],
    category: "social",
    date: "6/5/2023",
    tags: ["Music Discovery", "Community Platform", "Creator Economy"],
    stats: "900,000+ curated collections created by users",
    metaTitle: "Vynl | Savvy Lab",
    metaDescription:
      "How Vynl is reimagining music discovery through human curation and community connections, creating a more authentic way to find new music.",
    team: [
      { name: "Olivia Chen", role: "Product Design Lead" },
      { name: "Miguel Santana", role: "Frontend Developer" },
      { name: "Aisha Johnson", role: "Community Manager" },
    ],
    relatedProjects: ["trekker", "cmdctr"],
    testimonial: {
      quote:
        "Vynl has completely changed how I find new music. Instead of relying on the same old recommendation algorithms, I'm discovering artists through people who share their personal stories and connections to the music. It's brought back the joy and surprise of stumbling upon something amazing.",
      author: "David Nguyen",
      role: "Music Blogger & Power User",
    },
    technologies: [
      "React",
      "GraphQL",
      "PostgreSQL",
      "WebRTC",
      "Music Streaming API Integration",
    ],
    services: [
      "User Research",
      "Social Platform Design",
      "Frontend Development",
      "Content Moderation Systems",
      "Community Guidelines",
    ],
    process: [
      {
        title: "Music Community Analysis",
        description:
          "We researched how people discovered and shared music before streaming algorithms dominated the landscape.",
        image: "/images/projects/vynl.jpg",
      },
      {
        title: "Human-Centered Curation",
        description:
          "We designed systems that prioritize human stories and context around music recommendations.",
        image: "/images/projects/vynl.jpg",
      },
      {
        title: "Connection Architecture",
        description:
          "We built sophisticated matching systems that connect users with complementary but not identical music tastes.",
        image: "/images/projects/vynl.jpg",
      },
      {
        title: "Collaborative Listening",
        description:
          "We created real-time listening rooms where users can experience music together and react in the moment.",
        image: "/images/projects/vynl.jpg",
      },
      {
        title: "Artist Integration",
        description:
          "We developed specific tools for independent artists to connect directly with potential fans through the platform.",
        image: "/images/projects/vynl.jpg",
      },
    ],
  },
  {
    id: "licid",
    title: "Licid",
    subtitle: "Simplifying licensing management for creative professionals",
    description:
      "A comprehensive platform that helps creators manage, track, and monetize their intellectual property across multiple channels.",
    fullDescription:
      "Licid is a sophisticated rights management platform built specifically for creators and content owners. It simplifies the complex world of licensing by providing tools to track usage, manage contracts, collect royalties, and protect intellectual property—all through an intuitive interface designed for creative professionals rather than legal experts.",
    challenge:
      "Creative professionals were losing millions in potential revenue due to ineffective licensing management. Traditional solutions were designed for large corporations with legal teams, leaving individual creators and smaller studios with cumbersome, expensive options that were difficult to implement and maintain.",
    approach:
      "We designed Licid from the ground up for creators themselves, focusing on simplicity and automation. The platform includes contract templates, usage tracking, automated royalty collection, and infringement detection, all presented through a visual interface that speaks the language of creative professionals.",
    results:
      "Creators using Licid have recovered an average of 32% more revenue from their work. The platform has processed over $12 million in royalty payments and identified more than 15,000 instances of unauthorized usage, helping creators protect their work and negotiate proper licensing agreements. User time spent on rights management has decreased by 68%.",
    image: "/images/projects/licid.jpg",
    heroImage: "/images/projects/licid.jpg",
    additionalImages: [
      "/images/projects/licid.jpg",
      "/images/projects/licid.jpg",
      "/images/projects/licid.jpg",
    ],
    impactMetrics: [
      { value: "32%", label: "Increased Revenue" },
      { value: "68%", label: "Time Saved" },
      { value: "15K+", label: "Infringements Detected" },
    ],
    category: "fintech",
    date: "2/8/2023",
    tags: ["IP Management", "Creator Economy", "Legal Tech"],
    stats: "$12M in royalties processed through the platform",
    metaTitle: "Licid | Savvy Lab",
    metaDescription:
      "How Licid is transforming intellectual property management for creators with intuitive tools for licensing, tracking, and monetizing creative work.",
    team: [
      { name: "Elijah Morris", role: "Product Director" },
      { name: "Naomi Chen", role: "UX Designer" },
      { name: "Thomas Wilson", role: "Backend Developer" },
    ],
    relatedProjects: ["undr", "escro"],
    testimonial: {
      quote:
        "Before Licid, managing licenses for my photography was a nightmare that I mostly avoided—meaning I lost revenue. Now I can set up licenses in minutes, track where my work is being used, and automatically collect payments. It's completely changed how I run my business.",
      author: "Sophia Rodriguez",
      role: "Professional Photographer",
    },
    technologies: [
      "React",
      "Django",
      "PostgreSQL",
      "Blockchain Integration",
      "Computer Vision APIs",
    ],
    services: [
      "IP Workflow Analysis",
      "User Experience Design",
      "Full-Stack Development",
      "Payment System Integration",
      "Legal Template Development",
    ],
    process: [
      {
        title: "Creator Needs Assessment",
        description:
          "We interviewed dozens of creators across disciplines to understand their licensing challenges and requirements.",
        image: "/images/projects/licid.jpg",
      },
      {
        title: "Legal Framework Translation",
        description:
          "We worked with IP attorneys to translate complex licensing concepts into simplified, creator-friendly frameworks.",
        image: "/images/projects/licid.jpg",
      },
      {
        title: "Visual Contract Builder",
        description:
          "We designed an intuitive visual system for creating legally sound contracts without requiring legal expertise.",
        image: "/images/projects/licid.jpg",
      },
      {
        title: "Usage Tracking System",
        description:
          "We developed automated tools to find and monitor content usage across the web and various media channels.",
        image: "/images/projects/licid.jpg",
      },
      {
        title: "Creator Beta Program",
        description:
          "We refined the platform through extensive testing with a diverse group of creators across multiple industries.",
        image: "/images/projects/licid.jpg",
      },
    ],
  },
  {
    id: "procur",
    title: "Procur",
    subtitle: "Transforming procurement for modern businesses",
    description:
      "A streamlined procurement platform that simplifies purchasing workflows, increases transparency, and optimizes spending.",
    fullDescription:
      "Procur modernizes the traditionally complex procurement process by providing businesses with an intuitive platform for managing vendors, tracking purchases, automating approvals, and analyzing spending patterns. The platform eliminates paperwork, streamlines communication, and provides valuable insights that help companies reduce costs and make smarter purchasing decisions.",
    challenge:
      "Businesses were struggling with fragmented procurement processes involving multiple systems, manual paperwork, and limited visibility into spending. This created inefficiencies, compliance risks, and missed opportunities for cost savings, particularly for mid-sized companies without enterprise procurement systems.",
    approach:
      "We built Procur as an end-to-end solution that centralizes the entire procurement lifecycle. The platform includes vendor management, purchase requisitions, automated approval workflows, spend analytics, and integration with accounting systems—all designed with a focus on usability for employees at all levels.",
    results:
      "Companies using Procur have reduced procurement processing time by 78% and decreased maverick spending by 34%. The platform has helped businesses identify an average of 21% in potential cost savings through vendor consolidation, contract optimization, and spending analysis. Employee compliance with procurement policies has increased by 89%.",
    image: "/images/projects/procur.jpg",
    heroImage: "/images/projects/procur.jpg",
    additionalImages: [
      "/images/projects/procur.jpg",
      "/images/projects/procur.jpg",
      "/images/projects/procur.jpg",
    ],
    impactMetrics: [
      { value: "78%", label: "Processing Time Reduction" },
      { value: "34%", label: "Maverick Spend Decrease" },
      { value: "21%", label: "Cost Savings Identified" },
    ],
    category: "enterprise",
    date: "8/15/2023",
    tags: ["Procurement", "Spend Management", "Process Automation"],
    stats: "Processing $150M+ in purchase orders monthly",
    metaTitle: "Procur | Savvy Lab",
    metaDescription:
      "How Procur is streamlining procurement processes for modern businesses through intuitive workflows, automation, and spending insights.",
    team: [
      { name: "Victor Okafor", role: "Product Manager" },
      { name: "Hannah Kim", role: "UX Researcher" },
      { name: "Dmitri Ivanov", role: "Full-Stack Developer" },
    ],
    relatedProjects: ["onbrd", "escro"],
    testimonial: {
      quote:
        "Procur has transformed our purchasing process from a disorganized, time-consuming headache into a streamlined system that actually provides value. We've saved thousands of dollars through better vendor management and spending visibility, and our team is thrilled to be free from the paperwork and email chains of our old process.",
      author: "Michael Tran",
      role: "Operations Director, Altura Manufacturing",
    },
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Machine Learning",
      "Accounting Software Integration",
    ],
    services: [
      "Process Analysis",
      "Interface Design",
      "Workflow Automation",
      "System Integration",
      "Data Analytics Implementation",
    ],
    process: [
      {
        title: "Procurement Pain Point Analysis",
        description:
          "We mapped existing procurement workflows across different industries to identify common challenges and inefficiencies.",
        image: "/images/projects/procur.jpg",
      },
      {
        title: "Approval Flow Optimization",
        description:
          "We designed flexible approval workflows that adapt to organizational structures while maintaining proper oversight.",
        image: "/images/projects/procur.jpg",
      },
      {
        title: "Analytics Framework",
        description:
          "We built powerful analytics tools that give businesses actionable insights into their spending patterns and opportunities.",
        image: "/images/projects/procur.jpg",
      },
      {
        title: "User-Centric Interface",
        description:
          "We created intuitive interfaces for different user types, from employees making requests to finance teams reviewing expenditures.",
        image: "/images/projects/procur.jpg",
      },
      {
        title: "Integration Architecture",
        description:
          "We developed a flexible integration system that connects with existing accounting, ERP, and inventory management systems.",
        image: "/images/projects/procur.jpg",
      },
    ],
  },
  {
    id: "escro",
    title: "Escro",
    subtitle: "Secure digital escrow for the modern economy",
    description:
      "A trusted platform facilitating secure transactions between parties through automated, transparent escrow services.",
    fullDescription:
      "Escro brings the security of traditional escrow services to digital transactions of all sizes. The platform provides a trusted third-party holding system that protects both buyers and sellers by verifying that all conditions of an agreement have been met before releasing funds. Escro handles everything from simple peer-to-peer sales to complex business transactions with multiple milestones and conditions.",
    challenge:
      "Digital transactions often suffer from a fundamental trust problem. Buyers risk paying for goods or services they never receive, while sellers risk delivering without payment. Traditional escrow services were too expensive and cumbersome for everyday transactions, while direct payments offered little protection for either party.",
    approach:
      "We created Escro to democratize escrow services through automation, transparent workflows, and flexible conditions. The platform combines secure payment processing, digital contract management, condition verification, and dispute resolution into a seamless experience that can be customized for different transaction types.",
    results:
      "Escro has facilitated over $85 million in secure transactions across 45,000+ deals. The platform has reduced transaction disputes by 93% compared to direct payment methods, while charging fees 75% lower than traditional escrow services. User surveys show a 96% satisfaction rate, with users highlighting increased confidence in transacting with new partners.",
    image: "/images/projects/escro.jpg",
    heroImage: "/images/projects/escro.jpg",
    additionalImages: [
      "/images/projects/escro.jpg",
      "/images/projects/escro.jpg",
      "/images/projects/escro.jpg",
    ],
    impactMetrics: [
      { value: "$85M+", label: "Transactions Secured" },
      { value: "93%", label: "Dispute Reduction" },
      { value: "75%", label: "Lower Fees" },
    ],
    category: "fintech",
    date: "9/30/2023",
    tags: ["Escrow Services", "Secure Payments", "Trust Systems"],
    stats: "45,000+ successful transactions completed",
    metaTitle: "Escro | Savvy Lab",
    metaDescription:
      "How Escro is revolutionizing digital transactions through automated, affordable escrow services that build trust between buyers and sellers.",
    team: [
      { name: "Amara Okafor", role: "Financial Product Lead" },
      { name: "Julian Meyer", role: "Security Architect" },
      { name: "Priya Sharma", role: "Frontend Developer" },
    ],
    relatedProjects: ["licid", "procur"],
    testimonial: {
      quote:
        "As a freelancer working with clients worldwide, payment security was always a concern. Escro has become essential to my business. I can set clear milestones, clients feel confident paying upfront, and we both know the process is fair and transparent. It's transformed how I approach new client relationships.",
      author: "Marco Rossi",
      role: "Independent Software Developer",
    },
    technologies: [
      "Vue.js",
      "Ruby on Rails",
      "PostgreSQL",
      "Blockchain",
      "Payment Gateway Integration",
    ],
    services: [
      "Financial Workflow Design",
      "Security Architecture",
      "Interface Development",
      "Smart Contract Implementation",
      "Dispute Resolution Systems",
    ],
    process: [
      {
        title: "Trust Gap Analysis",
        description:
          "We researched transaction scenarios across different industries to identify where trust breakdown commonly occurs.",
        image: "/images/projects/escro.jpg",
      },
      {
        title: "Security Architecture",
        description:
          "We designed a multi-layered security system to protect both financial and personal data throughout the transaction lifecycle.",
        image: "/images/projects/escro.jpg",
      },
      {
        title: "Condition Framework",
        description:
          "We developed a flexible system for defining, verifying, and approving transaction conditions for different use cases.",
        image: "/images/projects/escro.jpg",
      },
      {
        title: "Dispute Resolution",
        description:
          "We created fair, transparent processes for resolving disputes when transaction conditions are contested.",
        image: "/images/projects/escro.jpg",
      },
      {
        title: "Fee Optimization",
        description:
          "We engineered the platform to minimize operational costs, allowing for significantly lower fees than traditional escrow services.",
        image: "/images/projects/escro.jpg",
      },
    ],
  },
  {
    id: "cmdctr",
    title: "CmdCtr",
    subtitle: "Mission control for distributed engineering teams",
    description:
      "A comprehensive platform that helps engineering teams collaborate, track progress, and maintain visibility across distributed workflows.",
    fullDescription:
      "CmdCtr provides engineering teams with a unified workspace that brings together code management, task tracking, documentation, and team communication in one seamless environment. Designed specifically for distributed development teams, the platform eliminates context switching and information silos while providing leaders with the visibility they need to manage projects effectively.",
    challenge:
      "As engineering teams became more distributed, they struggled with fragmented tools, disconnected workflows, and reduced visibility. Engineers were spending up to 30% of their time switching between tools and searching for information, while team leaders lacked clear insights into project status and impediments.",
    approach:
      "We built CmdCtr as a central hub that integrates with existing development tools rather than replacing them. The platform aggregates information from source control, issue trackers, documentation systems, and communication tools into contextual workspaces, then provides intelligent dashboards and automation to streamline workflows.",
    results:
      "Teams using CmdCtr report a 42% reduction in time spent on non-coding activities and a 35% improvement in estimation accuracy. New team members reach productivity 58% faster due to improved documentation and context, while leaders cite 76% better visibility into project status and team capacity. Sprint completion rates have improved by 28% on average.",
    image: "/images/projects/cmdctr.jpg",
    heroImage: "/images/projects/cmdctr.jpg",
    additionalImages: [
      "/images/projects/cmdctr.jpg",
      "/images/projects/cmdctr.jpg",
      "/images/projects/cmdctr.jpg",
    ],
    impactMetrics: [
      { value: "42%", label: "Reduced Context Switching" },
      { value: "58%", label: "Faster Onboarding" },
      { value: "28%", label: "Sprint Completion Improvement" },
    ],
    category: "productivity",
    date: "11/5/2023",
    tags: ["Developer Tools", "Project Management", "Team Collaboration"],
    stats: "Used by 3,500+ engineering teams globally",
    metaTitle: "CmdCtr | Savvy Lab",
    metaDescription:
      "How CmdCtr is transforming engineering team collaboration through integrated workflows, contextual information, and improved visibility for distributed teams.",
    team: [
      { name: "Alex Chen", role: "Engineering Lead" },
      { name: "Nadia Ibrahim", role: "Product Designer" },
      { name: "Sam Taylor", role: "DevOps Specialist" },
    ],
    relatedProjects: ["onbrd", "undr"],
    testimonial: {
      quote:
        "CmdCtr has transformed how our distributed engineering team works. Instead of constantly switching between tools and hunting for information, everything is connected and contextual. Our productivity has skyrocketed, and I finally have the visibility I need to lead effectively without micromanaging. It's like having a superpower for engineering teams.",
      author: "Kiran Patel",
      role: "VP of Engineering, CloudScale Solutions",
    },
    technologies: [
      "React",
      "TypeScript",
      "GraphQL",
      "Kubernetes",
      "Git/GitHub Integration",
    ],
    services: [
      "Developer Workflow Research",
      "Integration Architecture",
      "Real-time Collaboration Design",
      "DevOps Pipeline Integration",
      "Analytics Implementation",
    ],
    process: [
      {
        title: "Engineering Workflow Analysis",
        description:
          "We studied how distributed engineering teams work, identifying friction points and interruptions in their daily processes.",
        image: "/images/projects/cmdctr.jpg",
      },
      {
        title: "Integration Hub Design",
        description:
          "We created a flexible integration architecture to connect with the diverse toolchains used by different engineering teams.",
        image: "/images/projects/cmdctr.jpg",
      },
      {
        title: "Context-Aware Workspaces",
        description:
          "We designed intelligent workspaces that aggregate relevant information from multiple sources based on the current task.",
        image: "/images/projects/cmdctr.jpg",
      },
      {
        title: "Team Visibility Framework",
        description:
          "We developed dashboards and reporting tools that provide actionable insights without creating additional work for engineers.",
        image: "/images/projects/cmdctr.jpg",
      },
      {
        title: "Progressive Automation",
        description:
          "We built automation tools that learn from team patterns and gradually automate repetitive aspects of the development workflow.",
        image: "/images/projects/cmdctr.jpg",
      },
    ],
  },
];
