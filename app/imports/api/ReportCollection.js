import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const ReportCollection = new Mongo.Collection("reports");

const ContextSchema = new SimpleSchema({
  source: { type: String },
  similarity: { type: Number },
  text: { type: String },
});

const ReportSchema = new SimpleSchema({
  resolved: { type: Boolean },
  context: { type: Array },
  "context.$": {
    type: ContextSchema,
  },
  question: { type: String },
  answer: { type: String },
  categories: { type: Array },
  "categories.$": { type: String },
  comment: { type: String },
  date: { type: Date },
});

ReportCollection.attachSchema(ReportSchema);

export { ReportCollection, ReportSchema };
