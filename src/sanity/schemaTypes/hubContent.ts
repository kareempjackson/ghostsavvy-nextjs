import { defineField, defineType } from "sanity";

export default defineType({
  name: "hubContent",
  title: "Savvy Hub Content",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "A unique identifier for this content piece",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
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
          { title: "Article", value: "Article" },
          { title: "Podcast", value: "Podcast" },
          { title: "Build Log", value: "Build Log" },
          { title: "Interview", value: "Interview" },
          { title: "Workshop", value: "Workshop" },
          { title: "Video", value: "Video" },
        ],
      },
      validation: (Rule) => Rule.required(),
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
      description: "Optional: Add a video URL if this content has a video",
    }),
    defineField({
      name: "link",
      title: "Content Link",
      type: "string",
      description:
        "The URL path to the full content (e.g., /savvy-hub/articles/my-article)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "Call to Action Text",
      type: "string",
      description:
        'Text for the call to action button (e.g., "Read More", "Listen Now")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
