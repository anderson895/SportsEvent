/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from '@tanstack/react-query';
import { useFetchData } from '../../config/axios/requestData';
import useTeamsRequest from '../../config/data/teams';
import UserServices from '../../config/service/users';
import useStore from '../../zustand/store/store';
import { selector } from '../../zustand/store/store.provider';
import { useState } from 'react';
import { Form } from 'antd';

export default function useCoach() {
  const coach = useStore(selector('admin'));
  const coachId = coach.info?.id;
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentSportEventId, setCurrentSportEventId] = useState<number | null>(null);

  const { data: Info, isPending } = useFetchData<any>(
    ['coach',],
    [() => UserServices.fetchCoach(coachId)]
  );

  const { addPlayerMutation,deletePlayerMutation,isLoading } = useTeamsRequest({});

  const showAddPlayerModal = (sportEventId: number) => {
    setCurrentSportEventId(sportEventId);
    setIsModalVisible(true);
  };

  const handleFileChange = (info: any) => {
    const updatedFileList = info.fileList.slice(-1); 
    setFileList(updatedFileList);

    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file); 
    } else {
      setPreviewImage(null);
    }
  };

  const handleAddPlayerTeam = async(values:any) =>{
    if (!currentSportEventId) return;
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
        const value = values[key as keyof typeof values];
        if (key === "medicalCertificate" && value?.length > 0) {
          formData.append(key, value[0]?.originFileObj);
        } else {
          formData.append(key, value !== null ? String(value) : "");
        }
      });
    formData.append('teamEventId',currentSportEventId?.toString())
    addPlayerMutation(formData, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["coach"] });
            setIsModalVisible(false)
            setFileList([])
            setPreviewImage(null)
            form.resetFields()
        },
      });
  }
  const handleDeletePlayerTeam = async(playerId:any) =>{
    if (!playerId) return;
    deletePlayerMutation(playerId, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["coach"] }),
      });
  }

  const onModalClose = () =>{
    setIsModalVisible(false)
    setFileList([])
    setPreviewImage(null)
    form.resetFields()
  }
  return {
    Info:Info?.length > 0 ? Info[0] : {},
    loading: isPending,
    isLoading,
    currentSportEventId,
    isModalVisible,
    form,
    fileList,
    previewImage,
    setCurrentSportEventId,
    handleAddPlayerTeam,
    showAddPlayerModal,
    setIsModalVisible,
    handleDeletePlayerTeam,
    handleFileChange,
    onModalClose
  };
}
