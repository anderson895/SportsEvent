/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import UserServices from "../service/users";

interface UserRequestProps {
  setIsModalVisible: (visible: boolean) => void;
}

export default function useUsersRequest({ setIsModalVisible }: UserRequestProps) {
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

  const { mutate: addUser, isPending: isAddingUser } = createMutation(
    UserServices.registration,
    "Successfully added new account"
  );

  const { mutate: updateUser, isPending: isEditingUser} = createMutation(
    UserServices.updateUser,
    "Successfully updated account info"
  );

  const isLoading = [isAddingUser, isEditingUser].some(Boolean);

  return {
    isLoading,
    addUser,
    updateUser,
  };
}
