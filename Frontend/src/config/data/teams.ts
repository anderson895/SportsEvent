/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import TeamsServices from "../service/teams";

interface UseTeamsRequestProps {
  setIsModalVisible?: (visible: boolean) => void;
}

export default function useTeamsRequest({
  setIsModalVisible,
}: UseTeamsRequestProps) {
  const notify = (
    type: "success" | "error",
    message: string,
    description?: string
  ) => {
    notification[type]({ message, description });
  };

  const handleSuccess = (message: string) => {
    setIsModalVisible?.(false);
    notify("success", message);
  };

  const handleError = (error: any) => {
    console.error(error);
    notify(
      "error",
      "Action failed",
      error.message || "An unexpected error occurred."
    );
  };

  const onSuccessHandler = (response: any, successMessage: string) => {
    response.data.success === 0
      ? handleError(response.data)
      : handleSuccess(successMessage);
  };

  const createMutation = (
    serviceMethod: (data: any) => Promise<any>,
    successMessage: string
  ) => {
    return useRequestData(serviceMethod, {
      onSuccess: (response) => onSuccessHandler(response, successMessage),
      onError: handleError,
    });
  };

  const { mutate: addTeamMutation, isPending: isAddingTeam } = createMutation(
    TeamsServices.addTeams,
    "Successfully added new team"
  );

  const { mutate: editTeamMutation, isPending: isEditingTeam } = createMutation(
    TeamsServices.editTeams,
    "Successfully updated team info"
  );

  const { mutate: deleteTeamMutation, isPending: isDeletingTeam } =
    createMutation(TeamsServices.deleteTeams, "Successfully deleted team");
  const { mutate: deletePlayerMutation, isPending: isDeletingPlayer } =
    createMutation(TeamsServices.deletePlayer, "Successfully deleted player");
  const { mutate: addPlayerMutation, isPending: isAddingPlayer } =
    createMutation(TeamsServices.addPlayer, "Successfully Added Player");

  const isLoading = [
    isAddingTeam,
    isEditingTeam,
    isDeletingTeam,
    isAddingPlayer,
    isDeletingPlayer,
  ].some(Boolean);

  return {
    isLoading,
    addTeamMutation,
    editTeamMutation,
    deleteTeamMutation,
    addPlayerMutation,
    deletePlayerMutation,
  };
}
