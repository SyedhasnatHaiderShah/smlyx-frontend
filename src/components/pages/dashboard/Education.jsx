import React from "react";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const navigate = useNavigate();

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
          / Education
        </div>
      </div>
      <div className=" container  w-full flex gap-5 flex-col ">
        <p className=" text-3xl font-bold">Education</p>
        <div className=" w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5  ">
          <p className=" text-3xl font-bold text-gray-500">
            No patient education found!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
