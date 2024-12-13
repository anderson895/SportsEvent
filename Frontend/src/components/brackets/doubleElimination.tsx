import React from "react";
import useDoubleEliminationHooks from "./useDoubleEliminationHooks";
import { DoubleEliminationHooksProps } from "../../types";
import MatchComponent from "./matchComponent";

const DoubleEliminationBracket: React.FC<DoubleEliminationHooksProps> = ({
  matches,
  teams,
}) => {
  const {
    championTeam,
    winnersRounds,
    losersRounds,
    finalRound,
    finalRematchRound,
    findTeamById,
    handleScheduleClick,
  } = useDoubleEliminationHooks({ matches, teams });

  return (
    <div className="space-y-6">
      {/* Winners Bracket */}
      <div className="winners-bracket">
        <h2 className="text-xl font-bold text-center mb-4">Winners Bracket</h2>
        <div className="bracket-grid grid grid-cols-6 gap-4">
          {Object.keys(winnersRounds).map((round, index) => (
            <div key={round} className="round-column flex flex-col space-y-4">
              {/* Round Title only once per column */}
              <h3 className="round-title text-lg font-semibold text-center">
                Round {index + 1}
              </h3>
              {winnersRounds[Number(round)].map((match) => (
                <MatchComponent
                  key={match.matchId}
                  match={match}
                  findTeamById={findTeamById}
                  onScheduleClick={handleScheduleClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Final and Final Rematch (Aligned to the right) */}
      <div className="final-center grid grid-cols-6 gap-4 items-center mt-6">
        {/* Empty space to the left of Final */}
        <div className="col-span-4"></div>

        {/* Final Column */}
        <div className="final-column flex flex-col space-y-4 col-span-1">
          <h3 className="round-title text-lg font-semibold text-center">Final</h3>
          {Object.keys(finalRound).map((round) => (
            <div key={round}>
              {finalRound[Number(round)].map((match) => (
                <MatchComponent
                  key={match.matchId}
                  match={match}
                  findTeamById={findTeamById}
                  onScheduleClick={handleScheduleClick}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Final Rematch Column */}
        <div className="final-rematch-column flex flex-col space-y-4 col-span-1">
          <h3 className="round-title text-lg font-semibold text-center">Final Rematch</h3>
          {Object.keys(finalRematchRound).map((round) => (
            <div key={round}>
              {finalRematchRound[Number(round)].map((match) => (
                <MatchComponent
                  key={match.matchId}
                  match={match}
                  findTeamById={findTeamById}
                  onScheduleClick={handleScheduleClick}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Empty space to the right of Final */}
        <div className="col-span-4"></div>
      </div>

      {/* Losers Bracket */}
      <div className="losers-bracket">
        <h2 className="text-xl font-bold text-center mb-4">Losers Bracket</h2>
        <div className="bracket-grid grid grid-cols-6 gap-4">
          {Object.keys(losersRounds).map((round, index) => (
            <div key={round} className="round-column flex flex-col space-y-4">
              {/* Round Title only once per column */}
              <h3 className="round-title text-lg font-semibold text-center">
                Round {index + 1}
              </h3>
              {losersRounds[Number(round)].map((match) => (
                <MatchComponent
                  key={match.matchId}
                  match={match}
                  findTeamById={findTeamById}
                  onScheduleClick={handleScheduleClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Champion Section */}
      {championTeam ? (
        <div className="champion-section bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 p-6 rounded-lg shadow-lg mt-6 text-center flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold text-white mb-2">🏆 Champion 🏆</h2>
          <div className="flex items-center space-x-4">
            <img
              src={championTeam.teamLogo}
              alt={championTeam.teamName}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-start">
              <p className="text-2xl font-semibold text-white">
                {championTeam.teamName}
              </p>
              <p className="text-lg text-white opacity-90">
                Congratulations to the champion team!
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DoubleEliminationBracket;
