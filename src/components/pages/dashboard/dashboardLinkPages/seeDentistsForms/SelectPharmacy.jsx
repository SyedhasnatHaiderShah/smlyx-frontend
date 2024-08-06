import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const SelectPharmacy = ({ formData, setFormData, goBack, goNext }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
  };
  return (
    <div className=" flex items-start justify-start w-full md:w-2/3 xl:w-1/2 container px-5 py-10">
      <div className=" flex items-start justify-start flex-col gap-2 w-full">
        <p className=" text-2xl text-gray-800 font-semibold">
          Add a Preffered Pharmacy
        </p>
        <p className=" text-lg text-primary font-semibold">
          Search a nearby pharmacy{" "}
          <span className=" text-red-500 text-xl"> *</span>
        </p>
        <div className=" w-full flex items-start justify-start">
          <form
            action=""
            className=" w-full flex items-start justify-start flex-col gap-3"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div className=" flex items-start justify-start md:flex-row flex-col w-full gap-5">
              <div className=" flex items-start justify-start w-full flex-col">
                <label
                  htmlFor=" Subscriber Address"
                  className="float-left mr-auto font-semibold"
                >
                  Pharmacy Name
                  {/* <span className=" text-red-500 text-xl"> *</span> */}
                </label>
                <input
                  type="text"
                  placeholder="Enter pharmacy name"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("pharmacyName", {
                    required: "Subscriber Address is required",
                  })}
                />
                {errors.pharmacyName && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.pharmacyName.message}
                  </p>
                )}
              </div>
            </div>
            <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5 flex-wrap">
              <div className=" flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="state"
                  className="float-left mr-auto font-semibold"
                >
                  State <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
                  {...register("state", { required: "State is required" })}
                >
                  <option value="">Select State</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div className=" flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="city"
                  className="float-left mr-auto font-semibold"
                >
                  City <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
                  {...register("city", { required: "City is required" })}
                >
                  <option value="">Select City</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option>
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className=" flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="Zip"
                  className="float-left mr-auto font-semibold"
                >
                  Zip <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
                  {...register("zip", { required: "Zip Code is required" })}
                >
                  <option value="">Select Zip</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option>
                </select>
                {errors.zip && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.zip.message}
                  </p>
                )}
              </div>
              <div className=" flex items-start justify-start w-full">
                <button
                  className=" px-9 py-3 rounded-full bg-primarybg text-white text-base font-semibold"
                  type="submit"
                >
                  Search Pharmacy
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectPharmacy;
