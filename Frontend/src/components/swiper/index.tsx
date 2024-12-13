/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface SwiperCarouselProps {
  items: any[];
  onButtonClick: (mediaId: number) => void;
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
  items,
  onButtonClick,
}) => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        style={{ padding: "1rem 0" }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-4">
              {/* Media (Video/Image) */}
              {item.type === "video" ? (
                <video
                  src={item.media}
                  controls
                  className="w-full h-48 rounded-lg object-cover mb-4"
                  onError={(e: any) =>
                    (e.target.style.display = "none") // Fallback for failed video load
                  }
                />
              ) : (
                <img
                  src={item.media}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-48 rounded-lg object-cover mb-4"
                  onError={(e: any) =>
                    (e.target.src =
                      "https://via.placeholder.com/400?text=Image+Not+Available") // Fallback for failed image load
                  }
                />
              )}

              {/* Metadata Section */}
              <div className="mb-4">
                {item.title && (
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
                {item.author && item.author !== "undefined" && (
                  <p className="text-xs text-gray-500">By {item.author}</p>
                )}
              </div>

              {/* Action Button */}
              <button
                className="w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => onButtonClick(item.mediaId)}
              >
                {item.buttonText}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
