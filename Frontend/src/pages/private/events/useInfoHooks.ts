/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, message, notification } from "antd";
import { useEffect, useState } from "react";
import { Sports } from "../../../types";
import EventsServices from "../../../config/service/events";
import SportsServices from "../../../config/service/sports";
import TeamsServices from "../../../config/service/teams";
import useEventsRequest from "../../../config/data/events";
import { useFetchData } from "../../../config/axios/requestData";
import { useQueryClient } from "@tanstack/react-query";

interface UseInfoHooksParams {
  eventId: string | undefined;
}

export default function useInfoHooks({ eventId }: UseInfoHooksParams) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sportsOptions, setSportsOptions] = useState<Sports[]>([]);
  const [teamsOptions, setTeamsOptions] = useState<
    {
      teamCoach: any;
      label: string;
      value: string;
      teamId: any;
    }[]
  >([]);
  const { data: [events, sports, teams] = [], isLoading: isFetching } =
    useFetchData(
      ["events", "sports", "teams"],
      [
        () => EventsServices.eventInfo(eventId),
        () => SportsServices.fetchSports(),
        () => TeamsServices.fetchTeams(),
      ]
    );

  const { addSportEventsMutation, isLoading: isAdding } = useEventsRequest({
    setIsModalVisible,
  });

  useEffect(() => {
    if (sports && teams) {
      const formattedSports = sports?.map((sport: Sports) => ({
        label: sport.sportsName,
        value: sport.sportsId,
      }));
      setSportsOptions(formattedSports);

      const formattedTeams = teams?.map((team: any) => ({
        label: team.teamName,
        value: team.teamId,
        teamCoach: team.coachId,
        teamId: team.teamId,
      }));
      setTeamsOptions(formattedTeams);
    }
  }, [sports, teams]);

  const handleAddSports = async (values: any) => {
    try {
      const selectedTeams = values.teams
        ?.map((teamId: any) => {
          const teamData = teamsOptions.find((team) => team.value === teamId);
          return teamData
            ? {
                teamName: teamData.label,
                teamCoach: teamData.teamCoach,
                teamId: teamData.teamId,
              }
            : null;
        })
        .filter(Boolean);

        if (selectedTeams.length < 2 && 
          (values.bracketType === "Single Elimination" || values.bracketType === "Double Elimination")) {
        notification.error({
          message: "You must select at least 2 teams for Single or Double Elimination format.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("eventsId", eventId || "");
      formData.append("bracketType", values.bracketType);
      formData.append("maxPlayers", values.maxPlayers);
      formData.append("sportsId", JSON.stringify(values.selectedSports));
      formData.append("teams", JSON.stringify(selectedTeams));
      addSportEventsMutation(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["events"] });
          form.resetFields();
          setIsModalVisible(false);
        },
      });
    } catch (error) {
      console.error("Failed to add sports or teams:", error);
      message.error(
        "An error occurred while adding sports or teams. Please try again."
      );
    }
  };

  return {
    teams: teamsOptions,
    handleAddSports,
    setIsModalVisible,
    form,
    info: events,
    loading: isFetching || isAdding,
    isModalVisible,
    sportsOptions,
  };
}
