/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axios";
import Api from "../../endpoints/list";

const UserServices = {
  login: async (data: any) => await axiosInstance.post(Api.USER().LOGIN, data),
  registration: async (data: any) => await axiosInstance.post(Api.USER().REGISTRATION, data),
};

export default UserServices;
