/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFetchData } from "../../../config/axios/requestData";
import SportsServices from "../../../config/service/sports";
import { FaRegCalendarAlt, FaFutbol, FaUsers, FaGamepad } from "react-icons/fa";

export const AdminDashboard: React.FC = () => {
  const {
    data: [summary] = [],
    isPending,
  } = useFetchData(["summary"], [
    () => SportsServices.fetchSportsSummary(),
  ]);

  if (isPending) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!summary) {
    return <p className="text-center text-red-500 mt-10">No data found.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Events Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <FaRegCalendarAlt className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Events</h2>
            <p className="text-gray-600 text-lg">{summary.events.length}</p>
          </div>
        </div>

        {/* Sports Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <FaFutbol className="text-4xl text-green-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Sports</h2>
            <p className="text-gray-600 text-lg">{summary.sports.length}</p>
          </div>
        </div>

        {/* Teams Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <FaUsers className="text-4xl text-yellow-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Teams</h2>
            <p className="text-gray-600 text-lg">{summary.teams.length}</p>
          </div>
        </div>

        {/* Matches Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <FaGamepad className="text-4xl text-red-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Matches</h2>
            <p className="text-gray-600 text-lg">{summary.matches.length}</p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sports Events</h2>
        {summary.sportsEvents.length > 0 ? (
          summary.sportsEvents.map((sportEvent: any) => (
            <div
              key={sportEvent.eventName}
              className="bg-white shadow-md rounded-lg p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {sportEvent.eventName} - {sportEvent.bracketType}
              </h3>
              <p className="text-gray-500 text-sm">
                Max Players: {sportEvent.maxPlayers}
              </p>

              {/* Team Standings */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Participating Teams
                </h4>
                <table className="table-auto w-full bg-white shadow rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left text-gray-600">Team</th>
                      <th className="px-4 py-2 text-left text-gray-600">Wins</th>
                      <th className="px-4 py-2 text-left text-gray-600">Losses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sportEvent.participatingTeams.map(
                      (team: any, index: number) => (
                        <tr
                          key={index}
                          className={`border-t ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-2 text-gray-800">
                            {team.teamName}
                          </td>
                          <td className="px-4 py-2 text-green-600 font-bold">
                            {team.teamWin}
                          </td>
                          <td className="px-4 py-2 text-red-600 font-bold">
                            {team.teamLose}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No sports events available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
