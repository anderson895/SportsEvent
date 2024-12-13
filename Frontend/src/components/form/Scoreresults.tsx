import { Modal, InputNumber, Divider } from 'antd';
import React from 'react';
import { Match, Team } from '../../types';

interface EnterScoresModalProps {
  isModalVisible: boolean;
  isLoading:boolean;
  selectedMatch: Match | null;
  findTeamById: (id: number | null) => Team | null;
  team1Score: number | null;
  team2Score: number | null;
  setTeam1Score: (score: number | null) => void;
  setTeam2Score: (score: number | null) => void;
  handleScoreSubmit: () => void;
  onCancel: () => void;
}

const EnterScoresModal: React.FC<EnterScoresModalProps> = ({
  isModalVisible,
  selectedMatch,
  findTeamById,
  team1Score,
  team2Score,
  isLoading,
  setTeam1Score,
  setTeam2Score,
  handleScoreSubmit,
  onCancel,
}) => {
  return (
  <Modal
    title="Enter Match Scores"
    open={isModalVisible}
    onCancel={onCancel}
    onOk={handleScoreSubmit}
    okText="Submit"
    loading={isLoading}
    centered
    width={400}
  >
    {selectedMatch && (
      <div className="space-y-4">
        <p className="text-center text-gray-600">Enter scores for each team to determine the winner.</p>

        <div className="flex items-center justify-between border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-4">
            {findTeamById(selectedMatch.team1Id)?.teamLogo ? (
              <img
                src={findTeamById(selectedMatch.team1Id)?.teamLogo}
                alt={findTeamById(selectedMatch.team1Id)?.teamName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300" />
            )}
            <div>
              <p className="font-semibold">{findTeamById(selectedMatch.team1Id)?.teamName || 'TBD'}</p>
              <InputNumber
                min={0}
                value={team1Score}
                onChange={(value) => setTeam1Score(value)}
                placeholder="Score"
                className="mt-1 w-full"
              />
            </div>
          </div>
        </div>

        <Divider>VS</Divider>

        <div className="flex items-center justify-between border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-4">
            {findTeamById(selectedMatch.team2Id)?.teamLogo ? (
              <img
                src={findTeamById(selectedMatch.team2Id)?.teamLogo}
                alt={findTeamById(selectedMatch.team2Id)?.teamName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300" />
            )}
            <div>
              <p className="font-semibold">{findTeamById(selectedMatch.team2Id)?.teamName || 'TBD'}</p>
              <InputNumber
                min={0}
                value={team2Score}
                onChange={(value) => setTeam2Score(value)}
                placeholder="Score"
                className="mt-1 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </Modal>
)};

export default EnterScoresModal;
