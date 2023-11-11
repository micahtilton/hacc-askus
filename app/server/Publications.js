import { Meteor } from "meteor/meteor";
import { ReportCollection } from "../imports/api/ReportCollection";
import { FAQCollection } from "../imports/api/FAQCollection";

// Publish reports for admins only
Meteor.publish("reports", function () {
  if (this.userId && Roles.userIsInRole(this.userId, "admin")) {
    return ReportCollection.find({});
  }
  return this.ready();
});

// Publish faq collection for admins only
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
