import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

// Create a user given email, password and role
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

// Create users database if empty
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.private.accounts) {
    console.log("Creating the default user(s)");
    Meteor.settings.private.accounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log("Cannot initialize the database!  Please invoke meteor with a settings file.");
  }
}

// Check if logged-in user is admin
// Returns false if not logged-in
const isAdmin = () => Meteor.userId() !== null && Roles.userIsInRole(Meteor.userId(), "admin");

// Get username of the logged-in user
const getUsername = () => {
  if (Meteor.user() === null) {
    return "";
  } else {
    return Meteor.user().username;
  }
};

export { isAdmin, getUsername };
