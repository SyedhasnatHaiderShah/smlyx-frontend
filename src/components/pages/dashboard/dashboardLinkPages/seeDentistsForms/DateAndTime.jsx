import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const DateAndTime = ({ formData, setFormData, goBack, goNext }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm();

  const formatDateString = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (match) {
      return `${match[1]}/${match[2]}/${match[3]}`;
    }
    return value;
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatDateString(value);
    setValue("appointmentDate", formattedValue);
  };

  const onSubmit = (data) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    goNext();
  };

  return (
    <div className="flex items-start justify-start w-full  container px-5 py-10 200">
      <div className="flex items-start justify-start flex-col gap-5 w-full">
        <p className="text-2xl text-gray-800 font-semibold">
          Schedule Appointment
        </p>
        <div className=" flex items-start justify-start w-full flex-col md:flex-row gap-5">
          {/* left info */}
          <div className="w-full lg:w-1/3 flex bg-[#3fbbeb] h-24 md:h-52 rounded-xl items-center justify-center p-3">
            <p className="text-xl text-white font-semibold w-full text-center">
              You are scheduling a Virtual Consultation
            </p>
          </div>

          {/* right form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-center flex-col gap-5 w-full lg:w-2/3"
          >
            {/* Select Appointment Date */}
            <div className=" w-full  ">
              <div className="flex md:items-start items-center justify-center md:justify-start w-full md:w-1/2  flex-col">
                <label
                  htmlFor="appointmentDate"
                  className="float-left mr-auto font-semibold"
                >
                  Select Appointment Date
                </label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("appointmentDate", {
                    required:
                      "Please select a date from today or a future date.",
                    validate: (value) => {
                      const dateParts = value.split("/");
                      const date = new Date(
                        `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`
                      );
                      const currentYear = new Date().getFullYear();
                      const minDate = new Date();
                      const maxDate = new Date(currentYear + 1, 12, 31);
                      return (
                        (date >= minDate && date <= maxDate) ||
                        `Please select a date between today and ${maxDate.toLocaleDateString()}`
                      );
                    },
                  })}
                  onChange={handleDateChange}
                />
                {errors.appointmentDate && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.appointmentDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Select Appointment Time having time, minutes, am, pm select input */}
            <div className="flex items-start justify-start w-full flex-col">
              <label
                htmlFor="appointmentTime"
                className="float-left mr-auto font-semibold"
              >
                Select Appointment Time
              </label>
            </div>
            <div className="flex items-start justify-start w-full flex-col md:flex-row gap-3">
              <div className="flex gap-2 md:w-1/3 w-full">
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("appointmentHour", {
                    required: "Please select an hour.",
                  })}
                >
                  {[...Array(12).keys()].map((hour) => (
                    <option key={hour + 1} value={hour + 1}>
                      {hour + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 md:w-1/3 w-full">
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("appointmentMinute", {
                    required: "Please select a minute.",
                  })}
                >
                  {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 md:w-1/3 w-full">
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("appointmentPeriod", {
                    required: "Please select AM or PM.",
                  })}
                >
                  {["AM", "PM"].map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
              {errors.appointmentHour && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.appointmentHour.message}
                </p>
              )}
              {errors.appointmentMinute && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.appointmentMinute.message}
                </p>
              )}
              {errors.appointmentPeriod && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.appointmentPeriod.message}
                </p>
              )}
            </div>
            <div className=" flex md:items-start md:justify-start items-center justify-center w-full">
              <p className=" text-sm text-gray-500 font-semibold w-full">
                All appointment times are displayed according to your local time
                zone.
              </p>
            </div>

            {/* Cancel, schedule appointment button */}
            <div className="flex justify-center gap-5 w-full mt-4 items-center flex-col md:flex-row">
              <button
                type="button"
                onClick={goBack}
                className="bg-white border-2 border-gray-300 text-gray-400 font-semibold  px-10 py-3 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`bg-[#8281b6]  ${
                  isValid ? "bg-[#605fa4]" : "cursor-not-allowed"
                } text-white px-5 py-3 rounded-full`}
              >
                Schedule Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateAndTime;
