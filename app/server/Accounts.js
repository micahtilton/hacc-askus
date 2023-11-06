import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

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

if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.accounts) {
    console.log("Creating the default user(s)");
    Meteor.settings.accounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log("Cannot initialize the database!  Please invoke meteor with a settings file.");
  }
}

const isAdmin = () => Meteor.userId() !== null && Roles.userIsInRole(Meteor.userId(), "admin");

const getUsername = () => {
  if (Meteor.user() === null) {
    return "hello";
  } else {
    return Meteor.user().username;
  }
};

export { isAdmin, getUsername };
