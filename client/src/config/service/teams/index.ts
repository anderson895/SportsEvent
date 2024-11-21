/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axios";
import Api from "../../endpoints/list";

const TeamsServices = {
  addTeams: async (data: any) => await axiosInstance.post(Api.TEAMS().ADD, data),
  addPlayer: async (data: any) => await axiosInstance.post(Api.TEAMS().ADDPLAYER, data),
  fetchTeams: async () => await axiosInstance.get(Api.TEAMS().LIST),
  fetchCoaches: async () => await axiosInstance.get(Api.TEAMS().COACHES),
  editTeams: async (data:any) => await axiosInstance.put(`${Api.TEAMS().EDIT}/${data?.get('teamId')}`,data),
  deleteTeams: async (teamId:any) => await axiosInstance.delete(`${Api.TEAMS().DELETE}/${teamId}`),
  fetchTeamInfo: async (teamId:any) => await axiosInstance.get(`${Api.TEAMS().INFO}/${teamId}`),
  deletePlayer: async (playerId:any) => await axiosInstance.delete(`${Api.TEAMS().DELETEPLAYER}/${playerId}`)
};

export default TeamsServices;
