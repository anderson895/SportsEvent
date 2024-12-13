/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button, Form, FormInstance, Input, Select, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Team } from '../../../types';

interface TeamsFormProps {
  form: FormInstance;
  handleAddOrEditTeam: (values: Team) => void;
  editingTeam?: Team | null;
  loading: boolean;
  coaches:any;
  setIsImageUpdated:React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamsForm: React.FC<TeamsFormProps> = ({
  form,
  handleAddOrEditTeam,
  editingTeam,
  setIsImageUpdated,
  loading,
  coaches
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(
    editingTeam?.teamLogo
      ? [
          {
            uid: '-1',
            name: 'teamLogo.png',
            status: 'done',
            url: editingTeam.teamLogo, 
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
      initialValues={{
        ...editingTeam,
        teamCoach: editingTeam?.coachId || undefined, // Ensure teamCoach is properly initialized
      }}
    >
      <Form.Item
        name="teamName"
        label="Team Name"
        rules={[{ required: true, message: 'Please input the team name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="teamCoach"
        label="Team Coach"
        rules={[{ required: true, message: 'Please input the coach name!' }]}
      >
             <Select defaultValue={editingTeam?.coachId}>
              {coaches?.map((coach: any) => (
                <Select.Option key={coach.id} value={coach.id}>Coach  {coach.username}</Select.Option>
              ))}
            </Select>
      </Form.Item>
      <Form.Item
        name="teamLogo"
        label="Team Logo"
        rules={[{ required: true, message: 'Please upload a team logo!' }]}
      >
        <Upload
          name="teamLogo"
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
          {editingTeam ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeamsForm;
