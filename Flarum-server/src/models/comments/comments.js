const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
});

const comments = model("comments", commentsSchema);

module.exports = comments;
