const { Schema, model } = require("mongoose");

const postsSchema = new Schema({
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
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  upVote: {
    type: Array,
    required: true,
  },
  downVote: {
    type: Array,
    required: true,
  },
  millisecond: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const posts = model("posts", postsSchema);

module.exports = posts;
