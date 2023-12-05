import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";
import TagsCard from "../../../Components/Shared/TagsCard/TagsCard";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";

const Tags = () => {
  const tagsURL = "/tags";
  const { data: allTags } = useLoadPublicData(tagsURL);
  return (
    <div>
      <div className="hidden lg:block">
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
            {allTags?.map((tag) => (
              <SwiperSlide key={tag?._id}>
                <TagsCard tag={tag}></TagsCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </LayoutContainer>
      </div>
      <div className="lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTags?.map((tag) => (
            <TagsCard key={tag?._id} tag={tag}></TagsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
