import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import {
  EffectCreative,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

interface CustomSwiperProps {
  images: string[];
  width?: string;
  height?: string;
}

export const CustomAutoPlaySwiper: React.FC<CustomSwiperProps> = ({
  images,
  width = "100%",
  height = "200px",
}) => {
  return (
    <Swiper
      slidesPerView={1}
      effect={"creative"}
      navigation={false}
      loop={true}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectCreative, Navigation, Pagination, Autoplay]}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            className="object-fill"
            src={image}
            alt=""
            style={{ width, height }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
