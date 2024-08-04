import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/pages/navbar/TopNav.jsx";
import DashboardNav from "./components/pages/dashboard/DashboardNav";

const Layout = () => {
  return (
    <div className=" relative flex items-start justify-start flex-col">
      {/* <div className="fixed top-0 left-0 right-0 z-50"> */}
      <DashboardNav />
      {/* </div> */}
      <Outlet />
    </div>
  );
};

export default Layout;
