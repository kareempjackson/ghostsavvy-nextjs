import { defineField, defineType } from "sanity";

export default defineType({
  name: "labProject",
  title: "Savvy Lab Project",
  type: "document",
  fields: [
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
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video URL",
      type: "url",
      description:
        "URL to the video file used in the hero section background (optional)",
    }),
    defineField({
      name: "projectLogo",
      title: "Project Logo",
      type: "image",
      description: "Logo for the project (optional)",
      options: {
        hotspot: true,
      },
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
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              type: "image",
              title: "Feature Icon",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "mockups",
      title: "Product Mockups",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Mockup Image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "type",
              title: "Mockup Type",
              type: "string",
              options: {
                list: [
                  { title: "Desktop", value: "desktop" },
                  { title: "Mobile", value: "mobile" },
                  { title: "Tablet", value: "tablet" },
                  { title: "Other", value: "other" },
                ],
                layout: "radio",
              },
              initialValue: "desktop",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "labProject" }],
        },
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Project",
      type: "boolean",
      description:
        "Whether this project should be featured prominently at the top of the page",
      initialValue: false,
    }),
    defineField({
      name: "isHighlight",
      title: "Highlight Project",
      type: "boolean",
      description:
        "Whether this project should be displayed as a highlight in the main section",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this project appears (lower numbers appear first)",
      initialValue: 10,
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Concept", value: "concept" },
          { title: "In Development", value: "development" },
          { title: "Beta", value: "beta" },
          { title: "Released", value: "released" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "concept",
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Link to external project site or demo (if available)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "heroImage",
    },
  },
});
