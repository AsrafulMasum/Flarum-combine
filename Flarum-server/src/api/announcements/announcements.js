const announcements = require("../../models/announcements/announcements");

const announcementInsertController = async (req, res) => {
  try {
    const announcementInfo = new announcements({
      name: req.body.name,
      photoURL: req.body.photoURL,
      title: req.body.title,
      description: req.body.description,
    });
    await announcementInfo.save();
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ message: "Failed to add posts" });
  }
};

const getAnnouncementsController = async (req, res) => {
  const result = await announcements.find();
  res.send(result);
};

const getAnnouncementsCountController = async (req, res) => {
  announcements.countDocuments({})
  .then(count => {
    res.send({count})
  })
  .catch(error => {
    console.error(error);
  });
};

module.exports = { announcementInsertController, getAnnouncementsController, getAnnouncementsCountController };
