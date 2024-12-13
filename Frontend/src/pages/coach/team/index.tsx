/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  Typography,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Popconfirm,
  Image,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import useCoach from "../useCoach";

const { Title } = Typography;
const { Dragger } = Upload;

export const CoachTeamPage: React.FC = () => {
  const {
    Info,
    loading,
    isModalVisible,
    form,
    isLoading,
    fileList,
    previewImage,
    handleFileChange,
    handleAddPlayerTeam,
    handleDeletePlayerTeam,
    showAddPlayerModal,
    onModalClose
  } = useCoach();

  const columns = [
    {
      title: "Player Name",
      dataIndex: "playerName",
      key: "playerName",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
        title: "Medical Certificate",
        dataIndex: "medicalCertificate",
        key: "medicalCertificate",
        render: (text: string) =>
          text ? (
            <Image
              src={text}
              alt="Medical Certificate"
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
            />
          ) : (
            "No Image"
          ),
      },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: any) => (
        <Popconfirm
          title="Are you sure you want to delete this player?"
          onConfirm={() => handleDeletePlayerTeam(record.playerId)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Info || !Info.handledEvents || Info.handledEvents.length === 0) {
    return <p>No events or players found.</p>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Coach Team Management</Title>
      {Info.handledEvents.map((event: any) => (
        <Card
          key={event.sportEventsId}
          title={`${event.team?.teamName || "No Team"} - ${
            event.sportDetails?.sportsName || "No Sport"
          }`}
          style={{ marginBottom: "16px" }}
          extra={
            <Button
              type="primary"
              onClick={() => showAddPlayerModal(event.teamEvent.teamEventId)}
            >
              Add Player
            </Button>
          }
        >
          <p>
            <strong>Event:</strong>{" "}
            {event.eventDetails?.eventName || "No Event"}
          </p>
          <p>
            <strong>Sport:</strong>{" "}
            {event.sportDetails?.sportsName || "No Sport"}
          </p>
          <Table
            dataSource={event.players || []}
            columns={columns}
            rowKey="playerId"
            pagination={false}
          />
        </Card>
      ))}

      {/* Add Player Modal */}
      <Modal
        title="Add Player"
        open={isModalVisible}
        onCancel={onModalClose}
        onClose={onModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleAddPlayerTeam} layout="vertical">
          <Form.Item
            name="playerName"
            label="Player Name"
            rules={[
              { required: true, message: "Please enter the player's name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[
              { required: true, message: "Please enter the player's position" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="medicalCertificate"
            label="Medical Certificate"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: "Please upload the medical certificate",
              },
            ]}
          >
            <Dragger
              name="file"
              multiple={false}
              maxCount={1}
              beforeUpload={() => false}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              fileList={fileList}
            >
              {previewImage ? (
                <div style={{ textAlign: "center" }}>
                  <Image src={previewImage} alt="Medical Certificate" />
                </div>
              ) : (
                <div>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload. Only .pdf, .jpg, .jpeg, and
                    .png files are allowed.
                  </p>
                </div>
              )}
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              className="w-full"
            >
              Add Player
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
