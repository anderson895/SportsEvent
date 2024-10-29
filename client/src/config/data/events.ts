/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import EventsServices from "../service/events";

interface UseTeamsRequestProps {
  setIsModalVisible: (visible: boolean) => void;
}

export default function useEventsRequest({ setIsModalVisible }: UseTeamsRequestProps) {
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

  const { mutate: addEventsMutation, isPending: isAddingEvents } = useRequestData(
    (formData: FormData) => EventsServices.addEvents(formData),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully added new Events"), onError: handleError }
  );

  const { mutate: editEventsMutation, isPending: isEditingEvents } = useRequestData(
    (formData: FormData) => EventsServices.editEvents(formData),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully updated Events info"), onError: handleError }
  );

  const { mutate: deleteEventsMutation, isPending: isDeletingEvents } = useRequestData(
    (EventsId: any) => EventsServices.deleteEvents(EventsId),
    { onSuccess: (response) => onSuccessHandler(response, "Successfully deleted Events"), onError: handleError }
  );

  const isLoading = isAddingEvents || isEditingEvents || isDeletingEvents;

  return { isLoading, addEventsMutation, editEventsMutation, deleteEventsMutation };
}
