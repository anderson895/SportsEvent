import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Select } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import { AnimatedComponent, createSlideInVariant } from "../animation";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const HeaderComponents: React.FC<{
  events: any[];
  setSelected: (eventId: string) => void;
  selected: string; // Explicitly define the type as string
  matches: any;
  selectedSport: any;
}> = ({ events, setSelected, selected, matches, selectedSport }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Only set selected if it is not already set
    if (!selected && events.length > 0) {
      const firstEventId = events[0].eventId;
      setSelected(firstEventId);
    }
  }, [events, selected, setSelected]);

  const handleEventChange = (value: string) => {
    setSelected(value);
  };

  const filteredMatches = matches
    ?.find((match: any) => match.sportsName === selectedSport)
    ?.matches?.filter((match: any) => {
      const scheduleDate = new Date(match.schedule);
      return scheduleDate >= new Date();
    });

  return (
    <header className="bg-[#f8ba00] h-24 shadow-md">
      <div className="flex justify-end relative items-center">
        {/* Logo and Title Section */}
        <div
          onClick={() => navigate("/")}
          className="absolute cursor-pointer top-0 -left-12 flex items-center z-50 pl-24 gap-4 bg-[#064518] text-white pr-12 py-2 h-28 w-[40%] -skew-x-12"
        >
          <img src="/ncfi-logo.png" className="w-24" alt="NCFI Logo" />
          <p className="text-3xl font-bold">Naga College Foundation, Inc.</p>
        </div>

        <div className="flex flex-col items-end relative">
          {/* Marquee Section */}
          <div className="bg-[#064518] w-screen h-12 flex justify-center items-center text-white text-center">
            <Marquee gradient={false} speed={50}>
              {filteredMatches?.length > 0 ? (
                filteredMatches.map((match: any, index: number) => {
                  const matchDate = new Date(
                    match.schedule
                  ).toLocaleDateString();
                  return (
                    <span key={index} className="mx-6">
                      {matchDate}: {match.team1Name} VS {match.team2Name}
                    </span>
                  );
                })
              ) : (
                <span></span>
              )}
            </Marquee>
          </div>

          <div className="w-max z-50">
            <AnimatedComponent variants={createSlideInVariant("down")}>
              <nav className="z-20 h-full mt-1 mr-10 flex items-center gap-8">
                <ul className="flex gap-16 text-white items-center mt-1">
                  <li>
                    <a href="#home" className="font-medium hover:text-gray-800">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#teams"
                      className="font-medium hover:text-gray-800"
                    >
                      Teams
                    </a>
                  </li>
                  <li>
                    <a
                      href="#photos"
                      className="font-medium hover:text-gray-800"
                    >
                      Photos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#watch"
                      className="font-medium hover:text-gray-800"
                    >
                      Watch
                    </a>
                  </li>
                  <li>
                    <Select
                      className="w-52"
                      placeholder="Select Event"
                      onChange={handleEventChange}
                      value={selected}
                      allowClear
                    >
                      {events.map((event) => (
                        <Option key={event.eventId} value={event.eventId}>
                          {event.eventName}
                        </Option>
                      ))}
                    </Select>
                  </li>
                </ul>
              </nav>
            </AnimatedComponent>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponents;
