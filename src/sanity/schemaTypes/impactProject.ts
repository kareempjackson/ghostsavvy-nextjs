import { defineField, defineType } from "sanity";

export default defineType({
  name: "impactProject",
  title: "Impact Project",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "A unique identifier for this impact project",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "A short subtitle for the project",
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
      name: "challenge",
      title: "Challenge",
      type: "text",
      description: "The problem or challenge this project addressed",
      rows: 5,
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "text",
      description: "Your approach or solution to the challenge",
      rows: 5,
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "text",
      description: "The measurable results or impact of the project",
      rows: 5,
    }),
    defineField({
      name: "impact",
      title: "Impact",
      type: "text",
      description: "The broader impact or social good implications",
      rows: 5,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Healthcare", value: "healthcare" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Financial Services", value: "fintech" },
          { title: "Learning & Work", value: "education" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Completion Date",
      type: "date",
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
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      description: "Additional images showcasing the project",
    }),
    defineField({
      name: "video",
      title: "Video URL",
      type: "url",
      description: "Optional: Add a video URL if this project has a video",
    }),
    defineField({
      name: "clientLogo",
      title: "Client Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Logo of the client or organization",
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "Name of the client or organization",
    }),
    defineField({
      name: "clientTestimonial",
      title: "Client Testimonial",
      type: "text",
      description: "A testimonial from the client about the project",
      rows: 3,
    }),
    defineField({
      name: "highlight",
      title: "Highlight in Grid",
      type: "boolean",
      description:
        "Whether this project should be highlighted (larger) in the grid layout",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Whether this project should be featured on the Impact page",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL-friendly identifier for this project",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
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
