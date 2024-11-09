/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Skeleton,
  Card,
  Modal,
  Select,
  message,
  Form,
  Checkbox,
} from "antd";
import EventsServices from "../../../config/service/events";
import TeamsServices from "../../../config/service/teams"; // Assume you have a Teams service
import { Events, Sports } from "../../../types";
import { dateFormatter } from "../../../utility/utils";
import SportsServices from "../../../config/service/sports";

const { Meta } = Card;

const EventInformation = () => {
  const { eventId } = useParams();
  const [form] = Form.useForm();
  const [info, setInfo] = useState<Events | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sportsOptions, setSportsOptions] = useState<Sports[]>([]);
  const [teamsOptions, setTeamsOptions] = useState<
    { label: string; value: string }[]
  >([]); // State for teams options

  async function Fetch() {
    try {
      const formData = new FormData();
      formData.append("eventId", eventId || "");
      const res = await EventsServices.eventInfo(formData);
      const resSports = await SportsServices.fetchSports();
      const resTeams = await TeamsServices.fetchTeams(); // Fetch all teams

      setInfo(res.data.results[0]);

      const sportsList = resSports.data.results?.map((v: Sports) => ({
        label: v.sportsName,
        value: v.sportsId,
      }));
      const teamsList = resTeams.data.results;

      setSportsOptions(sportsList);
      setTeamsOptions(teamsList);
    } catch (error) {
      console.error("Error fetching event information:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddSports = async (values:any) => {
    try {
      const teams = values.teams?.map((v: any) => {
        const dta: any = teamsOptions?.find((g: any) => g.teamId === v);
        return {
          teamName: dta.teamName,
          teamCoach: dta.teamCoach,
        };
      });
      const formData = new FormData();
      formData.append("eventId", eventId || "");
      formData.append("bracket", values.bracketType);
      formData.append("sports", JSON.stringify(values.selectedSports));
      formData.append("teams", JSON.stringify(teams));
      message.success("Sports and teams added successfully!");
      setIsModalVisible(false);
      Fetch();
    } catch (error) {
      console.error("Error adding sports and teams:", error);
      message.error("Failed to add sports or teams.");
    }
  };

  useEffect(() => {
    Fetch();
  }, []);

  const teams = teamsOptions?.map((v: any) => ({
    label: v.teamName,
    value: v.teamId,
  }));

  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-0">
      {loading ? (
        <Skeleton active />
      ) : info ? (
        <Card
          className="w-full bg-white rounded-lg"
          title={<h2 className="text-xl font-bold">{info.eventName}</h2>}
        >
          <Meta
            description={
              <div className="space-y-4">
                <p className="text-gray-600">
                  Date: {dateFormatter(info.eventstartDate)} to{" "}
                  {dateFormatter(info?.eventendDate)}
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: info?.description }}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">List of Sports</h3>
                  {/* Display existing sports here */}
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

      <Modal
        title="Select Sports and Teams"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width={590}
        okText="Add Selected Sports and Teams"
      >
        <Form
          form={form}
          onFinish={handleAddSports}
          layout="vertical"
          name="sports"
        >
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

          <Form.Item label="Teams to Include" name="teams">
            <Checkbox.Group>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "8px",
                }}
              >
                {teams.map((team) => (
                  <Checkbox key={team.value} value={team.value}>
                    {team.label}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventInformation;
