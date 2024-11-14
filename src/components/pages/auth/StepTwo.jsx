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
  const today = new Date().toISOString().split("T")[0];

  const validateAge = (value) => {
    const today = new Date();
    const dob = new Date(value); // No need to split, as input type="date" gives YYYY-MM-DD

    if (dob > today) {
      return "Date of Birth cannot be in the future.";
    }

    if (value === "") {
      return "Date of Birth is required.";
    }

    // Compare the dob date and today's date to prevent today's date
    if (
      dob.getDate() === today.getDate() &&
      dob.getMonth() === today.getMonth() &&
      dob.getFullYear() === today.getFullYear()
    ) {
      return "Date of Birth cannot be today.";
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
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

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
          <div className=" flex items-start justify-start w-full flex-col">
            <div className=" flex items-start justify-start w-full flex-col">
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
            </div>
          </div>
          <div className=" flex items-start justify-start w-full flex-col">
            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="relation"
                className="float-left mr-auto font-semibold"
              >
                Patient Relation to insurance Subscriber
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <select
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                {...register("patientRelation", {
                  required: "patientRelation is required",
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
              {errors.patientRelation && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.patientRelation.message}
                </p>
              )}
            </div>
          </div>
          <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="subscriberFirstName"
                className="float-left mr-auto font-semibold"
              >
                Subscriber First Name
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.firstName}
                type="text"
                placeholder="Subscriber First Name"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("subscriberFirstName", {
                  required: "Subscriber First Name is required",
                })}
              />
              {errors.subscriberFirstName && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberFirstName.message}
                </p>
              )}
            </div>
            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="subscriberLastName"
                className="float-left mr-auto font-semibold"
              >
                Subscriber Last Name{" "}
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.lastName}
                type="text"
                placeholder="Subscriber Last Name"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("subscriberLastName", {
                  required: "Subscriber Last Name is required",
                })}
              />
              {errors.subscriberLastName && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberLastName.message}
                </p>
              )}
            </div>
          </div>
          <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
            <div className=" flex items-start justify-start w-full flex-col gap-2">
              <div className="w-full flex items-start justify-between">
                <label className="radio-label text-base font-semibold">
                  Subscriber Gender
                </label>
              </div>
              <div>
                <div className="radio-options flex items-start justify-center gap-5 w-full">
                  <label className="radio-option text-base font-semibold">
                    <input
                      type="radio"
                      value="Male"
                      {...register("subscriberGender", {
                        required: "Please select an option.",
                      })}
                    />
                    Male
                  </label>
                  <label className="radio-option text-base font-semibold">
                    <input
                      type="radio"
                      value="Female"
                      {...register("subscriberGender", {
                        required: "Please select an option.",
                      })}
                    />
                    Female
                  </label>
                  <label className="radio-option text-base font-semibold">
                    <input
                      type="radio"
                      value="other"
                      {...register("subscriberGender", {
                        required: "Please select an option.",
                      })}
                    />
                    Other
                  </label>
                </div>
                {errors.subscriberGender && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.subscriberGender.message}
                  </p>
                )}
              </div>
            </div>
            <div className=" flex items-start justify-start w-full flex-col">
              {/* date of birth */}
              <label
                htmlFor="subscriberDateOfBirth"
                className="float-left mr-auto font-semibold"
              >
                Subscriber Date of Birth{" "}
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.dob}
                type="date"
                pattern="\d{2}/\d{2}/\d{4}"
                placeholder="MM/DD/YYYY"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                max={getTodayDate()}
                {...register("subscriberDateOfBirth", {
                  required: "Subscriber Date of Birth is required",
                  validate: validateAge,
                })}
              />
              {errors.subscriberDateOfBirth && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberDateOfBirth.message}
                </p>
              )}
            </div>
          </div>

          <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="subscriberId"
                className="float-left mr-auto font-semibold"
              >
                Subscriber ID
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.subscriberId}
                type="text"
                placeholder="Subscriber ID"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("subscriberId", {
                  required: "Subscriber ID is required",
                })}
              />
              {errors.subscriberId && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberId.message}
                </p>
              )}
            </div>

            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="employer"
                className="float-left mr-auto font-semibold"
              >
                Employer
              </label>
              <input
                defaultValue={formData.employer}
                type="text"
                placeholder="Employer"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("employer")}
              />
            </div>
          </div>

          <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="groupNo"
                className="float-left mr-auto font-semibold"
              >
                Group No
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.groupNo}
                type="text"
                placeholder="Group No"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("groupNo", {
                  required: "Group No is required",
                })}
              />
              {errors.groupNo && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.groupNo.message}
                </p>
              )}
            </div>

            <div className=" flex items-start justify-start w-full flex-col">
              {/* empty */}
            </div>
          </div>

          <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor=" Subscriber Address"
                className="float-left mr-auto font-semibold"
              >
                Subscriber Address
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.subscriberAddress}
                type="text"
                placeholder="subscriberAddress"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("subscriberAddress", {
                  required: "Subscriber Address is required",
                })}
              />
              {errors.subscriberAddress && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberAddress.message}
                </p>
              )}
            </div>

            <div className=" flex items-start justify-start w-full flex-col">
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
                {...register("subscriberCity", {
                  required: "Last Name is required",
                })}
              />
              {errors.subscriberCity && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberCity.message}
                </p>
              )}
            </div>
          </div>

          <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="subscriberState"
                className="float-left mr-auto font-semibold"
              >
                State <span className=" text-red-500 text-xl"> *</span>
              </label>
              <select
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                {...register("subscriberState", {
                  required: "Subscriber State is required",
                })}
                defaultValue={formData.state}
              >
                <option value="">Select State</option>
                <option value="Alabama">Alabama</option>
                <option value="Aaska">Aaska</option>
                <option value="Arizona">Arizona</option>
              </select>
              {errors.subscriberState && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.subscriberState.message}
                </p>
              )}
            </div>

            <div className=" flex items-start justify-start w-full flex-col">
              <label
                htmlFor="subscriberZip"
                className="float-left mr-auto font-semibold"
              >
                Subscriber Zip <span className=" text-red-500 text-xl"> *</span>
              </label>
              <input
                defaultValue={formData.subscriberZip}
                type="number"
                placeholder="Zip Code"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("subscriberZip", {
                  required: "Last Name is required",
                })}
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
              // disabled={errors ? true : false}
              // onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </form>
        <div className=" w-full flex items-end justify-end">
          <button
            className=" font-medium text-[#484691] rounded-lg py-2 px-5"
            // disabled={errors ? true : false}
            onClick={goNext}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
