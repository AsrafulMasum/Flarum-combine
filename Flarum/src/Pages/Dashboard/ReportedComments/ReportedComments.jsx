import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";


const ReportedComments = () => {
  const reportedCommentsURL = "/find-comments-contains-feedback"
  const {data:reportedComments, refetch} = useLoadSecureData(reportedCommentsURL)

  const axiosSecure = useAxiosSecure()

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/comments/${id}`)
        if(res?.data?.success){
          Swal.fire({
            title: "Deleted!",
            text: "Comment has been deleted.",
            icon: "success"
          });
          refetch()
        }
        
      }
    });
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Commenter</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reportedComments?.map((comment, idx) => (
              <tr key={comment?._id}>
                <th>{idx + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{comment?.email}</div>
                    </div>
                  </div>
                </td>

                <td className="flex gap-4">
                  {comment?.feedback}
                </td>

                <th>
                  <button onClick={()=>handleDelete(comment?._id)} className="btn btn-outline btn-xs hover:bg-textColor duration-300">Delete</button>
                </th>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedComments;