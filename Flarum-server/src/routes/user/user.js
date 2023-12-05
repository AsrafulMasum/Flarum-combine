const {
  userInsertController,
  userFindController,
  updateUserController,
  singleUserFindController,
  isAdmin,
} = require("../../api/user/controller");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.put("/users", userInsertController);

router.get("/users", verifyToken, verifyAdmin, userFindController);

router.get("/users/:email", singleUserFindController);

router.get("/users/admin/:email", verifyToken, isAdmin);

router.put("/users/:email", verifyToken, updateUserController);

module.exports = router;
