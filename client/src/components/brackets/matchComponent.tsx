import React from "react";
import MatchCard from "./matchupCard";
import { dateStringFormatter } from "../../utility/utils";
import { Match, Team } from "../../types";

interface MatchComponentProps {
  match: Match;
  findTeamById: (id: number | null) => Team | null;
  onScheduleClick: (match: Match) => void;
}

const MatchComponent: React.FC<MatchComponentProps> = ({ match, findTeamById }) => (
  <div className="grid grid-cols-1 gap-x-6 grid-rows-6">
    {match.schedule && (
      <p className="row-span-1 flex justify-center items-center w-full text-center">{dateStringFormatter(match.schedule)}</p>
    )}
    <MatchCard
      matchId={match.matchId}
      status={match.status}
      winnerTeamId={match.winner_team_id}
      team1={findTeamById(match.team1Id)}
      team2={findTeamById(match.team2Id)}
    />
  </div>
);

export default MatchComponent;
