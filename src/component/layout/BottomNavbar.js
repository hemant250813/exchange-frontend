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
        <Link to="/" className="text-[#4fd1c5] hover:text-blue-700"> <RxDashboard size={32} /></Link>
        <Link to="/dashboard" className="text-[#4fd1c5] hover:text-blue-700"><BsSuitcaseLgFill size={32} /></Link>
        <Link to="/contact" className="text-[#4fd1c5] hover:text-blue-700"><AiOutlineTransaction size={32} /></Link>
      </div>
    </div>
  </div>
  );
};

export default BottomNavbar;
