import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Savvy Hub Content Group
      S.listItem()
        .title("Savvy Hub")
        .child(
          S.list()
            .title("Savvy Hub")
            .items([
              S.documentTypeListItem("hubContent").title("All Hub Content"),
            ])
        ),

      // Projects/Stories of Impact Group
      S.listItem()
        .title("Stories of Impact")
        .child(
          S.list()
            .title("Stories of Impact")
            .items([
              S.documentTypeListItem("project").title("All Projects"),
              // For filtering featured projects, we use a different approach
              S.listItem()
                .title("Featured Projects")
                .child(
                  S.documentList()
                    .title("Featured Projects")
                    .filter('_type == "project" && featured == true')
                ),
            ])
        ),

      // Lab Products Group
      S.listItem()
        .title("Our Lab")
        .child(
          S.list()
            .title("Our Lab")
            .items([
              S.documentTypeListItem("labProduct").title("All Lab Products"),
              // For filtering featured lab products
              S.listItem()
                .title("Featured Lab Products")
                .child(
                  S.documentList()
                    .title("Featured Lab Products")
                    .filter('_type == "labProduct" && featured == true')
                ),
            ])
        ),
    ]);
