import React, { useState } from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AddDependent from "./AddDependent";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form11 from "./Form11";
import AddUpdateInsurance from "./AddUpdateInsurance";
const VisitDetails = ({ formData, setFormData, goBack, goNext }) => {
  const navigate = useNavigate();
  const [showDependent, setShowDependent] = React.useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className=" flex items-start justify-start flex-col w-full gap-2">
      <p className=" text-2xl font-semibold ">See A Dentist Now </p>
      <p className=" text-lg text-primarybg font-semibold">
        Price of visit: $59
      </p>
      <div className=" flex items-start justify-start flex-col w-full md:w-1/2">
        <form
          className=" w-full gap-2 flex items-start justify-start flex-col"
          onSubmit={handleSubmit()}
        >
          <div className=" flex items-start justify-start w-full flex-col">
            <label
              htmlFor="state"
              className="float-left mr-auto font-semibold text-primary"
            >
              Who is this visit for? *{" "}
              <span className=" text-red-500 text-xl"> *</span>
            </label>
            <select
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
              {...register("patient", { required: "Patient is required" })}
            >
              <option value="">Select Patient</option>
              <option value="Aaska">Aask</option>
              <option value="Arizona">Arizona</option>
            </select>
            {errors.patient && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.patient.message}
              </p>
            )}
          </div>

          <p
            className=" underline text-sm text-gray-400 font-medium cursor-pointer"
            onClick={() => setShowDependent(!showDependent)}
          >
            + Add Dependent
          </p>
          {/* dynamic form on toggle the add dependent  */}
          {showDependent && (
            <div className=" flex items-start justify-start w-full flex-col">
              <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
                <div className=" flex items-start justify-start w-full flex-col">
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
                </div>
                <div className=" flex items-start justify-start w-full flex-col">
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
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm font-bold float-left mr-auto">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
                <div className=" flex items-start justify-start w-full flex-col">
                  <label
                    htmlFor="relation"
                    className="float-left mr-auto font-semibold"
                  >
                    Select Relation
                    <span className=" text-red-500 text-xl"> *</span>
                  </label>
                  <select
                    className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-semibold"
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
                </div>
                <div className="flex items-start justify-start w-full flex-col">
                  <label
                    htmlFor="subscriberDateOfBirth"
                    className="float-left mr-auto font-semibold"
                  >
                    Date of Birth{" "}
                    <span className=" text-red-500 text-xl"> *</span>
                  </label>
                  <input
                    type="date"
                    pattern="\d{2}/\d{2}/\d{4}"
                    placeholder="MM/DD/YYYY"
                    className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                    {...register("dateOfBirth", {
                      required: "Date of Birth is required",
                      validate: validateAge,
                    })}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm font-bold float-left mr-auto">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              </div>
              <div className=" flex items-start justify-start w-full flex-col gap-2">
                <div className="w-full flex items-start justify-between">
                  <label className="radio-label text-base font-semibold">
                    Gender
                  </label>
                </div>
                <div>
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
                  {errors.gender && (
                    <p className="text-red-500 text-sm font-bold float-left mr-auto">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
              <div className=" flex items-center justify-center my-5"></div>
              <button
                className=" border rounded-full px-8 py-2 bg-primarybg text-white "
                type="submit"
                //   onClick={(e) => e.preventDefault()}
              >
                Add Dependent
              </button>
            </div>
          )}

          {/* other data */}

          <div className=" flex items-start justify-start w-full flex-col">
            <label
              htmlFor="state"
              className="float-left mr-auto font-semibold text-primary"
            >
              Where will you be located during your visit?
              <span className=" text-red-500 text-xl"> *</span>
            </label>
            <select
              className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
              {...register("patient", { required: "Patient is required" })}
            >
              <option value="">Select Patient</option>
              <option value="Aaska">Aask</option>
              <option value="Arizona">Arizona</option>
            </select>
            {errors.patient && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.patient.message}
              </p>
            )}
          </div>
          <div className=" flex items-start justify-start w-full gap-3">
            <div className=" bg-[#e0c84b]  w-10 h-6 rounded-full flex items-center justify-center  ">
              <PriorityHighIcon fontSize="" className=" text-white" />
            </div>
            <p className=" text-gray-500 font-semibold ">
              If this is a medical emergency, please dial 911 or go to your
              nearest medical facility immediately.
            </p>
          </div>
        </form>
        <div className=" flex items-center justify-center w-full"></div>
      </div>
      {/* insurance form  component*/}
      <div>
        <input
          type="checkbox"
          className="mr-2"
          {...register("addUpdateInsurance")}
          value={showInsurance}
          onChange={() => setShowInsurance(!showInsurance)}
        />
        <label htmlFor="addUpdateInsurance">
          Click here to add or update your insurance.
        </label>
      </div>
      {showInsurance && <AddUpdateInsurance />}
      <div className=" w-full flex items-start justify-start ">
        <Form11
          formData={formData}
          setFormData={setFormData}
          goBack={goBack}
          goNext={goNext}
        />
      </div>
      <div className=" flex items-center justify-center w-full">
        <button
          className=" px-12 py-3  rounded-full border text-gray-400 border-gray-400 font-bold "
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VisitDetails;
