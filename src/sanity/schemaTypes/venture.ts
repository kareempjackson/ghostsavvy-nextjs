import { defineField, defineType } from "sanity";

export default defineType({
  name: "venture",
  title: "Venture",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "A unique identifier for this venture",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web3", value: "Web3" },
          { title: "AI & Analytics", value: "AI & Analytics" },
          { title: "Fintech", value: "Fintech" },
          { title: "Identity", value: "Identity" },
          { title: "SaaS", value: "SaaS" },
          { title: "Healthcare", value: "Healthcare" },
          { title: "Marketplace", value: "Marketplace" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "yearFounded",
      title: "Year Founded",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "equity",
      title: "Ghost Savvy Equity %",
      type: "string",
      description: "The percentage of equity Ghost Savvy holds",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stage",
      title: "Funding Stage",
      type: "string",
      options: {
        list: [
          { title: "Pre-seed", value: "Pre-seed" },
          { title: "Seed", value: "Seed" },
          { title: "Series A", value: "Series A" },
          { title: "Series B", value: "Series B" },
          { title: "Series C+", value: "Series C+" },
          { title: "Acquired", value: "Acquired" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "url",
      title: "Detail Page URL",
      type: "string",
      description:
        "Path to the detail page (e.g., /savvy-ventures/venture-name)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "websiteUrl",
      title: "Company Website URL",
      type: "url",
      description: "URL to the company's external website",
    }),
    defineField({
      name: "contributionType",
      title: "Ghost Savvy Contribution",
      type: "string",
      options: {
        list: [
          { title: "Technical Co-founder", value: "Technical Co-founder" },
          { title: "Engineering Partner", value: "Engineering Partner" },
          { title: "CTO-as-a-Service", value: "CTO-as-a-Service" },
          { title: "MVP Development", value: "MVP Development" },
          { title: "Full-Stack Development", value: "Full-Stack Development" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "teamMembers",
      title: "Ghost Savvy Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "role", type: "string", title: "Role" },
            {
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            },
          ],
        },
      ],
      description: "Ghost Savvy team members involved in this venture",
    }),
    defineField({
      name: "caseStudy",
      title: "Case Study",
      type: "text",
      rows: 10,
      description: "Detailed case study about Ghost Savvy's contribution",
    }),
    defineField({
      name: "testimonial",
      title: "Founder Testimonial",
      type: "text",
      rows: 3,
      description:
        "A testimonial from the founder about Ghost Savvy's contribution",
    }),
    defineField({
      name: "testimonialAuthor",
      title: "Testimonial Author",
      type: "string",
      description: "Name and title of the person giving the testimonial",
    }),
    defineField({
      name: "featured",
      title: "Featured Venture",
      type: "boolean",
      description: "Whether this venture should be featured prominently",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL-friendly identifier for this venture",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "stage",
      media: "logo",
      category: "category",
    },
    prepare({ title, subtitle, media, category }) {
      return {
        title,
        subtitle: `${category} - ${subtitle}`,
        media,
      };
    },
  },
});
