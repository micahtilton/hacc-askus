import { Meteor } from 'meteor/meteor';

Meteor.methods({
  async askHoku(question) {
    await new Promise(r => setTimeout(r, 2000));
    return 'hi, i am your assistant';
  },
});

Meteor.startup(async () => {

});
