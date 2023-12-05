const { Schema, model } = require("mongoose");

const announcementSchema = new Schema({
  name: {
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
  title: {
    type: String,
    required: true,
  },
});

const announcements = model("announcements", announcementSchema);

module.exports = announcements;
