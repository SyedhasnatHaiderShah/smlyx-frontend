import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import InsuranceProfile from "./InsuranceProfile";
import InsuranceInfo from "./InsuranceInfo";

const InsuranceInformation = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showInsuranceInfo, setShowInsuranceInfo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  return (
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl   px-5 min-h-screen gap-5">
      <DashboardNav />
      <div className="flex items-center justify-center w-full flex-col rounded-lg container my-5">
        <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 my-2">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>{" "}
          / My Dependents
        </div>
        <div className=" flex items-start justify-start flex-col w-full ">
          <p className="text-2xl text-gray-900 font-semibold mt-1 w-full">
            My Dependents
          </p>
          <p className="text-lg text-primarybg font-semibold  w-full">
            Family Member's Profile
          </p>
        </div>
        {/* other dynamic components on the basis of profile and insurance info */}
        <div className=" flex items-center justify-center w-full  h-16 text-xl font-semibold ">
          <p className=" rounded-full rounded-r-none w-full md:w-1/2 bg-white text-center py-3">
            Profile
          </p>
          <p className=" rounded-full rounded-s-none w-full md:w-1/2 bg-white text-center py-3">
            Insurance Info
          </p>
        </div>

        <div>{showProfile ? <InsuranceProfile /> : <InsuranceInfo />}</div>

        {/* end */}
      </div>
    </div>
  );
};

export default InsuranceInformation;
