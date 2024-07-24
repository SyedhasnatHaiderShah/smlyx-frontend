import React, { useState } from "react";
import { useForm } from "react-hook-form";
import checkGrey from "./small-check-circle-grey.svg";
import checkGreen from "./small-check-circle-green.svg";
import { useNavigate } from "react-router-dom";
import TopNav from "./../navbar/TopNav";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({});

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    specialChar: false,
    number: false,
  });

  const handlePasswordChange = (event) => {
    const password = event.target.value;

    setPasswordCriteria({
      length: password.length >= 8,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /[0-9]/.test(password),
    });
  };

  const password = watch("newPassword", "");

  const passwordProperties = [
    {
      property: "8 characters long",
      isValid: passwordCriteria.length,
    },
    {
      property: "One lower case",
      isValid: passwordCriteria.lowerCase,
    },
    {
      property: "One upper case",
      isValid: passwordCriteria.upperCase,
    },
    {
      property: "A special character",
      isValid: passwordCriteria.specialChar,
    },
    {
      property: "A number",
      isValid: passwordCriteria.number,
    },
  ];

  const onSubmit = (data) => {
    setFormData(data);
    // console.log(data);
  };

  return (
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl py-6 md:px-12 px-5 min-h-screen gap-3">
      <TopNav />
      <div className="flex items-center justify-center w-full flex-col lg:w-1/3 md:w-2/3 rounded-lg">
        <div className="flex items-start justify-start w-full text-sm font-bold text-gray-400 my-5">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>{" "}
          / Change Password
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col w-full bg-white rounded-2xl p-5"
        >
          {/* Current Password */}
          <div className="flex items-start justify-center flex-col min-w-[300px] sm:w-full py-0 relative">
            <p className="text-xl text-primary font-semibold text-center my-3 w-full mx-auto">
              Change Password
            </p>
            <div className="flex items-center justify-between w-full">
              <label
                htmlFor="currentPassword"
                className="text-gray-700 text-base font-bold"
              >
                Current Password
              </label>
              <p
                className="text-sm text-gray-500 font-bold hover:underline cursor-pointer"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? "Hide Password" : "Show Password"}
              </p>
            </div>
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Current password"
              className="border outline-primary rounded-md py-2 w-full my-1 px-2 text-sm font-bold text-gray-600"
              {...register("currentPassword", {
                required: "Current Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}/,
                  message:
                    "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character",
                },
                onChange: handlePasswordChange,
              })}
            />

            {errors.currentPassword && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="flex items-start justify-center flex-col min-w-[300px] sm:w-full py-0 relative">
            <div className="flex items-center justify-between w-full">
              <label
                htmlFor="newPassword"
                className="text-gray-700 text-base font-bold"
              >
                New Password
              </label>
              <p
                className="text-sm text-gray-500 font-bold hover:underline cursor-pointer"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? "Hide Password" : "Show Password"}
              </p>
            </div>
            <input
              type={showNew ? "text" : "password"}
              placeholder="Create a new password"
              className="border outline-primary rounded-md py-2 w-full my-1 px-2 text-sm font-bold text-gray-600"
              {...register("newPassword", {
                required: "New Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}/,
                  message:
                    "New Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character",
                },
                onChange: handlePasswordChange,
              })}
            />

            {errors.newPassword && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.newPassword.message}
              </p>
            )}
            <div className="flex items-center justify-center flex-wrap w-full">
              {passwordProperties.map((p, index) => (
                <div className="flex items-center justify-center" key={index}>
                  <div>
                    <img src={p.isValid ? checkGreen : checkGrey} alt="" />
                  </div>
                  <p className="text-xs font-medium text-gray-500">
                    {p.property}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex items-start justify-center flex-col min-w-[300px] sm:w-full py-0 relative">
            <div className="flex items-center justify-between w-full">
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 text-base font-bold"
              >
                Confirm Password
              </label>
              <p
                className="text-sm text-gray-500 font-bold hover:underline cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Hide Password" : "Show Password"}
              </p>
            </div>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              className="border outline-primary rounded-md py-2 w-full my-1 px-2 text-sm font-bold text-gray-600"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="w-full my-5">
            <div className="flex items-center justify-center gap-5">
              <button
                className="bg-[#484691] text-lg font-medium text-white rounded-full py-3 px-10"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
