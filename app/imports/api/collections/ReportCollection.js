import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { EmbeddingSchema } from "./EmbeddingCollection";

const ReportCollection = new Mongo.Collection("reports");

const EmbeddingSchemaExtended = EmbeddingSchema.extend({
  similarity: { type: Number },
}).omit("embedding");

const ReportSchema = new SimpleSchema({
  context: { type: Array },
  "context.$": {
    type: EmbeddingSchemaExtended,
  },
  question: { type: String },
  answer: { type: String },
  categories: { type: Array },
  "categories.$": { type: String },
  comment: { type: String },
});

ReportCollection.attachSchema(ReportSchema);

export { ReportCollection, ReportSchema };
