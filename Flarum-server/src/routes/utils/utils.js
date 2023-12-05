const verifyAdmin = require("../../middlewares/verifyAdmin");
const verifyToken = require("../../middlewares/verifyToken");
const { adminDataController } = require("../../utils/utils");


const router = require("express").Router();

router.get("/admin-data", verifyToken, verifyAdmin, adminDataController);

module.exports = router;
