import { defineField, defineType } from "sanity";

export default defineType({
  name: "savvyProject",
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
      description: "URL to the video file used in the hero section background",
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
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              type: "text",
              title: "Quote",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author",
              type: "string",
              title: "Author Name",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              type: "string",
              title: "Author Role",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "company",
              type: "string",
              title: "Company",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "authorImage",
              type: "image",
              title: "Author Image",
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
      name: "relatedProducts",
      title: "Related Products",
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
              name: "subtitle",
              type: "string",
              title: "Subtitle",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "slug",
              type: "string",
              title: "Slug",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Project",
      type: "boolean",
      description: "Whether this project should be featured prominently",
      initialValue: false,
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
