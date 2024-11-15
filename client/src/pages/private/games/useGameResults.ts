/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFetchData } from "../../../config/axios/requestData";
import GamesServices from "../../../config/service/games";

export default function useGameResults() {
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(6);
  const [roundFilter, setRoundFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  const { data: Match, isLoading: isFetchingMatch } = useFetchData(["Game"], [GamesServices.gameSchedule]);

  const filteredMatches = Match?.filter((match: any) => {
    const statusMatches = match.status === "completed"
    const roundMatches = roundFilter === "all" || match.round.toString() === roundFilter;
    const dateMatches = !dateFilter || new Date(match.schedule).toDateString() === new Date(dateFilter).toDateString();
    return statusMatches && roundMatches && dateMatches;
  }).sort((a: any, b: any) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());
  console.log(filteredMatches)
  const paginatedMatches = filteredMatches?.slice(
    (currentPage - 1) * matchesPerPage,
    currentPage * matchesPerPage
  );    

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    Match,
    isFetchingMatch,
    paginatedMatches,
    roundFilter,
    dateFilter,
    currentPage,
    filteredMatches,
    matchesPerPage,
    setRoundFilter,
    setDateFilter,
    handlePageChange,
  };
}
