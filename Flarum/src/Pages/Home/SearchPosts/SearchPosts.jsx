import { useLocation } from "react-router-dom";
import PostCard from "../../../Components/Shared/PostCard/PostCard";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const SearchPosts = () => {
  const location = useLocation();
  const searchPosts = location.state.data;

  return (
    <div>
      {searchPosts.length ? (
        <div className="pt-16">
          <LayoutContainer>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {searchPosts?.map((post) => (
                <SwiperSlide key={post?._id}>
                  <PostCard post={post}></PostCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </LayoutContainer>
        </div>
      ) : (
        <div className="min-h-[54.2vh] flex justify-center items-center">
          <p className="text-4xl">No data found</p>
        </div>
      )}
    </div>
  );
};

export default SearchPosts;
