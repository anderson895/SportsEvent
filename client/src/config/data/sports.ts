/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import SportsServices from "../service/sports";

interface UseSportsRequestProps {
  setIsModalVisible: (visible: boolean) => void;
}

export default function useSportsRequest({ setIsModalVisible }: UseSportsRequestProps) {
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

  const { mutate: addSportMutation, isPending: isAddingSport } = useRequestData(
    (formData: FormData) => SportsServices.addSports(formData),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully added new Sport"), onError: handleError }
  );

  const { mutate: editSportMutation, isPending: isEditingSport } = useRequestData(
    (formData: FormData) => SportsServices.editSports(formData),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully updated Sport info"), onError: handleError }
  );

  const { mutate: deleteSportMutation, isPending: isDeletingSport } = useRequestData(
    (SportId: any) => SportsServices.deleteSports(SportId),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully deleted Sport"), onError: handleError }
  );

  const isLoading = isAddingSport || isEditingSport || isDeletingSport;

  return { isLoading, addSportMutation, editSportMutation, deleteSportMutation };
}
