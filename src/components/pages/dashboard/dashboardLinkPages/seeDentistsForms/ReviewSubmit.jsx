import React, { useState } from "react";
import PlayArrow from "@mui/icons-material/VideoCall";
import ClearIcon from "@mui/icons-material/Clear";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const ReviewSubmit = ({ setFormData, formData, goNext, startVisit }) => {
  const navigate = useNavigate();
  const [clearValue, setClearValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };
  return (
    <div className=" flex items-start justify-start container px-5 py-10 w-full flex-col">
      <div>
        <p className=" text-xl text-gray-800 font-semibold ">
          Review and Submit
        </p>
      </div>
      <div className=" flex items-start justify-start w-full md:flex-row flex-col my-10 gap-5">
        <div className=" flex items-center justify-center w-full md:w-1/2 gap-5 flex-col">
          {/* name info */}
          <div className=" flex items-start flex-col gap-2 justify-start w-full">
            <p className=" text-base font-semibold text-gray-600">Visit for</p>
            <p className=" text- font-bold text-gray-800">User name</p>
          </div>
          <div className=" flex items-start flex-col gap-2 justify-start w-full">
            <p className=" text-base font-semibold text-gray-600">
              Date and Time
            </p>
            <p className=" text-sm font-bold text-gray-800">
              {formData.appointmentDate || ""}
            </p>
          </div>
          <div className=" flex items-start flex-col gap-5 justify-start w-full">
            <p className=" text-base font-bold text-primary">
              Once you click "start Visit", you will be taken into a virtual
              waiting room.
            </p>
            <p className=" text-base font-bold text-primary">
              <PlayArrow fontSize="large" /> Make sure to test your video and
              audio capabilities prior to starting your visit.
            </p>
          </div>
        </div>
        <div className=" flex items-center justify-center w-full md:w-1/2 gap-5 flex-col">
          {/* name info */}
          <div className=" flex items-start flex-col gap-2 justify-start w-full">
            <p className=" text-2xl font-bold text-gray-800">Your Order</p>
            <hr className=" w-full" />
          </div>
          <div className=" flex items-start flex-col gap-2 justify-start w-full">
            <div className=" flex items-center justify-between w-full ">
              <p className=" text-base font-bold text-gray-600">
                See a dentist now
              </p>
              <p className=" text-base font-bold text-primarybg">$59</p>
            </div>
          </div>
          <hr className=" w-full" />
          <div className=" flex items-start flex-col gap-5 justify-start w-full">
            <p className=" text-sm font-bold text-primarybg">Add Coupon Code</p>
            <div className=" w-full flex items-start justify-start flex-col md:flex-row ">
              <form
                action=""
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full "
              >
                <div className=" w-full flex items-center justify-center md:flex-row flex-col flex-wrap">
                  <div className=" flex items-start justify-start w-full flex-col  relative">
                    <input
                      type="text"
                      placeholder="Enter pharmacy name"
                      className="w-full my-3  px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold relative"
                      {...register("couponCode")}
                      onChange={(e) => setClearValue(e.target.value)}
                      value={clearValue}
                    />
                    <ClearIcon
                      className=" text-white bg-yellow-400 absolute right-5 bottom-6  rounded-full cursor-pointer"
                      fontSize="small"
                      onClick={() => setClearValue("")}
                    />
                  </div>
                  <div className=" flex items-center justify-center w-full  my-3">
                    <button
                      className=" px-12 py-2 w-full md:w-1/2 rounded-full bg-primarybg text-white text-sm font-bold"
                      type="submit"
                    >
                      Apply
                    </button>{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center flex-col gap-5">
        <p className=" text-xs text-gray-400 italic font-semibold text-center">
          Your payment method will not be charged untill your visit is complete.
        </p>
        <div className=" flex items-center justify-center w-full gap-5 flex-col md:flex-row">
          <button
            className=" px-14 font-semibold py-2 rounded-full border-gray-300 border-2 text-gray-400 hover:text-gray-500 transition-all duration-300 ease-in-out "
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
          <button
            className=" bg-[#605fa4] px-12 font-semibold py-2 rounded-full  text-white "
            // onClick={goNext}
            onClick={startVisit}
          >
            Start Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
