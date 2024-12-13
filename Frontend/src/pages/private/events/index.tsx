import React from "react";
import { Card, Button, Modal, Popconfirm, Row, Col } from "antd";
import { Events } from "../../../types";
import TeamsForm from "./form";
import useEventsHooks from "./useEventsHooks";
import { dateFormatter } from "../../../utility/utils";
import { useNavigate } from "react-router-dom";

export const EventsPage: React.FC = () => {
  const navigate = useNavigate()
  const {
    Events,
    isModalVisible,
    editingEvents,
    form,
    loading,
    handleAddOrEditEvent,
    setIsModalVisible,
    handleDeleteEvents,
    showModal,
  } = useEventsHooks();

  return (
    <div>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Event
      </Button>

      <Row gutter={[16, 16]}>
        {Events?.map((event: Events) => (
          <Col xs={24} sm={12} md={8} lg={6} key={event.eventId}>
            <Card
              title={event.eventName}
              bordered={true}
              actions={[
                <Button type="link" onClick={() => navigate(`/Events/${event.eventId}`)}>
                  View
                </Button>,
                <Button type="link" onClick={() => showModal(event)}>
                  Edit
                </Button>,
                <Popconfirm
                  title="Are you sure to delete this event?"
                  onConfirm={() => handleDeleteEvents(event.eventId)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              ]}
            >
              <p><strong>Start Date:</strong> {dateFormatter(event.eventstartDate)}</p>
              <p><strong>End Date:</strong> {dateFormatter(event.eventendDate)}</p>
              <p><strong>Added by:</strong> {event.createdByName}</p>
              <p><strong>Updated by:</strong> {event.updatedByName}</p>
              <div dangerouslySetInnerHTML={{__html:event.description}} />
            </Card>
          </Col>
        ))}
      </Row>

      {isModalVisible && (
        <Modal
          title={editingEvents ? "Edit Event" : "Add Event"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <TeamsForm
            form={form}
            loading={loading}
            handleAddOrEditEvent={handleAddOrEditEvent}
            editingEvents={editingEvents}
          />
        </Modal>
      )}
    </div>
  );
};
