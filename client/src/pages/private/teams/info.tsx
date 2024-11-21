/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../../config/axios/requestData";
import TeamsServices from "../../../config/service/teams";
import { dateStringFormatter } from "../../../utility/utils";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

export const TeamInfo = () => {
    const navigate = useNavigate()
  const { teamId } = useParams();
  const {
    data: [teamData] = [],
    isPending: isFetchingTeams,
  } = useFetchData(["teams"], [
    () => TeamsServices.fetchTeamInfo(teamId),
  ]);

  if (isFetchingTeams) {
    return <p className="text-gray-600 text-center mt-10">Loading...</p>;
  }

  if (!teamData) {
    return <p className="text-red-500 text-center mt-10">Team information not found.</p>;
  }

  const { team, events } = teamData;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Team Details */}
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="flex items-center mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={team?.teamLogo}
            alt={team?.teamName}
            className="w-28 h-28 rounded-full border border-gray-300 object-cover"
          />
          <div>
            <h3 className="text-3xl font-extrabold text-gray-800 flex items-center">
              {team?.teamName}
              <FaTrophy className="text-yellow-500 ml-3" title="Champion" />
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Date Added: {dateStringFormatter(team?.dateAdded)}
            </p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      {events?.map((event: any) => (
        <div
          key={event.eventsId}
          className="bg-white shadow-md rounded-lg p-6 mb-8"
        >
          <div className="border-b pb-4 mb-6 flex items-center">
            <MdEvent className="text-blue-500 text-2xl mr-3" />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">
                {event.eventName}
              </h4>
              <p className="text-gray-600 mt-1 text-sm">
                {dateStringFormatter(event.eventstartDate)} -{" "}
                {dateStringFormatter(event.eventendDate)}
              </p>
            </div>
          </div>

          {/* Sports Events Section */}
          {event.sportEvents.map((sportEvent: any) => (
            <div
              key={sportEvent.sportEventsId}
              className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <h5 className="text-lg font-bold text-gray-700">
                    {sportEvent.sportsName}
                  </h5>
                </div>
                <span className="text-gray-500 text-sm">
                  Bracket Type: {sportEvent.bracketType}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                <span className="font-semibold">Coach:</span>{" "}
                {sportEvent.coachName || "Not Assigned"}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                <span className="font-semibold">Max Players:</span>{" "}
                {sportEvent.maxPlayers}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                <span className="font-semibold">Standing:</span>{" "}
                <span className="text-green-600 font-bold">
                  {sportEvent.teamWin} Wins
                </span>{" "}
                /{" "}
                <span className="text-red-600 font-bold">
                  {sportEvent.teamLose} Losses
                </span>
              </p>

              {/* Players Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border border-gray-300 rounded-md">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                        Player Name
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                        Position
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                        Medical Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sportEvent.players.map((player: any) => (
                      <tr
                        key={player.playerId}
                        className="border-t hover:bg-gray-100"
                      >
                        <td className="px-4 py-2 text-sm text-gray-800 flex items-center">
                          <FaUsers className="text-gray-400 mr-2" />
                          {player.playerName}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {player.position}
                        </td>
                        <td className="px-4 py-2">
                          <a
                            href={player.medicalCertificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm hover:underline"
                          >
                            View Certificate
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
