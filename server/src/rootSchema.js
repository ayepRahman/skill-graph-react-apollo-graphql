import { mergeSchemas } from "graphql-tools";
import { schema as userSchema } from "./users/schema";

// here is where i export all the schema
export const schema = mergeSchemas({
  schemas: [userSchema]
});
