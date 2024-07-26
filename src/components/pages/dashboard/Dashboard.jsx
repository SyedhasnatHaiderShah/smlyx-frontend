import React from "react";
import TopNav from "./../navbar/TopNav";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import DashboardMiddle from "./DashboardMiddle";

const Dashboard = () => {
  return (
    <div className=" flex items-start justify-start flex-col w-full bg-[#eeeeee] min-h-screen">
      <DashboardHeader />
      <DashboardMiddle />
    </div>
  );
};

export default Dashboard;
