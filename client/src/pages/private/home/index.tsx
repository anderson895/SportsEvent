/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFetchData } from "../../../config/axios/requestData";
import SportsServices from "../../../config/service/sports";
import { CustomAutoPlaySwiper } from "../../../components/swiper/autoplay";
import { CustomVideoSwiper } from "../../../components/swiper/custom";
import { useNavigate } from "react-router-dom";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { data: [summary] = [], isPending } = useFetchData(
    ["summary"],
    [() => SportsServices.fetchSportsSummary()]
  );
  const [selectedEvent, setSelectedEvent] = useState("");

  if (isPending) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!summary) {
    return <p className="text-center text-red-500 mt-10">No data found.</p>;
  }

  const selectedEventData = summary?.events?.find(
    (event: any) => event.eventId === parseInt(selectedEvent)
  );
  console.log(selectedEventData?.sportEvents)
  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <select
          className="min-w-40 p-2 rounded-md shadow-md cursor-pointer"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">Select an Event</option>
          {summary?.events?.map((event: any) => (
            <option value={event.eventId} key={event.eventId}>
              {event.eventName}
            </option>
          ))}
        </select>
      </div>
      {/* Media Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Media</h2>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <CustomAutoPlaySwiper
              height="300px"
              images={summary?.media
                ?.filter((x: any) => x.type === "image")
                ?.map((v: any) => v.url)}
            />
          </div>
          <div className="col-span-2">
            <CustomVideoSwiper
              width="100%"
              height="300px"
              videos={summary?.media
                ?.filter((x: any) => x.type === "video")
                ?.map((v: any) => v.url)}
            />
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Teams</h2>
        <div className="grid grid-cols-4 gap-4">
          {summary?.teams?.map((team: any) => (
            <div
              key={team.teamId}
              className="rounded-md overflow-hidden shadow-md bg-white p-4"
            >
              <img
                src={team.teamLogo}
                alt={team.teamName}
                className="w-full h-32 object-cover mb-4"
              />
              <h3 className="font-semibold">{team.teamName}</h3>
              <p>Coach: {team.coachName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sports Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Sports</h2>
        <div className="grid grid-cols-4 gap-4">
          {summary?.sports?.map((sport: any) => (
            <div
              key={sport.sportsId}
              className="rounded-md overflow-hidden shadow-md bg-white p-4"
            >
              <img
                src={sport.sportsLogo}
                alt={sport.sportsName}
                className="w-full h-32 object-cover mb-4"
              />
              <h3 className="font-semibold">{sport.sportsName}</h3>
              <div dangerouslySetInnerHTML={{ __html: sport.description }} />
            </div>
          ))}
        </div>
      </div>

      {selectedEventData && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Event: {selectedEventData.eventName}
          </h2>

          {/* Sport Events */}
          <h3 className="text-md font-semibold mb-4">Sport Events</h3>
          {selectedEventData.sportsEvents?.map((sportEvent: any) => (
            <div key={sportEvent.sportEventsId} className="mb-8">
              <h4 className="font-semibold text-lg text-gray-800">
                {sportEvent.sportsName} - {sportEvent.bracketType}
              </h4>
              <p className="text-gray-600 text-sm">
                Max Players: {sportEvent.maxPlayers}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {sportEvent.participatingTeams.map((team: any) => (
                  <div
                    key={team.teamEventId}
                    className="relative rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                  >
                    {/* Team Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={team.teamLogo}
                        alt={team.teamName}
                        className="w-16 h-16 rounded-full border border-gray-300"
                      />
                      <div>
                        <h5 className="font-semibold text-gray-800">
                          {team.teamName}
                        </h5>
                        <p className="text-sm text-gray-600">
                          Wins:{" "}
                          <span className="font-bold text-green-600">
                            {team.teamWin}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Losses:{" "}
                          <span className="font-bold text-red-600">
                            {team.teamLose}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Players */}
                    <div className="mt-4">
                      <h6 className="font-semibold text-gray-700 mb-2">
                        Players:
                      </h6>
                      <ul className="list-disc pl-6 space-y-1">
                        {team.players?.length > 0 ? (
                          team.players.map((player: any) => (
                            <li
                              key={player.playerId}
                              className="text-sm text-gray-600 flex justify-between"
                            >
                              <span>{player.playerName}</span>
                              <span className="italic text-gray-500">
                                {player.position}
                              </span>
                            </li>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            No players listed
                          </p>
                        )}
                      </ul>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-6 text-center">
                      <button onClick={() =>navigate(`/Teams/${team.teamId}`)} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        View Team Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}


        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
