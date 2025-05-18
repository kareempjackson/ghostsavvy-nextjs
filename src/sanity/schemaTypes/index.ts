import { type SchemaTypeDefinition } from "sanity";
import hubContent from "./hubContent";
import venture from "./venture";
import teamMember from "./teamMember";
import podcast from "./podcast";
import blogPost from "./blogPost";
import event from "./event";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import savvyProject from "./savvyProject";
import impactProject from "./impactProject";
import labProject from "./labProject";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hubContent,
    venture,
    teamMember,
    podcast,
    blogPost,
    event,
    siteSettings,
    homePage,
    savvyProject,
    impactProject,
    labProject,
  ],
};
