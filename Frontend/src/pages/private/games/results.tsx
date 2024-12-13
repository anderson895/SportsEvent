import { useState } from "react";
import useGameResults from "./useGameResults";

export const GameResults = () => {
  const { isFetchingMatch, paginatedMatches } = useGameResults();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  // Get unique events and sports for filtering
  const uniqueEvents = [
    ...new Set(paginatedMatches?.map((match) => match.event.eventName)),
  ];
  const uniqueSports = [
    ...new Set(paginatedMatches?.map((match) => match.sport.sportsName)),
  ];

  // Filter matches based on selected event and sport
  const filteredMatches = paginatedMatches?.filter((match) => {
    const eventMatches = selectedEvent
      ? match.event.eventName === selectedEvent
      : true;
    const sportMatches = selectedSport
      ? match.sport.sportsName === selectedSport
      : true;
    return eventMatches && sportMatches;
  });

  if (isFetchingMatch) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return (
    <div className="space-y-2 p-4">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
        Game Results
      </h1>

      {/* Filters */}
      <div className="flex justify-center gap-6 mb-6">
        {/* Event Filter */}
        <select
          className="border border-gray-300 rounded-md p-2"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">All Events</option>
          {uniqueEvents.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>

        {/* Sport Filter */}
        <select
          className="border border-gray-300 rounded-md p-2"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
        >
          <option value="">All Sports</option>
          {uniqueSports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6 px-20">
        {filteredMatches?.map((match) => (
          <div
            key={match.matchId}
            className="w-full flex items-center blur-bg flex-col gap-6 border-4 border-blue-700 p-4"
            style={{
              backgroundImage: 'url("/bg.jpg")', // Replace with your actual background image path
              backgroundSize: "fill",
              backgroundPosition: "center",
            }}
          >
            {/* Team 1 */}
            <div
              className="relative w-[70%] h-20 transform -skew-x-12 grid grid-cols-7"
              style={{
                backgroundImage: 'url("/score.jpg")', // Replace with your actual background image path
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="col-span-2 flex justify-center items-center transform -skew-x-10 w-[180px] h-24 border-4 -mt-[8px] ml-4"
                style={{
                  backgroundImage: 'url("/logobg.jpg")', // Replace with your actual background image path
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  className="w-20 aspect-square rounded-full"
                  src={match.team1.teamLogo}
                  alt={match.team1.teamName}
                />
              </div>
              <div className="col-span-4 flex justify-start items-center transform -skew-x-10 h-20">
                <p className="text-lg font-bold">{match.team1.teamName}</p>
                <p className="text-xs text-gray-200">{match.team1.nickname}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center transform -skew-x-10 bg-black h-20">
                <p className="text-4xl font-bold text-white">
                  {match.team1Score}
                </p>
              </div>
            </div>
            {/* Team 2 */}
            <div
              className="relative w-[70%] -ml-[38px] h-20 transform -skew-x-12 grid grid-cols-7"
              style={{
                backgroundImage: 'url("/score.jpg")', // Replace with your actual background image path
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="col-span-2 flex justify-center items-center transform -skew-x-10 w-[180px] h-24 border-4 -mt-[8px] ml-4"
                style={{
                  backgroundImage: 'url("/logobg.jpg")', // Replace with your actual background image path
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  className="w-20 border-4 borber-black m-2 aspect-square rounded-full"
                  src={match.team2.teamLogo}
                  alt={match.team2.teamName}
                />
              </div>
              <div className="col-span-4 flex justify-start items-center transform -skew-x-10 h-20">
                <p className="text-lg font-bold">{match.team2.teamName}</p>
                <p className="text-xs text-gray-200">{match.team2.nickname}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center transform -skew-x-10 bg-black h-20">
                <p className="text-4xl font-bold text-white">
                  {match.team2Score}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameResults;
