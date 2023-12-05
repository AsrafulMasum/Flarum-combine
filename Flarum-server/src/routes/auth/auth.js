const {
  createTokenController,
  clearTokenController,
} = require("../../api/auth/authController");

const router = require("express").Router();

router.post("/jwt", createTokenController);

router.post("/logout", clearTokenController);

module.exports = router;
