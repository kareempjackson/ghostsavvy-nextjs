import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "A unique identifier for this project",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hook",
      title: "Hook",
      type: "string",
      description: "A catchy short description shown under the title",
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
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video URL",
      type: "url",
      description: "Optional: Add a video URL if this project has a video",
    }),
    defineField({
      name: "link",
      title: "Project Link",
      type: "string",
      description:
        "The URL path to the project case study (e.g., /impact/project-name)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      title: "Display Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
      initialValue: "medium",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Whether this project should be featured on the homepage",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "hook",
      media: "image",
    },
  },
});
