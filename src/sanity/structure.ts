import type { StructureResolver } from "sanity/structure";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMessageSquare,
  FiLayers,
  FiFile,
  FiStar,
  FiTarget,
} from "react-icons/fi";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      // Singleton for home page - moved to top for easier access
      S.listItem()
        .title("Home Page")
        .icon(FiHome)
        .child(S.document().schemaType("homePage").documentId("homePage")),

      S.divider(),

      // Impact Projects - moved up for prominence
      S.listItem()
        .title("Savvy Impact")
        .icon(FiTarget)
        .child(
          S.list()
            .title("Savvy Impact")
            .items([
              S.listItem()
                .title("All Impact Projects")
                .icon(FiFile)
                .child(
                  S.documentList()
                    .title("All Impact Projects")
                    .filter('_type == "impactProject"')
                ),
              S.listItem()
                .title("Featured Projects")
                .icon(FiStar)
                .child(
                  S.documentList()
                    .title("Featured Impact Projects")
                    .filter('_type == "impactProject" && isFeatured == true')
                ),
              S.listItem()
                .title("Highlight Projects")
                .child(
                  S.documentList()
                    .title("Highlight Impact Projects")
                    .filter('_type == "impactProject" && isHighlight == true')
                ),
            ])
        ),

      // Savvy Lab Projects
      S.listItem()
        .title("Savvy Lab")
        .icon(FiLayers)
        .child(
          S.list()
            .title("Savvy Lab")
            .items([
              S.listItem()
                .title("All Projects")
                .icon(FiFile)
                .child(
                  S.documentList()
                    .title("All Projects")
                    .filter('_type == "savvyProject"')
                ),
              S.listItem()
                .title("Featured Projects")
                .icon(FiStar)
                .child(
                  S.documentList()
                    .title("Featured Projects")
                    .filter('_type == "savvyProject" && isFeatured == true')
                ),
            ])
        ),

      S.divider(),

      // Hub Content Group
      S.listItem()
        .title("Hub Content")
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
                .icon(FiStar)
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

      S.divider(),

      // Team Members
      S.listItem()
        .title("Team")
        .icon(FiUsers)
        .child(
          S.documentList().title("Team Members").filter('_type == "teamMember"')
        ),

      // Settings
      S.listItem()
        .title("Site Settings")
        .icon(FiSettings)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);
