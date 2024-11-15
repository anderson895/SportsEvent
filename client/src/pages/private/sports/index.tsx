import React from "react";
import { Card, Button, Modal, Popconfirm, Image, Row, Col } from "antd";
import useTeamsHooks from "./useSportsHooks";
import { Sports } from "../../../types";
import SportsForm from "./form";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const SportsPage: React.FC = () => {
  const {
    handleAddOrEditTeam,
    showModal,
    handleDeleteTeam,
    setIsModalVisible,
    setIsImageUpdated,
    isModalVisible,
    Sports,
    editingSports,
    form,
    loading
  } = useTeamsHooks();
  console.log(Sports)
  return (
    <div>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
        icon={<PlusOutlined />}
      >
        Add Sports
      </Button>

      {/* Grid layout for displaying cards */}
      <Row gutter={[16, 16]}>
        {Sports?.map((sport: Sports) => (
          <Col xs={24} sm={12} md={8} lg={6} key={sport.sportsId}>
            <Card
              hoverable
              cover={<Image alt={sport.sportsName} src={sport.sportsLogo} style={{ height: 150, objectFit: 'contain' }} />}
              actions={[
                <EditOutlined key="edit" onClick={() => showModal(sport)} />,
                <Popconfirm
                  title="Are you sure to delete this sports?"
                  onConfirm={() => handleDeleteTeam(sport.sportsId)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" style={{ color: 'red' }} />
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                title={sport.sportsName}
                description={<div className="line-clamp-3" dangerouslySetInnerHTML={{__html:sport.description}} />}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Add/Edit Sports */}
      {isModalVisible && (
        <Modal
          title={editingSports ? "Edit Team" : "Add Team"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <SportsForm
            form={form}
            loading={loading}
            setIsImageUpdated={setIsImageUpdated}
            handleAddOrEditTeam={handleAddOrEditTeam}
            editingSports={editingSports}
          />
        </Modal>
      )}
    </div>
  );
};
