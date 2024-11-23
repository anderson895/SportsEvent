/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Pagination, Select, Spin } from "antd";
import useGameScorig from "./useGameScoring";

const { Option } = Select;

export const GameScoring = () => {
  const { Match, isFetchingMatch } = useGameScorig({});
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(6);

  // State for filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [roundFilter, setRoundFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [sportFilter, setSportFilter] = useState("all");

  // Helper function for status background
  const getStatusBackground = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-yellow-200 to-yellow-400";
      case "ongoing":
        return "bg-gradient-to-r from-orange-300 to-orange-500";
      case "completed":
        return "bg-gradient-to-r from-green-300 to-green-500";
      default:
        return "bg-gradient-to-r from-yellow-200 to-yellow-400";
    }
  };

  // Filter matches based on selected criteria
  const filteredMatches = Match?.filter((match: any) => {
    const hasSched = match.schedule !== "" && match.schedule !== null;
    const statusMatches = statusFilter === "all" || match.status === statusFilter;
    const roundMatches = roundFilter === "all" || match.round.toString() === roundFilter;
    const eventMatches = eventFilter === "all" || match.event.eventName === eventFilter;
    const sportMatches = sportFilter === "all" || match.sport.sportsName === sportFilter;

    return statusMatches && roundMatches && eventMatches && sportMatches && hasSched;
  });

  // Extract unique Event Names and Sport Names
  const uniqueEvents = [
    ...new Map(
      Match?.map((match: any) => [match.event.eventId, match.event.eventName])
    ).values(),
  ];
  const uniqueSports = [
    ...new Map(
      Match?.map((match: any) => [match.sport.sportsId, match.sport.sportsName])
    ).values(),
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isFetchingMatch) {
    return <Spin size="large" />;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Game Schedule</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Status Filter */}
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 200 }}
          placeholder="Filter by Status"
        >
          <Option value="all">All Statuses</Option>
          <Option value="pending">Pending</Option>
          <Option value="ongoing">Ongoing</Option>
          <Option value="completed">Completed</Option>
        </Select>

        {/* Round Filter */}
        <Select
          value={roundFilter}
          onChange={(value) => setRoundFilter(value)}
          style={{ width: 200 }}
          placeholder="Filter by Round"
        >
          <Option value="all">All Rounds</Option>
          {[...new Set(Match?.map((m: any) => m.round))].map((round) => (
            <Option key={round} value={round.toString()}>
              Round {round}
            </Option>
          ))}
        </Select>

        {/* Event Filter */}
        <Select
          value={eventFilter}
          onChange={(value) => setEventFilter(value)}
          style={{ width: 200 }}
          placeholder="Filter by Event"
        >
          <Option value="all">All Events</Option>
          {uniqueEvents.map((eventName) => (
            <Option key={eventName} value={eventName}>
              {eventName}
            </Option>
          ))}
        </Select>

        {/* Sport Filter */}
        <Select
          value={sportFilter}
          onChange={(value) => setSportFilter(value)}
          style={{ width: 200 }}
          placeholder="Filter by Sport"
        >
          <Option value="all">All Sports</Option>
          {uniqueSports.map((sportName) => (
            <Option key={sportName} value={sportName}>
              {sportName}
            </Option>
          ))}
        </Select>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {filteredMatches?.map((match: any) => (
          <div
            key={match.matchId}
            className={`p-4 rounded-lg grid h-max grid-rows-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${getStatusBackground(
              match.status
            )}`}
          >
            <h2 className="text-lg row-span-1 font-semibold text-center mb-4">
              Round {match.round} - Match {match.matchId}
            </h2>
            <div className="flex row-span-3 justify-center items-center mb-4">
              <div className="flex flex-col items-center mx-4">
                <img
                  src={match.team1?.teamLogo || "https://via.placeholder.com/60"}
                  alt={match.team1?.teamName}
                  className="w-16 h-16 rounded-full shadow-md"
                />
                <p className="font-semibold text-center mt-2">
                  {match.team1?.teamName || "Team 1"}
                </p>
              </div>
              <p className="text-xl font-bold mx-2">VS</p>
              <div className="flex flex-col items-center mx-4">
                <img
                  src={match.team2?.teamLogo || "https://via.placeholder.com/60"}
                  alt={match.team2?.teamName}
                  className="w-16 h-16 rounded-full shadow-md"
                />
                <p className="font-semibold text-center mt-2">
                  {match.team2?.teamName || "Team 2"}
                </p>
              </div>
            </div>
            <div className="row-span-1 text-center mb-4">
              <p>
                <strong>Status:</strong> {match.status || "Pending"}
              </p>
              <p>
                <strong>Scheduled:</strong> {new Date(match.schedule).toLocaleString()}
              </p>
            </div>
            <Link className="row-span-1" to={`match/${match.matchId}`}>
              <Button type="primary" block>
                Update Match
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={matchesPerPage}
        total={filteredMatches?.length || 0}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};
