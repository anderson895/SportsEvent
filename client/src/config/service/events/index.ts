/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axios";
import Api from "../../endpoints/list";

const EventsServices = {
  addEvents: async (data: any) => await axiosInstance.post(Api.EVENTS().ADD, data),
  addSportEvents: async (data: any) => await axiosInstance.post(Api.EVENTS().SPORTS, data),
  createMatches: async (data: any) => await axiosInstance.post(Api.EVENTS().MATCHCREATE, data),
  setScoreWinner: async (data: any) => await axiosInstance.post(Api.EVENTS().SETSCORE, data),
  setScoreWinner1: async (data: any) => await axiosInstance.post(Api.EVENTS().SETSCORE1, data),
  setScoreWinner2: async (data: any) => await axiosInstance.post(Api.EVENTS().SETSCORE2, data),
  setMatchSchedule: async (data: any) => await axiosInstance.post(Api.EVENTS().SETSCHEDULE, data),
  fetchEvents: async () => await axiosInstance.get(Api.EVENTS().LIST),
  fetchSportsinEvents: async () => await axiosInstance.get(Api.EVENTS().SPORTEVENTS),
  editEvents: async (data:any) => await axiosInstance.put(`${Api.EVENTS().EDIT}/${data?.get('eventId')}`,data),
  eventInfo: async (eventId:any) => await axiosInstance.get(`${Api.EVENTS().INFO}/${eventId}`),
  bracketMatch: async (sportEventsId:any) => await axiosInstance.get(`${Api.EVENTS().BRACKETMATCH}/${sportEventsId}`),
  deleteEvents: async (eventId:any) => await axiosInstance.delete(`${Api.EVENTS().DELETE}/${eventId}`)
};

export default EventsServices;
