/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import useStore from '../../zustand/store/store';
import { selector } from '../../zustand/store/store.provider';
import CustomerServices from '../../config/request/customer';

export default function useNotification() {
    const customer = useStore(selector('customer'));
    const [notification, setNotification] = useState({
        count:0,
        list:[]
    });
  
    const fetchCartItems = async () => {
      try {
        if (customer.type === 'customer') {
          const customer_id = customer.info.CUSTOMER_ID;
          const notificationResponse = await CustomerServices.allNotifications(customer_id);   
          setNotification({
            count:notificationResponse.data.results.customerNotification?.length || 0,
            list:notificationResponse.data.results?.customerNotification || []
          })
        } else {
            const customer_id = customer.info.RIDER_ID;
            const notificationsData = await CustomerServices.allNotifications(customer_id);
            setNotification({
                count:notificationsData.data.results.riderNotification?.length || 0,
                list:notificationsData.data.results.riderNotification || []
              })
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchCartItems(); // Initial fetch
      const interval = setInterval(fetchCartItems, 2000);
  
      return () => clearInterval(interval);   
    }, [customer]);
  return {
    notification
  }
}
