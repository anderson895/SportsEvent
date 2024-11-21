import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useEventsRequest from "../../config/data/events";
import { Match, Team, DoubleEliminationHooksProps } from "../../types";

export default function useDoubleEliminationHooks({ matches, teams }: DoubleEliminationHooksProps) {
  const queryClient = useQueryClient();

  const [modalState, setModalState] = useState({
    isModalVisible: false,
    isScheduleModalVisible: false,
    selectedMatch: null as Match | null,
  });
  const [scores, setScores] = useState({ team1Score: null as number | null, team2Score: null as number | null });
  const [schedule, setSchedule] = useState<string | null>(null);

  const { isLoading, setScore1, setMatchingSchedule } = useEventsRequest({
    setIsModalVisible: (visible) => setModalState((prev) => ({ ...prev, isModalVisible: visible })),
  });

  const winnersRounds = (matches ?? []).filter((match) => match.bracketType === "winners").reduce((acc, match) => {
    acc[match.round] = acc[match.round] ? [...acc[match.round], match] : [match];
    return acc;
  }, {} as { [key: number]: Match[] });

  const losersRounds = (matches ?? []).filter((match) => match.bracketType === "losers").reduce((acc, match) => {
    acc[match.round] = acc[match.round] ? [...acc[match.round], match] : [match];
    return acc;
  }, {} as { [key: number]: Match[] });

  const findTeamById = (id: number | null): Team | null => (teams ?? []).find((team) => team.teamId === id) || null;

  const handleMatchClick = (match: Match) => {
    if (match.status !== "Completed") {
      setModalState((prev) => ({ ...prev, selectedMatch: match, isModalVisible: true }));
    }
  };

  const handleScheduleClick = (match: Match) => {
    setModalState((prev) => ({ ...prev, selectedMatch: match, isScheduleModalVisible: true }));
  };

  const handleScoreSubmit = () => {
    const { selectedMatch } = modalState;
    if (selectedMatch && scores.team1Score !== null && scores.team2Score !== null) {
      const formData = new FormData();
      formData.append("team1Score", scores.team1Score.toString());
      formData.append("team2Score", scores.team2Score.toString());
      formData.append("matchId", selectedMatch.matchId.toString());

      setScore1(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["matches"] });
          setModalState((prev) => ({ ...prev, isModalVisible: false, selectedMatch: null }));
          setScores({ team1Score: null, team2Score: null });
        },
      });
    }
  };

  const handleScheduleSubmit = () => {
    const { selectedMatch } = modalState;
    if (selectedMatch && schedule) {
      const formData = new FormData();
      formData.append("matchId", selectedMatch.matchId.toString());
      formData.append("schedule", new Date(schedule).toISOString());

      setMatchingSchedule(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["matches"] });
          setModalState((prev) => ({ ...prev, isScheduleModalVisible: false, selectedMatch: null }));
          setSchedule(null);
        },
      });
    }
  };

  const finalMatch = matches?.find((match) => match.isFinal && match.status === "completed");
  const championTeam = finalMatch ? findTeamById(finalMatch.winner_team_id) : null;
  const finalMatchBrackets = matches?.find((match) => match.bracketType !== 'losers' && match.bracketType !== 'winners');
  return {
    modalState,
    scores,
    schedule,
    isLoading,
    championTeam,
    winnersRounds,
    losersRounds,
    finalMatchBrackets,
    setScores,
    setSchedule,
    setModalState,
    findTeamById,
    handleMatchClick,
    handleScheduleClick,
    handleScoreSubmit,
    handleScheduleSubmit,
  };
}
