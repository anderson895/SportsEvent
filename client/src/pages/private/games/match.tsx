import { useParams } from "react-router-dom";
import { Button, Select, Typography, Modal } from "antd";
import { ClockCircleOutlined, TrophyOutlined, FireOutlined, CrownOutlined } from "@ant-design/icons";
import useGameScorig from "./useGameScoring";

const { Option } = Select;
const { Title, Text } = Typography;

export const MatchScoring = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const {
    MatchInfo,
    team1Score,
    team2Score,
    status,
    isModalVisible,
    setStatus,
    setIsModalVisible,
    handleStatusChange,
    setTeam1Score,
    setTeam2Score,
    updateMatch,
    handleIncrementScore,
  } = useGameScorig({ matchId });

  const handleScoreChange = async (
    team: "team1" | "team2",
    points: number
  ) => {
    if (status === "ongoing") {
      if (team === "team1") {
        handleIncrementScore(points, MatchInfo.team1.teamId);
        setTeam1Score((prev) => Math.max(prev + points, 0)); // Prevent negative scores
      }
      if (team === "team2") {
        handleIncrementScore(points, MatchInfo.team2.teamId);
        setTeam2Score((prev) => Math.max(prev + points, 0)); // Prevent negative scores
      }
    }
  };

  // Determine winner and loser
  const isCompleted = status === "completed";
  const winner = team1Score > team2Score ? MatchInfo?.team1 : MatchInfo?.team2;
  const loser = team1Score > team2Score ? MatchInfo?.team2 : MatchInfo?.team1;
  const isDraw = team1Score === team2Score;

  return (
    <div className="p-5 min-h-screen flex items-start justify-center container mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full relative bg-gradient-to-r from-indigo-100 to-blue-100">
        {status === "ongoing" && (
          <div className="absolute top-0 right-0 m-4 animate-pulse text-red-500 font-semibold">
            <FireOutlined /> LIVE
          </div>
        )}
        <Title
          level={2}
          className="text-center mb-8 text-blue-600 flex items-center justify-center gap-2"
        >
          <TrophyOutlined /> Match {matchId} Scoring
        </Title>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 text-center">
          <Text strong className="text-lg">Teams:</Text>
          <div className="flex items-center justify-center gap-4 mt-4">
            <img
              src={MatchInfo?.team1?.teamLogo || "https://via.placeholder.com/50"}
              alt={MatchInfo?.team1?.teamName}
              className="w-16 h-16 rounded-full shadow-md"
            />
            <p className="text-lg font-semibold text-gray-700">
              {MatchInfo?.team1?.teamName}{" "}
              <span className="text-gray-400">vs</span>{" "}
              {MatchInfo?.team2?.teamName}
            </p>
            <img
              src={MatchInfo?.team2?.teamLogo || "https://via.placeholder.com/50"}
              alt={MatchInfo?.team2?.teamName}
              className="w-16 h-16 rounded-full shadow-md"
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
            <ClockCircleOutlined />
            <p>{new Date(MatchInfo?.schedule || "").toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center bg-blue-50 p-4 rounded-lg shadow-lg">
            <Text strong>Team 1 Score</Text>
            <p className="text-3xl font-bold text-blue-600">{team1Score}</p>
            {status === "ongoing" && (
              <div className="flex gap-2 justify-center mt-2">
                <Button
                  onClick={() => handleScoreChange("team1", 1)}
                  className="bg-blue-600 text-white rounded-md"
                >
                  +1
                </Button>
                <Button
                  onClick={() => handleScoreChange("team1", 2)}
                  className="bg-blue-600 text-white rounded-md"
                >
                  +2
                </Button>
                <Button
                  onClick={() => handleScoreChange("team1", 3)}
                  className="bg-blue-600 text-white rounded-md"
                >
                  +3
                </Button>
                <Button
                  onClick={() => handleScoreChange("team1", -1)}
                  className="bg-gray-600 text-white rounded-md"
                >
                  -1
                </Button>
              </div>
            )}
          </div>

          <div className="text-center bg-green-50 p-4 rounded-lg shadow-lg">
            <Text strong>Team 2 Score</Text>
            <p className="text-3xl font-bold text-green-600">{team2Score}</p>
            {status === "ongoing" && (
              <div className="flex gap-2 justify-center mt-2">
                <Button
                  onClick={() => handleScoreChange("team2", 1)}
                  className="bg-green-600 text-white rounded-md"
                >
                  +1
                </Button>
                <Button
                  onClick={() => handleScoreChange("team2", 2)}
                  className="bg-green-600 text-white rounded-md"
                >
                  +2
                </Button>
                <Button
                  onClick={() => handleScoreChange("team2", 3)}
                  className="bg-green-600 text-white rounded-md"
                >
                  +3
                </Button>
                <Button
                  onClick={() => handleScoreChange("team2", -1)}
                  className="bg-gray-600 text-white rounded-md"
                >
                  -1
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Display winner/loser if match is completed */}
        {isCompleted && !isDraw && (
          <div className="text-center bg-yellow-50 p-4 rounded-lg shadow-md mb-6">
            <CrownOutlined className="text-yellow-600 text-2xl" />
            <Text strong className="text-lg text-yellow-600">
              Match Completed
            </Text>
            <p className="mt-2">
              <span className="font-bold">{winner?.teamName}</span> wins over{" "}
              <span className="font-semibold">{loser?.teamName}</span>!
            </p>
          </div>
        )}

        {isCompleted && isDraw && (
          <div className="text-center bg-yellow-50 p-4 rounded-lg shadow-md mb-6">
            <CrownOutlined className="text-yellow-600 text-2xl" />
            <Text strong className="text-lg text-yellow-600">
              Match Completed
            </Text>
            <p className="mt-2">
              It's a draw between{" "}
              <span className="font-bold">{MatchInfo?.team1?.teamName}</span>{" "}
              and{" "}
              <span className="font-bold">{MatchInfo?.team2?.teamName}</span>!
            </p>
          </div>
        )}

        <div className="mb-6">
          <Text strong>Status:</Text>
          <Select
            value={status}
            onChange={handleStatusChange}
            style={{ width: "100%", marginTop: 4 }}
            className="rounded-md"
          >
            <Option value="scheduled">Scheduled</Option>
            <Option value="ongoing">Ongoing</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>

        <Button
          type="primary"
          block
          onClick={() => setIsModalVisible(true)}
          disabled={isCompleted}
          className="bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Save Changes
        </Button>

        <Modal
          title="Confirm Completion"
          open={isModalVisible}
          onOk={() => {
            setStatus("completed");
            updateMatch();
          }}
          centered
          onCancel={() => setIsModalVisible(false)}
          okText="Complete Match"
          cancelText="Cancel"
        >
          <div className="text-center">
            <Text type="secondary" className="block mb-3">
              Are you sure you want to complete Match {matchId}? This action
              will stop further scoring.
            </Text>
            <Text
              strong
              className="block text-lg mt-4 mb-2"
              style={{ color: "#595959" }}
            >
              Final Score
            </Text>
            <div className="grid grid-cols-5 gap-2 my-4 text-lg font-semibold place-items-center">
              <div className="col-span-2 flex flex-col items-center">
                <img
                  src={winner?.teamLogo || "https://via.placeholder.com/30"}
                  alt={winner?.teamName}
                  className="w-8 h-8 rounded-full"
                />
                <span>{winner?.teamName}</span>
              </div>
              <Text
                type="danger"
                className="mx-2 col-span-1 text-lg whitespace-nowrap"
              >
                {team1Score} - {team2Score}
              </Text>
              <div className="col-span-2 flex flex-col items-center">
                <img
                  src={loser?.teamLogo || "https://via.placeholder.com/30"}
                  alt={loser?.teamName}
                  className="w-8 h-8 rounded-full"
                />
                <span>{loser?.teamName}</span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MatchScoring;
