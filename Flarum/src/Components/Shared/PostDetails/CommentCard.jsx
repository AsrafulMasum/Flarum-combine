import PropTypes from "prop-types";

const CommentCard = ({ comment }) => {
  return (
    <div className="px-4 py-2 flex items-start gap-4 w-full">
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={comment?.photoURL}
        alt=""
      />

      <div className="bg-secondary px-4 py-4 rounded-xl flex-1">
        <p className="font-bold">{comment?.email}</p>
        <p>{comment?.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;

CommentCard.propTypes = {
  comment: PropTypes.object,
};
