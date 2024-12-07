import React from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "../../types";

interface MatchCardProps {
  team1: Team | null;
  team2: Team | null;
  status: string;
  winnerTeamId: number | null;
  matchId: number;
  team1Score: number | null;
  team2Score: number | null;
}

const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  status,
  winnerTeamId,
  matchId,
  team1Score,
  team2Score,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (status !== "completed") {
      navigate(`/Game-Scoring/match/${matchId}`);
    }
  };

  const isTeam1Winner = team1 && winnerTeamId === team1.teamId;
  const isTeam2Winner = team2 && winnerTeamId === team2.teamId;

  return (
    <div
      onClick={handleCardClick}
      className={`row-span-7 flex border flex-col justify-center gap-2 items-start rounded-lg p-6 shadow-md w-72 h-56 m-2`}
    >
      <div className="text-gray-500 text-sm font-semibold">
        Match ID: {matchId}
      </div>

      <div className="flex items-center gap-4">
        {team1?.teamLogo ? (
          <img
            src={team1.teamLogo}
            className={`w-12 h-12 rounded-full ${
              !isTeam1Winner && status === "completed" ? "filter grayscale" : ""
            }`}
            alt={team1.teamName}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300" />
        )}
        <div className="flex-1">
          <p
            className={`font-semibold text-start ${
              !isTeam1Winner && status === "completed" ? "text-gray-400" : ""
            }`}
          >
            {team1 ? team1.teamName : "TBD"}
          </p>
          <p
            className={`text-sm ${
              !isTeam1Winner && status === "completed" ? "text-gray-400" : ""
            }`}
          >
            Score: {team1Score !== null ? team1Score : "-"}
          </p>
        </div>
      </div>

      <span className="text-gray-500 text-xs text-center w-full">vs</span>

      <div className="flex items-center gap-4">
        {team2?.teamLogo ? (
          <img
            src={team2.teamLogo}
            className={`w-12 h-12 rounded-full ${
              !isTeam2Winner && status === "completed" ? "filter grayscale" : ""
            }`}
            alt={team2.teamName}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300" />
        )}
        <div className="flex-1">
          <p
            className={`font-semibold text-start ${
              !isTeam2Winner && status === "completed" ? "text-gray-400" : ""
            }`}
          >
            {team2 ? team2.teamName : "TBD"}
          </p>
          <p
            className={`text-sm ${
              !isTeam2Winner && status === "completed" ? "text-gray-400" : ""
            }`}
          >
            Score: {team2Score !== null ? team2Score : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
