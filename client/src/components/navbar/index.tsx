/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Logo from '../../assets/Ascap logo.png';
import { Avatar, Badge, Dropdown, MenuProps, Popover } from "antd";
import {
  UserOutlined 
} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { RouterUrl } from "../../routes";
import { IoHomeSharp, IoNotifications, IoMenu } from "react-icons/io5";
import { HiMiniBookOpen } from "react-icons/hi2";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { PiSignIn } from "react-icons/pi";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import useStore from "../../zustand/store/store";
import { logoutAdmin, logoutCustomer, selector } from "../../zustand/store/store.provider";
import { BellOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2';
import useCartItem from "./useCartItem";
import useNotification from "./useNotification";

export const CustomNavbar: React.FC = () => {
  const { cartItemCount } = useCartItem()
  const { notification } = useNotification()
  const customer = useStore(selector('customer'));
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [visible, setVisible] = useState<boolean>(false); // For large screens
  const [visible1, setVisible1] = useState<boolean>(false); // For small screens



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Example breakpoint for large screens
        setVisible1(false);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to check the size on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        logoutCustomer();
        logoutAdmin()
        navigate(RouterUrl.LOGIN);
        Swal.fire('Logged out!', 'You have been successfully logged out.', 'success');
      }
    });
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const handleVisibleChange1 = (visible: boolean) => {
    setVisible1(visible);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => navigate(RouterUrl.CUSTOMER_PROFILE)}>
          Profile
        </span>
      ),
    },
    {
      key: "2",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];
  const notificationsContent = (
    <div className="w-64 p-2 h-72 overflow-y-auto flex flex-col">
      {notification.list.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <>
          {customer.type === 'customer' && <button
            className="text-blue-500 mb-2 self-start"
            onClick={() => navigate(RouterUrl.CUSTOMER_NOTIF)}
          >
            View All
          </button>}
          <div className="flex-1 overflow-y-auto">
            {notification.list.slice(0, 5).map((notification:any) => (
              <div key={notification.NOTIFICATION_ID} className="p-2 border-b">
                <p>{notification.CONTENT}</p>
                <span className="text-gray-500 text-sm">{new Date(notification.CREATED_AT).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  
  const customerLinks = customer.type === 'customer' ? [
    { icon: <IoHomeSharp size={20} />, link: RouterUrl.CUSTOMER_HOME, label: 'Home',key:'1' },
    { icon: <HiMiniBookOpen size={20} />, link: RouterUrl.CUSTOMER_MENU, label: 'Menu',key:'2'  },
    {
      icon: (
        <Badge count={cartItemCount} overflowCount={99} offset={[45, 0]}>
          <FaShoppingCart color="white" size={20} />
        </Badge>
      ),
      link: RouterUrl.CUSTOMER_CART,
      label: 'Cart',key:'3' 
    },
    {
      icon:'',
      label: (
        <Popover
          content={notificationsContent}
          title="Notifications"
          trigger="click"
          open={visible}
          onOpenChange={handleVisibleChange}
        >
          <Badge size="small" count={notification.count} offset={[5, 0]} className={`flex items-center gap-1 cursor-pointer ${visible ? "font-bold text-white" : "text-gray-300"}`}>
            <IoNotifications style={{ fontSize: "24px", color: "#fff" }} />
            <p>Notification</p>
          </Badge>
        </Popover>
      ),
      key:'4' 
    },
    { icon: <FaUserCircle size={20} />, link: RouterUrl.CUSTOMER_PROFILE, label: customer.info?.CUSTOMER_USERNAME || '',key:'5'  },
  ] : customer.type === 'rider' ? [
    { icon: <IoHomeSharp size={20} />, link: RouterUrl.RIDER_HOME, label: 'Home' },
    { icon: <TbTruckDelivery size={20} />, link: RouterUrl.RIDER_DELIVERY, label: 'Delivery' },
    {
      icon:'',
      label: (
        <Popover
          content={notificationsContent}
          title="Notifications"
          trigger="click"
          open={visible}
          onOpenChange={handleVisibleChange}
        >
          <Badge size="small" count={notification.count} offset={[5, 0]} className={`flex items-center gap-1 cursor-pointer ${visible ? "font-bold text-white" : "text-gray-300"}`}>
            <IoNotifications style={{ fontSize: "24px", color: "#fff" }} />
            <p>Notification</p>
          </Badge>
        </Popover>
      ),
      key:'4' 
    },
  ] : customer.type === 'cashier' ? [
    { icon: <IoHomeSharp size={20} />, link: RouterUrl.CASHIERHOME, label: 'Home' },
    { icon: <MdOutlinePointOfSale size={20} />, link: RouterUrl.CASHIERPOS, label: 'POS' },
    { icon: <AiOutlineTransaction size={20} />, link: RouterUrl.CASHIERTRANSACTIONS, label: 'Transactions' },
  ] : [
    { icon: <IoHomeSharp size={20} />, link: RouterUrl.CUSTOMER_HOME, label: 'Home' },
    { icon: <HiMiniBookOpen size={20} />, link: RouterUrl.CUSTOMER_MENU, label: 'Menu' },
  ];




  return (
    <nav className="bg-[#6a040f] w-full h-[56px] fixed top-0 z-50 flex items-center flex-col md:flex-row justify-between md:pl-4 pr-4 gap-4 md:pr-8">
      <div className="flex items-center h-20 w-full justify-between">
        <div className="hidden md:flex cursor-pointer items-center gap-4" onClick={() => navigate(RouterUrl.LOGIN)}>
          <Avatar src={Logo} size={40} />
          <p className="text-white text-3xl ">ASPCAP</p>
        </div>
        <button
          className="md:hidden ml-4 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IoMenu size={24} />
        </button>
        <div className="md:hidden flex gap-4 items-center">
              {/* Popover for small screens */}
              <Popover
                content={notificationsContent}
                title="Notifications"
                trigger="click"
                open={visible1}
                onOpenChange={handleVisibleChange1}
              >
                <Badge size="small" count={notification.list.length} offset={[5, 0]}>
                  <BellOutlined style={{ fontSize: "24px", color: "#fff" }} />
                </Badge>
              </Popover>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer',backgroundColor: '#87d068' }}/>
              </Dropdown>
            </div>
      </div>
      <div className={`md:flex ${isMenuOpen ? "absolute inset-0 bg-[#6a040f] flex flex-col transition-transform duration-500 transform scale-100 top-12 h-screen" : "hidden"} md:relative md:flex-row md:items-center md:justify-between`}>
        <ul className="flex flex-col md:flex-row pl-8 pt-12 md:pt-0 gap-8 text-white">
          {customerLinks.map((v: any, i: number) =>
            isMenuOpen && (v.key === '4' || v.key === '5') ? null :  (
              <li
                className={`flex items-center gap-1 cursor-pointer ${location.pathname === v.link ? "font-bold text-white" : "text-gray-300"}`}
                key={i}
                onClick={v.key !== '4' ? () => navigate(v.link) : undefined}
              >
                {v.icon}
                {v.label}
              </li>
            )
          )}
          {customer?.isAuthenticated ? (
            <li className="flex items-center gap-1 cursor-pointer text-gray-300 hover:text-white" onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li className="flex items-center gap-1 cursor-pointer whitespace-nowrap text-gray-300 hover:text-white" onClick={() => navigate('/')}>
              <PiSignIn size={20} />Sign In
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
