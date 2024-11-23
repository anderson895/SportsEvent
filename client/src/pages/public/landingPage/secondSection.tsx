import React from "react";
import { AnimatedComponent, createSlideInVariant } from "../animation";

// Define the type for the card data
interface CardData {
  image: string;
  title: string;
  description: string;
}

// Main Component
const SecondSection: React.FC = () => {
  // Array of cards with data
  const cards: CardData[] = [
    {
      image: "/sports.webp",
      title: "Real-Time Live Scoring for Every Match",
      description: "Get instant updates on scores as they happen.",
    },
    {
      image: "/img1.png",
      title: "Current Standings for All Competitions",
      description:
        "Check out the latest standings to track your favorite teams.",
    },
    {
      image: "/img2.png",
      title: "Join Our Community of Sports Enthusiasts",
      description: "Connect with fellow fans and share your passion.",
    },
  ];

  // Section Header Component
  const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({
    title,
    subtitle,
  }) => (
    <div className="text-center mb-8">
      <h4 className="text-gray-600 text-lg font-semibold">{title}</h4>
      <h2 className="text-3xl md:text-4xl font-bold mt-2">{subtitle}</h2>
      <p className="text-gray-600 mt-4">
        Discover a comprehensive list of upcoming sports events. Never miss a
        match with our live scoring and standings updates.
      </p>
    </div>
  );
  const ButtonGroup: React.FC = () => (
    <div className="flex justify-center mt-8 gap-4">
      <button className="bg-black text-white py-2 px-6 rounded-md">View</button>
      <button className="border border-black text-black py-2 px-6 rounded-md">
        Join →
      </button>
    </div>
  );

  return (
    <section className="container mx-auto py-16 px-4">
      {/* Section Header */}
      <SectionHeader
        title="Events"
        subtitle="Stay Updated on Upcoming Sports Events"
      />


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
      <AnimatedComponent variants={createSlideInVariant("down")}>
      <div
            key={index}
            className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md"
          >
            <img
              src={card.image}
              alt="Card visual"
              className="w-20 h-20 bg-gray-300 rounded-md mb-4"
            />
            <h3 className="font-bold text-xl text-center">{card.title}</h3>
            <p className="text-gray-600 text-center mt-2">{card.description}</p>
          </div>
      </AnimatedComponent>
        ))}
      </div>

      {/* Button Group */}
      <ButtonGroup />
    </section>
  );
};

export default SecondSection;
