import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";
import AnnouncementCard from "../../../Components/Shared/AnnouncementCard/AnnouncementCard";

const Announcements = () => {
  const announcementsURL = "/announcement";
  const { data: allAnnouncements } = useLoadPublicData(announcementsURL);

  return (
    <>
      <div className="hidden lg:block">
        {allAnnouncements && (
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
              {allAnnouncements?.map((announcement) => (
                <SwiperSlide key={announcement?._id}>
                  <AnnouncementCard
                    announcement={announcement}
                  ></AnnouncementCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </LayoutContainer>
        )}
      </div>
      <div className="lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allAnnouncements?.map((announcement) => (
            <AnnouncementCard
              key={announcement?._id}
              announcement={announcement}
            ></AnnouncementCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Announcements;
