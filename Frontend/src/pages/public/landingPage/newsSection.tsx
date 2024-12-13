/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import TextTruncate from "react-text-truncate";
import { Typography } from "antd";
import { AnimatedComponent, createSlideInVariant } from "../animation";

const { Title, Text } = Typography;

const NewsSection: React.FC<{ news: any }> = ({ news }) => {
  console.log(news);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Separate images and videos
  const images = news?.filter((item: any) => item.type === "image");
  const videos = news?.filter((item: any) => item.type === "video");

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8">
      <div className="w-full md:w-[80%]">
        <div className="text-center mb-8">
          <Title level={2} className="font-bold text-gray-800">
            Recent News
          </Title>
        </div>

        {/* Images Section */}
        <section id="photos">
          <Title level={4} className="font-semibold text-gray-800 mb-4">
            Images
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
            {images?.map((item: any, index: number) => {
              const date = new Date(item.createdAt);
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "long" });
              const year = date.getFullYear();
              const isExpanded = expandedIndex === index;

              return (
                <AnimatedComponent
                  key={`image-${index}`}
                  variants={createSlideInVariant("down")}
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                    <div className="relative group">
                      <img
                        src={item.url}
                        alt={item.title || "News Image"}
                        className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 flex flex-col items-center">
                        <div className="bg-white flex gap-2 p-2 rounded-lg shadow text-center">
                          <Text className="text-3xl font-bold text-gray-800 leading-none">
                            {day}
                          </Text>
                          <div className="flex flex-col justify-start text-start">
                            <Text className="text-sm text-gray-600">{year}</Text>
                            <Text className="text-sm text-gray-600">{month}</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <Title
                        level={4}
                        className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300"
                      >
                        {item.title || "Untitled News"}
                      </Title>
                      {!isExpanded ? (
                        <TextTruncate
                          line={3}
                          element="p"
                          truncateText="..."
                          text={item.description || "No description provided."}
                        />
                      ) : (
                        <p className="text-gray-600 text-sm">
                          {item.description || "No description provided."}
                        </p>
                      )}
                      <button
                        onClick={() => handleToggle(index)}
                        className="text-blue-500 mt-2 text-sm hover:underline"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                      {item.author && item.author !== "undefined" && (
                        <Text className="text-gray-500 text-xs block">
                          By {item.author}
                        </Text>
                      )}
                    </div>
                  </div>
                </AnimatedComponent>
              );
            })}
          </div>
        </section>

        {/* Videos Section */}
        <section id="watch" className="mt-12">
          <Title level={4} className="font-semibold text-gray-800 mb-4">
            Videos
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
            {videos?.map((item: any, index: number) => {
              const date = new Date(item.createdAt);
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "long" });
              const year = date.getFullYear();
              const isExpanded = expandedIndex === index;

              return (
                <AnimatedComponent
                  key={`video-${index}`}
                  variants={createSlideInVariant("down")}
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                    <div className="relative group">
                      <video
                        src={item.url}
                        controls
                        className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 flex flex-col items-center">
                        <div className="bg-white flex gap-2 p-2 rounded-lg shadow text-center">
                          <Text className="text-3xl font-bold text-gray-800 leading-none">
                            {day}
                          </Text>
                          <div className="flex flex-col justify-start text-start">
                            <Text className="text-sm text-gray-600">{year}</Text>
                            <Text className="text-sm text-gray-600">{month}</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <Title
                        level={4}
                        className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300"
                      >
                        {item.title || "Untitled News"}
                      </Title>
                      {!isExpanded ? (
                        <TextTruncate
                          line={3}
                          element="p"
                          truncateText="..."
                          text={item.description || "No description provided."}
                        />
                      ) : (
                        <p className="text-gray-600 text-sm">
                          {item.description || "No description provided."}
                        </p>
                      )}
                      <button
                        onClick={() => handleToggle(index)}
                        className="text-blue-500 mt-2 text-sm hover:underline"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                      {item.author && item.author !== "undefined" && (
                        <Text className="text-gray-500 text-xs block">
                          By {item.author}
                        </Text>
                      )}
                    </div>
                  </div>
                </AnimatedComponent>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsSection;
