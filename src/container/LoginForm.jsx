import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BackGroundWebViewVideo from "../assets/videos/web-view.mp4";
import validateLogin from "../validation/auth/login";
import { login } from "../redux/action";
import { getLocalStorageItem } from "../utils/helper";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getLocalStorageItem("token") && getLocalStorageItem("login")) {
      navigate("/dashboard");
    } else {
      navigate("/");
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();

    const { errors, isValid } = validateLogin(form);

    if (isValid) {
      const formPayload = {
        email: form?.email,
        password: form?.password,
      };

      dispatch(
        login({
          formPayload,
          callback: (data) => {
            if (data) {
              navigate("/dashboard");
            }
          },
        })
      );
    } else {
      setError(errors);
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
        {/* <LoginForm/> */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <form className="bg-[#1C201E] bg-opacity-70 p-8 shadow-md rounded-lg">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-cyan-100 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
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

            <p className="text-center my-2 text-cyan-100">
              Not a member ?
              <span className="red mx-2">
                <Link className="red" to="/sign-up">
                  Signup
                </Link>
              </span>
            </p>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                onClick={(e) => handleOnSubmit(e)}
                className="bg-[#F0E68C] hover:bg-[#483C32] text-[#572E1C] hover:text-[#D2B48C] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
