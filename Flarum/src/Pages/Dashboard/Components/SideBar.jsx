import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";

const SideBar = () => {
  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser } = useLoadSecureData(userURL);

  return (
    <div>
      <div className="flex flex-col p-10 gap-4">
        {dbUser?.role === "admin" ? (
          <div className="flex flex-col gap-4">
          <Link to="/dashboard/admin">My Profile</Link>
          <Link to="/dashboard/manageUsers">Manage User</Link>
          <Link to="/dashboard/reportedComments">Reported Comments</Link>
          <Link to="/dashboard/makeAnnouncement">Make Announcement</Link>
        </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Link to="/dashboard/user">My Profile</Link>
            <Link to="/dashboard/addPost">Add Post</Link>
            <Link to="/dashboard/myPosts">My Posts</Link>
          </div>
        )}
        <div className="divider"></div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default SideBar;
