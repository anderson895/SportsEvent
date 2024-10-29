/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, notification } from "antd";
import UserServices from "../../../config/service/users";
import { saveAdminInfo } from "../../../zustand/store/store.provider";
import { useRequestData } from "../../../config/axios/requestData";
import { useNavigate } from "react-router-dom";
import { RouterUrl } from "../../../routes";

export default function useLogin() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const loginMutation = useRequestData(
    (formData: FormData) => UserServices.login(formData),
    {
      onSuccess: (data) => {
        saveAdminInfo(data); 
        navigate(RouterUrl.AdminDashboard); 
      },
      onError: (error) => {
        notification.error({
          message: "Login failed",
          description: error.message || "Please check your credentials and try again.",
        });
      },
    }
  );

  const handleLogin = (values: any) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    loginMutation.mutate(formData);
  };

  return {
    form,
    handleLogin,
    loading: loginMutation.isPending, 
  };
}
