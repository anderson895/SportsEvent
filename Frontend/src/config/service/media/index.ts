/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axios";
import Api from "../../endpoints/list";

const MediaServices = {
  add: async (data: any) => await axiosInstance.post(Api.MEDIA().ADD, data),
  list: async () => await axiosInstance.get(Api.MEDIA().LIST),
  delete: async (mediaId:any) => await axiosInstance.delete(`${Api.MEDIA().DELETE}/${mediaId}`),
};

export default MediaServices;
