import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const StepTwo = ({
  register,
  handleSubmit,
  errors,
  formData,
  goNext,
  goBack,
}) => {
  const [dentalInsuranceCarries, setDentalInsuranceCarries] = useState("");
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

  const carriersData = [
    "Cigna Dental",
    "Humana Dental",
    "United Concordia Dental",
    "MetLife Dental",
  ];
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };
  useEffect(() => {
    setDentalInsuranceCarries(formData.dentalInsuranceCarrier);
  }, [formData.dentalInsuranceCarrier]);

  return (
    <div className=" bg-white w-full flex items-center justify-start flex-col rounded-2xl py-6 md:px-12 px-5">
      <div className=" flex items-center justify-center gap-0 flex-col w-full">
        <p className=" text-xl text-primary font-medium text-center">
          Dental Insurance Information
        </p>
      </div>

      {/* conditional rendering step one */}
      {/* {!dentalInsuranceCarries ? (
        <div className="w-full  flex items-start justify-start flex-col gap-5">
          <p className=" text-sm font-semibold text-gray-600  w-full px-5  ">
            <span className=" font-extrabold text-gray-950">
              Good news! Most dental insurance plans now include coverage for
              dental.com services. Our exclusive arrangements encompass popular
              providers like:
            </span>
            {carriersData.map((item, index) => (
              <div
                className=" flex items-start justify-start  w-full "
                key={index}
              >
                <li>{item}</li>
              </div>
            ))}
          </p>

          <p className=" text-sm font-semibold text-gray-600 text-center w-full px-5  ">
            For many of these company's plan members, these services are fully
            covered. If you're eligible, we'll handle the billing, and you won't
            incur any out-of-pocket costs.
          </p>
          <p className=" text-sm font-semibold text-gray-600 text-center w-full px-5  ">
            Don't worry if you have a different dental insurance plan-dental.com
            is here to assist. We'll gladly submit an insurance claim on your
            behalf, and any payment will be sent directly to you. The initial
            fee for treatment is $59, but if your dental plan covers it, you
            could be reimbursed for some or all the amount that you paid.
          </p>
          <form action="" onSubmit={handleSubmit}>
            <label
              htmlFor="dentalInsuranceCarrier"
              className="float-left mr-auto font-semibold"
            >
              Dental Insurance Carrier{" "}
              <span className=" text-red-500 text-xl"> *</span>
            </label>
            <select
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
              {...register("dentalInsuranceCarrier", {
                required: "Dental Insurance Carrier is required",
              })}
              defaultValue={formData.dentalInsuranceCarrier}
            >
              <option value="">Select Insurance Carrier</option>
              <option value="Delta Dental">Delta Dental</option>
              <option value="Cigna Dental">Cigna Dental</option>
              <option value="MetLife Dental">MetLife Dental</option>
              <option value="Humana Dental">Humana Dental</option>
              <option value="Aetna Dental">Aetna Dental</option>
              <option value="Blue Cross Blue Shield">
                Blue Cross Blue Shield
              </option>
            </select>
            {errors.dentalInsuranceCarrier && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.dentalInsuranceCarrier.message}
              </p>
            )}
          </form>
        </div>
      ) : (
        "khurram"
      )} */}

      {/* condional rendering step two */}
      {/* dental insurance carrier start */}
      <div className=" flex items-center justify-center gap-0 flex-col w-full">
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
        <p className=" text-sm font-semibold text-gray-600 text-center w-full px-5  ">
          We do not have a direct agreement with your insurance at this time.
          <span className=" font-extrabold text-gray-950">
            However, it still may be a covered benefit for you.
          </span>
          If you enter your insurance information, we will submit a claim on
          your behalf for possible direct reimbursement to you. If you are
          eligible for the benefit, there may be some reimbursement.
          <span className=" font-extrabold text-gray-950">
            Please note you will still have to pay by credit card at the time of
            service.
          </span>
        </p>
      </div>
      <p className=" float-left mr-auto text-sm text-[#605FA4] font-bold">
        * All fields are required
      </p>
      <div className=" w-full flex items-start justify-start flex-col gap-5">
        <form
          onSubmit={handleSubmit}
          className=" w-full flex items-center justify-center flex-col gap-5"
        >
          {/* form main div start */}
          <div className="flex items-end justify-end flex-col md:flex-row gap-5 w-full">
            {/* left form div start */}
            <div className=" flex items-start justify-between md:w-1/2 w-full flex-col md:gap-2 gap-5">
              <div className="w-full flex items-start justify-start gap-3 flex-col">
                <label
                  htmlFor="dentalInsuranceCarrier"
                  className="float-left mr-auto font-semibold"
                >
                  Dental Insurance Carrier{" "}
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("dentalInsuranceCarrier", {
                    required: "Dental Insurance Carrier is required",
                  })}
                  defaultValue={formData.dentalInsuranceCarrier}
                >
                  <option value="">Select Insurance Carrier</option>
                  <option value="Delta Dental">Delta Dental</option>
                  <option value="Cigna Dental">Cigna Dental</option>
                  <option value="MetLife Dental">MetLife Dental</option>
                  <option value="Humana Dental">Humana Dental</option>
                  <option value="Aetna Dental">Aetna Dental</option>
                  <option value="Blue Cross Blue Shield">
                    Blue Cross Blue Shield
                  </option>
                  {/* Add more options as needed */}
                </select>
                {errors.dentalInsuranceCarrier && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.dentalInsuranceCarrier.message}
                  </p>
                )}
                <label
                  htmlFor="relation"
                  className="float-left mr-auto font-semibold"
                >
                  Patient Relation to insurance Subscriber
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("relation", {
                    required: "Relation is required",
                  })}
                >
                  <option value="">Select Relation</option>
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Dependent">Dependent</option>
                  <option value="Parent">Parent</option>
                  <option value="Other">Other</option>
                </select>
                {errors.relation && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.relation.message}
                  </p>
                )}
                <label
                  htmlFor="firstName"
                  className="float-left mr-auto font-semibold"
                >
                  Subscriber First Name
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.firstName}
                  type="text"
                  placeholder="First Name"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.firstName.message}
                  </p>
                )}

                <div className=" flex items-start justify-between w-full md:w-1/2 md:my-2 my-0 flex-col">
                  <div className="w-full flex items-start justify-between">
                    <label className="radio-label text-base font-semibold">
                      Subscriber Gender
                    </label>
                    <div className="radio-options flex items-start justify-center gap-5 w-full">
                      <label className="radio-option text-base font-semibold">
                        <input
                          type="radio"
                          value="Male"
                          {...register("gender", {
                            required: "Please select an option.",
                          })}
                        />
                        Male
                      </label>
                      <label className="radio-option text-base font-semibold">
                        <input
                          type="radio"
                          value="Female"
                          {...register("gender", {
                            required: "Please select an option.",
                          })}
                        />
                        Female
                      </label>
                      <label className="radio-option text-base font-semibold">
                        <input
                          type="radio"
                          value="other"
                          {...register("gender", {
                            required: "Please select an option.",
                          })}
                        />
                        Other
                      </label>
                    </div>
                  </div>

                  {errors.gender && (
                    <p className="text-red-500 text-sm font-bold float-left mr-auto">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor="firstName"
                  className="float-left mr-auto font-semibold"
                >
                  Subscriber ID
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.firstName}
                  type="text"
                  placeholder="First Name"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
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
                  htmlFor="firstName"
                  className="float-left mr-auto font-semibold"
                >
                  Group No
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.firstName}
                  type="text"
                  placeholder="Group No"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("group", {
                    required: "First Name is required",
                  })}
                />
                {errors.group && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.group.message}
                  </p>
                )}
                <label
                  htmlFor=" Subscriber Address"
                  className="float-left mr-auto font-semibold"
                >
                  Subscriber Address
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.firstName}
                  type="text"
                  placeholder="address"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("address", {
                    required: "First Name is required",
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.address.message}
                  </p>
                )}
                <label
                  htmlFor="state"
                  className="float-left mr-auto font-semibold"
                >
                  State <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
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

            {/* right form div start */}
            <div className=" flex items-start justify-start gap-3 md:w-1/2 w-full flex-col">
              <label
                htmlFor="lastName"
                className="float-left mr-auto font-semibold"
              >
                Subscriber Last Name{" "}
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.lastName}
                type="text"
                placeholder="Last Name"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.lastName.message}
                </p>
              )}

              {/* date of birth */}
              <label htmlFor="dob" className="float-left mr-auto font-semibold">
                Date of Birth <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.dob}
                type="date"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
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
              {/* employer */}
              <label
                htmlFor="employer"
                className="float-left mr-auto font-semibold"
              >
                Employer
              </label>
              <input
                defaultValue={formData.subscriberCity}
                type="text"
                placeholder="Subscriber City"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("employer")}
              />

              <label
                htmlFor="subscriberCity"
                className="float-left mr-auto font-semibold"
              >
                Subscriber City{" "}
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.subscriberCity}
                type="text"
                placeholder="City"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("employer", { required: "Last Name is required" })}
              />
              {errors.subscriberCity && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberCity.message}
                </p>
              )}
              <label
                htmlFor="subscriberZip"
                className="float-left mr-auto font-semibold"
              >
                Subscriber Zip <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.subscriberZip}
                type="text"
                placeholder="Zip Code"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("employer", { required: "Last Name is required" })}
              />
              {errors.subscriberZip && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberZip.message}
                </p>
              )}
            </div>
          </div>

          {/* form main div ends */}
          <div className="flex items-center justify-around w-full md:max-w-96 gap-5 mt-4">
            <button
              type="button"
              className="bg-primarybg text-white rounded-lg py-2 px-5"
              onClick={goBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#484691] text-white rounded-lg py-2 px-5"
              disabled={errors ? true : false}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <p className="  text-base font-medium " onClick={goNext}>
        Skip
      </p>
      {/* conditional rendering step two ends */}
    </div>
  );
};

export default StepTwo;
