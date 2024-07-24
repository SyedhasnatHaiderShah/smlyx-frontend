import React from "react";
import wellness from "./assets/icon-wellness-score.svg";
import DashboardChart from "../../utils/DashboardChart";
import NorthIcon from "@mui/icons-material/North";

const DashboardHeader = () => {
  return (
    <div className=" flex items-start justify-start container gap-5 w-full md:mt-16 mt-10 flex-col md:min-h-96 h-full rounded-xl">
      <div>
        <p className=" flex items-start justify-start w-full text-2xl font-semibold text-gray-950">
          User Name
        </p>
      </div>
      <div className=" flex items-center justify-between gap-5 md:flex-row flex-col flex-wrap bg-white w-full p-5 rounded-xl">
        <img src={wellness} alt="" className=" w-24" />
        <p className=" text-lg font-medium text-gray-900">
          Your Wellness Score
        </p>
        <div className=" flex items-center justify-center flex-col">
          <p className=" text-xl text-gray-500 font-bold ">64</p>
          <p className=" text-sm text-gray-400 font-bold ">MM/DD/YY</p>
        </div>
        <div className=" flex items-center justify-center flex-col">
          <p className=" text-6xl text-gray-400 font-bold ">95</p>
          <p className=" text-sm text-gray-400 font-bold rounded-full px-5 bg-gray-100 ">
            Good
          </p>
          <p className=" text-sm text-gray-400 font-bold ">MM/DD/YY</p>
        </div>
        <div className=" flex items-center justify-center flex-col">
          <div className=" flex items-center justify-center">
            <NorthIcon className=" text-gray-400" />
            <p className=" text-2xl text-gray-400 font-bold ">31</p>
          </div>
          <p className=" text-sm text-gray-400 font-bold ">Change</p>
        </div>
        <div className=" flex items-center justify-center flex-col">
          <p className=" text-2xl text-gray-400 font-bold ">Sample</p>
        </div>
        <div className="">
          <DashboardChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
