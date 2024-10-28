import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { useSelector } from "react-redux";

const BillingInformation = () => {
  const state = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const onSubmit = (data) => {
    setFormData(data);
    // console.log(data);
  };
  return (
    <div className="bg-[#eeeeee]  flex items-center justify-start flex-col rounded-2xl md:px-10   px-5 min-h-[88vh]  gap-5 w-full ">
      <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 container">
        <span
          className="mx-1 hover:text-primarybg cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Home
        </span>{" "}
        / Billing Information
      </div>
      <div className="flex items-center justify-center  flex-col rounded-lg container my-5 w-full sm:w-3/5 md:w-1/2 xl:w-1/3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col  bg-white rounded-2xl p-5 container "
        >
          <div className="flex items-start justify-center flex-col sm:w-full py-5 relative gap-2">
            <p className="text-xl text-primary font-semibold my-3 w-full text-center">
              Billing Information
            </p>
            <div className="flex items-start justify-start md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor="email"
                  className=" float-left mr-auto font-semibold"
                >
                  Email<span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={localStorage.getItem("email") || ""}
                  type="email"
                  placeholder="Email"
                  className=" w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 bg-gray-200 text-heading text-sm font-semibold"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  readOnly
                />
                {errors.email && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full my-5">
            <div className="flex items-center justify-center gap-5">
              <button
                className="hover:bg-[#484691] bg-[#605fa4] transition-colors duration-300 ease-in-out text-lg font-medium text-white rounded-full py-3 px-10"
                type="submit"
              >
                Manage Billing
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BillingInformation;
