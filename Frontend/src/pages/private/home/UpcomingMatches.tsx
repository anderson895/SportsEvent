import React from "react";

interface Match {
  team1Name: string;
  team2Name: string;
  schedule: string;
  status: string;
}

interface UpcomingMatchesProps {
  matches: Match[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Upcoming Matches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {matches.map((match, index) => (
             <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start space-y-4">
             <h2 className="text-lg font-bold text-gray-800">{`${match.team1Name} vs ${match.team2Name}`}</h2>
             <p className="text-sm text-gray-500">Schedule: {match.schedule}</p>
             <p
               className={`text-sm font-semibold ${
                 status === "Scheduled"
                   ? "text-green-600"
                   : "text-red-600"
               }`}
             >
               {match.status}
             </p>
           </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
