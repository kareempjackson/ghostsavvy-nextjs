import { type SchemaTypeDefinition } from "sanity";
import hubContent from "./hubContent";
import project from "./project";
import labProduct from "./labProduct";
import impactProject from "./impactProject";
import venture from "./venture";
import teamMember from "./teamMember";
import podcast from "./podcast";
import blogPost from "./blogPost";
import caseStudy from "./caseStudy";
import event from "./event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hubContent,
    project,
    labProduct,
    impactProject,
    venture,
    teamMember,
    podcast,
    blogPost,
    caseStudy,
    event,
  ],
};
