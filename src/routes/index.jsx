import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../container/LoginForm.jsx";
import SignUp from "../container/SignUpForm";
import Dashboard from "../container/Dashboard.jsx";
import OtpScreen from "../component/OtpScreen.jsx";

const Layout = () => <div>Home Page</div>;

const RouteFile = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path={`/sign-up`} element={<SignUp />} />
      <Route path={`/dashboard`} element={<Dashboard />} />
      <Route path={`/otp-screen`} element={<OtpScreen />} />
      {/* <Route element={<Layout />}>
        <Route exact path="/" element={<Login />} />
        <Route path={`/sign-up`} element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path={Paths.mymarket} element={<MyMarketPage />} />
          <Route path={Paths.pl} element={<ProfitLossPage />} />
        </Route>
      </Route> */}
    </Routes>
  );
};

export default RouteFile;
