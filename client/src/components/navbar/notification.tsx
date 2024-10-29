/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/NotificationsPage.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerServices from "../../config/request/customer";
import useStore from "../../zustand/store/store";
import { selector } from "../../zustand/store/store.provider";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const customer = useStore(selector('customer'))
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const customer_id = customer.info.CUSTOMER_ID
        const response = await CustomerServices.allNotifications(customer_id);
        setNotifications(response.data.results.customerNotification || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.NOTIFICATION_ID} className="p-2 border-b">
            <p>{notification.CONTENT}</p>
            <span className="text-gray-500 text-sm">{new Date(notification.CREATED_AT).toLocaleString()}</span>
          </div>
        ))
      )}
      <button
        className="mt-4 text-blue-500"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        Go Back
      </button>
    </div>
  );
};

export default NotificationsPage;
