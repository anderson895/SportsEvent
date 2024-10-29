/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axios";
import Api from "../../endpoints/list";

const TeamsServices = {
  addTeams: async (data: any) => await axiosInstance.post(Api.TEAMS().ADD, data),
  fetchTeams: async () => await axiosInstance.get(Api.TEAMS().LIST),
  editTeams: async (data:any) => await axiosInstance.put(`${Api.TEAMS().EDIT}/${data?.get('teamId')}`,data),
  deleteTeams: async (teamId:any) => await axiosInstance.delete(`${Api.TEAMS().DELETE}/${teamId}`)
};

export default TeamsServices;
