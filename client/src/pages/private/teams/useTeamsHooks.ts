/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, notification } from "antd";
import { useFetchData } from "../../../config/axios/requestData";
import TeamsServices from "../../../config/service/teams";
import { useState } from "react";
import { Team } from "../../../types";
import useTeamsRequest from "../../../config/data/teams";
import { useQueryClient } from "@tanstack/react-query";

export default function useTeamsHooks() {
  const queryClient = useQueryClient(); // Initialize the QueryClient for refetching
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [form] = Form.useForm();
  const { isLoading, addTeamMutation, editTeamMutation, deleteTeamMutation } =
    useTeamsRequest({
      setIsModalVisible,
    });

  const { data: teams, isPending: isFetchingTeams } = useFetchData(
    ["teams"],
    [() => TeamsServices.fetchTeams()]
  );

  const handleAddOrEditTeam = (values: Team) => {
    const formData = new FormData();
    if (!isImageUpdated && editingTeam?.teamLogo) {
      values.teamLogo = editingTeam.teamLogo;
    } else {
        console.log(values.teamLogo)
      values.teamLogo = values.teamLogo.fileList?.map(
        (file: { originFileObj: any }) => file.originFileObj
      )[0];
    }
    if(!values.teamLogo){
        notification.error({
            message:"No Logo provided"
        })
        return
    }
    formData.append("teamCoach", values.teamCoach);
    formData.append("teamLogo", values.teamLogo);
    formData.append("teamName", values.teamName);
    if(editingTeam){
        formData.append("teamId", editingTeam.teamId.toString());
    }
    const mutation = editingTeam ? editTeamMutation : addTeamMutation;
    mutation(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teams"] })
        setIsImageUpdated(false)
        form.resetFields()
      },
    });
 
  };

  const handleDeleteTeam = (teamsId: any) => {
    deleteTeamMutation(teamsId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
    });
  };

  const showModal = (team: Team | null = null) => {
    setEditingTeam(team);
    if (team) {
      form.setFieldsValue(team);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const loading = isLoading || isFetchingTeams;
  return {
    teams,
    isModalVisible,
    editingTeam,
    form,
    loading,
    setIsImageUpdated,
    handleAddOrEditTeam,
    setIsModalVisible,
    handleDeleteTeam,
    showModal,
  };
}
