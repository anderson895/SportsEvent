/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useStore from '../../zustand/store/store';
import { selector } from '../../zustand/store/store.provider';
import CustomerServices from '../../config/request/customer';

export default function useCartItem() {
  const customer = useStore(selector('customer'));
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItems = async () => {
    try {
      if (customer.type === 'customer') {
        const customer_id = customer.info.CUSTOMER_ID;
        const cartResponse = await CustomerServices.getCartItems(customer_id);
        setCartItemCount(cartResponse.data.results?.length || 0);
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
    cartItemCount
  };
}
