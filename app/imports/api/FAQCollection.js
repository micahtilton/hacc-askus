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
  const embedding = Meteor.call("getEmbedding", question + " " + answer);

  if (embedding === null) return false;

  const resolveInfo = {
    source: "ITS Admin",
    embedding: embedding,
    text: answer,
    question: question,
  };

  FAQCollection.insert(resolveInfo);
};
const editFAQ = async (id, question, answer) => {
  removeFAQ(id);
  addFAQ(question, answer);
};

const removeFAQ = (id) => {
  FAQCollection.remove(id);
};

export { FAQCollection, FAQSchema, addFAQ, editFAQ, removeFAQ };