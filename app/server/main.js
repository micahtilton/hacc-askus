import { Meteor } from "meteor/meteor";
import { EmbeddingCollection } from "../imports/api/EmbeddingCollection";
import "./Accounts";
import "./Publications";
import { addReport, removeReport, resolveReport } from "../imports/api/ReportCollection";
import { addFAQ, editFAQ, removeFAQ } from "../imports/api/FAQCollection";
import { askHoku, hokuRepeat } from "./openai/hoku-tools";
import { getEmbedding } from "./openai/openai-tools";
import { getUsername, isAdmin } from "./Accounts";

Meteor.methods({
  getUsername,
  isAdmin,
  getEmbedding,
  hokuRepeat,
  askHoku,
  addReport,
  removeReport,
  resolveReport,
  addFAQ,
  removeFAQ,
  editFAQ,
});

const insertEmbeddings = (data) => {
  data.forEach((e) => {
    if (e.text.trim() === "") {
      return;
    }
    EmbeddingCollection.insert(e);
  });
};

Meteor.startup(() => {
  console.log(Meteor.settings);
  if (EmbeddingCollection.find().count() === 0) {
    import embedding_data_archive from "./data/embedding-data-archive.json";
    import embedding_data_bonus from "./data/embedding-data-bonus.json";
    import embedding_data_bonus_2 from "./data/embedding-data-bonus-2.json";

    console.log("loading embedding data archive into database");
    insertEmbeddings(embedding_data_archive);

    console.log("loading bonus data archive into database");
    insertEmbeddings(embedding_data_bonus);

    console.log("loading bonus 2 data archive into database");
    insertEmbeddings(embedding_data_bonus_2);
  }
});
