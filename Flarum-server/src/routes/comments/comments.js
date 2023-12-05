const { postCommentsController, findCommentsByPostId, updateCommentsController, findCommentsContainFeedback, deleteCommentsController } = require("../../api/comments/comments");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.post("/comments", verifyToken, postCommentsController);

router.get("/find-comments-by-postId", findCommentsByPostId)

router.get("/find-comments-contains-feedback", verifyToken, verifyAdmin, findCommentsContainFeedback)

router.put("/report-comments/:id", verifyToken, updateCommentsController)

router.delete("/comments/:id", verifyToken, verifyAdmin, deleteCommentsController)

module.exports = router;
