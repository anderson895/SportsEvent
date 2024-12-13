import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useStore from "../zustand/store/store";
import { logoutAdmin, selector } from "../zustand/store/store.provider";
import { RouterUrl } from "../routes";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { TbScoreboard } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { TbTimelineEventText, TbOlympics } from "react-icons/tb";
import { Outlet } from "react-router-dom";
import { GrSchedules } from "react-icons/gr";
import { FaTrophy } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";

const { Header, Content, Sider } = Layout;

const menuItems = [
  { key: "dashboard", icon: <MdDashboard size={25} />, label: "Dashboard", path: RouterUrl.AdminDashboard },
  { key: "sports", icon: <TbOlympics size={25} />, label: "Sports", path: RouterUrl.AdminSports },
  { key: "accounts", icon: <MdManageAccounts size={25} />, label: "Accounts", path: RouterUrl.Accounts },
  { key: "teams", icon: <RiTeamFill size={25} />, label: "Teams", path: RouterUrl.AdminTeams },
  { key: "events", icon: <TbTimelineEventText size={25} />, label: "Events", path: RouterUrl.AdminEvents },
  { key: "schedule", icon: <GrSchedules size={25} />, label: "Game Schedule", path: RouterUrl.AdminGameSched },
  { key: "scoring", icon: <TbScoreboard size={25} />, label: "Game Scoring", path: RouterUrl.AdminGame },
  { key: "results", icon: <FaTrophy size={25} />, label: "Results", path: RouterUrl.AdminGameResults },
  { key: "media", icon: <MdOutlinePermMedia size={25} />, label: "Media", path: RouterUrl.AdminMedia },
];

export default function Private() {
  const admin = useStore(selector("admin"));
  const navigate = useNavigate();
  const location = useLocation();

  const currentMenuKey = menuItems.find((item) => location.pathname.includes(item.path))?.key || "dashboard";

  const handleMenuClick = (e: { key: string }) => {
    const selectedItem = menuItems.find((item) => item.key === e.key);
    if (selectedItem) navigate(selectedItem.path);
  };

  const handleLogout = () => {
    logoutAdmin()
    navigate(RouterUrl.Login); 
  };

  if (!admin.isAuthenticated) {
    return <Navigate replace to={RouterUrl.Login} />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header" style={{ backgroundColor: "#001529", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
        <div className="logo" style={{ color: "#fff", fontSize: "1.5rem" }}>
          Sports Event Manager
        </div>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Layout>
        <Sider width={250} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            selectedKeys={[currentMenuKey]}
            onClick={handleMenuClick}
            style={{ height: "100%", borderRight: 0 }}
          >
            {menuItems.map(({ key, icon, label }) => (
              <Menu.Item key={key} icon={icon}>
                {label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>
              {currentMenuKey.charAt(0).toUpperCase() + currentMenuKey.slice(1)}
            </Breadcrumb.Item>
          </Breadcrumb>

          <Content style={{ padding: 24, margin: 0, minHeight: 280, backgroundColor: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
