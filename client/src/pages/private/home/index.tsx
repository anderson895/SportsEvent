/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFetchData } from "../../../config/axios/requestData";
import SportsServices from "../../../config/service/sports";
import { CustomAutoPlaySwiper } from "../../../components/swiper/autoplay";
import { CustomVideoSwiper } from "../../../components/swiper/custom";

export const AdminDashboard: React.FC = () => {
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
  console.log(selectedEventData)
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
      {/* <CustomCarousel slides={summary?.media?.filter((x:any) => x.type === 'image')?.map((v:any) =>({
          id:v.mediaId,
          image:v.url
        }))}  /> */}
      {/* Media Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Media</h2>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <CustomAutoPlaySwiper height="300px" images={summary?.media?.filter((x:any) => x.type === 'image')?.map((v:any) => v.url)}  />
          </div>
          <div className="col-span-2">
          <CustomVideoSwiper width="100%" height="300px" videos={summary?.media?.filter((x:any) => x.type === 'video')?.map((v:any) => v.url)}  />
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
              <div dangerouslySetInnerHTML={{__html:sport.description}}  />
            </div>
          ))}
        </div>
      </div>

      {/* Selected Event Section */}
      {selectedEventData && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Event: {selectedEventData.eventName}
          </h2>

          {/* Sport Events */}
          <h3 className="text-md font-semibold mb-4">Sport Events</h3>
          {selectedEventData.sportsEvents?.map((sportEvent: any) => (
            <div key={sportEvent.sportEventsId} className="mb-4">
              <h4 className="font-semibold">
                {sportEvent.sportsName} - {sportEvent.bracketType}
              </h4>
              <p>Max Players: {sportEvent.maxPlayers}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {sportEvent.participatingTeams.map((team: any) => (
                  <div
                    key={team.teamEventId}
                    className="rounded-md bg-gray-100 p-4"
                  >
                    <h5 className="font-semibold">{team.teamName}</h5>
                    <p>Wins: {team.teamWin}</p>
                    <p>Losses: {team.teamLose}</p>
                    <h6 className="font-semibold mt-2">Players:</h6>
                    <ul className="list-disc pl-5">
                      {team.players?.map((player: any) => (
                        <li key={player.playerId}>
                          {player.playerName} - {player.position}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Matches */}
          <h3 className="text-md font-semibold mb-4">Matches</h3>
          <div className="grid grid-cols-2 gap-4">
            {selectedEventData.sportEvents
              ?.flatMap((sportEvent: any) => sportEvent.matches || [])
              .map((match: any) => (
                <div
                  key={match.matchId}
                  className="rounded-md bg-gray-100 p-4 shadow-md"
                >
                  <p>
                    <strong>Round:</strong> {match.round}
                  </p>
                  <p>
                    <strong>Schedule:</strong> {new Date(
                      match.schedule
                    ).toLocaleString()}
                  </p>
                  <p>
                    <strong>Teams:</strong> {match.team1Name} vs{" "}
                    {match.team2Name}
                  </p>
                  <p>
                    <strong>Score:</strong> {match.team1Score} -{" "}
                    {match.team2Score}
                  </p>
                  <p>
                    <strong>Status:</strong> {match.status}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
