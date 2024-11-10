import React, { useState } from "react";
import { useForm } from "react-hook-form";
const AddDependent = () => {
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setFormData(data);
  };

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
  return (
    <div className=" flex items-start justify-start w-full flex-col">
      <form
        className=" w-full gap-2 flex items-start justify-start flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Son">Son</option>
              <option value="Brother">Brother</option>
              <option value="Daughter"> Daughter</option>
              <option value="Spouse">Spouse</option>
              <option value="Friend">Friend</option>
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
              Date of Birth <span className=" text-red-500 text-xl"> *</span>
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
        <div className=" flex items-center justify-center my-5">
          <button
            className=" border rounded-full px-8 py-2 bg-primarybg text-white "
            type="submit"
            //   onClick={(e) => e.preventDefault()}
          >
            Add Dependent
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDependent;
