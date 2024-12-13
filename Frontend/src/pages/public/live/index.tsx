/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchData } from "../../../config/axios/requestData";
import SportsServices from "../../../config/service/sports";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const LiveMatch = () => {
  const navigate = useNavigate()
  const { eventName, sportName, matchId } = useParams<any>();

  // Fetch summary data
  const { data: [summary] = [], isLoading } = useFetchData(
    ["summary"],
    [() => SportsServices.fetchSportsSummary()],
    { interval: 1000 }
  );


  const matchInfo = summary?.events
    ?.find((v: any) => v.eventName === eventName)
    ?.sportsEvents?.find((x: any) => x.sportsName === sportName)
    ?.matches?.find((y: any) => y.matchId.toString() === matchId);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading match data...</p>
      </div>
    );
  }

  if (!matchInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Match not found or invalid URL parameters.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 min-h-screen relative overflow-hidden">
    <header className="bg-[#f8ba00] h-24 shadow-md ">
      <div className="flex justify-end relative items-center">
        {/* Logo and Title Section */}
        <div onClick={() => navigate('/')} className="absolute cursor-pointer top-0 -left-12 flex items-center z-50 pl-24 gap-4 bg-[#064518] text-white pr-12 py-2 h-28 w-[40%] -skew-x-12">
          <img src="/ncfi-logo.png" className="w-24" alt="NCFI Logo" />
          <p className="text-3xl font-bold">Naga College Foundation, Inc.</p>
        </div>

      </div>
    </header>
      <main className="min-h-screen px-8 py-12 pt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto relative overflow-hidden">
          <h2 className="text-4xl font-bold text-center mb-6 text-green-700">
            Live Match
          </h2>
          <p className="text-center text-gray-700 mb-10 text-lg">
            {matchInfo.team1Name} VS {matchInfo.team2Name}
          </p>

          <div className="flex justify-between items-center gap-8 mb-12">
            {/* Team 1 */}
            <motion.div
              className="text-center p-4 bg-gradient-to-t from-gray-100 to-gray-50 shadow-lg rounded-xl relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <img
                src={matchInfo.team1Logo}
                alt={matchInfo.team1Name}
                className="w-28 h-28 rounded-full mx-auto border-4 border-green-700 shadow"
              />
              <p className="text-xl font-semibold mt-4 text-gray-800">
                {matchInfo.team1Name}
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                Score: {matchInfo.team1Score}
              </p>
            </motion.div>

            <p className="text-2xl font-bold text-gray-800">VS</p>

            {/* Team 2 */}
            <motion.div
              className="text-center p-4 bg-gradient-to-t from-gray-100 to-gray-50 shadow-lg rounded-xl relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <img
                src={matchInfo.team2Logo}
                alt={matchInfo.team2Name}
                className="w-28 h-28 rounded-full mx-auto border-4 border-blue-700 shadow"
              />
              <p className="text-xl font-semibold mt-4 text-gray-800">
                {matchInfo.team2Name}
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                Score: {matchInfo.team2Score}
              </p>
            </motion.div>
          </div>

          {/* Venue and Schedule */}
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg">
              <strong>Venue:</strong> {matchInfo.venue || "Unknown"}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Schedule:</strong>{" "}
              {new Date(matchInfo.schedule).toLocaleString()}
            </p>
          </div>

        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4" id="contact">
        <p>&copy; 2024 SportsCentral. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LiveMatch;
