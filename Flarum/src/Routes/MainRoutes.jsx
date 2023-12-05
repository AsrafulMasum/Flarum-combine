import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserDashboard from "../Pages/Dashboard/UserDashboard.jsx/UserDashboard";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import Membership from "../Pages/Membership/Membership";
import AddPost from "../Pages/Dashboard/AddPost/addPost";
import MyPosts from "../Pages/Dashboard/MyPosts/MyPosts";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import SearchPosts from "../Pages/Home/SearchPosts/SearchPosts";
import PostDetails from "../Components/Shared/PostDetails/PostDetails";
import PostComments from "../Pages/Dashboard/MyPosts/PostComments";
import ReportedComments from "../Pages/Dashboard/ReportedComments/ReportedComments";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "membership",
        element: (
          <PrivateRoutes>
            <Membership></Membership>
          </PrivateRoutes>
        ),
      },
      {
        path: "searchPosts",
        element: <SearchPosts></SearchPosts>,
      },
      {
        path: "post/:id",
        element: <PostDetails></PostDetails>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "user",
        element: (
          <PrivateRoutes>
            <UserDashboard></UserDashboard>
          </PrivateRoutes>
        ),
      },
      {
        path: "addPost",
        element: (
          <PrivateRoutes>
            <AddPost></AddPost>
          </PrivateRoutes>
        ),
      },
      {
        path: "myPosts",
        element: (
          <PrivateRoutes>
            <MyPosts></MyPosts>
          </PrivateRoutes>
        ),
      },

      {
        path: "postComments/:id",
        element: (
          <PrivateRoutes>
            <PostComments></PostComments>
          </PrivateRoutes>
        ),
      },
      // admin route
      {
        path: "admin",
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <AdminDashboard></AdminDashboard>
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <ManageUsers></ManageUsers>
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "reportedComments",
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <ReportedComments></ReportedComments>
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },
      {
        path: "makeAnnouncement",
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <MakeAnnouncement></MakeAnnouncement>
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/logIn",
    element: <LogIn></LogIn>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
]);

export default MainRoutes;
