/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import FirstSection from "./firstSection";
import { useFetchData } from "../../../config/axios/requestData";
import SportsServices from "../../../config/service/sports";
import HeaderComponents from "./header";
import MatchSection from "./match";
import NewsSection from "./newsSection";

export const LandingPage = () => {
  const { data: [summary] = [] } = useFetchData(
    ["summary"],
    [() => SportsServices.fetchSportsSummary()]
  );
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>("");
  

  const selectedEvent = summary?.events?.find(
    (event: any) => event.eventId === selectedEventId
  );

  return (
    <div className="bg-gray-100 min-h-screen relative overflow-hidden">
      <HeaderComponents
        selected={selectedEventId}
        selectedSport={selectedSport}
        matches={selectedEvent?.sportsEvents}
        setSelected={setSelectedEventId}
        events={summary?.events || []}
      />
      <main className="">
        <FirstSection />
        {selectedEvent ? (
          <>
            <div className="p-16 flex flex-col justify-start items-center">
            <h2 className="text-3xl font-bold text-center py-4">
              {selectedEvent.eventName}
            </h2>
            <div dangerouslySetInnerHTML={{__html:selectedEvent?.description}} />
            </div>
          <MatchSection teams={summary?.teams} selectedSport={selectedSport} setSelectedSport={setSelectedSport} event={selectedEvent} matches={selectedEvent?.sportsEvents} />
        
          </>
        ) : (
          <p className="text-center py-6">
            Please select an event to view its details.
          </p>
        )}

        <NewsSection news={summary?.media}  />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4" id="contact">
        <p>&copy; 2024 SportsCentral. All rights reserved.</p>
      </footer>
    </div>
  );
};
