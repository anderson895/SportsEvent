/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, notification } from "antd";
import UserServices from "../../../config/service/users";
import { useRequestData } from "../../../config/axios/requestData";
import { useNavigate } from "react-router-dom";
import { RouterUrl } from "../../../routes";

export default function useRegister() {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const registerMutation = useRequestData(
    (formData: FormData) => UserServices.login(formData),
    {
      onSuccess: () => {
        navigate(RouterUrl.Login); 
      },
      onError: (error) => {
        notification.error({
          message: "Login failed",
          description: error.message || "Please check your credentials and try again.",
        });
      },
    }
  );

  const handleRegister = async (values: any) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("collegeName", values.collegeName);
    registerMutation.mutate(formData)
  };

  return {
    form,
    handleRegister,
    loading: registerMutation.isPending
  };
}
