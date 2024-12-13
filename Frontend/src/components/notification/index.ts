
import { notification } from "antd";

const useNotification = () => {
  const showSuccess = (message: string, description: string) => {
    notification.success({
      message,
      description,
      duration: 2,
    });
  };

  const showError = (message: string, description: string) => {
    notification.error({
      message,
      description,
      duration: 3,
    });
  };

  return {
    showSuccess,
    showError,
  };
};

export default useNotification;
