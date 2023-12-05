const { postsInsertController, findPostsController, findSinglePostsController, updateSinglePostsController, findSinglePostsControllerById, deletePost, searchPostsByTags } = require("../../api/posts/posts");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.post("/posts", verifyToken, postsInsertController);

router.get("/posts", findPostsController);

router.get("/post/:id", findSinglePostsControllerById);

router.get("/search-by-tags", searchPostsByTags)

router.get("/posts-by-email/:email", verifyToken, findSinglePostsController);

router.put("/posts/:id", updateSinglePostsController);

router.delete("/posts/:id", deletePost)

module.exports = router;
