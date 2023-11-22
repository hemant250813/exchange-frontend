// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import hamburger and close icons
import { RxDashboard } from "react-icons/rx";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";

const Sidebar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Function to update the window dimensions
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Add an event listener to update dimensions when the window is resized
    window.addEventListener("resize", updateWindowDimensions);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [windowWidth, windowHeight]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  console.log("windowWidth", windowWidth);
  return (
    <div
      className={`relative ${
        windowWidth >= 1024
          ? isSidebarOpen
            ? "w-1/5"
            : "w-1/12"
          : isSidebarOpen
          ? "w-2/5"
          : "w-1/5"
      } bg-gray-800 text-white h-screen p-4 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        {/* <div className="flex items-center ml-12"> */}
        <div className="flex items-center ">
          {/* Adjusted the margin here */}
          <FaGlobe size={24} className="text-[#4fd1c5]" />
        </div>
        <button
          onClick={toggleSidebar}
          className={`text-white focus:outline-none p-2`}
        >
          {/* {isSidebarOpen ? <FiX size={32} /> : <FiMenu className="text-blue-500" size={32} />} */}
          <FiMenu className="text-[#4fd1c5]" size={32} />
        </button>
      </div>

      {isSidebarOpen ? (
        <ul className="mt-4">
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="text-[#4fd1c5] hover:text-blue-700"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="text-[#4fd1c5] hover:text-blue-700"
            >
              Portfolio
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="text-[#4fd1c5] hover:text-blue-700"
            >
              Transactions
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="mt-4">
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="text-[#4fd1c5] hover:text-blue-700"
            >
              {" "}
              <RxDashboard size={32} />
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="text-[#4fd1c5] hover:text-blue-700"
            >
              <BsSuitcaseLgFill size={32} />
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="text-[#4fd1c5] hover:text-blue-700"
            >
              <AiOutlineTransaction size={32} />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
