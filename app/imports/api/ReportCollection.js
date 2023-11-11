import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { addFAQ } from "./FAQCollection";

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
  comment: { type: String, optional: true },
  date: { type: Date },
});

ReportCollection.attachSchema(ReportSchema);

const addReport = (report) => {
  ReportCollection.insert(report);
};

const resolveReport = async (id, question, answer) => {
  if (!Meteor.call("isAdmin")) {
    return false;
  }

  addFAQ(question, answer);
  removeReport(id);
  return true;
};

const removeReport = (id) => {
  if (!Meteor.call("isAdmin")) {
    return;
  }
  ReportCollection.remove(id);
};

export { ReportCollection, ReportSchema, addReport, removeReport, resolveReport };
