/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Team {
  teamId: number;
  teamName: string;
  teamCoach: string;
  teamLogo: any;
}
export interface Events {
  eventId: number;
  eventName: string;
  eventYear: string;
  eventendDate: any;
  eventstartDate: any;
  description: string;
}
export interface Sports {
  sportsId: number;
  sportsName: string;
  sportsLogo: any;
  description: any;
}

export interface SingleEliminationHooksProps {
  matches: Match[];
  teams: Team[];
}

export interface Matchup {
  id: string;
  teamA: Team | null;
  teamB: Team | null;
  round: number;
}

export interface BracketStage {
  name: string;
  isElimination: boolean;
}

export interface BracketType {
  "Single Elimination"?: BracketStage[];
  "Double Elimination"?: BracketStage[];
  "Round Robin"?: BracketStage[];
}

export interface Match {
  bracketType: string;
  matchId: number;
  round: number;
  team1Id: number | null;
  team2Id: number | null;
  schedule?: string;
  next_match_id?: number | null;
  status: string;
  winner_team_id: number | null;
  isFinal?: boolean;
}

export interface SingleEliminationBracketProps {
  matches: Match[];
  teams: Team[];
}
export interface DoubleEliminationHooksProps {
  matches: Match[];
  teams: Team[];
}
export interface RoundRobinHooksProps {
  matches: Match[];
  teams: Team[];
}

