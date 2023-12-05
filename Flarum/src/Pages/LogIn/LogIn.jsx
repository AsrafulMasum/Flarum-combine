import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../../Components/Shared/SocialLogin";
import { ImSpinner9 } from "react-icons/im";
import Lottie from "lottie-react";
import authGIF from "../../assets/authGIF.json"
import { toast } from "react-toastify";

const LogIn = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logInWithEmail, loading, setLoading } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      logInWithEmail(data?.email, data?.password).then(() => {
        toast.success("Log In Successful.")
        navigate(
          location?.state?.from?.pathname
            ? location?.state?.from?.pathname
            : "/"
        );
      })
      .catch(err => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err?.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false)
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="flex-1">
          <Lottie animationData={authGIF}></Lottie>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mx-auto">
            <input
              {...register("email", { required: true })}
              className="w-full h-11 outline-none px-5 bg-white border border-[#D0D0D0] rounded text-sm"
              type="text"
              placeholder="Email"
              required
            />

            <div className="relative">
              <input
                {...register("password", { required: true })}
                className="w-full h-11 outline-none px-5 mt-4 bg-white border border-[#D0D0D0] rounded"
                type={show ? "text" : "password"}
                placeholder="Password"
                required
              />
              <div
                className="absolute right-2 top-[30px] inline-block cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {show ? <BsEyeSlash></BsEyeSlash> : <BsEye></BsEye>}
              </div>
            </div>

            <button className="btn w-full mt-4 bg-[#D1A054B3] hover:bg-[#D1A054B3] rounded">
              {loading ? (
                <ImSpinner9 className="animate-spin text-lg"></ImSpinner9>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <div className="w-2/3 mx-auto my-4 text-center">
            <p>
              Don&#39;t have an account?{" "}
              <Link className="text-lg font-bold text-[#D1A054B3]" to="/signUp">
                Create One
              </Link>
            </p>
            <p>Or Sign In With</p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
