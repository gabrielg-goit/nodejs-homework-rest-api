const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contacts = new Schema({
  name: { type: String, require: [true, "Set name for contact"], minLength: 2 },
  email: { type: String, require: true, minLength: 2 },
  phone: { type: String, require: true, minLength: 2 },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contacts = mongoose.model("Contacts", contacts, "phonebooks");

module.exports = Contacts;
