import React from "react";
import { Link } from 'react-router-dom'; 
import { RxDashboard } from "react-icons/rx";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";

const BottomNavbar = () => {
  return (
    <div className="bg-gray-900 text-white p-4">
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex space-x-14">
        {/* Navbar Links */}
        <Link to="/dashboard" className="text-[#33FFF0] hover:text-white"> <RxDashboard size={32} /></Link>
        <Link to="/dashboard" className="text-[#33FFF0] hover:text-white"><BsSuitcaseLgFill size={32} /></Link>
        <Link to="/dashboard" className="text-[#33FFF0] hover:text-white"><AiOutlineTransaction size={32} /></Link>
      </div>
    </div>
  </div>
  );
};

export default BottomNavbar;
