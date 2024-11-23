/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { useRequestData } from "../axios/requestData";
import MediaServices from "../service/media";

interface UseMediaRequestProps {
  setIsModalVisible?: (visible: boolean) => void;
}

export default function useMediaRequest({ setIsModalVisible }: UseMediaRequestProps) {
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

  const onSuccessHandler = (response: any, successMessage?: string) => {
    if (response.data.success === 0) {
      handleError(response.data);
    } else {
      if (successMessage) {
        handleSuccess(successMessage);
      }
    }
  };

  const createMutation = (
    serviceMethod: (data: any) => Promise<any>,
    successMessage?: string
  ) => {
    return useRequestData(serviceMethod, {
      onSuccess: (response) => onSuccessHandler(response, successMessage),
      onError: handleError,
    });
  };

  const { mutate: uploadMedia,isPending:isUploading } = createMutation(
    MediaServices.add
  );
  const { mutate: deleteMedia,isPending:isDeleting } = createMutation(
    MediaServices.delete
  );

  const isLoading = [
    isUploading,
    isDeleting,
  ].some(Boolean);

  return {
    isLoading,
    uploadMedia,
    deleteMedia
  };
}
