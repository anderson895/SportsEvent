/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import SportsServices from "../service/sports";

interface UseSportsRequestProps {
  setIsModalVisible: (visible: boolean) => void;
}

export default function useSportsRequest({ setIsModalVisible }: UseSportsRequestProps) {
  const notify = (type: "success" | "error", message: string, description?: string) => {
    notification[type]({ message, description });
  };

  const handleSuccess = (message: string) => {
    setIsModalVisible(false);
    notify("success", message);
  };

  const handleError = (error: any) => {
    console.error(error);
    notify("error", "Action failed", error.message || "An unexpected error occurred.");
  };

  const onSuccessHandler = (response: any, successMessage: string) => {
    response.data.success === 0 ? handleError(response.data) : handleSuccess(successMessage);
  };

  const createMutation = (serviceMethod: (data: any) => Promise<any>, successMessage: string) => {
    return useRequestData(serviceMethod, {
      onSuccess: (response) => onSuccessHandler(response, successMessage),
      onError: handleError,
    });
  };

  const { mutate: addSportMutation, isPending: isAddingSport } = createMutation(
    SportsServices.addSports,
    "Successfully added new Sport"
  );

  const { mutate: editSportMutation, isPending: isEditingSport } = createMutation(
    SportsServices.editSports,
    "Successfully updated Sport info"
  );

  const { mutate: deleteSportMutation, isPending: isDeletingSport } = createMutation(
    SportsServices.deleteSports,
    "Successfully deleted Sport"
  );

  const isLoading = [isAddingSport, isEditingSport, isDeletingSport].some(Boolean);

  return {
    isLoading,
    addSportMutation,
    editSportMutation,
    deleteSportMutation,
  };
}
