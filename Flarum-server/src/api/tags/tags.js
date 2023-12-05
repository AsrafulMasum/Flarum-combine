const { findTags } = require("../../lib/tags/tags")
const tags = require("../../models/tags/tags")

const tagsFindController = async (req, res) => {
  const result = await findTags()
  res.send(result)
}

const postTagsController = async (req, res) => {
  try {
    const tagsInfo = new tags({
      description: req.body.description,
      photoURL: req.body.photoURL,
      tagsName: req.body.tagsName,
    });
    await tagsInfo.save();
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ message: "Failed to add tags" });
  }
}

module.exports = {tagsFindController, postTagsController}