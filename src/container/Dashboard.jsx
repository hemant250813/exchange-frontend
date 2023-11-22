import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../component/layout/index";
import { FcComboChart } from "react-icons/fc";
import Market from "../assets/videos/market.mp4";
import { getLocalStorageItem } from "../utils/helper";
import { hover } from "@testing-library/user-event/dist/hover";
// import Market from "../assets/videos/mobile-view.mp4";

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [cryptoCurrency, setCryptoCurrency] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    // Replace 'your-ws-url' with your actual WebSocket URL
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=!ticker@arr"
    );

    // Event listener for when the connection is established
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    // Event listener for receiving messages
    socket.addEventListener("message", (event) => {
      let cryptoData = JSON.parse(event.data);

      let modified = cryptoData?.data?.map((crypto) => {
        return {
          name: crypto?.s,
          price: crypto?.b,
          change: crypto?.p,
        };
      });
      setCryptoCurrency(modified);
      // console.log("WebSocket message received:", modified);
    });

    // Event listener for errors
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    // Event listener for when the connection is closed
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    // Cleanup function to close the WebSocket when the component is unmounted
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    if (getLocalStorageItem("token") && getLocalStorageItem("login")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  // Sample array of cryptocurrency data
  return (
    <div className="flex h-screen">
      {windowWidth >= 768 && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4B5563] scrollbar-track-[#000000] bg-gray-600 p-4"
          style={{ maxHeight: "calc(100vh - 120px)", maxWidth: "100%" }}
        >
          {/* Title */}
          <div className="flex   p-4 rounded-md w-full max-w-screen-xl mx-auto mb-5">
            <div className="flex-1 ">
              <span className="text-3xl text-white font-bold">Market</span>
            </div>
            <div className={`"flex"}`}>
              <video className="object-cover w-14 h-14" autoPlay loop muted>
                <source src={Market} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {/* Title */}

          {/* Column Headers */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex ${
              isHovered ? "thunder-spark" : ""
            }  bg-black p-4 rounded-md w-full max-w-screen-xl text-teal-300 mx-auto mb-5 border border-[#33FFF0]`}
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              // background: "#4fd1c5",
            }}
          >
            <div className="flex-1 ">
              <p
                className={`${
                  windowWidth >= 1024 ? "text-lg" : "text-base"
                }  font-semibold `}
              >
                Exchange
              </p>
            </div>
            <div className={`${windowWidth >= 768 && "flex"}`}>
              <p
                className={`${windowWidth >= 1024 ? "text-lg" : "text-xs"}  ${
                  windowWidth <= 768 && "mb-3"
                } font-semibold mr-10`}
              >
                Price
              </p>
              <p
                className={`${
                  windowWidth >= 1024 ? "text-lg" : "text-xs"
                }  font-semibold`}
              >
                Change
              </p>
            </div>
          </div>

          {/* Mapping through the array to display cryptocurrency data */}
          {cryptoCurrency?.map((crypto, index) => (
            <div
              key={index}
              className="bg-black hover:bg-teal-700  text-white p-4 rounded-md max-w-screen-xl mx-auto mb-5 flex transition-transform transform hover:translate-y-3 cursor-pointer"
              style={{ transition: "transform 0.1s ease" }}
            >
              <div className="flex-1">
                <h3 className={`text-lg font-semibold `}>{crypto?.name}</h3>
              </div>
              <div className="flex flex-col sm:flex-row">
                <p className={`text-xs mb-2 sm:mb-0 sm:mr-5`}>
                  {crypto?.price}
                </p>
                <p
                  className={`text-xs font-bold p-2 rounded-md ${
                    crypto?.change > 0 ? "bg-green-800" : "bg-red-600"
                  }`}
                >
                  {crypto?.change}
                </p>
              </div>
            </div>
          ))}
        </main>

        {/* Bottom navbar */}
        {windowWidth < 768 ? <BottomNavbar /> : <Footer />}
      </div>
    </div>
  );
};

export default Dashboard;
