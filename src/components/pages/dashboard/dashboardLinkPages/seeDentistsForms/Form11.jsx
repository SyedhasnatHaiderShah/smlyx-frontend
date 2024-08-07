import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Form11 = ({ formData, setFormData, goBack, goNext }) => {
  const navigate = useNavigate();
  const symptoms = [
    "Fever",
    "Swelling",
    "Sores/Lesions",
    "Dry Mouth",
    "Sore Throat",
    "Sensitivity",
    "None of the above",
  ];
  const validateDateNotInFuture = (value) => {
    const today = new Date();
    const inputDate = new Date(value);
    return inputDate <= today || "Date cannot be in the future.";
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const visitReason = watch("visitReason", "");

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="flex flex-col bg-[#eeeeee] px-5 py-8 rounded-lg gap-3">
      <p className=" text-lg text-gray-800 font-bold">
        Intake Form - Smlyx.com
      </p>
      <div className=" border bg-[#f7f7f7] p-3 rounded-lg text-sm font-semibold  text-gray-600">
        <p>
          Please fill out the questions below and select "Submit" to continue.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  w-full bg-[#ffffff] p-3 rounded-lg"
      >
        <div className="flex items-center justify-center flex-col w-full gap-5">
          <div className="flex items-start justify-start w-full flex-col">
            <label
              htmlFor="visitReason"
              className="float-left mr-auto font-semibold"
            >
              What is the reason for your visit today?
              <span className="text-red-500 text-xl"> *</span>
            </label>
            <input
              type="text"
              placeholder="Reason for your visit"
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
              {...register("visitReason", {
                required: "This field is required",
                validate: {
                  maxLength: (value) =>
                    value.length <= 150 ||
                    "Reason for visit cannot exceed 150 characters",
                },
              })}
            />
            {errors.visitReason && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.visitReason.message}
              </p>
            )}
            {!errors.visitReason && visitReason.length > 150 && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                Reason for visit cannot exceed 150 characters
              </p>
            )}
          </div>
          <div className=" flex items-start justify-start w-full border p-2 rounded-lg">
            <p className="text-gray-700 text-sm font-semibold break-words ">
              Please seek emergency medical services if you are experiencing a
              medical emergency (ie. chest pain, head or eye injury, broken
              bones, difficulty breathing etc).
            </p>
          </div>
          <div className=" w-full flex items-start justify-start bg-[#f7f7f7] p-2">
            <div className=" flex items-start justify-start w-full flex-col">
              <p> Please select your pain level below: </p>
              <label
                htmlFor="painLevel"
                className="float-left mr-auto font-semibold"
              >
                Pain Level:
                <span className=" text-red-500 text-xl"> *</span>
              </label>
              <select
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                {...register("painLevel", {
                  required: "Pain level is required",
                })}
              >
                <option value="">Select State</option>
                <option value="Alabama">No Pain</option>
                <option value="Aaska">Some Pain</option>
                <option value="Arizona">Moderate Pain</option>
                <option value="Arizona">Severe Pain</option>
                <option value="Arizona">Extreme Pain</option>
              </select>
              {errors.painLevel && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.painLevel.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-start justify-start w-full flex-col">
            <label className="float-left mr-auto font-semibold">
              Are you experiencing any of the following? (Check off all that
              apply)
            </label>
            <div className=" flex items-start justify-start w-full gap-3 flex-wrap">
              {symptoms.map((symptom, index) => (
                <div key={index} className="flex items-center  justify-center">
                  <input
                    type="checkbox"
                    id={`symptom-${index}`}
                    className="mr-2"
                    {...register("symptoms")}
                    value={symptom}
                  />
                  <label htmlFor={`symptom-${index}`}>{symptom}</label>
                </div>
              ))}
              {errors.symptoms && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.symptoms.message}
                </p>
              )}
            </div>
            <div className=" flex items-start justify-start w-full flex-col gap-3">
              <div className="flex items-start justify-evenly w-full gap-5 ">
                <label className="float-left mr-auto font-semibold">
                  Do you have any allergies?
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="allergies-yes"
                    value="Yes"
                    {...register("allergies", {
                      required: "This field is required",
                    })}
                    className="mr-2"
                  />
                  <label htmlFor="allergies-yes">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="allergies-no"
                    value="No"
                    {...register("allergies", {
                      required: "This field is required",
                    })}
                    className="mr-2"
                  />
                  <label htmlFor="allergies-no">No</label>
                </div>
                {errors.allergies && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.allergies.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center w-full gap-5">
                <label className="float-left mr-auto font-semibold">
                  Do you have any medical conditions?
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="medical-conditions-yes"
                    value="Yes"
                    {...register("medicalConditions", {
                      required: "This field is required",
                    })}
                    className="mr-2"
                  />
                  <label htmlFor="medical-conditions-yes">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="medical-conditions-no"
                    value="No"
                    {...register("medicalConditions", {
                      required: "This field is required",
                    })}
                    className="mr-2"
                  />
                  <label htmlFor="medical-conditions-no">No</label>
                </div>
                {errors.medicalConditions && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.medicalConditions.message}
                  </p>
                )}
              </div>

              <div className="flex items-start justify-start w-full gap-5 ">
                <label className="float-left mr-auto font-semibold">
                  Are you currently taking any medications?
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="medications-yes"
                    value="Yes"
                    {...register("medications", {
                      required: "This field is required",
                    })}
                    className="mr-2"
                  />
                  <label htmlFor="medications-yes">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="medications-no"
                    value="No"
                    {...register("medications", {
                      required: "This field is required",
                    })}
                    className="mr-2"
                  />
                  <label htmlFor="medications-no">No</label>
                </div>
                {errors.medications && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.medications.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-start justify-start w-full flex-col">
              <label
                htmlFor="lastDentalExam"
                className="float-left mr-auto font-semibold"
              >
                When was your last dental exam?
              </label>
              <input
                type="date"
                className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                {...register("lastDentalExam", {
                  required: "Last dental exam date is required",
                  validate: validateDateNotInFuture,
                })}
              />
              {errors.lastDentalExam && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.lastDentalExam.message}
                </p>
              )}
            </div>
            <div className="flex items-start justify-start w-full md:flex-row py-5">
              <input
                type="checkbox"
                name="newsLetter"
                id=""
                className="mr-2"
                {...register("termsAndCondition", {
                  required: "You must accept the terms and conditions",
                  validate: (value) =>
                    value === true ||
                    "You must accept the terms and conditions",
                })}
              />
              <p className="text-xs font-semibold text-gray-500">
                I agree that I have read and consent to the Privacy Practices
              </p>
              {errors.termsAndCondition && (
                <p className="text-red-500 text-sm font-bold float-left mr-auto">
                  {errors.termsAndCondition.message}
                </p>
              )}
              <div className=" flex items-center justify-center flex-col w-full gap-2">
                {/* {errors.termsAndCondition && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.termsAndCondition.message}
                  </p>
                )} */}
              </div>
            </div>
            <p
              className=" text-sm font-semibold text-primarybg underline cursor-pointer"
              onClick={() => navigate("/privacy-practices")}
            >
              Dental.com, LLC Notice of Privacy Practices
            </p>

            {/* signature */}
            <div className=" my-2 w-full">
              <p className=" text-sm font-bold text-gray-800">Signature</p>
              <div className=" bg-[#f5f5eb] w-full p-2 rounded-lg h-10 ">
                <AutorenewIcon />
              </div>
              <p className=" text-gray-400 text-sm font-bold text-center">
                Patient / Responsible Party Signature
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-3">
          <button
            className=" bg-[#605fa4] text-white text-sm font-bold px-5 py-3 rounded-full"
            type="submit"
            // onClick={goNext}
          >
            Submit and Next
          </button>
        </div>
      </form>
      {/* <button
        className=" bg-[#605fa4] text-white text-sm font-bold px-5 py-3 rounded-full"
        onClick={goBack}
      >
        Back
      </button>
      <button
        className=" bg-[#605fa4] text-white text-sm font-bold px-5 py-3 rounded-full"
        onClick={goNext}
      >
        Skip
      </button> */}
    </div>
  );
};

export default Form11;
