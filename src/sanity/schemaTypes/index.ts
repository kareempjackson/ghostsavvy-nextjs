import { type SchemaTypeDefinition } from "sanity";
import hubContent from "./hubContent";
import project from "./project";
import labProduct from "./labProduct";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hubContent, project, labProduct],
};
