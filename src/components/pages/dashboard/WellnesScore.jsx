import React from "react";
import DashboardHeader from "./DashboardHeader";

const WellnessScore = () => {
  return (
    <div className=" flex items-start justify-start flex-col w-full bg-[#eeeeee] min-h-screen gap-5 p-5">
      <div className=" w-full container">
        <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 my-2">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </span>{" "}
          / Wellness Score
        </div>
        <DashboardHeader title={"Smart Scan"} />
      </div>
      <div></div>
    </div>
  );
};

export default WellnessScore;
