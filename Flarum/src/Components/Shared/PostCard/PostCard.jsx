import PropTypes from "prop-types";
import { BiLike, BiDislike } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { Link } from "react-router-dom";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";

const PostCard = ({ post }) => {

  const commentsByPostIdURL = `/find-comments-by-postId?postId=${post?._id}`
  const { data: comments } = useLoadSecureData(commentsByPostIdURL);

  return (
    <Link to={`/post/${post?._id}`}>
      <div className="bg-white border rounded shadow-md hover:shadow-2xl mx-auto duration-500 h-full">
        <div className="p-5 h-full flex flex-col">
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex items-center gap-4 my-4">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={post?.photoURL}
                alt="User"
              />
              <p className="text-xl font-bold tracking-tight text-gray-900">
                {post?.title}
              </p>
            </div>
            <div className="flex justify-between items-center text-lg">
              <p>{post?.tags}</p>
              <p>{post?.date.split("T")[0]}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mt-4 border-y p-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl">
                  <BiLike></BiLike>
                </div>
                <div>{post?.upVote?.length}</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-2xl">
                  <BiDislike></BiDislike>
                </div>
                <div>{post?.downVote?.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>{comments?.length}</p>
              <GoCommentDiscussion className="text-2xl"></GoCommentDiscussion>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

PostCard.propTypes = {
  post: PropTypes.object,
  refetch: PropTypes.func,
};
