/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import EventsServices from "../service/events";

interface UseTeamsRequestProps {
  setIsModalVisible?: (visible: boolean) => void;
}

export default function useEventsRequest({ setIsModalVisible }: UseTeamsRequestProps) {
  const notify = (type: "success" | "error", message: string, description?: string) => {
    notification[type]({ message, description });
  };

  const handleSuccess = (message: string) => {
    setIsModalVisible?.(false);
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

  const { mutate: addEventsMutation, isPending: isAddingEvents } = createMutation(
    EventsServices.addEvents,
    "Successfully added new Events"
  );

  const { mutate: editEventsMutation, isPending: isEditingEvents } = createMutation(
    EventsServices.editEvents,
    "Successfully updated Events info"
  );

  const { mutate: deleteEventsMutation, isPending: isDeletingEvents } = createMutation(
    EventsServices.deleteEvents,
    "Successfully deleted Events"
  );

  const { mutate: addSportEventsMutation, isPending: isAddingSportEvents } = createMutation(
    EventsServices.addSportEvents,
    "Successfully added Sport"
  );

  const { mutate: createMatchMaking, isPending: isCreatingMatch } = createMutation(
    EventsServices.createMatches,
    "Successfully created match"
  );

  const { mutate: setScore, isPending: isScoring } = createMutation(
    EventsServices.setScoreWinner,
    "Successfully set score"
  );
  const { mutate: setScore1, isPending: isScoring1 } = createMutation(
    EventsServices.setScoreWinner1,
    "Successfully set score"
  );
  const { mutate: setScore2, isPending: isScoring2 } = createMutation(
    EventsServices.setScoreWinner2,
    "Successfully set score"
  );

  const { mutate: setMatchingSchedule, isPending: isScheduling } = createMutation(
    EventsServices.setMatchSchedule,
    "Successfully scheduled match"
  );

  const isLoading = [
    isAddingEvents,
    isEditingEvents,
    isDeletingEvents,
    isAddingSportEvents,
    isCreatingMatch,
    isScoring,
    isScheduling,
    isScoring1,
    isScoring2
  ].some(Boolean);

  return {
    isLoading,
    addEventsMutation,
    setScore1,
    setScore2,
    editEventsMutation,
    deleteEventsMutation,
    addSportEventsMutation,
    createMatchMaking,
    setScore,
    setMatchingSchedule,
  };
}
