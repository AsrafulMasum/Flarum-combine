import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Loading/Loading";
import useLoadSecureData from "../Hooks/useLoadSecureData";

const AdminRoutes = ({ children }) => {

  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser, isLoading } = useLoadSecureData(userURL);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (dbUser?.role === "admin") {
    return children;
  }

  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

export default AdminRoutes;

AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
