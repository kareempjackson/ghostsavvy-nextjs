import { defineField, defineType } from "sanity";

export default defineType({
  name: "podcast",
  title: "Podcast Episode",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Episode Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episodeNumber",
      title: "Episode Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seasonNumber",
      title: "Season Number",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Format: HH:MM:SS or MM:SS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "audioFile",
      title: "Audio File URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "externalLinks",
      title: "External Platform Links",
      type: "object",
      fields: [
        { name: "spotify", type: "url", title: "Spotify URL" },
        { name: "apple", type: "url", title: "Apple Podcasts URL" },
        { name: "google", type: "url", title: "Google Podcasts URL" },
        { name: "youtube", type: "url", title: "YouTube URL" },
        { name: "other", type: "url", title: "Other Platform URL" },
      ],
    }),
    defineField({
      name: "embedCode",
      title: "Embed Code",
      type: "text",
      description: "Embed code from platforms like Spotify or SoundCloud",
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [{ type: "block" }],
      description: "Complete transcript of the episode",
    }),
    defineField({
      name: "guests",
      title: "Guests",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "role", type: "string", title: "Role/Title" },
            { name: "company", type: "string", title: "Company/Organization" },
            {
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
            },
            { name: "bio", type: "text", title: "Bio" },
            {
              name: "socialLinks",
              type: "object",
              title: "Social Links",
              fields: [
                { name: "linkedin", type: "url", title: "LinkedIn" },
                { name: "twitter", type: "url", title: "Twitter" },
                { name: "website", type: "url", title: "Website" },
              ],
            },
          ],
        },
      ],
      description: "Guests featured in this episode",
    }),
    defineField({
      name: "hosts",
      title: "Hosts",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "teamMember" },
        },
      ],
      description: "Team members who hosted this episode",
    }),
    defineField({
      name: "segments",
      title: "Episode Segments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Segment Title" },
            { name: "startTime", type: "string", title: "Start Time (MM:SS)" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
      description: "Timeline segments of the episode for navigation",
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
      name: "relatedEpisodes",
      title: "Related Episodes",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "podcast" },
        },
      ],
      description: "Other related podcast episodes",
    }),
    defineField({
      name: "featured",
      title: "Featured Episode",
      type: "boolean",
      description:
        "Whether this episode should be featured on the podcast page",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for this episode",
      options: {
        source: (doc) => `episode-${doc.episodeNumber}-${doc.title}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      subtitle: "episodeNumber",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: `Episode ${subtitle}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Episode Number",
      name: "episodeNumber",
      by: [{ field: "episodeNumber", direction: "desc" }],
    },
    {
      title: "Release Date",
      name: "releaseDate",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
  ],
});
