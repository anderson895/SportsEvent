import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useStore from "../zustand/store/store";
import { selector } from "../zustand/store/store.provider";
import { RouterUrl } from "../routes";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  TrophyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { TbTimelineEventText, TbOlympics } from "react-icons/tb";
import { Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard", path: RouterUrl.AdminDashboard },
  { key: "sports", icon: <TbOlympics />, label: "Sports", path: RouterUrl.AdminSports },
  { key: "events", icon: <TbTimelineEventText />, label: "Events", path: RouterUrl.AdminEvents },
  { key: "teams", icon: <TeamOutlined />, label: "Teams", path: RouterUrl.AdminTeams },
  { key: "schedule", icon: <CalendarOutlined />, label: "Game Schedule", path: "/schedule" },
  { key: "match-making", icon: <TeamOutlined />, label: "Match Making", path: "/match-making" },
  { key: "results", icon: <TrophyOutlined />, label: "Results", path: "/results" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings", path: "/settings" },
];

export default function Private() {
  const admin = useStore(selector('admin'));
  const navigate = useNavigate();
  const location = useLocation();

  const currentMenuKey = menuItems.find(item => location.pathname.includes(item.path))?.key || "dashboard";

  const handleMenuClick = (e: { key: string; }) => {
    const selectedItem = menuItems.find(item => item.key === e.key);
    if (selectedItem) navigate(selectedItem.path);
  };

  if (!admin.isAuthenticated) {
    return <Navigate replace to={RouterUrl.Login} />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header" style={{ backgroundColor: "#001529" }}>
        <div className="logo" style={{ color: "#fff", fontSize: "1.5rem" }}>
          Sports Event Manager
        </div>
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
            <Breadcrumb.Item>{currentMenuKey.charAt(0).toUpperCase() + currentMenuKey.slice(1)}</Breadcrumb.Item>
          </Breadcrumb>

          <Content style={{ padding: 24, margin: 0, minHeight: 280, backgroundColor: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
