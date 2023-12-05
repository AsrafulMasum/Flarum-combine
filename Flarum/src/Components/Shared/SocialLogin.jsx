import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { logInWithGoogle, logInWithGithub } = useAuth();

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = async () => {
    try {
      logInWithGoogle().then((res) => {
        const user = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          photoURL: res?.user?.photoURL,
          role: "user",
          badge: "bronze",
        };
        axiosPublic
          .put("/users", user)
          .then((res) => {
            if (
              res?.data?.upsertedCount ||
              res?.data?.modifiedCount ||
              res?.data?.exists
            ) {
              toast.success("Log In Successful.");
              navigate(
                location?.state?.from?.pathname
                  ? location?.state?.from?.pathname
                  : "/"
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithub = async () => {
    try {
      logInWithGithub().then((res) => {
        const user = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          photoURL: res?.user?.photoURL,
          role: "user",
          badge: "bronze",
        };
        axiosPublic
          .put("/users", user)
          .then((res) => {
            if (
              res?.data?.upsertedCount ||
              res?.data?.modifiedCount ||
              res?.data?.exists
            ) {
              toast.success("Log In Successful.");
              navigate(
                location?.state?.from?.pathname
                  ? location?.state?.from?.pathname
                  : "/"
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 flex justify-center items-center gap-16">
      <button className="btn btn-circle btn-outline btn-sm">
        <FaFacebookF></FaFacebookF>
      </button>
      <button
        onClick={handleGoogle}
        className="btn btn-circle btn-outline btn-sm"
      >
        <FaGoogle></FaGoogle>
      </button>
      <button
        onClick={handleGithub}
        className="btn btn-circle btn-outline btn-sm"
      >
        <FaGithub></FaGithub>
      </button>
    </div>
  );
};

export default SocialLogin;
