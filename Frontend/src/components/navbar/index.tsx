import React, { useState } from "react";
import { Avatar, Badge, Popover } from "antd";
import { IoMenu, IoNotifications } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/Ascap logo.png";

export const CustomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const notificationsContent = (
    <div className="w-64 p-2 h-72 overflow-y-auto flex flex-col">
      <p>No new notifications</p>
    </div>
  );

  const links = [
    { label: "Home", link: "/home" },
    { label: "Menu", link: "/menu" },
    { label: "Cart", link: "/cart" },
    { label: "Profile", link: "/profile" },
  ];

  return (
    <nav className="bg-[#6a040f] w-full h-[56px] fixed top-0 z-50 flex items-center flex-col md:flex-row justify-between md:pl-4 pr-4 gap-4 md:pr-8">
      <div className="flex items-center h-20 w-full justify-between">
        <div
          className="hidden md:flex cursor-pointer items-center gap-4"
          onClick={() => navigate("/")}
        >
          <Avatar src={Logo} size={40} />
          <p className="text-white text-3xl">ASPCAP</p>
        </div>
        <button
          className="md:hidden ml-4 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IoMenu size={24} />
        </button>
        <div className="md:hidden flex gap-4 items-center">
          <Popover content={notificationsContent} title="Notifications" trigger="click">
            <Badge size="small" count={0} offset={[5, 0]}>
              <IoNotifications style={{ fontSize: "24px", color: "#fff" }} />
            </Badge>
          </Popover>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block md:flex md:items-center`}
      >
        <ul className="flex flex-col md:flex-row gap-8 text-white">
          {links.map((v, i) => (
            <li
              key={i}
              className={`cursor-pointer ${
                location.pathname === v.link ? "font-bold text-white" : "text-gray-300"
              }`}
              onClick={() => navigate(v.link)}
            >
              {v.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
