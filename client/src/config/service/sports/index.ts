/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axios";
import Api from "../../endpoints/list";

const SportsServices = {
  addSports: async (data: any) => await axiosInstance.post(Api.SPORTS().ADD, data),
  fetchSports: async () => await axiosInstance.get(Api.SPORTS().LIST),
  fetchSportsSummary: async () => await axiosInstance.get(Api.SPORTS().SUMMARY),
  editSports: async (data:any) => await axiosInstance.put(`${Api.SPORTS().EDIT}/${data?.get('sportsId')}`,data),
  deleteSports: async (sportsId:any) => await axiosInstance.delete(`${Api.SPORTS().DELETE}/${sportsId}`)
};

export default SportsServices;
