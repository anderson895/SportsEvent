import { useRef } from "react";
import { Button, Card } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import Marquee from "react-fast-marquee";

export const LandingPage = () => {
  const thumbsSwiperRef = useRef(null); // useRef to hold the Swiper instance for thumbnails

  const slides = [
    {
      image: "/img1.png",
      title: "Thrilling Basketball Games",
      description: "Experience the excitement of top teams competing.",
    },
    {
      image: "/img2.png",
      title: "Intense Soccer Matches",
      description: "Catch the live action and cheer for your favorites!",
    },
    {
      image: "/img3.png",
      title: "Annual City Marathon",
      description: "Join the city marathon for a healthier community.",
    },
  ];

  const newsArticles = [
    {
      title: "Basketball Championship Kicks Off",
      date: "March 1, 2024",
      content:
        "The much-awaited Basketball Championship 2024 has begun, promising thrilling games and intense competition.",
    },
    {
      title: "Soccer League Finals Announced",
      date: "April 10, 2024",
      content:
        "Get ready for the Soccer League Finals with top teams competing for the title this April.",
    },
    {
      title: "Marathon Highlights Local Heroes",
      date: "June 7, 2024",
      content:
        "The annual marathon brought together thousands of participants, promoting fitness and community spirit.",
    },
  ];

  const videoHighlights = [
    {
      title: "Top 10 Basketball Moments",
      url: "https://example.com/video1.mp4",
    },
    {
      title: "Soccer League Best Goals",
      url: "https://example.com/video2.mp4",
    },
    {
      title: "Marathon Highlights Reel",
      url: "https://example.com/video3.mp4",
    },
  ];

  const eventPhotos = ["/img1.png", "/img5.png", "/img4.png", "/img3.png"];

  const teamSchedules = [
    {
      team1: "College of Accountancy and Finance",
      team1Logo: "/caf.jpg",
      team2: "College og Criminal Justice Education",
      team2Logo: "/ccje.jpg",
      date: "March 10, 2024",
      time: "5:00 PM",
      location: "City Arena",
    },
    {
      team1: "College of Arts and Sciences",
      team1Logo: "/cas.jpg",
      team2: "College of Computer Studies",
      team2Logo: "/ccs.png",
      date: "March 15, 2024",
      time: "6:30 PM",
      location: "National Stadium",
    },
    {
      team1: "College of Business and Management",
      team1Logo: "/cbm.jpg",
      team2: "College of Health Science",
      team2Logo: "/chs.jpg",
      date: "March 18, 2024",
      time: "7:00 PM",
      location: "Downtown Gym",
    },
  ];

  const scheduleText =
    "Upcoming Events: Basketball Championship - March 12, Soccer League Finals - April 18, Annual Marathon - June 6";

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Marquee Section */}
      <div className="bg-[#064518] text-white text-center">
        <Marquee gradient={false} speed={50}>
          {scheduleText}
        </Marquee>
      </div>

      {/* Header Navigation */}
      <header className="bg-white shadow-md fixed top-6 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-[#064518] flex items-center gap-4">
            <img src="/ncfi-logo.png" className="w-12" alt="" />
            <p>Naga College Foundation, Inc.</p>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li className="relative group">
                <a
                  href="#home"
                  className="text-gray-700 font-medium transition duration-300"
                >
                  Home
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#064518] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#news"
                  className="text-gray-700 font-medium transition duration-300"
                >
                  News
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#064518] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#videos"
                  className="text-gray-700 font-medium transition duration-300"
                >
                  Videos
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#064518] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative group">
                <a
                  href="#photos"
                  className="text-gray-700 font-medium transition duration-300"
                >
                  Photos
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#064518] transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Carousel Section */}
        <section className="relative" id="home">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            className="h-96"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full bg-cover bg-center flex items-center justify-center text-white"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
                    <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-lg">{slide.description}</p>
                    <Button type="primary" size="large" className="mt-4">
                      Learn More
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* News and Articles Section */}
        <section className="container mx-auto py-12" id="news">
          <h2 className="text-3xl font-semibold text-center mb-8">
            News & Articles
          </h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, index) => (
              <Card
                key={index}
                title={article.title}
                bordered={false}
                className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <p className="text-gray-500">{article.date}</p>
                <p className="mt-4">{article.content}</p>
                <Button type="link" className="mt-4">
                  Read More
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto py-12" id="schedules">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Team Match Schedules
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-[#064518] text-white">
                  <th className="py-3 px-4 font-medium text-left">Team 1</th>
                  <th className="py-3 px-4 font-medium text-left"></th>
                  <th className="py-3 px-4 font-medium text-left">Team 2</th>
                  <th className="py-3 px-4 font-medium text-left">Date</th>
                  <th className="py-3 px-4 font-medium text-left">Time</th>
                  <th className="py-3 px-4 font-medium text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {teamSchedules.map((schedule, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 flex items-center space-x-3">
                      <img
                        src={schedule.team1Logo}
                        alt={`${schedule.team1} logo`}
                        className="w-8 h-8"
                      />
                      <span className="text-gray-800 font-medium">
                        {schedule.team1}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">vs</td>
                    <td className="py-4 px-4 flex items-center space-x-3">
                      <img
                        src={schedule.team2Logo}
                        alt={`${schedule.team2} logo`}
                        className="w-8 h-8"
                      />
                      <span className="text-gray-800 font-medium">
                        {schedule.team2}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{schedule.date}</td>
                    <td className="py-4 px-4 text-gray-700">{schedule.time}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {schedule.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Videos and Highlights Section */}
        <section className="bg-gray-200 py-12" id="videos">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Videos & Highlights
          </h2>
          <div className="container mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {videoHighlights.map((video, index) => (
              <Card
                key={index}
                bordered={false}
                className="shadow-lg rounded-lg"
              >
                <video
                  controls
                  src={video.url}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Sports Event Photos Section */}
        <section className="container mx-auto py-12" id="photos">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Event Photos
          </h2>
          {/* Main Swiper with Thumbs */}
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiperRef.current }}
            modules={[FreeMode, Navigation, Thumbs]}
            loop
            className="h-64"
          >
            {eventPhotos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${photo})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails Swiper */}
          <Swiper
            onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-4 h-20"
          >
            {eventPhotos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${photo})` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4" id="contact">
        <p>&copy; 2024 SportsCentral. All rights reserved.</p>
      </footer>
    </div>
  );
};
