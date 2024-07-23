import React, { useState } from "react";
import { useForm } from "react-hook-form";
import checkGrey from "./small-check-circle-grey.svg";
import checkGreen from "./small-check-circle-green.svg";
import { useNavigate } from "react-router-dom";

const StepThree = ({
  register,
  handleSubmit,
  errors,
  formData,
  goBack,
  watch,
}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    specialChar: false,
    number: false,
  });

  // const {
  //   register: formRegister,
  //   handleSubmit: formHandleSubmit,
  //   watch,
  //   formState: { errors: formErrors },
  // } = useForm();

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

  const password = watch("password", "");

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

  return (
    <div className="bg-white w-full flex items-center justify-start flex-col rounded-2xl py-6 md:px-12 px-5">
      <p className="text-xl text-primary font-semibold text-center">
        Set Your Password
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col w-full md:w-1/2"
      >
        {/* Password */}
        <div className="flex items-start justify-center flex-col min-w-[300px] sm:w-full py-0 relative">
          <div className="flex items-center justify-between w-full">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-bold"
            >
              Password
            </label>
            <p
              className="text-sm text-gray-500 font-bold hover:underline  cursor-pointer"
              onClick={() => setShow(!show)}
            >
              Show Password
            </p>
          </div>
          <input
            defaultValue={formData.password}
            type={show ? "text" : "password"}
            placeholder="Create a password"
            className="border outline-primary rounded-md py-2 w-full my-1 px-2 text-sm font-bold text-gray-600"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}/,
                message:
                  "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character",
              },
              onChange: handlePasswordChange,
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm font-bold float-left mr-auto">
              {errors.password.message}
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
              htmlFor="confirm password"
              className="text-gray-700 text-sm font-bold"
            >
              Confirm Password
            </label>
            <p
              className="text-sm text-gray-500 font-bold hover:underline cursor-pointer"
              onClick={() => setShowConfirm(!show)}
            >
              Show Confirm Password
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
          <div className="flex items-baseline justify-center w-full flex-col md:flex-row py-5">
            <input
              type="checkbox"
              name="newsLetter"
              id=""
              className="mr-2"
              {...register("termsAndCondition", {
                required: "You must accept the terms and conditions",
                validate: (value) =>
                  value === true || "You must accept the terms and conditions",
              })}
            />
            <p className="text-xs font-semibold text-gray-500">
              By clicking "Create Account" you agree that you have read and
              consent to the
              <span className="underline mx-1">Terms and Conditions</span>
              of Use and to the
              <span className="underline mx-1"> Privacy Practices.</span>
            </p>
            <div className=" flex items-center justify-center flex-col w-full gap-2">
              {errors.termsAndCondition && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.termsAndCondition.message}
                </p>
              )}
            </div>
          </div>

          <div className=" flex items-center justify-center gap-5">
            <button
              className="bg-[#1587ff] text-white rounded-full py-2 px-5"
              onClick={goBack}
              // disabled={!isValid}
            >
              Back
            </button>
            <button
              className="bg-[#484691] text-white rounded-full py-2 px-5"
              // disabled={!isValid}
              type="submit"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
