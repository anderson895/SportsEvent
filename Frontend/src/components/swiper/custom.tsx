import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";

interface CustomSwiperProps {
  videos: string[]; // Array of video URLs
  width?: string;
  height?: string;
}

export const CustomVideoSwiper: React.FC<CustomSwiperProps> = ({
  videos,
  width = "100%", // default width
  height = "300px", // default height
}) => {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard    ]}
    >
      {videos.map((video, index) => (
        <SwiperSlide key={index} className="">
          <video
            controls
            className="w-full h-full "
            style={{ width, height }}
            autoPlay
            loop
            muted
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
