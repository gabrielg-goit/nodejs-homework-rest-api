const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  name: { type: String, require: true, minLength: 2 },
  email: { type: String, require: true, minLength: 2 },
  phone: { type: String, require: true, minLength: 2 },
});

const User = mongoose.model("phonebook-users", user);

module.exports = User;
