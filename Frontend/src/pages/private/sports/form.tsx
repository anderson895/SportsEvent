import React, { useState } from 'react';
import { Button, Form, FormInstance, Input, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Sports } from '../../../types';
import CustomTextEditor from '../../../components/inputs/customEditor';

interface SportsFormProps {
  form: FormInstance;
  handleAddOrEditTeam: (values: Sports) => void;
  editingSports?: Sports | null;
  loading: boolean;
  setIsImageUpdated:React.Dispatch<React.SetStateAction<boolean>>;
}

const SportsForm: React.FC<SportsFormProps> = ({
  form,
  handleAddOrEditTeam,
  editingSports,
  setIsImageUpdated,
  loading
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(
    editingSports?.sportsLogo
      ? [
          {
            uid: '-1',
            name: 'sportsLogo.png',
            status: 'done',
            url: editingSports.sportsLogo, 
          },
        ]
      : []
  );
  const handleFileChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
    setIsImageUpdated(true);
  };

  const handleFileRemove = () => {
    setFileList([]);
    setIsImageUpdated(true);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddOrEditTeam}
      initialValues={editingSports || {}}
    >
      <Form.Item
        name="sportsName"
        label="Sport Name"
        rules={[{ required: true, message: 'Please input the sport name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the sport description!' }]}
      >
        <CustomTextEditor />
      </Form.Item>
      <Form.Item
        name="sportsLogo"
        label="Sport Logo"
        rules={[{ required: true, message: 'Please upload a sport logo!' }]}
      >
        <Upload
          name="sportsLogo"
          listType="picture"
          fileList={fileList} 
          onChange={handleFileChange}
          onRemove={handleFileRemove}
          beforeUpload={() => false} 
        >
          {fileList.length === 0 && (
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          )}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {editingSports ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SportsForm;
