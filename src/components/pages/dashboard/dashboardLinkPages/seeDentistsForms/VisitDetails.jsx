import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
const VisitDetails = ({ register, handleSubmit, formData, errors }) => {
  return (
    <div className=" flex items-start justify-start flex-col w-full gap-2">
      <p className=" text-2xl font-semibold ">See A Dentist Now </p>
      <p className=" text-lg text-primarybg font-semibold">
        Price of visit: $59
      </p>
      <div className=" flex items-start justify-start flex-col w-full md:w-1/2">
        <form className=" w-full gap-2 flex items-start justify-start flex-col ">
          <div className=" flex items-start justify-start w-full flex-col">
            <label
              htmlFor="state"
              className="float-left mr-auto font-semibold text-primary"
            >
              Who is this visit for? *{" "}
              <span className=" text-red-500 text-xl"> *</span>
            </label>
            <select
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
              {...register("patient", { required: "Patient is required" })}
            >
              <option value="">Select Patient</option>
              <option value="Aaska">Aask</option>
              <option value="Arizona">Arizona</option>
            </select>
            {errors.patient && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.patient.message}
              </p>
            )}
          </div>

          <p className=" underline text-sm text-gray-400 font-medium">
            + Add Dependent
          </p>

          <div className=" flex items-start justify-start w-full flex-col">
            <label
              htmlFor="state"
              className="float-left mr-auto font-semibold text-primary"
            >
              Where will you be located during your visit?
              <span className=" text-red-500 text-xl"> *</span>
            </label>
            <select
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
              {...register("patient", { required: "Patient is required" })}
            >
              <option value="">Select Patient</option>
              <option value="Aaska">Aask</option>
              <option value="Arizona">Arizona</option>
            </select>
            {errors.patient && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.patient.message}
              </p>
            )}
          </div>
          <div className=" flex items-start justify-start w-full gap-3">
            <div className=" bg-[#e0c84b]  w-10 h-6 rounded-full flex items-center justify-center  ">
              <PriorityHighIcon fontSize="" className=" text-white" />
            </div>
            <p className=" text-gray-500 font-semibold ">
              If this is a medical emergency, please dial 911 or go to your
              nearest medical facility immediately.
            </p>
          </div>
          <div className=" w-full text-center">
            <button className=" px-12 py-3  rounded-full border text-gray-400 border-gray-400 font-bold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitDetails;
