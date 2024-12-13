/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useFetchData } from "../../../config/axios/requestData";
import useGameRequest from "../../../config/data/games";
import { useNavigate } from "react-router-dom";
import GamesServices from "../../../config/service/games";
import { useQueryClient } from "@tanstack/react-query";
import useEventsRequest from "../../../config/data/events";
import { notification } from "antd";

export default function useGameScorig({ matchId }: { matchId?: any }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [status, setStatus] = useState("scheduled");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: Match } = useFetchData(["Game"], [GamesServices.gameSchedule]);
  const { data: [MatchInfo] = [] } = useFetchData(["game-id"], [() => GamesServices.gameMatchId(matchId)]);
  const { setScore, setScore1,setScore2 } = useEventsRequest({
    setIsModalVisible: () => setIsModalVisible(false),
  });
  const { incrementScoring, changingStatus } = useGameRequest({ setIsModalVisible: () => {} });

  useEffect(() => {
    if (MatchInfo) {
      setTeam1Score(MatchInfo.team1Score || 0);
      setTeam2Score(MatchInfo.team2Score || 0);
      setStatus(MatchInfo.status || "scheduled");
    }
  }, [MatchInfo]);

  const handleIncrementScore = (points: number, teamId: any) => {
    const formData = new FormData();
    formData.append("matchId", matchId);
    formData.append("teamId", teamId);
    formData.append("increment", points.toString());

    incrementScoring(formData, {
      onSuccess: () => queryClient.invalidateQueries({queryKey:["game-id"]}),
    });
  };

  const handleStatusChange = (value: string) => {
    if (value === "completed") {
      setIsModalVisible(true);
    } else {
      const formData = new FormData();
      formData.append("matchId", matchId);
      formData.append("status", value);

      changingStatus(formData, {
        onSuccess: () => queryClient.invalidateQueries({queryKey:["game-id"]}),
      });
      setStatus(value);
    }
  };

  const updateMatch = () => {
    if (matchId && team1Score !== null && team2Score !== null) {
        const formData = new FormData();
        formData.append("team1Score", team1Score.toString());
        formData.append("team2Score", team2Score.toString());
        formData.append("matchId",matchId.toString());
        if(!MatchInfo?.sportEvent?.bracketType){
          notification.error({
            message:'No bracketType detected'
          })
          return
        }
        const api = MatchInfo?.sportEvent?.bracketType === 'Single Elimination' ? setScore : MatchInfo?.sportEvent?.bracketType === 'Double Elimination' ? setScore1 : setScore2
        api(formData, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["game-id"] });
          },
        });
      }
  }
  console.log('match',MatchInfo)
  console.log('match1',MatchInfo?.sportEvent?.bracketType)
  return {
    Match,
    isFetchingMatch: !Match,
    MatchInfo,
    team1Score,
    team2Score,
    status,
    isModalVisible,
    navigate,
    setStatus,
    updateMatch,
    setIsModalVisible,
    setTeam1Score,
    setTeam2Score,
    handleStatusChange,
    handleIncrementScore,
  };
}
