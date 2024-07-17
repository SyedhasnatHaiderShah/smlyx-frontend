import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/pages/navbar/TopNav.jsx";

const Layout = () => {
  return (
    <div className=" px-5">
      <TopNav />
      <Outlet />
    </div>
  );
};

export default Layout;
