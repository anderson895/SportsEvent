/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Match, RoundRobinHooksProps } from "../../types";
import { dateStringFormatter } from "../../utility/utils";

const RoundRobinBracket: React.FC<RoundRobinHooksProps> = ({ matches, teams }) => {
  const roundsMatch = matches?.reduce((acc, match) => {
    const round = acc[match.round] || [];
    round.push(match);
    acc[match.round] = round;
    return acc;
  }, {} as Record<number, Match[]>);

  return (
    <div className="p-8 font-sans text-gray-800 z-50">
      <h1 className="text-5xl text-center font-bold text-red-600 mb-12">
        Round Robin Bracket
      </h1>
      <div className="flex flex-col gap-8">
        {Object.keys(roundsMatch || [])?.map((roundKey) =>{ 
          console.log(roundKey)
          return(
          <div
            key={roundKey}
            className="border-l-8 z-50 border-blue-500 p-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 via-white to-blue-50"
          >
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">
              Round {roundKey}
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {roundsMatch[Number(roundKey || [])]?.map((match: any) => {
                const team1 = teams.find(
                  (team: any) => team.teamId === match.team1Id
                );
                const team2 = teams.find(
                  (team: any) => team.teamId === match.team2Id
                );
                const statusClass =
                  match.status === "Completed"
                    ? "text-green-500"
                    : match.status === "Scheduled"
                    ? "text-yellow-500"
                    : "text-gray-500";

                const team1Score = match.team1Score ?? null;
                const team2Score = match.team2Score ?? null;

                const winner =
                  match.status === "Completed" &&
                  team1Score !== null &&
                  team2Score !== null
                    ? team1Score > team2Score
                      ? team1?.teamName
                      : team2?.teamName
                    : null;

                return (
                  <div
                    key={match.matchId}
                    className="flex flex-col md:flex-row justify-between items-center  p-6 rounded-xl shadow-xl border transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        {team1 && team1.teamLogo ? (
                          <img
                            src={team1.teamLogo}
                            alt={team1.teamName}
                            className="w-20 h-20 rounded-full shadow-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-gray-500">N/A</span>
                          </div>
                        )}
                        <span className="font-semibold text-center mt-2 text-gray-700">
                          {team1?.teamName || "Unknown Team 1"}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-gray-700">
                        VS
                      </span>
                      <div className="flex flex-col items-center">
                        {team2 && team2.teamLogo ? (
                          <img
                            src={team2.teamLogo}
                            alt={team2.teamName}
                            className="w-20 h-20 rounded-full shadow-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-gray-500">N/A</span>
                          </div>
                        )}
                        <span className="font-semibold text-center mt-2 text-gray-700">
                          {team2?.teamName || "Unknown Team 2"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 md:mt-0">
                      <span
                        className={`font-semibold ${statusClass} text-lg`}
                      >
                        Status: {match.status || "Pending"}
                      </span>
                      {team1Score !== null && team2Score !== null && (
                        <span className="text-gray-700 font-bold text-lg">
                          Score: {team1Score} - {team2Score}
                        </span>
                      )}
                      {winner && (
                        <span className="text-green-500 font-semibold text-lg mt-2">
                          Winner: {winner}
                        </span>
                      )}
                      {match.schedule && (
                        <span className="text-gray-600 font-medium mt-2">
                          Scheduled: {dateStringFormatter(match.schedule)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default RoundRobinBracket;
