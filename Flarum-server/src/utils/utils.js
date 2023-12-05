const posts = require("../models/posts/posts");
const user = require("../models/users/user");

const adminDataController = async (req, res) => {
  try {
    const [postCount, userCount, totalCommentsCount] = await Promise.all([
      posts.countDocuments(),
      user.countDocuments(),
      posts.aggregate([
        {
          $group: {
            _id: null,
            totalComments: {
              $sum: { $size: "$comments" }
            }
          }
        }
      ])
    ]);
  
    const totalComments = totalCommentsCount.length > 0 ? totalCommentsCount[0].totalComments : 0;
  
    res.send({ postCount, userCount, totalComments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
   
};

const totalComments = async (req, res) => {
  posts
    .aggregate([
      {
        $group: {
          _id: null,
          totalComments: {
            $sum: { $size: "$comments" },
          },
        },
      },
    ])
    .then((result) => {
      if (result.length > 0) {
        const totalCommentsCount = result[0].totalComments;
        console.log(`Total comments count: ${totalCommentsCount}`);
      } else {
        console.log("No comments found.");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { totalComments, adminDataController };
