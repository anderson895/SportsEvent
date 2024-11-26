/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const FirstSection = () => {
  const images = ["/sports.webp", "/img4.png", "/img5.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
    
  return (
    <section
      id="home"
      className="h-screen w-full bg-center bg-no-repeat bg-cover relative"
      style={{ backgroundImage: `url('${images[currentIndex]}')` }}
    >
      <div className="w-full bg-customBlack/70 h-full pt-12 md:pt-24 pl-8 md:pl-52 line">
        <div className="w-max flex flex-col gap-12 mt-20">
          <h1 className="text-white w-[50%] font-extrabold text-xl md:text-6xl">
            Experience the Thrill of Live Sports Events
          </h1>
          <p className="w-full md:w-[700px] text-white font-semibold text-wrap text-xl md:text-2xl">
            Stay updated with the latest matches, live scores, and standings.
            Join us to celebrate the excitement of sports like never before!
          </p>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2  -left-20 w-36 h-36 bg-green-600 flex items-center justify-center rotate-45 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md"
      >
        <div className="relative mb-1">
          <IoIosArrowBack
            className="absolute left-2 -top-10 bottom-20 transform -rotate-45 z-50 text-white" // Rotates the arrow back to its intended position
            size={40} // Size of the icon
          />
        </div>
      </button>
      <div className="absolute top-1/2 -translate-y-1/2  -right-20 w-36 h-36 bg-green-600 flex items-center justify-center rotate-45 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
        
      </div>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2  -right-10 w-36 h-36  flex items-center justify-center rotate-180 transform"
      >
        <div className="relative mb-4 top-2">
          <IoIosArrowForward
          color="white"
            size={40} // Size of the icon
          />
        </div>
      </button>
    </section>
  );
};

export default FirstSection;
