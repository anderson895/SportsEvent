/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { User } from '../../../types';
import useUserAccounts from './useUserAccounts';

const { Option } = Select;

export const UserAccounts: React.FC = () => {
  const {
    handleFinish,
    openModal,
    closeModal,
    handleTypeChange,
    accounts,
    editingUser,
    isLoading,
    isModalVisible,
    sportEvents,
    form,
  } = useUserAccounts();

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Team', dataIndex: ['teamInfo','teamName'], key: 'collegeName', render:(v:any) => v !== 'undefined' ? v : '-' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Added By', dataIndex: 'addedByUsername', key: 'addedByUsername' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, user: User) => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined />} onClick={() => openModal(user)}>Edit</Button>
        </div>
      ),
    },
  ];
  
  
  console.log(sportEvents)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Accounts</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>Add User</Button>
      </div>
      <Table dataSource={accounts} columns={columns} rowKey="id" />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalVisible}
        onCancel={closeModal}
        onClose={closeModal}
        footer={null}
      >
        <Form
          initialValues={{
            teamId: null,
            event: null,
            sportEvent: null,
            ...editingUser,
          }}
          onFinish={handleFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter a username' }]}>
            <Input />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter a password' }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          {editingUser && (
            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Leave blank to keep the current password" />
            </Form.Item>
          )}

          <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select a type' }]}>
            <Select onChange={handleTypeChange}>
              <Option value="Admin">Admin</Option>
              <Option value="Coach">Coach</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select a status' }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" loading={isLoading} htmlType="submit" className="w-full">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
