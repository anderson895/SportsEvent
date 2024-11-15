import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { RouterUrl } from "./routes";
import { Private, Public } from "./layout";
import {
  AdminDashboard,
  EventsPage,
  GameResults,
  GameSchedule,
  GameScoring,
  LandingPage,
  LoginPage,
  MatchScoring,
  RegistrationPage,
  SportsPage,
  TeamsPage,
} from "./pages";
import EventInformation from "./pages/private/events/information";

function App() {
  const router = createBrowserRouter([
    {
      path: RouterUrl.LandingPage,
      element: <Public />,
      children: [
        { path: RouterUrl.LandingPage, element: <LandingPage /> },
        { path: RouterUrl.Login, element: <LoginPage /> },
        { path: RouterUrl.Registration, element: <RegistrationPage /> },
      ],
    },
    {
      path: RouterUrl.LandingPage,
      element: <Private />,
      children: [
        { path: RouterUrl.AdminDashboard, element: <AdminDashboard /> },
        { path: RouterUrl.AdminTeams, element: <TeamsPage /> },
        { path: RouterUrl.AdminGame, element: <GameScoring /> },
        { path: RouterUrl.AdminGameResults, element: <GameResults /> },
        { path: RouterUrl.AdminGameSched, element: <GameSchedule /> },
        { path: RouterUrl.AdminEvents, element: <EventsPage /> },
        { path: RouterUrl.AdminSports, element: <SportsPage /> },
        { path: RouterUrl.EventInfo, element: <EventInformation /> },
        { path: RouterUrl.MatchScoring, element: <MatchScoring /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<h6>Loading...</h6>} />
    </>
  );
}

export default App;
