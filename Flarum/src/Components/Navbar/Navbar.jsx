import "./Navigation.css";
import UserDropdown from "./UserDropdown";
import { IoMdNotifications } from "react-icons/io";
import logo from "/favicon.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LayoutContainer from "../../Layout/LayoutComponent/LayoutContainer";
import useLoadPublicData from "../../Hooks/useLoadPublicData";

const Navbar = () => {
  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser } = useLoadPublicData(userURL);

  const notificationCountURL = "/announcement/count";
  const { data: notificationCount } = useLoadPublicData(notificationCountURL);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {dbUser?.badge === "bronze" && (
        <li>
          <NavLink to="/membership">Membership</NavLink>
        </li>
      )}
      <li>
        <NavLink className="relative" to="/notification">
          <IoMdNotifications className="text-2xl"></IoMdNotifications>
          {notificationCount?.count && (
            <p className="absolute top-0 right-3 rounded-full bg-red-500 px-[6px]">
              {notificationCount?.count}
            </p>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full fixed bg-[#27485C] bg-opacity-90 z-50">
      <LayoutContainer>
        <div className="w-full navbar px-0">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 flex items-center gap-4 px-2 mx-2 text-2xl text-white font-bold leading-none">
            <img className="w-12" src={logo} alt="LOGO" />
            <p>Flarum</p>
          </div>
          <div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {navLinks}
              </ul>
            </div>
            <div className="ml-4">
              {user ? (
                <UserDropdown></UserDropdown>
              ) : (
                <Link
                  to="/logIn"
                  className="btn btn-sm btn-outline text-white px-6 hover:bg-textColor"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Navbar;
