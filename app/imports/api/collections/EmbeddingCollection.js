import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const EmbeddingCollection = new Mongo.Collection("embeddings");

const DataSchema = new SimpleSchema({
  "id": {type: String},
  "question": {type: String},
  "answer": {type: String}
})

const EmbeddingSchema = new SimpleSchema({
  "embedding": {type: Array},
  'embedding.$': {
    type: Number,
  },
  "data": {type: DataSchema}
})

const EmbeddingDataSchema = new SimpleSchema({
  "embedding-data": {type: Array},
  "embedding-data.$": {
    type: EmbeddingSchema
  }
})

EmbeddingCollection.schema = EmbeddingSchema;

export { EmbeddingCollection };