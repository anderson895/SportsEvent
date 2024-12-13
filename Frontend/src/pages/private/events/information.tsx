/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { Button, Skeleton, Card, Modal, Select, Form, Checkbox, Input } from "antd";
import { dateFormatter } from "../../../utility/utils";
import useInfoHooks from "./useInfoHooks";
import { useState } from "react";
import SportEventInformation from "./sportevents";

const { Meta } = Card;

const EventInformation = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [selectedSport, setSelectedSport] = useState<any | null>(null);
  const [allTeamsSelected, setAllTeamsSelected] = useState(false); // State to manage all teams selection
  const {
    teams,
    handleAddSports,
    form,
    info,
    loading,
    isModalVisible,
    sportsOptions,
    setIsModalVisible,
  } = useInfoHooks({ eventId });

  const handleSelectAllTeams = (e: any) => {
    if (e.target.checked) {
      const allTeamValues = teams.map((team) => team.value);
      form.setFieldsValue({ teams: allTeamValues });
      setAllTeamsSelected(true);
    } else {
      form.setFieldsValue({ teams: [] });
      setAllTeamsSelected(false);
    }
  };
  console.log(teams)
  return (
    <>
      {selectedSport ? (
        <SportEventInformation sportDetails={selectedSport} />
      ) : (
        <div className="flex flex-col items-center py-8 px-4 md:px-0">
          {loading ? (
            <Skeleton active />
          ) : info ? (
            <Card
              className="w-full bg-white rounded-lg"
              title={<h2 className="text-xl font-bold">{info.event.eventName}</h2>}
            >
              <Meta
                description={
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Date: {dateFormatter(info.event.eventstartDate)} to{" "}
                      {dateFormatter(info.event?.eventendDate)}
                    </p>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Description</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: info.event?.description,
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-1">
                        List of Sports
                      </h3>
                      <div className="grid grid-cols-6 gap-2 p-4">
                        {info?.sportsEvents?.map((v: any) => (
                          <div
                            key={v.sportsId}
                            onClick={() => setSelectedSport(v)}
                            className="flex rounded-md cursor-pointer flex-col p-4 items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                          >
                            <img
                              className="w-16 mb-2"
                              src={v?.sportInfo?.sportsLogo}
                              alt={v?.sportInfo?.sportsName}
                            />
                            <p className="text-xl font-bold text-black">
                              {v?.sportInfo?.sportsName}
                            </p>
                            <p className="text-md">{v?.bracketType}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              />
              <div className="flex justify-center mt-6">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setIsModalVisible(true)}
                >
                  Add Sport
                </Button>
              </div>
            </Card>
          ) : (
            <p className="text-gray-600">No event information found.</p>
          )}
        </div>
      )}
      <Modal
        title="Select Sports and Teams"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width={590}
        okText="Add Selected Sports and Teams"
      >
        <Form form={form} onFinish={handleAddSports} layout="vertical" name="sports">
          <Form.Item label="Sports to Add" name="selectedSports">
            <Select
              style={{ width: "100%" }}
              placeholder="Select sports to add"
              options={sportsOptions}
            />
          </Form.Item>

          <Form.Item label="Bracket Type" name="bracketType">
            <Select
              style={{ width: "100%" }}
              placeholder="Select Bracket Type"
              options={[
                { label: "Single Elimination", value: "Single Elimination" },
                { label: "Double Elimination", value: "Double Elimination" },
                { label: "Round Robin", value: "Round Robin" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Maximum Players"
            name="maxPlayers"
            rules={[
              { required: true, message: "Please specify the maximum number of players" },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter the maximum number of players"
              min={1}
            />
          </Form.Item>

          <Form.Item label="Teams to Include" name="teams">
            <Checkbox.Group>
              <div className="grid grid-cols-2 gap-2">
                {teams.map((team) => (
                  <Checkbox key={team.value} value={team.value}>
                    {team.label}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>

          <div className="flex justify-end mt-2">
            <Checkbox
              onChange={handleSelectAllTeams}
              checked={allTeamsSelected}
            >
              Select All Teams
            </Checkbox>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EventInformation;
