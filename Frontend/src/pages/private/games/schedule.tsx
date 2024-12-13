/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Pagination,
  Select,
  Spin,
  Table,
  Tag,
  Typography,
  Tooltip,
  DatePicker,
} from "antd";
import { ScheduleOutlined, EditOutlined } from "@ant-design/icons";
import ScheduleModal from "../../../components/form/SetSchedule";
import useGameSchedule from "./useGameScheduling";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";

const { Option } = Select;
const { Title, Text } = Typography;

export const GameSchedule = () => {
  const {
    Match,
    isFetchingMatch,
    paginatedMatches,
    venue,
    schedule,
    isScheduleModalVisible,
    selectedMatch,
    currentPage,
    filteredMatches,
    matchesPerPage,
    roundFilter,
    statusFilter,
    dateFilter,
    eventFilter,
    sportFilter, // Added states for event and sport filters
    setScheduleModalVisible,
    handleScheduleSubmit,
    setStatusFilter,
    setRoundFilter,
    setDateFilter,
    setEventFilter, // Setter for event filter
    setSportFilter, // Setter for sport filter
    openScheduleModal,
    handlePageChange,
    setSchedule,
    setVenue,
  } = useGameSchedule();

  const getStatusTag = (status: string) => {
    switch (status) {
      case "pending":
        return <Tag className="min-w-20 text-center" color="yellow">Pending</Tag>;
      case "ongoing":
        return <Tag className="min-w-20 text-center" color="orange">Ongoing</Tag>;
      case "completed":
        return <Tag className="min-w-20 text-center" color="green">Completed</Tag>;
      default:
        return <Tag className="min-w-20 text-center" color="yellow">Pending</Tag>;
    }
  };

  const columns = [
    {
      title: "Match",
      dataIndex: "matchId",
      key: "matchId",
      render: (_text: any, record: any) => (
        <Text strong>
          Round {record.round} - Match {record.matchId}
        </Text>
      ),
    },
    {
      title: "Teams",
      key: "teams",
      render: (_text: any, record: any) => (
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center flex flex-col items-center col-span-2">
            <Tooltip title={record.team1?.teamName}>
              <img
                src={record.team1?.teamLogo || "https://via.placeholder.com/60"}
                alt={record.team1?.teamName}
                className="w-12 h-12 rounded-full shadow-md"
              />
            </Tooltip>
            <Text className="block mt-1">{record.team1?.teamName || "Team 1"}</Text>
          </div>
          <Text strong className="text-lg col-span-1 text-center">
            VS
          </Text>
          <div className="text-center flex flex-col items-center col-span-2">
            <Tooltip title={record.team2?.teamName}>
              <img
                src={record.team2?.teamLogo || "https://via.placeholder.com/60"}
                alt={record.team2?.teamName}
                className="w-12 h-12 rounded-full shadow-md"
              />
            </Tooltip>
            <Text className="block mt-1">{record.team2?.teamName || "Team 2"}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Scheduled",
      dataIndex: "schedule",
      key: "schedule",
      render: (schedule: string) => (
        <Text>
          <ScheduleOutlined /> {new Date(schedule).toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
      render: (venue: string) => (
        <Text className="flex items-center flex-nowrap gap-2">
          <CiLocationOn /> {venue || "Not Set"}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: any, record: any) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => openScheduleModal(record)}
          disabled={record.status === "completed" || record.status === "ongoing"}
          className="rounded-full"
        >
          Schedule & Venue
        </Button>
      ),
    },
  ];

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

  if (isFetchingMatch) {
    return <Spin size="large" />;
  }

  return (
    <div className="p-5">
      <Title level={2} className="mb-4 text-center">
        Game Schedule
      </Title>

      {/* Filters */}
      <div className="flex gap-4 mb-4 justify-center">
        {/* Status Filter */}
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 200 }}
          placeholder="Filter by Status"
          className="rounded-full"
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
          className="rounded-full"
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
          className="rounded-full"
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
          className="rounded-full"
        >
          <Option value="all">All Sports</Option>
          {uniqueSports.map((sportName) => (
            <Option key={sportName} value={sportName}>
              {sportName}
            </Option>
          ))}
        </Select>

        {/* Date Filter */}
        <DatePicker
          value={dateFilter ? moment(dateFilter) : null}
          onChange={(date) => setDateFilter(date ? date.toISOString() : null)}
          format="YYYY-MM-DD"
          placeholder="Filter by Date"
          size="middle"
        />
      </div>

      {/* Matches Table */}
      <Table
        columns={columns}
        dataSource={paginatedMatches}
        pagination={false}
        rowKey={(record: any) => record.matchId}
        bordered
        className="shadow-lg rounded-lg overflow-hidden"
      />

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={matchesPerPage}
          total={filteredMatches?.length || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="rounded-full"
        />
      </div>

      {/* Schedule Modal */}
      {selectedMatch && (
        <ScheduleModal
          isModalVisible={isScheduleModalVisible}
          schedule={schedule}
          setSchedule={setSchedule}
          venue={venue}
          setVenue={setVenue}
          handleScheduleSubmit={handleScheduleSubmit}
          onCancel={() => setScheduleModalVisible(false)}
        />
      )}
    </div>
  );
};
