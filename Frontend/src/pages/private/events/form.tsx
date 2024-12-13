import React from 'react';
import { Button, DatePicker, Form, FormInstance, Input } from 'antd';
import { Events } from '../../../types';
import CustomTextEditor from '../../../components/inputs/customEditor';

interface EventsFormProps {
  form: FormInstance;
  handleAddOrEditEvent: (values: Events) => void;
  editingEvents?: Events | null;
  loading: boolean;
}

const EventsForm: React.FC<EventsFormProps> = ({
  form,
  handleAddOrEditEvent,
  editingEvents,
  loading
}) => {

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddOrEditEvent}
      initialValues={editingEvents || {}}
    >
      <Form.Item
        name="eventName"
        label="Event Name"
        rules={[{ required: true, message: 'Please input the event name!' }]}
      >
        <Input />
      </Form.Item>
      <div className='flex flex-wrap gap-2'>
      <Form.Item
        name="eventstartDate"
        label="Start Date"
        rules={[{ required: true, message: 'Please set Start Date of event!' }]}
        className='flex-1'
      >
        <DatePicker className='w-full' />
      </Form.Item>
      <Form.Item
        name="eventendDate"
        label="End Date"
        rules={[{ required: true, message: 'Please set End Date of event!' }]}
        className='flex-1'
      >
        <DatePicker className='w-full' />
      </Form.Item>
      </div>
      <Form.Item label='Description' name='description'>
        <CustomTextEditor />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {editingEvents ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventsForm;
