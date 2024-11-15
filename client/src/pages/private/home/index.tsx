import React from 'react';
import { Link } from 'react-router-dom';
import { PieChartOutlined, TeamOutlined, CalendarOutlined, TrophyOutlined, NotificationOutlined } from '@ant-design/icons';

export const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <DashboardCard icon={<PieChartOutlined />} title="Total Teams" count="12" color="bg-blue-500" />
        <DashboardCard icon={<TeamOutlined />} title="Total Players" count="150" color="bg-green-500" />
        <DashboardCard icon={<CalendarOutlined />} title="Upcoming Matches" count="4" color="bg-purple-500" />
        <DashboardCard icon={<TrophyOutlined />} title="Recent Results" count="3" color="bg-yellow-500" />
      </div>

      {/* Upcoming Matches Section */}
      <Section title="Upcoming Matches">
        <div className="space-y-4">
          {/* Each match component */}
          <MatchCard date="Nov 17, 2024" team1="College of Computer Studies" team2="College of Teacher Education" time="6:00 PM" />
          <MatchCard date="Nov 18, 2024" team1="College of Business" team2="College of Engineering" time="8:00 PM" />
        </div>
        <Link to="/admin/matches" className="text-blue-500 mt-4 inline-block">View All Matches</Link>
      </Section>

      {/* Recent Results Section */}
      <Section title="Recent Results">
        <div className="space-y-4">
          {/* Each result component */}
          <ResultCard team1="College of Computer Studies" score1="16" team2="College of Teacher Education" score2="20" date="Nov 10, 2024" />
          <ResultCard team1="College of Arts" score1="12" team2="College of Law" score2="18" date="Nov 09, 2024" />
        </div>
        <Link to="/admin/results" className="text-blue-500 mt-4 inline-block">View All Results</Link>
      </Section>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <ManagementCard title="Manage Teams" link="/admin/teams" icon={<TeamOutlined />} />
        <ManagementCard title="Manage Players" link="/admin/players" icon={<TeamOutlined />} />
      </div>

      {/* Notifications Section */}
      <Section title="Notifications">
        <div className="space-y-2">
          <NotificationItem text="Player John Doe has been added to College of Engineering" />
          <NotificationItem text="Match rescheduled between College of Business and College of Law" />
          <NotificationItem text="New player request from College of Medicine" />
        </div>
        <Link to="/admin/notifications" className="text-blue-500 mt-4 inline-block">View All Notifications</Link>
      </Section>
    </div>
  );
};

// Card component for displaying stats
const DashboardCard = ({ icon, title, count, color }) => (
  <div className={`flex items-center p-6 text-white ${color} rounded-lg shadow-lg`}>
    <div className="text-4xl mr-4">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </div>
);

// Section component
const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

// Card component for matches
const MatchCard = ({ date, team1, team2, time }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
    <div>
      <p className="text-gray-600">{date}</p>
      <p className="text-lg font-semibold">{team1} vs {team2}</p>
      <p className="text-gray-500">{time}</p>
    </div>
    <CalendarOutlined className="text-3xl text-gray-400" />
  </div>
);

// Card component for recent results
const ResultCard = ({ team1, score1, team2, score2, date }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
    <div>
      <p className="text-gray-600">{date}</p>
      <p className="text-lg font-semibold">{team1} <span className="text-blue-500">{score1}</span> vs <span className="text-green-500">{score2}</span> {team2}</p>
    </div>
    <TrophyOutlined className="text-3xl text-yellow-500" />
  </div>
);

// Card component for management sections
const ManagementCard = ({ title, link, icon }) => (
  <Link to={link} className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-gray-100 transition">
    <div className="flex items-center space-x-4">
      <div className="text-4xl text-gray-400">{icon}</div>
      <div className="text-lg font-semibold text-gray-700">{title}</div>
    </div>
    <span className="text-blue-500 font-semibold">Manage</span>
  </Link>
);

// Notification item component
const NotificationItem = ({ text }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-gray-700 flex items-center">
    <NotificationOutlined className="text-xl text-blue-500 mr-4" />
    <p>{text}</p>
  </div>
);

export default AdminDashboard;
