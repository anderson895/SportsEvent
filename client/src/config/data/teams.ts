/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import TeamsServices from "../service/teams";

interface UseTeamsRequestProps {
  setIsModalVisible: (visible: boolean) => void;
}

export default function useTeamsRequest({ setIsModalVisible }: UseTeamsRequestProps) {
  const handleSuccess = (message: string) => {
    setIsModalVisible(false);
    notification.success({ message });
  };

  const handleError = (error: any) => {
    console.log(error);
    notification.error({
      message: "Action failed",
      description: error.message || "An unexpected error occurred.",
    });
  };

  const onSuccessHandler = (response: any, successMessage: string) => {
    response.data.success === 0 ? handleError(response.data) : handleSuccess(successMessage);
  };

  const { mutate: addTeamMutation, isPending: isAddingTeam } = useRequestData(
    (formData: FormData) => TeamsServices.addTeams(formData),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully added new team"), onError: handleError }
  );

  const { mutate: editTeamMutation, isPending: isEditingTeam } = useRequestData(
    (formData: FormData) => TeamsServices.editTeams(formData),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully updated team info"), onError: handleError }
  );

  const { mutate: deleteTeamMutation, isPending: isDeletingTeam } = useRequestData(
    (teamId: any) => TeamsServices.deleteTeams(teamId),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully deleted team"), onError: handleError }
  );

  const isLoading = isAddingTeam || isEditingTeam || isDeletingTeam;

  return { isLoading, addTeamMutation, editTeamMutation, deleteTeamMutation };
}
