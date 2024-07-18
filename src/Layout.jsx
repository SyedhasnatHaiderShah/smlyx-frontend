import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/pages/navbar/TopNav.jsx";

const Layout = () => {
  return (
    <div className=" relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopNav />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
