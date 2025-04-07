import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Case Study Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientLogo",
      title: "Client Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      options: {
        list: [
          { title: "Technology", value: "Technology" },
          { title: "Healthcare", value: "Healthcare" },
          { title: "Finance", value: "Finance" },
          { title: "Education", value: "Education" },
          { title: "E-commerce", value: "E-commerce" },
          { title: "Entertainment", value: "Entertainment" },
          { title: "Travel", value: "Travel" },
          { title: "Food & Beverage", value: "Food & Beverage" },
          { title: "Real Estate", value: "Real Estate" },
          { title: "Non-profit", value: "Non-profit" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Web Development", value: "Web Development" },
          { title: "Mobile App", value: "Mobile App" },
          { title: "Design", value: "Design" },
          { title: "Branding", value: "Branding" },
          { title: "UX Research", value: "UX Research" },
          { title: "Strategy", value: "Strategy" },
          { title: "Consulting", value: "Consulting" },
          { title: "E-commerce", value: "E-commerce" },
          { title: "Digital Transformation", value: "Digital Transformation" },
          { title: "AI Implementation", value: "AI Implementation" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Executive Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectDuration",
      title: "Project Duration",
      type: "object",
      fields: [
        {
          name: "startDate",
          title: "Start Date",
          type: "date",
        },
        {
          name: "endDate",
          title: "End Date",
          type: "date",
        },
        {
          name: "durationText",
          title: "Duration Text",
          type: "string",
          description: "e.g., '3 months', '1 year'",
        },
      ],
    }),
    defineField({
      name: "projectTeam",
      title: "Project Team",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "teamMember" },
        },
      ],
    }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approach",
      title: "Our Approach",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "solution",
      title: "The Solution",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Feature Title",
              type: "string",
            },
            {
              name: "description",
              title: "Feature Description",
              type: "text",
            },
            {
              name: "icon",
              title: "Feature Icon",
              type: "string",
              description: "Icon name from your design system or emoji",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "results",
      title: "Results & Impact",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metrics",
      title: "Key Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Metric Label",
              type: "string",
            },
            {
              name: "value",
              title: "Metric Value",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      fields: [
        {
          name: "quote",
          title: "Quote",
          type: "text",
        },
        {
          name: "author",
          title: "Author Name",
          type: "string",
        },
        {
          name: "role",
          title: "Author Role",
          type: "string",
        },
        {
          name: "image",
          title: "Author Image",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "nextSteps",
      title: "Next Steps/Future Plans",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "relatedCaseStudies",
      title: "Related Case Studies",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "caseStudy" },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Case Study",
      type: "boolean",
      description:
        "Whether this case study should be featured on the homepage or case studies page",
      initialValue: false,
    }),
    defineField({
      name: "featuredOrder",
      title: "Featured Order",
      type: "number",
      description: "Order in featured list (lower numbers appear first)",
      hidden: ({ document }) => !document?.featured,
      initialValue: 1,
    }),
    defineField({
      name: "seo",
      title: "SEO & Social Sharing",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string", title: "Meta Title" },
        { name: "metaDescription", type: "text", title: "Meta Description" },
        {
          name: "socialImage",
          type: "image",
          title: "Social Sharing Image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
      media: "featuredImage",
      featured: "featured",
    },
    prepare({ title, client, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: client ? `Client: ${client}` : "",
        media,
      };
    },
  },
});
