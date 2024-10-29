/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axios";
import Api from "../../endpoints/list";

const EventsServices = {
  addEvents: async (data: any) => await axiosInstance.post(Api.EVENTS().ADD, data),
  fetchEvents: async () => await axiosInstance.get(Api.EVENTS().LIST),
  editEvents: async (data:any) => await axiosInstance.put(`${Api.EVENTS().EDIT}/${data?.get('eventId')}`,data),
  deleteEvents: async (eventId:any) => await axiosInstance.delete(`${Api.EVENTS().DELETE}/${eventId}`)
};

export default EventsServices;
