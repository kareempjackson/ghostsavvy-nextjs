import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional subtitle or tagline",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for this post",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "teamMember" },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Design", value: "Design" },
          { title: "Development", value: "Development" },
          { title: "Product", value: "Product" },
          { title: "Strategy", value: "Strategy" },
          { title: "Business", value: "Business" },
          { title: "AI & Technology", value: "AI & Technology" },
          { title: "Case Study", value: "Case Study" },
          { title: "Industry Insights", value: "Industry Insights" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary of the post for previews and teasers",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "estimatedReadingTime",
      title: "Estimated Reading Time",
      type: "number",
      description: "Estimated reading time in minutes",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
        {
          type: "code",
          options: {
            withFilename: true,
          },
        },
        {
          type: "object",
          name: "callout",
          title: "Callout",
          fields: [
            {
              name: "content",
              type: "text",
              title: "Content",
            },
            {
              name: "type",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Tip", value: "tip" },
                  { title: "Warning", value: "warning" },
                  { title: "Note", value: "note" },
                ],
              },
              initialValue: "tip",
            },
          ],
        },
      ],
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
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "blogPost" },
        },
      ],
      description: "Other related blog posts",
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Whether this post should be featured on the blog page",
      initialValue: false,
    }),
    defineField({
      name: "featuredPosition",
      title: "Featured Position",
      type: "number",
      description:
        "Position in the featured posts section (lower numbers appear first)",
      hidden: ({ document }) => !document?.featured,
      initialValue: 1,
    }),
    defineField({
      name: "seo",
      title: "SEO & Social Sharing",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string", title: "Meta Title" },
        { name: "metaDescription", type: "text", title: "Meta Description" },
        {
          name: "socialImage",
          type: "image",
          title: "Social Sharing Image",
          options: { hotspot: true },
        },
        {
          name: "keywords",
          type: "array",
          of: [{ type: "string" }],
          title: "Keywords",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "authors.0.name",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, author, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: author ? `By ${author}` : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date",
      name: "publishedDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
