import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const ResolvedCollection = new Mongo.Collection("resolved");
const ResolvedSchema = new SimpleSchema({
  source: { type: String },
  embedding: { type: Array },
  "embedding.$": {
    type: Number,
  },
  text: { type: String },
  question: { type: String },
});

ResolvedCollection.attachSchema(ResolvedSchema);

export { ResolvedCollection, ResolvedSchema };
