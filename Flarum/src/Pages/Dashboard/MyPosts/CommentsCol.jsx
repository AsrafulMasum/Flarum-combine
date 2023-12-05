import { useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CommentsCol = ({ idx, comment, id, refetch, openModal }) => {
  const [enable, setEnable] = useState(false);
  const [feedback, setFeedback] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSelect = (e) => {
    if(comment?.feedback){
      return
    }
    e.preventDefault();
    if (e.target.value) {
      setEnable(true);
      setFeedback(e.target.value);
    } else {
      setEnable(false);
    }
  };

  const handleReport = async () => {
    setEnable(false);
    const res = await axiosSecure.put(`/report-comments/${id}`, { feedback });
    if (res.data.success) {
      toast.success("Comment Reported.");
      refetch()
    }
  };

  return (
    <tr>
      <th>{idx + 1}</th>

      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{comment?.email}</div>
          </div>
        </div>
      </td>

      {
        comment?.comment?.length > 20 ? <td className="flex gap-4">{comment?.comment?.slice(0, 20)}...<Link onClick={()=>openModal(comment?.comment)}>See More</Link></td> : <td className="flex gap-4">{comment?.comment}</td>
      }

      <td>
        <form onChange={handleSelect}>
          <select className="block py-1 px-2 w-full text-sm text-gray-900 bg-transparent border rounded border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
            <option value="">Select an option</option>
            <option className="text-black" value="Constructive Criticism">
              Constructive Criticism
            </option>
            <option className="text-black" value="Thought-provoking">
              Thought-provoking
            </option>
            <option className="text-black" value="Off-topic">
              Off-topic
            </option>
          </select>
        </form>
      </td>

      <th>
        {enable ? (
          <button
            onClick={handleReport}
            className="btn btn-outline btn-xs hover:bg-textColor duration-300"
          >
            {
              comment?.feedback ? "Reported" : "Report"
            }
          </button>
        ) : (
          <button
            disabled
            className="btn btn-outline btn-xs hover:bg-textColor duration-300"
          >
            {
              comment?.feedback ? "Reported" : "Report"
            }
          </button>
        )}
      </th>
    </tr>
  );
};

export default CommentsCol;

CommentsCol.propTypes = {
  comment: PropTypes.object,
  idx: PropTypes.number,
  id: PropTypes.string,
  refetch: PropTypes.func,
  openModal: PropTypes.func,
};
