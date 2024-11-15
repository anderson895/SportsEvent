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
    finalMatchBrackets,
    findTeamById,
    handleScheduleClick,
  } = useDoubleEliminationHooks({ matches, teams });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Double Elimination Bracket
      </h1>

      {/* Winners Bracket */}
      <div className="winners-bracket-section">
        <h2 className="text-xl font-bold text-center mb-4">Winners Bracket</h2>
        <div className="bracket-grid-winners grid grid-cols-3 gap-8">
          {Object.keys(winnersRounds).map((round) => (
            <div key={round} className="round-column flex flex-col space-y-6">
              <h3 className="round-title text-lg font-semibold text-center">
                Round {round}
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

      {/* Losers Bracket */}
      <div className="losers-bracket-section mt-12">
        <h2 className="text-xl font-bold text-center mb-4">Losers Bracket</h2>
        <div className="bracket-grid-losers grid grid-cols-4 gap-8">
          {Object.keys(losersRounds).map((round) => (
            <div key={round} className="round-column flex flex-col space-y-6">
              <h3 className="round-title text-lg font-semibold text-center">
                Round {round}
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

      {/* Final Match */}
      {finalMatchBrackets && (
        <div className="final-match-section mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Final Match</h2>
          <MatchComponent
            match={finalMatchBrackets}
            findTeamById={findTeamById}
            onScheduleClick={handleScheduleClick}
          />
        </div>
      )}

      {/* Champion */}
      {championTeam && (
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
      )}

    </div>
  );
};

export default DoubleEliminationBracket;
