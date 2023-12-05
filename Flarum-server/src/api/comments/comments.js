const comments = require("../../models/comments/comments");

const postCommentsController = async (req, res) => {
  try {
    const commentInfo = new comments({
      postId: req.body.postId,
      email: req.body.email,
      photoURL: req.body.photoURL,
      comment: req.body.comment,
    });
    await commentInfo.save();
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ message: "Failed to add comments" });
  }
};

const findCommentsByPostId = async (req, res) => {
  try {
    const postId = req.query.postId;
    const query = {
      postId: postId,
    };
    const result = await comments.find(query);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const findCommentsContainFeedback = async (req, res) => {
  try {
    comments
      .find({ feedback: { $exists: true } })
      .then((feedbackComments) => {
        res.send(feedbackComments)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (err) {
    console.log(err);
  }
};

const updateCommentsController = async (req, res) => {
  const id = req.params.id;
  const feedback = req.body.feedback;
  comments
    .findByIdAndUpdate({ _id: id }, { feedback: feedback }, { new: true })
    .then(() => {
      res.send({ success: true });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const deleteCommentsController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await comments.findByIdAndDelete({ _id: id });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  postCommentsController,
  findCommentsByPostId,
  updateCommentsController,
  findCommentsContainFeedback,
  deleteCommentsController
};
