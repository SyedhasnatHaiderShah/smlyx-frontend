import React from "react";

const StepThree = ({ register, handleSubmit, errors, formData, goBack }) => {
  return (
    <div className=" bg-white w-full flex items-center justify-start flex-col rounded-2xl py-6 md:px-12 px-5">
      <p className=" text-xl text-primary font-medium text-center">
        Step 3 - Review & Submit
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start justify-start flex-col md:flex-row">
          <div className=" flex items-start justify-start md:w-1/2 w-full flex-col">
            <label
              htmlFor="confirmEmail"
              className="float-left mr-auto font-semibold"
            >
              Confirm Email
            </label>
            <input
              defaultValue={formData.confirmEmail}
              type="email"
              placeholder="Confirm Email"
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-bold"
              {...register("confirmEmail", {
                required: "Confirm Email is required",
              })}
            />
            {errors.confirmEmail && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.confirmEmail.message}
              </p>
            )}

            <label
              htmlFor="confirmPassword"
              className="float-left mr-auto font-semibold"
            >
              Confirm Password
            </label>
            <input
              defaultValue={formData.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-bold"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <button
            type="button"
            className="bg-primarybg text-white rounded-lg py-2 px-5"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-primary text-white rounded-lg py-2 px-5"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
