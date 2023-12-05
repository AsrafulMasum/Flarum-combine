const { tagsFindController, postTagsController } = require("../../api/tags/tags");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const verifyToken = require("../../middlewares/verifyToken");
const tags = require("../../models/tags/tags");


const router = require("express").Router();

router.get("/tags", tagsFindController)

router.post("/tags", verifyToken, verifyAdmin, postTagsController)

router.get("/tagsName", async (req, res) => {
  const result = await tags.aggregate([
    {
      $project: {
        _id: 0,
        tagsName: 1
      }
    }
  ]);
  res.json(result);
})

module.exports = router;