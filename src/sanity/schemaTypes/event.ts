import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Webinar", value: "webinar" },
          { title: "Workshop", value: "workshop" },
          { title: "Conference", value: "conference" },
          { title: "Meetup", value: "meetup" },
          { title: "Panel Discussion", value: "panel" },
          { title: "Product Launch", value: "launch" },
          { title: "AMA Session", value: "ama" },
          { title: "Hackathon", value: "hackathon" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Event Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Live Now", value: "live" },
          { title: "Past", value: "past" },
          { title: "Canceled", value: "canceled" },
          { title: "Postponed", value: "postponed" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "upcoming",
    }),
    defineField({
      name: "format",
      title: "Event Format",
      type: "string",
      options: {
        list: [
          { title: "Online", value: "online" },
          { title: "In-Person", value: "in-person" },
          { title: "Hybrid", value: "hybrid" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
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
      name: "dateTime",
      title: "Date & Time",
      type: "object",
      fields: [
        {
          name: "startDateTime",
          title: "Start Date & Time",
          type: "datetime",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "endDateTime",
          title: "End Date & Time",
          type: "datetime",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "timeZone",
          title: "Time Zone",
          type: "string",
          description: "e.g., 'ET', 'PT', 'GMT'",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "address",
          title: "Address",
          type: "text",
          hidden: ({ parent }) => parent?.format === "online",
        },
        {
          name: "city",
          title: "City",
          type: "string",
          hidden: ({ parent }) => parent?.format === "online",
        },
        {
          name: "state",
          title: "State/Province",
          type: "string",
          hidden: ({ parent }) => parent?.format === "online",
        },
        {
          name: "country",
          title: "Country",
          type: "string",
          hidden: ({ parent }) => parent?.format === "online",
        },
        {
          name: "venueDetails",
          title: "Venue Details",
          type: "text",
          description: "Special instructions, room number, etc.",
          hidden: ({ parent }) => parent?.format === "online",
        },
        {
          name: "googleMapsLink",
          title: "Google Maps Link",
          type: "url",
          hidden: ({ parent }) => parent?.format === "online",
        },
      ],
    }),
    defineField({
      name: "virtualEventLinks",
      title: "Virtual Event Links",
      type: "object",
      hidden: ({ document }) => document?.format === "in-person",
      fields: [
        {
          name: "registrationLink",
          title: "Registration Link",
          type: "url",
        },
        {
          name: "webinarLink",
          title: "Webinar/Meeting Link",
          type: "url",
          description: "Link to join the live event",
        },
        {
          name: "recordingLink",
          title: "Recording Link",
          type: "url",
          description: "Will be available after the event",
          hidden: ({ document }) => document?.status !== "past",
        },
        {
          name: "platform",
          title: "Platform",
          type: "string",
          description: "e.g., Zoom, Google Meet, Microsoft Teams",
          options: {
            list: [
              { title: "Zoom", value: "zoom" },
              { title: "Google Meet", value: "google-meet" },
              { title: "Microsoft Teams", value: "teams" },
              { title: "YouTube Live", value: "youtube" },
              { title: "Twitch", value: "twitch" },
              { title: "Custom Platform", value: "custom" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "featuredSpeakers",
      title: "Featured Speakers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Speaker Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              title: "Title/Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "company",
              title: "Company/Organization",
              type: "string",
            },
            {
              name: "bio",
              title: "Short Bio",
              type: "text",
            },
            {
              name: "image",
              title: "Speaker Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "socialLinks",
              title: "Social Links",
              type: "object",
              fields: [
                { name: "linkedin", title: "LinkedIn", type: "url" },
                { name: "twitter", title: "Twitter", type: "url" },
                { name: "website", title: "Website", type: "url" },
              ],
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
              media: "image",
            },
          },
        },
        {
          type: "reference",
          title: "Team Member",
          to: { type: "teamMember" },
        },
      ],
    }),
    defineField({
      name: "agenda",
      title: "Event Agenda",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "time",
              title: "Time",
              type: "string",
              description: "e.g., '10:00 AM - 10:30 AM'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Session Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Session Description",
              type: "text",
            },
            {
              name: "speakers",
              title: "Session Speakers",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "time",
            },
          },
        },
      ],
    }),
    defineField({
      name: "registration",
      title: "Registration Details",
      type: "object",
      fields: [
        {
          name: "isRequired",
          title: "Registration Required",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "deadline",
          title: "Registration Deadline",
          type: "datetime",
          hidden: ({ parent }) => !parent?.isRequired,
        },
        {
          name: "maxAttendees",
          title: "Maximum Attendees",
          type: "number",
          hidden: ({ parent }) => !parent?.isRequired,
        },
        {
          name: "registrationUrl",
          title: "Registration URL",
          type: "url",
          validation: (Rule) => Rule.uri(),
          hidden: ({ parent }) => !parent?.isRequired,
        },
        {
          name: "price",
          title: "Price",
          type: "object",
          fields: [
            {
              name: "isFree",
              title: "Free Event",
              type: "boolean",
              initialValue: true,
            },
            {
              name: "amount",
              title: "Price Amount",
              type: "number",
              hidden: ({ parent }) => parent?.isFree,
            },
            {
              name: "currency",
              title: "Currency",
              type: "string",
              initialValue: "USD",
              hidden: ({ parent }) => parent?.isFree,
            },
            {
              name: "earlyBirdAvailable",
              title: "Early Bird Available",
              type: "boolean",
              initialValue: false,
              hidden: ({ parent }) => parent?.isFree,
            },
            {
              name: "earlyBirdAmount",
              title: "Early Bird Price",
              type: "number",
              hidden: ({ parent }) =>
                parent?.isFree || !parent?.earlyBirdAvailable,
            },
            {
              name: "earlyBirdDeadline",
              title: "Early Bird Deadline",
              type: "datetime",
              hidden: ({ parent }) =>
                parent?.isFree || !parent?.earlyBirdAvailable,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "resources",
      title: "Event Resources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Resource Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "type",
              title: "Resource Type",
              type: "string",
              options: {
                list: [
                  { title: "Slides", value: "slides" },
                  { title: "PDF", value: "pdf" },
                  { title: "Video", value: "video" },
                  { title: "Code Repository", value: "code" },
                  { title: "Article", value: "article" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "Resource URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Resource Description",
              type: "text",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "type",
            },
          },
        },
      ],
      hidden: ({ document }) => document?.status !== "past",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "relatedEvents",
      title: "Related Events",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "event" },
        },
      ],
    }),
    defineField({
      name: "sponsors",
      title: "Event Sponsors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Sponsor Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "logo",
              title: "Sponsor Logo",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "website",
              title: "Sponsor Website",
              type: "url",
            },
            {
              name: "level",
              title: "Sponsorship Level",
              type: "string",
              options: {
                list: [
                  { title: "Platinum", value: "platinum" },
                  { title: "Gold", value: "gold" },
                  { title: "Silver", value: "silver" },
                  { title: "Bronze", value: "bronze" },
                  { title: "Partner", value: "partner" },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "level",
              media: "logo",
            },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      description: "Whether this event should be featured on the events page",
      initialValue: false,
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
      eventType: "eventType",
      status: "status",
      start: "dateTime.startDateTime",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, eventType, status, start, media, featured }) {
      let subtitle = "";
      if (eventType) {
        subtitle += eventType.charAt(0).toUpperCase() + eventType.slice(1);
      }
      if (status) {
        subtitle += subtitle
          ? ` • ${status.toUpperCase()}`
          : status.toUpperCase();
      }
      if (start) {
        const date = new Date(start);
        subtitle += subtitle
          ? ` • ${date.toLocaleDateString()}`
          : date.toLocaleDateString();
      }

      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Event Date",
      name: "eventDateDesc",
      by: [{ field: "dateTime.startDateTime", direction: "desc" }],
    },
    {
      title: "Event Status",
      name: "eventStatus",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
