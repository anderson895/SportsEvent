import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RouterUrl } from "../../routes";

export const CustomFooter: React.FC = () => {
  const navigate = useNavigate()

  return (
    <footer className="w-full flex flex-col  h-max sm:h-[281px] md:h-[281px]">
      <div className="border-t-2 border-gray-300 h-full sm:h-[201px] w-full flex flex-col sm:flex-row px-12 py-8 flex-nowrap">
        <div className="flex-1">
          <h2 className="font-semibold text-xl">CUSTOMER SERVICE</h2>
          <br />
          <ul className="text-[#dc3545] text-lg">
            <li className="cursor-pointer" onClick={() => navigate(RouterUrl.ORDER_TRACKING)}>Order Tracking</li>
            <li className="cursor-pointer" onClick={() => navigate(RouterUrl.RETURN_REFUND)}>Return & Refund</li>
            <li className="cursor-pointer" onClick={() => navigate(RouterUrl.CONTACT_US)}>Contact Us</li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-xl">ABOUT ASPCAP</h2>
          <br />
          <ul className="text-[#dc3545] text-lg">
            <li className="cursor-pointer" onClick={() => navigate(RouterUrl.ABOUT_US)}>About Us</li>
            <li className="cursor-pointer" onClick={() => navigate(RouterUrl.PRIVACY_POLICY)}>Privacy Policy</li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-xl">PAYMENT</h2>
          <br />
          <ul className="text-[#dc3545] text-lg">
            <li className="cursor-pointer" onClick={() => navigate(RouterUrl.CASHON_DELIVERY)}>Cash On Delivery</li>
            <li className="cursor-pointer" onClick={() => navigate(RouterUrl.GCASH)}>G-Cash</li>
          </ul>
        </div>
      </div>
      <div className="bg-[#6a040f] w-full h-20 flex items-center justify-between px-4">
        <p>© 2024 ASPCAP. All rights reserved.</p>
        <div className="flex gap-4">
          <FaFacebookF size={24} color="white" />
        </div>
      </div>
    </footer>
  );
};
