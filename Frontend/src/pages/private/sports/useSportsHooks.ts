/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, notification } from "antd";
import { useFetchData } from "../../../config/axios/requestData";
import { useState } from "react";
import { Sports } from "../../../types";
import { useQueryClient } from "@tanstack/react-query";
import useSportsRequest from "../../../config/data/sports";
import SportsServices from "../../../config/service/sports";
import useStore from "../../../zustand/store/store";
import { selector } from "../../../zustand/store/store.provider";

export default function useSportsHooks() {
  const queryClient = useQueryClient(); 
  const admin = useStore(selector('admin'))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [editingSports, setEditingSports] = useState<Sports | null>(null);
  const [form] = Form.useForm();
  const { isLoading, addSportMutation, editSportMutation, deleteSportMutation } =
    useSportsRequest({
      setIsModalVisible,
    });

  const { data: Sports, isPending: isFetchingSports } = useFetchData(
    ["Sports"],
    [() => SportsServices.fetchSports()]
  );
  const handleAddOrEditTeam = (values: Sports) => {
    const formData = new FormData();
    if (!isImageUpdated && editingSports?.sportsLogo) {
      values.sportsLogo = editingSports.sportsLogo;
    } else {
      values.sportsLogo = values.sportsLogo.fileList?.map(
        (file: { originFileObj: any }) => file.originFileObj
      )[0];
    }
    if(!values.sportsLogo){
        notification.error({
            message:"No Logo provided"
        })
        return
    }
    formData.append("sportsName", values.sportsName);
    formData.append("description", values.description);
    formData.append("sportsLogo", values.sportsLogo);
    if(editingSports){
        formData.append("sportsId", editingSports.sportsId.toString());
        formData.append("updatedBy", admin.info.id);
    } else{
      formData.append("createdBy", admin.info.id);
    }
    const mutation = editingSports ? editSportMutation : addSportMutation;
    mutation(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Sports"] })
        setIsImageUpdated(false)
        form.resetFields()
      },
    });
 
  };

  const handleDeleteTeam = (sportsId: any) => {
    deleteSportMutation(sportsId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Sports"] }),
    });
  };

  const showModal = (sports: Sports | null = null) => {
    setEditingSports(sports);
    if (sports) {
      form.setFieldsValue(sports);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const loading = isLoading || isFetchingSports;
  return {
    Sports,
    isModalVisible,
    editingSports,
    form,
    loading,
    setIsImageUpdated,
    handleAddOrEditTeam,
    setIsModalVisible,
    handleDeleteTeam,
    showModal,
  };
}
