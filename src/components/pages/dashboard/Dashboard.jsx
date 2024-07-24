import React from "react";
import TopNav from "./../navbar/TopNav";
import DashboardNav from "./DashboardNav";

const Dashboard = () => {
  return (
    <div className=" flex items-start justify-start flex-col w-full">
      <DashboardNav />
      Dashboard
    </div>
  );
};

export default Dashboard;
