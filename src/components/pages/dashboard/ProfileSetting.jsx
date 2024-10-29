import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileSetting = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem("id");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const onSubmit = async (data) => {
    setFormData(data);
    // console.log(data);
    dispatch(
      setUserData({
        ...data,
      })
    );
    try {
      const updatedData = { ...data, userId };
      await axios.patch(
        `http://localhost:3000/profile/profileSetting`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Profile Successfully Updated!");
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };

  // dob
  const validateAge = (value) => {
    const today = new Date();
    const [month, day, year] = value.split("/");
    const dob = new Date(`${year}-${month}-${day}`);

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
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl   px-5 min-h-screen gap-5">
      <div className="flex items-center justify-center w-full flex-col rounded-lg container my-5">
        <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 my-2">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </span>{" "}
          / Profile Setting
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col w-full bg-white rounded-2xl p-5 container "
        >
          <div className="flex items-start justify-center flex-col sm:w-full py-5 relative gap-2">
            <p className="text-xl text-primary font-semibold my-3 w-full">
              Profile Setting
            </p>
            {/* Other inputs */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="firstName"
                  className="float-left mr-auto font-semibold"
                >
                  First Name
                  <span className="text-red-500 text-xl"> *</span>
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
              </div>
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="middleName"
                  className="float-left mr-auto font-semibold"
                >
                  Middle Name
                </label>
                <input
                  defaultValue={formData.middleName}
                  type="text"
                  placeholder="Middle Name"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("middleName")}
                />
              </div>
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="lastName"
                  className="float-left mr-auto font-semibold"
                >
                  Last Name
                  <span className="text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.lastName}
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
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
            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col">
                <div className="w-full flex items-start justify-between">
                  <label className="radio-label text-base font-semibold">
                    Gender
                  </label>
                </div>
                <div className="radio-options flex items-start justify-start gap-5 w-full">
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
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="subscriberDateOfBirth"
                  className="float-left mr-auto font-semibold"
                >
                  Date of Birth{" "}
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={formData.dateOfBirth}
                  type="date"
                  pattern="\d{2}/\d{2}/\d{4}"
                  placeholder="MM/DD/YYYY"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  max={getTodayDate()}
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
            {/* row start */}
            <div className="flex items-start justify-start md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor="email"
                  className=" float-left mr-auto font-semibold"
                >
                  Email<span className=" text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={email || user.email}
                  type="email"
                  placeholder="Email"
                  className=" w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 bg-gray-200 text-heading text-sm font-semibold"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  readOnly
                />
                {errors.email && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* row middle */}
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="phone"
                  className="float-left mr-auto font-semibold"
                >
                  Phone
                  <span className="text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={"(123)123-1234"}
                  type="tel"
                  placeholder="(XXX)-XXX-XXXX"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[0-9]{10,14}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.phone.message}
                  </p>
                )}
                <div className="flex items-start justify-start  gap-3 my-2   ">
                  <label
                    htmlFor="received-text"
                    className="float-left mr-auto font-semibold"
                  >
                    Received Text
                  </label>
                  <div className="flex items-center justify-center">
                    <input
                      type="radio"
                      id="yes"
                      value="Yes"
                      {...register("receivedText", {
                        required: "This field is required",
                      })}
                      className="mr-2"
                    />
                    <label htmlFor="yes" className="mr-4 font-semibold">
                      Yes
                    </label>
                    <input
                      type="radio"
                      id="no"
                      value="No"
                      {...register("receivedText", {
                        required: "This field is required",
                      })}
                      className="mr-2"
                    />
                    <label htmlFor="no" className=" font-semibold">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor=" Subscriber Address"
                  className="float-left mr-auto font-semibold"
                >
                  Address 1
                </label>
                <input
                  defaultValue={formData.subscriberAddress}
                  type="text"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("addressOne")}
                />
              </div>
              {/* row middle */}
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="addressTwo"
                  className="float-left mr-auto font-semibold"
                >
                  Address 2
                </label>
                <input
                  defaultValue={formData.addressTwo}
                  type="text"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("addressTwo", {
                    required: "Subscriber Address is required",
                  })}
                />
              </div>
            </div>
            {/* row end  */}

            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor="subscriberState"
                  className="float-left mr-auto font-semibold"
                >
                  Country <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("subscriberCountry", {
                    required: "Subscriber State is required",
                  })}
                  defaultValue={user.country}
                  // disabled
                >
                  <option value="">Select Country</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="United States">United States</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.country.message}
                  </p>
                )}
              </div>
              {/* row middle */}
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="state"
                  className="float-left mr-auto font-semibold"
                >
                  State <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("state", {
                    required: "State is required",
                  })}
                  value={"Arizona"}
                >
                  <option value="">Select State</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
            {/* row end  */}
            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor="city"
                  className="float-left mr-auto font-semibold"
                >
                  City <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("city", {
                    required: "City is required",
                  })}
                >
                  <option value="">Select City</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option>
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.city.message}
                  </p>
                )}
              </div>
              {/* row middle */}
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="zipCode"
                  className="float-left mr-auto font-semibold"
                >
                  Zip Code <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("zipCode", {
                    required: "Zip Code is required",
                  })}
                  defaultValue={formData.state}
                >
                  <option value="">Select Zip Code</option>
                  <option value="Alabama">4800</option>
                  <option value="Aaska">5320</option>
                  <option value="Arizona">4120</option>
                </select>
                {errors.zipCode && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
            {/* row end  */}
            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor="timeZone"
                  className="float-left mr-auto font-semibold"
                >
                  Time Zone <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("timeZone", {
                    required: "Time Zone is required",
                  })}
                >
                  <option value="">Select State</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option>
                </select>
                {errors.timeZone && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.timeZone.message}
                  </p>
                )}
              </div>
              {/* row middle */}
              <div className="flex items-start justify-start w-full flex-col"></div>
            </div>
            {/* row end  */}

            {/* end inputs */}
          </div>

          <div className="w-full my-5">
            <div className="flex items-center justify-center gap-5">
              <button
                className="bg-[#484691] text-lg font-medium text-white rounded-full py-3 px-10"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetting;
