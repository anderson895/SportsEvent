import React from "react";
import { Modal, Button } from "antd";
import Marquee from "react-fast-marquee";
import useSportEventHooks, {
  SportEventInformationProps,
} from "./useSportEventHooks";
import AdminMatchForm from "../../../components/form/Matchmaking";
import MainBracket from "../../../components/brackets/mainBracket";
import { useNavigate } from "react-router-dom";

const SportEventInformation: React.FC<SportEventInformationProps> = ({
  sportDetails,
}) => {
  const {
    matches,
    isModalVisible,
    handleGenerateMatchup,
    showModal,
    handleCloseModal
  } = useSportEventHooks({ sportDetails });
  const navigate = useNavigate();

  if (!sportDetails && !matches) return null;

  const handleBack = () => navigate(-0);
  console.log(sportDetails)
  return (  
    <div className="p-6 mt-4 mx-auto">
      <Button type="default" onClick={handleBack} className="mb-4">
        Back
      </Button>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={sportDetails.sportInfo.sportsLogo}
          alt={sportDetails.sportInfo.sportsName}
          className="w-24 h-24 object-cover"
        />
        <h2 className="text-2xl font-semibold">
          {sportDetails.sportInfo.sportsName}
        </h2>
        <p className="text-gray-700">
          Bracket Type: {sportDetails.bracketType}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{
            __html: sportDetails.sportInfo.description,
          }}
        />
      </div>

      <h3 className="text-lg font-semibold mt-4">
        List of Participating Teams
      </h3>
      <Marquee gradient={false} speed={40} className="p-4">
        <div className="grid grid-cols-8 p-4">
          {sportDetails.teams.map((team, index) => (
            <div
              key={index}
              className="flex flex-col mx-4 items-center p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src={team.teamLogo}
                  className="w-full h-full object-cover"
                  alt={team.teamName}
                />
              </div>
              <p className="text-center mt-2">{team.teamName}</p>
            </div>
          ))}
        </div>
      </Marquee>

      <div className="flex mt-6">
        {matches?.matches.length === 0 && (
          <Button type="primary" onClick={sportDetails.bracketType === "Round Robin" ? () =>handleGenerateMatchup(sportDetails.teams) : showModal} className="mr-4">
            Set Up Matches
          </Button>
        )}
      </div>

      <div className="mt-8">
        <MainBracket
          bracketType={sportDetails.bracketType}
          matches={matches?.matches}
          teams={sportDetails?.teams}
        />
      </div>

      <Modal
        title="Set Up Matches"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={900}
        centered
      >
        <AdminMatchForm
          sportDetails={sportDetails}
          teams={sportDetails.teams}
        />
      </Modal>
    </div>
  );
};

export default SportEventInformation;
