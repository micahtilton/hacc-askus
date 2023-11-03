import { Meteor } from "meteor/meteor";
import { EmbeddingCollection } from "../imports/api/EmbeddingCollection";
import {
  addReport,
  removeReport,
  ReportCollection,
  resolveReport,
} from "../imports/api/ReportCollection";

import {
  addFAQ,
  editFAQ,
  FAQCollection,
  removeFAQ,
} from "../imports/api/FAQCollection";

import { askHoku } from "./openai/hoku-tools";
import { getEmbedding } from "./openai/openai-tools";

Meteor.methods({
  getEmbedding,
  askHoku,
  addReport,
  removeReport,
  resolveReport,
  addFAQ,
  removeFAQ,
  editFAQ,
});

Meteor.publish("reports", () => {
  return ReportCollection.find({});
});

Meteor.publish("resolved", () => {
  return FAQCollection.find({});
});

Meteor.startup(() => {
  if (EmbeddingCollection.find().count() === 0) {
    import embedding_data from "./data/embedding-data.json";
    console.log("loading embedding data into database");
    embedding_data.forEach((e) => EmbeddingCollection.insert(e));
  }
});
