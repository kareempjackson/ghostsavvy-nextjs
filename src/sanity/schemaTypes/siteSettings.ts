import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // This is a singleton document
  liveEdit: true,
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description: "The title of your site, used in SEO and browser tabs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Default site description for SEO",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter URL",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        },
        {
          name: "dribbble",
          title: "Dribbble URL",
          type: "url",
        },
        {
          name: "github",
          title: "GitHub URL",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "email",
          title: "Email Address",
          type: "string",
        },
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
        },
        {
          name: "address",
          title: "Address",
          type: "text",
          rows: 3,
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "googleAnalyticsId",
      title: "Google Analytics ID",
      type: "string",
    }),
  ],
});
