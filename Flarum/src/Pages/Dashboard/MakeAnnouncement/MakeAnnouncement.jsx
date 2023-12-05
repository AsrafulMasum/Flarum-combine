import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const MakeAnnouncement = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const announcementInfo = {
      title: data?.title,
      description: data?.description,
      name: user?.displayName,
      photoURL: user?.photoURL
    }
    const res = await axiosSecure.post("/announcement", announcementInfo)
    if(res.data.success){
      toast.success("Announcement has made.")
      reset()
      navigate("/")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("title", { required: true })}
              type="text"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("description", { required: true })}
              type="text"
              id="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>

          <button
            type="submit"
            className="btn w-full text-white text-lg bg-primary hover:bg-secondary"
          >
            Submit
          </button>
        </form>
    </div>
  );
};

export default MakeAnnouncement;