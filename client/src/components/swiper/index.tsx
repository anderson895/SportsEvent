/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css"; 

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

interface SwiperCarouselProps {
  items: any[];
  onButtonClick: (mediaId: number) => void; 
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ items, onButtonClick }) => {
  return (
    <div className="swiper-container" style={{ width: "100%", margin: "auto" }}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom">
            <div className="slide-content">
              {item.type === "video" ? (
                <video
                  src={item.media}
                  controls
                  className="slide-video"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
              ) : (
                <img
                  src={item.media}
                  alt={`Slide ${index + 1}`}
                  className="slide-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
              )}
              <div className="slide-overlay">
                <button
                  className="slide-button"
                  onClick={() => onButtonClick(item.mediaId)} 
                >
                  {item.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
