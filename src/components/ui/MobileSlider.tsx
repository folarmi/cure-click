import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import MeetingCardTwo from "../cards/MeetingCardTwo";

const MobileSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
        // bulletActiveClass: "red",
      }}
      modules={[Pagination]}
    >
      <SwiperSlide>
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          ifDocDetails={false}
          ifSpaceBetween={false}
        />
      </SwiperSlide>
      <SwiperSlide>
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          ifDocDetails={false}
          ifSpaceBetween={false}
        />
      </SwiperSlide>
      <SwiperSlide>
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          ifDocDetails={false}
          ifSpaceBetween={false}
        />
      </SwiperSlide>
      <SwiperSlide>
        <MeetingCardTwo
          title="Second Opinion on scheduled Cancer surge.."
          date="1 July 2023"
          time="11:30PM GMT+1"
          ifDocDetails={false}
          ifSpaceBetween={false}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default MobileSlider;
