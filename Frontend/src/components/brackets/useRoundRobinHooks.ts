import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useEventsRequest from "../../config/data/events";
import { Match, Team, RoundRobinHooksProps } from "../../types";

export default function useRoundRobinHooks({ teams }: RoundRobinHooksProps) {
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState({
    isModalVisible: false,
    isScheduleModalVisible: false,
    selectedMatch: null as Match | null,
  });
  const [scores, setScores] = useState({ team1Score: null as number | null, team2Score: null as number | null });
  const [schedule, setSchedule] = useState<string | null>(null);

  const { isLoading, setScore2, setMatchingSchedule } = useEventsRequest({
    setIsModalVisible: (visible) => setModalState((prev) => ({ ...prev, isModalVisible: visible })),
  });


  const findTeamById = (id: number | null): Team | null => {
    if (id === null || !teams) return null;
    return teams?.find((team) => team.teamId === id) || null;
  };

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

      setScore2(formData, {
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
      formData.append("schedule",  new Date(schedule).toISOString());

      setMatchingSchedule(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["matches"] });
          setModalState((prev) => ({ ...prev, isScheduleModalVisible: false, selectedMatch: null }));
          setSchedule(null);
        },
      });
    }
  };

  return {
    modalState,
    scores,
    schedule,
    isLoading,
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