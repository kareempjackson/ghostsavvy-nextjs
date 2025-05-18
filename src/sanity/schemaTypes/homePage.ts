import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "SEO description for the home page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subheading",
          title: "Subheading",
          type: "text",
          rows: 2,
        },
        {
          name: "backgroundVideo",
          title: "Background Video URL",
          type: "url",
          description: "URL to the video used in the hero section background",
        },
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
          description: "Fallback image if video doesn't load",
        },
        {
          name: "ctaText",
          title: "Call to Action Text",
          type: "string",
        },
        {
          name: "ctaLink",
          title: "Call to Action Link",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "purposeSection",
      title: "Purpose Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "image",
          title: "Section Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "approachSection",
      title: "Approach Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "introduction",
          title: "Introduction",
          type: "text",
          rows: 3,
        },
        {
          name: "steps",
          title: "Approach Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Step Title",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Step Description",
                  type: "text",
                  rows: 3,
                },
                {
                  name: "icon",
                  title: "Step Icon",
                  type: "image",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "featuredContent",
      title: "Featured Content",
      description:
        "Select featured content from the Hub to display on the home page",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "hubContent" }],
          options: {
            filter: "featured == true",
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      description: "Select featured projects to display on the home page",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "savvyProject" }],
          options: {
            filter: "isFeatured == true",
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "ctaSection",
      title: "Call to Action Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "text",
          title: "Text",
          type: "text",
          rows: 2,
        },
        {
          name: "buttonText",
          title: "Button Text",
          type: "string",
        },
        {
          name: "buttonLink",
          title: "Button Link",
          type: "string",
        },
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
});
