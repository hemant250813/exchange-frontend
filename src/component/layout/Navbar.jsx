import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../../assets/images/profile/profile.jpeg"; // Replace with the actual path to your profile picture
import { removeLocalStorageItem, getLocalStorageItem } from "../../utils/helper";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (getLocalStorageItem("token") && getLocalStorageItem("login")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    e.preventDefault();
    removeLocalStorageItem("login");
    removeLocalStorageItem("token");
    navigate("/");
  };

  return (
    <div className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Crypto Dashboard</h1>

        <div
          className="relative"
          style={{
            position: "absolute",
            top: "4%",
            right: "2rem",
            transform: "translateY(-50%)",
          }}
        >
          <button onClick={toggleDropdown} className="focus:outline-none">
            <img
              src={profilePic}
              alt="Profile"
              className="w-11 h-11 rounded-full border border-[#33FFF0] border-2"
            />
          </button>

          {isDropdownOpen && (
            <div
            className="absolute top-full right-0 mt-4 bg-black  text-gray-800 rounded shadow-md transition-all duration-300 border border-[#33FFF0] border-2"
            style={{
              position: "absolute",
              top: 30,
              zIndex: 20,
            }}
          >
            <ul>
              <li className="py-2 px-4 cursor-pointer hover:bg-[#4fd1c5] hover:text-white text-gray-600 font-bold">
                Profile
              </li>
              <li className="py-2 px-4 cursor-pointer hover:bg-[#4fd1c5] hover:text-white text-gray-600 font-bold">
                Settings
              </li>
              <li
                onClick={(e) => handleLogOut(e)}
                className="py-2 px-4 cursor-pointer hover:bg-[#4fd1c5] hover:text-white text-gray-600 font-bold"
              >
                Logout
              </li>
            </ul>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
