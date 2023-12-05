import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import defaultUser from "../../assets/user.png";
import useLoadSecureData from "../../Hooks/useLoadSecureData"

const UserDropdown = () => {
  const { user, logOut } = useAuth();

  const isAdminURL = `/users/admin/${user?.email}`
  const {data: isAdmin} = useLoadSecureData(isAdminURL)

  const handleLogout = () => {
    logOut().then();
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user?.photoURL ? user?.photoURL : defaultUser}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-400 rounded-box w-52"
        >
          <p className="flex justify-between text-black px-3 py-1">
            {user?.displayName.split(" ")[0]}
          </p>

          <li>
            <Link to={isAdmin?.admin ? "/dashboard/admin" : "/dashboard/user"} className="text-black">
              Dashboard
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-textColor text-white mt-1 px-[14px]"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;

UserDropdown.propTypes = {
  badge: PropTypes.string,
};
