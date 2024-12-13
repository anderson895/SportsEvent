/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { User } from '../../../types';
import useUsersRequest from '../../../config/data/users';
import { useFetchData } from '../../../config/axios/requestData';
import UserServices from '../../../config/service/users';
import { Form } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import EventsServices from '../../../config/service/events';
import TeamsServices from '../../../config/service/teams';
import useStore from '../../../zustand/store/store';
import { selector } from '../../../zustand/store/store.provider';

export default function useUserAccounts() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const admin = useStore(selector('admin'))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [sportEvents, setSportEvents] = useState<any>(null); 
  const [showEventFields, setShowEventFields] = useState(true);

  const { addUser, updateUser, isLoading } = useUsersRequest({
    setIsModalVisible,
  });

  const { data: [accounts, events, allSportEvents, teams] = [] } = useFetchData(
    ["accounts", "events", "allSportEvents", "teams"],
    [
      () => UserServices.fetchList(),
      () => EventsServices.fetchEvents(),
      () => EventsServices.fetchSportsinEvents(),
      () => TeamsServices.fetchTeams()
    ]
  );
  console.log(accounts)
  const handleTypeChange = (type: string) => {
    setShowEventFields(type !== "Admin"); // Show fields only if type is not Admin
  };

  const handleEventChange = (eventId: string) => {
    setSelectedEvent(eventId);
    const filteredSportEvents = allSportEvents?.find((sportEvent: any) => sportEvent.eventId === eventId)?.sportsEvents;
    setSportEvents(filteredSportEvents);
  };

  const openModal = (user: any | null = null) => {
    setEditingUser(user);
    setIsModalVisible(true);
    if (user) {
      form.setFieldsValue({
        ...user,
        password: '',
        teamId: user.teamId || null,
        event: user.eventId || null,
        sportEvent: user.sportEventId || null
      });
      const filteredSportEvents = allSportEvents?.find((sportEvent: any) => sportEvent.eventId === user.eventId)?.sportsEvents;
      setSportEvents(filteredSportEvents);
      setSelectedEvent(user.eventId);
    } else {
      form.resetFields();
      setSportEvents(null); // Reset sport events when adding a new user
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields(); // Reset all values in the form
    setSportEvents(null);
  };

  const handleFinish = (values: Omit<User, 'id'>) => {
    values.collegeName = teams?.find((v: any) => v.teamId === values.teamId)?.teamName;
  
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'password' || (key === 'password' && values[key])) {
        const value = values[key as keyof typeof values];
        formData.append(key, value !== null ? String(value) : '');
      }
    });
  
    if (editingUser) {
      formData.append('id', String(editingUser.id));
    } else {
      formData.append("addedBy",admin.info.id)
    }
  
    const mutation = editingUser ? updateUser : addUser;
    mutation(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
        form.resetFields();
      },
    });
    closeModal();
  };
  


  return {
    handleFinish,
    openModal,
    closeModal,
    handleEventChange,
    handleTypeChange,
    accounts,
    isLoading,
    editingUser,
    isModalVisible,
    events,
    sportEvents,
    teams,
    form,
    selectedEvent,
    allSportEvents,
    showEventFields
  };
}
