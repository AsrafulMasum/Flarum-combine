import { useEffect, useState } from "react";
import PostCard from "../../../Components/Shared/PostCard/PostCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";

const Posts = () => {
  const [allPosts, setAllPosts] = useState();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const axiosPublic = useAxiosPublic();

  const numberOfPages = Math.ceil(count / 5);

  const pages = [...Array(numberOfPages).keys()];

  const paginationURL = `/posts?page=${currentPage}&size=5`;
  const { data: paginationData, refetch } = useLoadPublicData(paginationURL);

  useEffect(() => {
    axiosPublic.get("/posts").then((res) => {
      setCount(res.data?.length);
    });
  }, [axiosPublic]);

  useEffect(() => {
    setAllPosts(paginationData)
  }, [paginationData]);

  const handleSort = async () => {
    const res = await axiosPublic.get(`/posts?sort=true&page=${currentPage}&size=5`);
    setAllPosts(res.data);
  };

  return (
    <div>
      <LayoutContainer>
        <div className="flex justify-end">
          <button
            onClick={handleSort}
            className="btn btn-sm bg-primary text-white hover:text-textColor mb-10 duration-300"
          >
            Sort by Popularity
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPosts?.map((post) => (
            <PostCard key={post?._id} post={post} refetch={refetch}></PostCard>
          ))}
        </div>
        <div className="my-10 flex justify-center items-center flex-wrap">
          {pages?.map((page, idx) => (
            <button
              onClick={() => setCurrentPage(page)}
              className="btn bg-primary mr-1 focus:bg-primary-color text-white mb-1"
              key={idx}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Posts;
