import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { RouterUrl } from './routes'
import { Private, Public } from './layout'
import { AdminDashboard, EventsPage, LandingPage, LoginPage, RegistrationPage, SportsPage, TeamsPage } from './pages'

function App() {
  const router = createBrowserRouter([
    {
      path:RouterUrl.LandingPage,
      element:<Public />,
      children: [
        { path: RouterUrl.LandingPage, element: <LandingPage /> },
        { path: RouterUrl.Login, element: <LoginPage /> },
        { path: RouterUrl.Registration, element: <RegistrationPage /> },
      ]
    },
    {
      path:RouterUrl.LandingPage,
      element:<Private />,
      children:[
        { path: RouterUrl.AdminDashboard, element: <AdminDashboard /> },
        { path: RouterUrl.AdminTeams, element: <TeamsPage /> },
        { path: RouterUrl.AdminEvents, element: <EventsPage /> },
        { path: RouterUrl.AdminSports, element: <SportsPage /> },
      ]
    }
  ]);

  return (
    <>
    <RouterProvider router={router} fallbackElement={<h6>Loading...</h6>}  />
    </>
  )
  
}

export default App
