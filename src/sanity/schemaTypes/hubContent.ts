import { defineField, defineType } from "sanity";

export default defineType({
  name: "hubContent",
  title: "Hub Content",
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
      title: "Main Image",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "The URL-friendly identifier for this content (used in the URL)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Content Link",
      type: "string",
      description:
        "The URL path to the full content (e.g., /hub/articles/my-article)",
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
    defineField({
      name: "featured",
      title: "Featured Content",
      type: "boolean",
      description:
        "Whether this content should be featured in the main Hub section",
      initialValue: false,
    }),
    defineField({
      name: "featuredHome",
      title: "Featured on Home Page",
      type: "boolean",
      description: "Whether this content should be featured on the home page",
      initialValue: false,
    }),
    defineField({
      name: "featuredPosition",
      title: "Featured Position",
      type: "number",
      description:
        "Position in the featured content carousel (lower numbers appear first)",
      hidden: ({ document }) => !document?.featured,
      initialValue: 1,
    }),
    defineField({
      name: "readTime",
      title: "Reading Time",
      description: "Estimated reading time in minutes (for articles)",
      type: "number",
      hidden: ({ document }) => document?.category !== "Article",
    }),
    defineField({
      name: "fullContent",
      title: "Full Content",
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
      ],
      description: "The full content of the article/post in rich text format",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "A short excerpt for previews and teasers (defaults to the description if not provided)",
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
      description: "The authors of this content piece",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Tags to categorize the content",
    }),
    defineField({
      name: "relatedContent",
      title: "Related Content",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "hubContent" },
        },
      ],
      description: "Other related content pieces to show alongside this one",
    }),
    defineField({
      name: "podcast",
      title: "Podcast Details",
      type: "object",
      hidden: ({ document }) => document?.category !== "Podcast",
      fields: [
        { name: "duration", type: "string", title: "Duration" },
        { name: "episodeNumber", type: "number", title: "Episode Number" },
        { name: "audioUrl", type: "url", title: "Audio URL" },
        { name: "embedUrl", type: "url", title: "Embed URL (e.g., Spotify)" },
        { name: "transcript", type: "text", title: "Transcript" },
      ],
    }),
    defineField({
      name: "videoDetails",
      title: "Video Details",
      type: "object",
      hidden: ({ document }) => document?.category !== "Video",
      fields: [
        { name: "duration", type: "string", title: "Duration" },
        { name: "videoUrl", type: "url", title: "Video URL" },
        { name: "embedUrl", type: "url", title: "Embed URL (e.g., YouTube)" },
        { name: "transcript", type: "text", title: "Transcript" },
      ],
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
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
