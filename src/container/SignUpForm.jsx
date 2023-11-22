import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BackGroundWebViewVideo from "../assets/videos/web-view.mp4";
import validateRegistration from "../validation/user/registration";
import { registration } from "../redux/action";
import { notifyWarning, getLocalStorageItem } from "../utils/helper";

const SignUpForm = () => {
  const [form, setForm] = useState({
    email: "",
    mobile_no: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getLocalStorageItem("token") && getLocalStorageItem("login")) {
      navigate("/dashboard");
    } else {
      navigate("/sign-up");
    }
  }, []);

  const changeHandler = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo(0, 0);

    if (form?.password !== form?.confirm_password) {
      let message = "New password and confirm password doesn’t match.";
      notifyWarning(message);
    } else {
      const { errors, isValid } = validateRegistration(form);
      if (isValid) {
        const formPayload = {
          email: form?.email,
          mobile_no: form?.mobile_no,
          password: form?.password,
        };

        dispatch(
          registration({
            formPayload,
            callback: (data) => {
              if (data) {
                navigate("/otp-screen", {
                  state: { mobile_no: form?.mobile_no },
                });
              }
            },
          })
        );
      } else {
        setError(errors);
      }
    }
  };

  return (
    <div className="relative h-screen">
      <video className="object-cover w-full h-full" autoPlay loop muted>
        <source src={BackGroundWebViewVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Add other content on top of the video if needed */}
      <div className="absolute inset-0 flex items-center justify-center text-white z-20">
        {/* Your additional content goes here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <form className="bg-[#1C201E] bg-opacity-70 p-8 shadow-md rounded-lg flex flex-col items-center">
            {/* ... your form content ... */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-cyan-100 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form?.email || ""}
                onChange={(e) => changeHandler(e)}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
              {error?.email && (
                <div className="text-rose-600 font-serif">{error?.email}</div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-cyan-100 text-sm font-bold mb-2"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile_no"
                value={form?.mobile_no || ""}
                onChange={(e) => changeHandler(e)}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your mobile number"
              />
              {error?.mobile_no && (
                <div className="text-rose-600 font-serif">
                  {error?.mobile_no}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-cyan-100 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form?.password || ""}
                onChange={(e) => changeHandler(e)}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
              {error?.password && (
                <div className="text-rose-600 font-serif">
                  {error?.password}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-cyan-100 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirm_password"
                value={form?.confirm_password || ""}
                onChange={(e) => changeHandler(e)}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your password"
              />
              {error?.confirm_password && (
                <div className="text-rose-600 font-serif">
                  {error?.confirm_password}
                </div>
              )}
            </div>

            <p className="text-center my-2 text-cyan-100">
              Already a member ?
              <span className="red mx-2">
                <Link className="red" to="/">
                  Log In
                </Link>
              </span>
            </p>

            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="bg-[#F0E68C] hover:bg-[#483C32] text-[#572E1C] hover:text-[#D2B48C] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
