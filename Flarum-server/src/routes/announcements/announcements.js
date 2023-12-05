const {
  announcementInsertController, getAnnouncementsController, getAnnouncementsCountController,
} = require("../../api/announcements/announcements");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.post(
  "/announcement",
  verifyToken,
  verifyAdmin,
  announcementInsertController
);

router.get("/announcement", getAnnouncementsController)

router.get("/announcement/count", getAnnouncementsCountController)

module.exports = router;
