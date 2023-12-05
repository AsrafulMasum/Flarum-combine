import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";
import { RiAdminLine } from "react-icons/ri";

const ManageUsers = () => {
  const usersURL = "/users";
  const { data: allUsers, refetch } = useLoadSecureData(usersURL);

  const axiosSecure = useAxiosSecure();

  const handleMakeUser = (email, name) => {
    const userInfo = {
      role: "admin",
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${name} admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/users/${email}`, userInfo);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Promoted!",
            text: `${name} has been promoted to admin.`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, idx) => (
              <tr key={user?._id}>
                <th>{idx + 1}</th>

                <td>
                  <div className="font-bold">{user?.name}</div>
                </td>

                <td>
                  <div>{user?.email}</div>
                </td>

                <th className="">{user?.role}</th>

                <td>
                  {user?.role === "user" && (
                    <button
                      onClick={() => handleMakeUser(user?.email,user?.name)}
                      title="Make Admin"
                      className="btn btn-xs text-white bg-textColor hover:text-textColor duration-300"
                    >
                      <RiAdminLine></RiAdminLine>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
