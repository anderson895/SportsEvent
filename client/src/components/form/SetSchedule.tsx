/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, DatePicker, Input, Typography } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

interface ScheduleModalProps {
  isModalVisible: boolean;
  schedule: string | null;
  setSchedule: any;
  venue: string;
  setVenue: any;
  handleScheduleSubmit: () => void;
  onCancel: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isModalVisible,
  schedule,
  setSchedule,
  venue,
  setVenue,
  handleScheduleSubmit,
  onCancel,
}) => {
  return (
    <Modal
      title={<span className="text-xl font-semibold">📅 Set Match Schedule</span>}
      open={isModalVisible}
      onOk={handleScheduleSubmit}
      onCancel={onCancel}
      centered
      okText="Save Schedule"
      cancelText="Cancel"
      okButtonProps={{ type: "primary", shape: "round" }}
      cancelButtonProps={{ shape: "round" }}
      bodyStyle={{ padding: "20px" }}
      style={{ maxWidth: "400px" }}
    >
      <Typography.Text type="secondary" className="block mb-4">
        Select a date and time for the match.
      </Typography.Text>
      
      <DatePicker
        showTime={{ use12Hours: true, format: "hh:mm A" }}
        format="DD/MM/YYYY hh:mm A"
        className="w-full border rounded-lg shadow-sm"
        placeholder="Select Date and Time"
        suffixIcon={<CalendarOutlined />}
        value={schedule ? moment(schedule) : null}
        onChange={(date) => setSchedule(date ? date.toISOString() : null)}
        style={{
          padding: "10px",
          fontSize: "16px",
        }}
        inputReadOnly
      />

      {schedule && (
        <div className="mt-4 flex items-center text-gray-600">
          <ClockCircleOutlined className="mr-2" />
          <span className="font-medium">
            Selected Date: {moment(schedule).format("MMMM Do YYYY, h:mm A")}
          </span>
        </div>
      )}

      <Typography.Text type="secondary" className="block mt-4 mb-2">
        Venue
      </Typography.Text>
      <Input.TextArea
        placeholder="Enter the venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        rows={3}
      />
    </Modal>
  );
};

export default ScheduleModal;
