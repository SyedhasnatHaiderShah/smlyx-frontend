import React from "react";

const StepTwo = ({ register, handleSubmit, errors, formData, goBack }) => {
  return (
    <div className=" bg-white w-full flex items-center justify-start flex-col rounded-2xl py-6 md:px-12 px-5">
      <p className=" text-xl text-primary font-medium text-center">
        Step 2 - Additional Information
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start justify-start flex-col md:flex-row">
          <div className=" flex items-start justify-start md:w-1/2 w-full flex-col">
            <label
              htmlFor="insurance"
              className="float-left mr-auto font-semibold"
            >
              Insurance ID
            </label>
            <input
              defaultValue={formData.insurance}
              type="text"
              placeholder="Insurance ID"
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-bold"
              {...register("insurance", {
                required: "Insurance ID is required",
              })}
            />
            {errors.insurance && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.insurance.message}
              </p>
            )}

            <label
              htmlFor="subscriber"
              className="float-left mr-auto font-semibold"
            >
              Subscriber ID
            </label>
            <input
              defaultValue={formData.subscriber}
              type="text"
              placeholder="Subscriber ID"
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-bold"
              {...register("subscriber", {
                required: "Subscriber ID is required",
              })}
            />
            {errors.subscriber && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.subscriber.message}
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

export default StepTwo;
