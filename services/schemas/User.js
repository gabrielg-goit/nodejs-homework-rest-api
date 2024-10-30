const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const Schema = mongoose.Schema;

const user = new Schema({
  email: {
    type: String,
    require: [true, "Set name for contact"],
    minLength: 2,
  },
  password: { type: String, require: [true], minLength: 2 },
  subscription: {
    type: String,
    subType: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarUrl: {
    type: String,
    minLength: 2,
  },
  token: {
    type: String,
    default: null,
  },
});

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

user.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

user.pre("save", function (next) {
  if (!this.avatarUrl) {
    this.avatarUrl = gravatar.url(
      this.email,
      {
        s: 200,
        r: "pg",
        d: "identicon",
      },
      true
    );
  }
  next();
});

const User = mongoose.model("User", user, "users");

module.exports = User;
