/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFetchData } from "../../../config/axios/requestData";
import GamesServices from "../../../config/service/games";
import { useQueryClient } from "@tanstack/react-query";
import useEventsRequest from "../../../config/data/events";

export default function useGameSchedule() {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(6);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roundFilter, setRoundFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<string | null>(null); 
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [schedule, setSchedule] = useState<string | null>(null);
  const [venue, setVenue] = useState<string>("");

  const { data: Match } = useFetchData(["Game"], [GamesServices.gameSchedule]);
  const { setMatchingSchedule } = useEventsRequest({
    setIsModalVisible: () => setIsModalVisible(false),
  });

  const filteredMatches = Match?.filter((match: any) => {
    const statusMatches = statusFilter === "all" || match.status === statusFilter;
    const roundMatches = roundFilter === "all" || match.round.toString() === roundFilter;
    const dateMatches = !dateFilter || new Date(match.schedule).toDateString() === new Date(dateFilter).toDateString();
    return statusMatches && roundMatches && dateMatches;
  }).sort((a: any, b: any) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());

  const paginatedMatches = filteredMatches?.slice(
    (currentPage - 1) * matchesPerPage,
    currentPage * matchesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openScheduleModal = (match: any) => {
    setSelectedMatch(match);
    setSchedule(match.schedule || null);
    setVenue(match.venue || "");
    setScheduleModalVisible(true);
  };

  const handleScheduleSubmit = () => {
    if (selectedMatch && schedule) {
      const formData = new FormData();
      formData.append("matchId", selectedMatch.matchId.toString());
      formData.append("schedule", new Date(schedule).toISOString());
      formData.append("venue", venue);

      setMatchingSchedule(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["Game"] });
          setScheduleModalVisible(false);
          setSchedule(null);
        },
      });
    }
  };

  return {
    Match,
    isFetchingMatch: !Match,
    paginatedMatches,
    venue,
    schedule,
    isScheduleModalVisible,
    selectedMatch,
    isModalVisible,
    roundFilter,
    statusFilter,
    dateFilter, // Return date filter
    currentPage,
    filteredMatches,
    matchesPerPage,
    handleScheduleSubmit,
    setStatusFilter,
    setRoundFilter,
    setDateFilter, // Return setter for date filter
    openScheduleModal,
    handlePageChange,
    setScheduleModalVisible,
    setSchedule,
    setVenue,
  };
}
