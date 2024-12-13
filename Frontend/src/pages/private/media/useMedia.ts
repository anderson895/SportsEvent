/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { useFetchData } from "../../../config/axios/requestData";
import { useState } from "react";
import { Sports } from "../../../types";
import { useQueryClient } from "@tanstack/react-query";
import useMediaRequest from "../../../config/data/media";
import MediaServices from "../../../config/service/media";
import useStore from "../../../zustand/store/store";
import { selector } from "../../../zustand/store/store.provider";

export default function useMediaHooks() {
  const queryClient = useQueryClient(); 
  const admin = useStore(selector('admin'))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [form] = Form.useForm();
  const { isLoading, uploadMedia, deleteMedia } =
    useMediaRequest({
      setIsModalVisible,
    });

  const { data: Medias, isPending: isFetchingMedia } = useFetchData(
    ["media"],
    [() => MediaServices.list()]
  );
  const handleUploadMedia = (values: Sports) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
        const value = values[key as keyof typeof values];
        console.log(value)
        if (key === "media" && value?.length > 0) {
          formData.append(key, value[0]?.originFileObj);
        } else {
          formData.append(key, value !== null ? String(value) : "");
        }
      });
      formData.append('adminId',admin.info.id)
    uploadMedia(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["media"] })
        setIsImageUpdated(false)
        form.resetFields()
      },
    });
 
  };

  const handleDeleteMedia = (mediaId: any) => {
    deleteMedia(mediaId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["media"] }),
    });
  };


  const loading = isLoading || isFetchingMedia;
  return {
    Medias,
    isModalVisible,
    form,
    loading,
    isImageUpdated,
    isFetchingMedia,
    setIsImageUpdated,
    handleUploadMedia,
    setIsModalVisible,
    handleDeleteMedia,
  };
}
