import { useForm } from "react-hook-form";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

const AddPost = () => {
  const axiosSecure = useAxiosSecure();

  const tagsNameURL = "/tagsName";
  const { data: tagsName } = useLoadPublicData(tagsNameURL);

  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser } = useLoadSecureData(userURL);

  const postURL = `/posts-by-email/${user?.email}`;
  const { data: userPost, isLoading } = useLoadSecureData(postURL);

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const postInfo = {
      name: dbUser?.name,
      email: dbUser?.email,
      photoURL: dbUser?.photoURL,
      title: data?.title,
      description: data?.description,
      tags: data?.tags,
      upVote: [],
      downVote: [],
      millisecond: Date.now(),
      date: new Date(),
      comments: [],
    };
    const res = await axiosSecure.post("/posts", postInfo);
    if (res?.data?.success) {
      toast.success("Post Added.");
      reset()
      navigate("/");
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {(dbUser?.badge === "bronze" && userPost?.length >= 5) ? (
        <div className="min-h-screen flex flex-col justify-center items-center gap-10">
          <p className="text-3xl text-textColor">
            Please get membership to add more post.
          </p>
          <Link
            to="/membership"
            className="btn btn-wide text-white bg-primary hover:bg-secondary hover:text-textColor duration-500"
          >
            Become a member
          </Link>
        </div>
      ) : (
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

          <div className="relative z-0 w-full mb-5 group">
            <select
              {...register("tags", { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              {tagsName?.map((tagName, idx) => (
                <option
                  key={idx}
                  className="text-black"
                  value={tagName?.tagsName}
                >
                  {tagName?.tagsName}
                </option>
              ))}
            </select>
            <label
              htmlFor="tags"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tags
            </label>
          </div>

          <button
            type="submit"
            className="btn w-full text-white text-lg bg-primary hover:bg-secondary"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddPost;
