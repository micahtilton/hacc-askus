import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const EmbeddingCollection = new Mongo.Collection("embeddings");

const EmbeddingSchema = new SimpleSchema({
  source: { type: String },
  embedding: { type: Array },
  "embedding.$": {
    type: Number,
  },
  text: { type: String },
});

EmbeddingCollection.attachSchema(EmbeddingSchema);

export { EmbeddingCollection, EmbeddingSchema };
