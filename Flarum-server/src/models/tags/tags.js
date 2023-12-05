const { Schema, model } = require("mongoose");

const tagsSchema = new Schema({
  tagsName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
});

const tags = model("tags", tagsSchema);

module.exports = tags;
