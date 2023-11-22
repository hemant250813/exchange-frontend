import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { otpVerify } from "../redux/action";
import BackGroundOtpScreenVideo from "../assets/videos/otpscreen.mp4";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "../utils/helper";

const OtpScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setLocalStorageItem("mobile", location?.state?.mobile_no);
    if (getLocalStorageItem("token") && getLocalStorageItem("login")) {
      navigate("/dashboard");
    } else {
      navigate("/otp-screen");
    }
  }, []);

  const OtpInput = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      const isOtpFilled = newOtp?.every((otp) => otp !== "");
      if (isOtpFilled) {
        let otp = newOtp?.join("");
        let mobile_no = JSON.parse(getLocalStorageItem("mobile"));
        const formPayload = {
          mobile_no: mobile_no?.toString(),
          otp: otp,
        };

        dispatch(
          otpVerify({
            formPayload,
            callback: (data) => {
              if (data) {
                removeLocalStorageItem("mobile");
                navigate("/");
              }
            },
          })
        );
      }
    };

    const handleKeyDown = (index, e) => {
      // Move focus to the previous input box on backspace
      if (e.key === "Backspace" && index > 0 && otp[index] === "") {
        inputRefs.current[index - 1].focus();
      }
    };

    return (
      <form>
        <div className="flex flex-wrap justify-center items-center">
          {/* Input box for each digit */}
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md w-12 h-12 text-center mx-1 mb-2 focus:outline-none"
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>
      </form>
    );
  };

  return (
    <div className="relative h-screen">
      <video className="object-cover w-full h-full" autoPlay loop muted>
        <source src={BackGroundOtpScreenVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center text-white z-20">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <p className="text-2xl text-center text-white mb-4">Enter OTP</p>
          <span></span>
          <OtpInput />
          {/* Additional content or buttons can be added here */}
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
