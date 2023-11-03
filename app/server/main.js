import { Meteor } from "meteor/meteor";
import { EmbeddingCollection } from "../imports/api/EmbeddingCollection";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
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

const isAdmin = () =>
  Meteor.userId() !== null && Roles.userIsInRole(Meteor.userId(), "admin");

Meteor.methods({
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

const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === "admin") {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, "admin");
  }
};

Meteor.publish("reports", function () {
  if (this.userId && Roles.userIsInRole(this.userId, "admin")) {
    return ReportCollection.find({});
  }
  return this.ready();
});

Meteor.publish("resolved", function () {
  if (this.userId && Roles.userIsInRole(this.userId, "admin")) {
    return FAQCollection.find({});
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ "user._id": this.userId });
  }
  return this.ready();
});

Meteor.startup(() => {
  if (EmbeddingCollection.find().count() === 0) {
    import embedding_data from "./data/embedding-data.json";
    console.log("loading embedding data into database");
    embedding_data.forEach((e) => EmbeddingCollection.insert(e));
  }

  if (Meteor.users.find().count() === 0) {
    if (Meteor.settings.accounts) {
      console.log("Creating the default user(s)");
      Meteor.settings.accounts.forEach(({ email, password, role }) =>
        createUser(email, password, role),
      );
    } else {
      console.log(
        "Cannot initialize the database!  Please invoke meteor with a settings file.",
      );
    }
  }
});
