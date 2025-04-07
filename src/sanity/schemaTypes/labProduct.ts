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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text description for the product detail page",
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
      description: "Additional images showcasing the product",
    }),
    defineField({
      name: "featured",
      title: "Featured in Slider",
      type: "boolean",
      description: "Whether this product should be featured in the main slider",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "For Everyone", value: "everyone" },
          { title: "For Creators", value: "creators" },
          { title: "For Developers", value: "developers" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Key Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            {
              name: "icon",
              type: "string",
              title: "Icon Name",
              description:
                "Name of the icon to display (e.g., 'star', 'check', 'lightning')",
            },
          ],
        },
      ],
      description: "Key features or highlights of the product",
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
      description: "Important statistics/metrics about the product",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", type: "text", title: "Quote" },
            { name: "author", type: "string", title: "Author Name" },
            { name: "role", type: "string", title: "Author Role" },
            {
              name: "image",
              type: "image",
              title: "Author Image",
              options: { hotspot: true },
            },
          ],
        },
      ],
      description: "Testimonials from users of the product",
    }),
    defineField({
      name: "video",
      title: "Demo Video URL",
      type: "url",
      description: "URL to a demo/promotional video",
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
      name: "externalLink",
      title: "External Product URL",
      type: "url",
      description: "Link to the actual product website or app store",
    }),
    defineField({
      name: "techStack",
      title: "Technology Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Technologies used to build the product",
    }),
    defineField({
      name: "highlight",
      title: "Key Metric Highlight",
      type: "string",
      description:
        "A key metric/stat to highlight (e.g., '10M+ Monthly Active Users')",
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "date",
      description: "When the product was first released",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Control the display order (lower numbers appear first)",
      initialValue: 99,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL-friendly identifier for this product",
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
