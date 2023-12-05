const posts = require("../../models/posts/posts");

const postsInsertController = async (req, res) => {
  try {
    const postInfo = new posts({
      name: req.body.name,
      email: req.body.email,
      photoURL: req.body.photoURL,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      upVote: req.body.upVote,
      downVote: req.body.downVote,
      comments: req.body.comments,
      date: req.body.date,
      millisecond: req.body.millisecond,
    });
    await postInfo.save();
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ message: "Failed to add posts" });
  }
};

// app.get("/assignments", async (req, res) => {
//   const page = parseInt(req.query.page);
//   const size = parseInt(req.query.size);
//   const filter = req.query.filter;

//   let query = {};
//   if (filter && filter !== "All") {
//     query = { difficulty: filter };
//   }
//   const result = await assignmentsCollections
//     .find(query)
//     .skip(page * size)
//     .limit(size)
//     .toArray();
//   res.send(result);
// });

const findPostsController = async (req, res) => {
  const sort = req.query.sort;
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  if (sort) {
    const sortedResult = await posts
      .aggregate([
        {
          $addFields: {
            upVoteTotal: { $size: "$upVote" },
            downVoteTotal: { $size: "$downVote" },
          },
        },
        {
          $addFields: {
            voteDifference: { $subtract: ["$upVoteTotal", "$downVoteTotal"] },
          },
        },
        {
          $sort: { voteDifference: -1 },
        },
        {
          $skip: page * size,
        },
        {
          $limit: size,
        },
      ])
      .exec();

    res.send(sortedResult);
  } else {
    const result = await posts.find().sort({ millisecond: -1 }).skip(page * size).limit(size);
    res.send(result);
  }
};

const findSinglePostsControllerById = async (req, res) => {
  const id = req.params.id;
  const result = await posts.findById(id);
  res.send(result);
};

const searchPostsByTags = async (req, res) => {
  try {
    const tag = req.query.tags;
    const result = await posts.find({ tags: { $regex: new RegExp(tag, "i") } });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const findSinglePostsController = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const query = {
      email: userEmail,
    };
    const result = await posts.find(query).sort({ millisecond: -1 });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const updateSinglePostsController = async (req, res) => {
  const id = req.params.id;
  const updatedInfo = req.body;
  try {
    if (updatedInfo?.upVote) {
      await posts.findByIdAndUpdate(id, {
        $push: { upVote: updatedInfo.upVote },
      });
      res.send({ success: true });
    } else if (updatedInfo?.downVote) {
      await posts.findByIdAndUpdate(id, {
        $push: { downVote: updatedInfo.downVote },
      });
      res.send({ success: true });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Failed to update posts" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await posts.findByIdAndDelete({ _id: id });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postsInsertController,
  findPostsController,
  findSinglePostsController,
  findSinglePostsControllerById,
  searchPostsByTags,
  updateSinglePostsController,
  deletePost,
};
