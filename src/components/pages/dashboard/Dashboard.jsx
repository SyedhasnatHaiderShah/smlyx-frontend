import React, { useEffect, useState } from "react";
import TopNav from "./../navbar/TopNav";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import DashboardMiddle from "./DashboardMiddle";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // const userName = useSelector((state) => state.currentUser.userName);

  // console.log(userName);

  return (
    <div className=" flex items-start justify-start flex-col w-full bg-[#eeeeee] min-h-screen">
      {/* <DashboardHeader title={userName || "User Name"} /> */}
      <DashboardHeader />
      <DashboardMiddle />
    </div>
  );
};

export default Dashboard;
