import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const FAQCollection = new Mongo.Collection("resolved");
const FAQSchema = new SimpleSchema({
  source: { type: String },
  embedding: { type: Array },
  "embedding.$": {
    type: Number,
  },
  text: { type: String },
  question: { type: String },
});

FAQCollection.attachSchema(FAQSchema);

const addFAQ = (question, answer) => {
  if (!Meteor.call("isAdmin")) {
    return;
  }

  const embedding = Meteor.call("getEmbedding", question + " " + answer);

  if (embedding === null) return false;

  const resolveInfo = {
    source: Meteor.call("getUsername"),
    embedding: embedding,
    text: answer,
    question: question,
  };

  FAQCollection.insert(resolveInfo);
};

const editFAQ = async (id, question, answer) => {
  if (!Meteor.call("isAdmin")) {
    return;
  }

  removeFAQ(id);
  addFAQ(question, answer);
};

const removeFAQ = (id) => {
  if (!Meteor.call("isAdmin")) {
    return;
  }

  FAQCollection.remove(id);
};

export { FAQCollection, FAQSchema, addFAQ, editFAQ, removeFAQ };
