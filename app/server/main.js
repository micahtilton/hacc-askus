import { Meteor } from "meteor/meteor";
import { EmbeddingCollection } from "../imports/api/EmbeddingCollection";
import "./Accounts";
import "./Publications";
import { addReport, removeReport, resolveReport } from "../imports/api/ReportCollection";
import { addFAQ, editFAQ, removeFAQ } from "../imports/api/FAQCollection";
import { askHoku } from "./openai/hoku-tools";
import { getEmbedding } from "./openai/openai-tools";
import { getUsername, isAdmin } from "./Accounts";

Meteor.methods({
  getUsername,
  isAdmin,
  getEmbedding,
  askHoku,
  addReport,
  removeReport,
  resolveReport,
  addFAQ,
  removeFAQ,
  editFAQ,
});

Meteor.startup(() => {
  if (EmbeddingCollection.find().count() === 0) {
    import embedding_data_archive from "./data/embedding-data-archive.json";
    console.log("loading embedding data archive into database");
    embedding_data_archive.forEach((e) => {
      if (e.text.trim() === "") {
        return;
      }
      EmbeddingCollection.insert(e);
    });

    import embedding_data_bonus from "./data/embedding-data-bonus.json";
    console.log("loading embedding data bonus into database");
    embedding_data_bonus.forEach((e) => {
      if (e.text.trim() === "") {
        return;
      }
      EmbeddingCollection.insert(e);
    });
  }
});
