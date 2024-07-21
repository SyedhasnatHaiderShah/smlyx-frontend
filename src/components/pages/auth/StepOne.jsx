import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const StepOne = ({ register, handleSubmit, errors, formData }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const validateAge = (value) => {
    const today = new Date();
    const dob = new Date(value);

    if (dob > today) {
      return "Date of Birth cannot be in the future.";
    }

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      return "A parent or legal guardian must create an account and add you as a dependent.";
    }
    return true;
  };

  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className=" bg-white w-full flex items-center justify-start flex-col rounded-2xl py-6 md:px-12 px-5">
      <div className=" flex items-center justify-center gap-0 flex-col w-full">
        <p className=" text-xl text-primary font-medium text-center">
          Creating an account is quick and easy
        </p>
        <p className=" text-sm text-gray-500 font-bold">
          Already have an account?{" "}
          <span
            className=" text-primarybg hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
      <div className="w-full text-center flex items-center justify-center">
        <p className=" text-sm font-semibold text-gray-600 text-center w-full px-5  md:w-[70%] ">
          Subscribers and adult dependents 18 and older should create their own
          accounts. You will provide subscriber insurance info on the next page.
          Subscribers can add dependents under 18 as patients after creating an
          account.
        </p>
      </div>
      <p className=" float-left mr-auto text-sm text-[#605FA4] font-bold">
        * All fields are required
      </p>
      <div className=" w-full flex items-start justify-start flex-col gap-5">
        <form onSubmit={handleSubmit}>
          {/* form main div start */}
          <div className="flex items-start justify-start flex-col md:flex-row gap-5">
            {/* left form div start */}
            <div className=" flex items-start justify-between md:w-1/2 w-full flex-col md:gap-20 gap-5">
              <div className="w-full flex items-start justify-start gap-3 flex-col">
                <label
                  htmlFor="firstName"
                  className="float-left mr-auto font-semibold"
                >
                  First Name <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.firstName}
                  type="text"
                  placeholder="First Name"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.firstName.message}
                  </p>
                )}

                <label
                  htmlFor="dob"
                  className="float-left mr-auto font-semibold"
                >
                  Date of Birth{" "}
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.dob}
                  type="date"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  max={getTodayDate()}
                  {...register("dob", {
                    required: "Date of Birth is required",
                    validate: validateAge,
                  })}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.dob.message}
                  </p>
                )}
              </div>
              <div className="w-full flex items-start justify-start gap-3 flex-col">
                <label
                  htmlFor="email"
                  className=" float-left mr-auto font-semibold"
                >
                  Email ID <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.email}
                  type="email"
                  placeholder="Email"
                  className=" w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* right form div start */}
            <div className=" flex items-start justify-start gap-3 md:w-1/2 w-full flex-col">
              <label
                htmlFor="lastName"
                className="float-left mr-auto font-semibold"
              >
                Last Name <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.lastName}
                type="text"
                placeholder="Last Name"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.lastName.message}
                </p>
              )}
              <label
                htmlFor="phone"
                className="float-left mr-auto font-semibold"
              >
                Phone Number (XXX)-XXX-XXXX{" "}
                <span className="text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.phone}
                type="tel"
                placeholder="(XXX)-XXX-XXXX"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[0-9]{10,14}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.phone.message}
                </p>
              )}
              <div className=" flex items-start justify-start gap-2 md:mb-3 mb-0">
                <input
                  type="checkbox"
                  {...register("agreement", {
                    required: "This checkbox is required.",
                    require: true,
                  })}
                />
                <span className=" text-xs font-semibold text-gray-500 ">
                  By providing your phone number, you agree to receive text
                  messages from dental.com or Teledentix, relating to your use
                  of Smart Scan or your Teledentistry Consultation. You may
                  opt-out at any time.*
                </span>
              </div>
              {errors.agreement && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.agreement.message}
                </p>
              )}

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
                <option value="">Select State</option>
                <option value="Alabama">Alabama</option>
                <option value="Aaska">Aaska</option>
                <option value="Arizona">Arizona</option>
                {/* Add your state options here */}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>
          <div className=" flex items-start justify-between w-full md:w-1/2 md:my-2 my-0">
            <label className="radio-label text-base font-semibold">
              Do you have insurance?
            </label>
            <div className="radio-options flex items-start justify-center gap-5  ">
              <label className="radio-option text-base font-semibold">
                <input
                  type="radio"
                  value="yes"
                  {...register("insurance", {
                    required: "Please select an option.",
                  })}
                />
                Yes
              </label>
              <label className="radio-option text-base font-semibold">
                <input
                  type="radio"
                  value="no"
                  {...register("insurance", {
                    required: "Please select an option.",
                  })}
                />
                No
              </label>
            </div>
            {errors.insurance && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.insurance.message}
              </p>
            )}
          </div>
          {/* form main div ends */}
          <div className="flex items-center justify-around w-full md:max-w-96 mt-4">
            <button
              type="button"
              className="bg-primarybg text-white rounded-lg py-2 px-5"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#484691] text-white rounded-lg py-2 px-5"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepOne;
