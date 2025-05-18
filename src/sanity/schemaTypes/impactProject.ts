import { defineField, defineType } from "sanity";

export default defineType({
  name: "impactProject",
  title: "Impact Project",
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
      name: "projectLogo",
      title: "Project Logo",
      type: "image",
      description:
        "Custom logo to display in the header for this project (optional)",
      options: {
        hotspot: true,
      },
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
      name: "theme",
      title: "Theme Customization",
      description: "Customize the appearance of this project's page",
      type: "object",
      fields: [
        {
          name: "headingsFont",
          title: "Headings Font",
          type: "string",
          description:
            "Font family for headings (e.g., 'Montserrat, sans-serif')",
        },
        {
          name: "bodyFont",
          title: "Body Font",
          type: "string",
          description: "Font family for body text (e.g., 'Lato, sans-serif')",
        },
        {
          name: "accentFont",
          title: "Accent Font",
          type: "string",
          description:
            "Font family for accents (e.g., 'Architects Daughter, cursive')",
        },
        {
          name: "primaryBackground",
          title: "Primary Background Color",
          type: "string",
          description: "Background color for primary sections (e.g., #F1F1EF)",
        },
        {
          name: "secondaryBackground",
          title: "Secondary Background Color",
          type: "string",
          description:
            "Background color for alternating sections (e.g., #FFFFFF)",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Main text color (e.g., #121212)",
        },
        {
          name: "accentColor",
          title: "Accent Color",
          type: "string",
          description: "Color for accents and highlights (e.g., #E15D26)",
        },
        {
          name: "footerBackground",
          title: "Footer Background Color",
          type: "string",
          description:
            "Background color for the footer section (e.g., #000000)",
        },
        {
          name: "footerTextColor",
          title: "Footer Text Color",
          type: "string",
          description: "Text color for the footer section (e.g., #FFFFFF)",
        },
      ],
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
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "impactProject" }],
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
      name: "chapters",
      title: "Content Chapters",
      description:
        "Structured content chapters for the project (if you prefer a chapter-based layout)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Chapter Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "intro",
              title: "Chapter Introduction",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "sections",
              title: "Chapter Sections",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Section Title",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "content",
                      title: "Section Content",
                      type: "text",
                      rows: 6,
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "alignment",
                      title: "Text Alignment",
                      type: "string",
                      options: {
                        list: [
                          { title: "Left", value: "left" },
                          { title: "Center", value: "center" },
                          { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "left",
                    },
                    {
                      name: "backgroundColor",
                      title: "Section Background Color",
                      type: "string",
                      description:
                        "Optional background color for this section (e.g., #F8F8F8)",
                    },
                    {
                      name: "textColor",
                      title: "Section Text Color",
                      type: "string",
                      description:
                        "Optional text color for this section (e.g., #121212)",
                    },
                    {
                      name: "media",
                      title: "Section Media",
                      type: "array",
                      of: [
                        {
                          type: "image",
                          options: { hotspot: true },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "testimonial",
              title: "Chapter Testimonial",
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
                },
                {
                  name: "company",
                  type: "string",
                  title: "Company",
                },
                {
                  name: "authorImage",
                  type: "image",
                  title: "Author Image",
                  options: { hotspot: true },
                },
              ],
            },
            {
              name: "media",
              title: "Chapter Media",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                },
              ],
            },
          ],
        },
      ],
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
