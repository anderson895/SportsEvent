/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, Button, Modal, Popconfirm, Image } from "antd";
import useTeamsHooks from "./useTeamsHooks";
import { Team } from "../../../types";
import TeamsForm from "./form";

export const TeamsPage: React.FC = () => {
  const {
    handleAddOrEditTeam,
    showModal,
    handleDeleteTeam,
    setIsModalVisible,
    setIsImageUpdated,
    isModalVisible,
    teams,
    editingTeam,
    form,
    loading
  } = useTeamsHooks();

  const columns = [
    {
      title: "Team Logo",
      dataIndex: "teamLogo",
      key: "teamLogo",
      render:((v: string | undefined) =>(
        <Image width={50} src={v} />
      ))
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Team Coach",
      dataIndex: "teamCoach",
      key: "teamCoach",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Team) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this team?"
            onConfirm={() => handleDeleteTeam(record.teamId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Team
      </Button>
      <Table columns={columns} dataSource={teams?.data?.results} rowKey="teamsId" />

      {isModalVisible && <Modal
        title={editingTeam ? "Edit Team" : "Add Team"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <TeamsForm
            form={form}
            loading={loading}
            setIsImageUpdated={setIsImageUpdated}
            handleAddOrEditTeam={handleAddOrEditTeam}
            editingTeam={editingTeam}
        />
      </Modal>}
    </div>
  );
};
