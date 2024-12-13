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
  const [eventFilter, setEventFilter] = useState("all"); 
  const [sportFilter, setSportFilter] = useState("all"); 

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
    const dateMatches =
      !dateFilter || new Date(match.schedule).toDateString() === new Date(dateFilter).toDateString();
    const eventMatches =
      eventFilter === "all" || match.event?.eventName === eventFilter; 
    const sportMatches =
      sportFilter === "all" || match.sport?.sportsName === sportFilter; 

    return statusMatches && roundMatches && dateMatches && eventMatches && sportMatches;
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

  const uniqueEvents = [
    ...new Map(
      Match?.map((match: any) => [match.event?.eventId, match.event?.eventName])
    ).values(),
  ];
  const uniqueSports = [
    ...new Map(
      Match?.map((match: any) => [match.sportEvent?.sportsId, match.sport?.sportName])
    ).values(),
  ];

  return {
    Match,
    isFetchingMatch: !Match,
    paginatedMatches,
    filteredMatches,
    uniqueEvents, // Unique events for UI dropdowns
    uniqueSports, // Unique sports for UI dropdowns
    venue,
    schedule,
    isScheduleModalVisible,
    selectedMatch,
    isModalVisible,
    roundFilter,
    statusFilter,
    dateFilter,
    eventFilter, // Return event filter
    sportFilter, // Return sport filter
    currentPage,
    matchesPerPage,
    handleScheduleSubmit,
    setStatusFilter,
    setRoundFilter,
    setDateFilter,
    setEventFilter, // Setter for event filter
    setSportFilter, // Setter for sport filter
    openScheduleModal,
    handlePageChange,
    setScheduleModalVisible,
    setSchedule,
    setVenue,
  };
}
