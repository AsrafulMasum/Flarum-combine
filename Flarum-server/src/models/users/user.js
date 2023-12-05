const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
});

const user = model("user", userSchema);
module.exports = user;
