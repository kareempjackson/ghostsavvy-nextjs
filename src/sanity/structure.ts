import type { StructureResolver } from "sanity/structure";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiActivity,
  FiSettings,
  FiMessageSquare,
} from "react-icons/fi";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Hub Content Group
      S.listItem()
        .title("Hub")
        .icon(FiMessageSquare)
        .child(
          S.list()
            .title("Hub Content")
            .items([
              S.listItem()
                .title("All Content")
                .child(
                  S.documentList()
                    .title("All Hub Content")
                    .filter('_type == "hubContent"')
                ),
              S.listItem()
                .title("Articles")
                .child(
                  S.documentList()
                    .title("Articles")
                    .filter('_type == "hubContent" && category == "Article"')
                ),
              S.listItem()
                .title("Videos")
                .child(
                  S.documentList()
                    .title("Videos")
                    .filter('_type == "hubContent" && category == "Video"')
                ),
              S.listItem()
                .title("Podcasts")
                .child(
                  S.documentList()
                    .title("Podcasts")
                    .filter('_type == "hubContent" && category == "Podcast"')
                ),
              S.listItem()
                .title("Featured Content")
                .child(
                  S.documentList()
                    .title("Featured Content")
                    .filter('_type == "hubContent" && featured == true')
                    .defaultOrdering([
                      { field: "featuredPosition", direction: "asc" },
                    ])
                ),
            ])
        ),

      // Impact Group
      S.listItem()
        .title("Impact")
        .icon(FiActivity)
        .child(
          S.list()
            .title("Impact")
            .items([
              S.listItem()
                .title("All Projects")
                .child(
                  S.documentList()
                    .title("All Projects")
                    .filter('_type == "project"')
                ),
              S.listItem()
                .title("Case Studies")
                .child(
                  S.documentList()
                    .title("Case Studies")
                    .filter('_type == "caseStudy"')
                ),
              S.listItem()
                .title("Featured Projects")
                .child(
                  S.documentList()
                    .title("Featured Projects")
                    .filter('_type == "project" && featured == true')
                    .defaultOrdering([
                      { field: "featuredPosition", direction: "asc" },
                    ])
                ),
            ])
        ),

      // Lab Group
      S.listItem()
        .title("Lab")
        .icon(FiBox)
        .child(
          S.list()
            .title("Lab")
            .items([
              S.listItem()
                .title("All Products")
                .child(
                  S.documentList()
                    .title("Lab Products")
                    .filter('_type == "labProduct"')
                ),
              S.listItem()
                .title("Featured Products")
                .child(
                  S.documentList()
                    .title("Featured Products")
                    .filter('_type == "labProduct" && featured == true')
                    .defaultOrdering([
                      { field: "featuredPosition", direction: "asc" },
                    ])
                ),
            ])
        ),

      // Team Members
      S.listItem()
        .title("Team")
        .icon(FiUsers)
        .child(
          S.documentList().title("Team Members").filter('_type == "teamMember"')
        ),

      // All other document types (for management)
      S.divider(),

      // Settings
      S.listItem()
        .title("Settings")
        .icon(FiSettings)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),

      // Singleton for home page
      S.listItem()
        .title("Home Page")
        .icon(FiHome)
        .child(S.document().schemaType("homePage").documentId("homePage")),
    ]);
