import { defineField, defineType } from "sanity";

export default defineType({
  name: "labProduct",
  title: "Lab Product",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "A unique identifier for this lab product",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "A short description of the product",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A longer description of the product",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "Live" },
          { title: "Beta", value: "Beta" },
          { title: "Concept", value: "Concept" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "A larger preview image for the product (used in detail views and sliders)",
    }),
    defineField({
      name: "featured",
      title: "Featured in Slider",
      type: "boolean",
      description: "Whether this product should be featured in the main slider",
      initialValue: false,
    }),
    defineField({
      name: "link",
      title: "Product Link",
      type: "string",
      description:
        "The URL path to the product detail page (e.g., /savvy-lab/product-name)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Control the display order (lower numbers appear first)",
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "icon",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${status} - ${subtitle}`,
        media,
      };
    },
  },
});
