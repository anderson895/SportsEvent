import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Pagination, Select, Spin } from "antd";
import useGameScorig from "./useGameScoring";

const { Option } = Select;

export const GameScoring = () => {
  const { Match, isFetchingMatch } = useGameScorig({});
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(6);

  const getInitialFilter = (key: string, defaultValue: string) => {
    return localStorage.getItem(key) || defaultValue;
  };

  const [statusFilter, setStatusFilter] = useState(getInitialFilter("statusFilter", "all"));
  const [roundFilter, setRoundFilter] = useState(getInitialFilter("roundFilter", "all"));
  const [eventFilter, setEventFilter] = useState(getInitialFilter("eventFilter", "all"));
  const [sportFilter, setSportFilter] = useState(getInitialFilter("sportFilter", "all"));

  useEffect(() => {
    localStorage.setItem("statusFilter", statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    localStorage.setItem("roundFilter", roundFilter);
  }, [roundFilter]);

  useEffect(() => {
    localStorage.setItem("eventFilter", eventFilter);
  }, [eventFilter]);

  useEffect(() => {
    localStorage.setItem("sportFilter", sportFilter);
  }, [sportFilter]);

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

  const filteredMatches = Match?.filter((match: any) => {
    const hasSched = match.schedule !== "" && match.schedule !== null;
    const statusMatches = statusFilter === "all" || match.status === statusFilter;
    const roundMatches = roundFilter === "all" || match.round.toString() === roundFilter;
    const eventMatches = eventFilter === "all" || match.event.eventName === eventFilter;
    const sportMatches = sportFilter === "all" || match.sport.sportsName === sportFilter;

    return statusMatches && roundMatches && eventMatches && sportMatches && hasSched;
  });

  const uniqueEvents = [
    ...new Map(Match?.map((match: any) => [match.event.eventId, match.event.eventName])).values(),
  ];
  const uniqueSports = [
    ...new Map(Match?.map((match: any) => [match.sport.sportsId, match.sport.sportsName])).values(),
  ];

  const handlePageChange = (page: number) => setCurrentPage(page);

  const getWinner = (team1Score: number, team2Score: number, team1: any, team2: any, status: string) => {
    if (team1Score > team2Score) return team1?.teamName || "Team 1";
    if (team2Score > team1Score) return team2?.teamName || "Team 2";
    if (team1Score === team2Score) {
      return status === "completed" ? "Draw" : "Not Declared";
    }
    return "Not Declared";
  };

  if (isFetchingMatch) {
    return <Spin size="large" />;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Game Scoring</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
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
        {filteredMatches?.map((match: any) => {
          const team1 = match.team1;
          const team2 = match.team2;
          const team1Score = match.team1Score || 0;
          const team2Score = match.team2Score || 0;
          const winner = getWinner(team1Score, team2Score, team1, team2, match.status);
          const eventAndSport = `${match.event?.eventName || "Unknown Event"} - ${match.sport?.sportsName || "Unknown Sport"}`;
          const statusBackground = getStatusBackground(match.status);

          return (
            <div
              key={match.matchId}
              className={`p-4 rounded-lg grid h-max grid-rows-6 shadow-md ${statusBackground}`}
            >
              <h2 className="text-lg row-span-1 font-semibold text-center mb-4">
                {eventAndSport}
              </h2>
              <h2 className="text-lg row-span-1 font-semibold text-center mb-4">
                Round {match.round} - Match {match.matchId}
              </h2>
              <div className="text-center row-span-1 mb-4">
                <p className="text-xl font-bold">
                  <strong>Winner:</strong> {winner}
                </p>
              </div>
              <div className="flex row-span-3 justify-center items-center mb-4">
                <div className="flex flex-col items-center mx-4">
                  <img
                    src={team1?.teamLogo || "https://via.placeholder.com/60"}
                    alt={team1?.teamName}
                    className="w-16 h-16 rounded-full shadow-md"
                  />
                  <p className="font-semibold text-center mt-2">{team1?.teamName || "Team 1"}</p>
                  <p className="text-center font-bold">Score: {team1Score}</p>
                </div>
                <p className="text-xl font-bold mx-2">VS</p>
                <div className="flex flex-col items-center mx-4">
                  <img
                    src={team2?.teamLogo || "https://via.placeholder.com/60"}
                    alt={team2?.teamName}
                    className="w-16 h-16 rounded-full shadow-md"
                  />
                  <p className="font-semibold text-center mt-2">{team2?.teamName || "Team 2"}</p>
                  <p className="text-center font-bold">Score: {team2Score}</p>
                </div>
              </div>
              <div className="row-span-1 text-center mb-4">
                <p><strong>Status:</strong> {match.status || "Pending"}</p>
                <p><strong>Scheduled:</strong> {new Date(match.schedule).toLocaleString()}</p>
              </div>
              <Link className="row-span-1" to={`match/${match.matchId}`}>
                <Button type="primary" block>Update Match</Button>
              </Link>
            </div>
          );
        })}
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
