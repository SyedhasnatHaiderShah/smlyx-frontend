import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import { FaUpload, FaTrash } from "react-icons/fa";
import countryStateCityData from "./countryStateCityData.json";

const EditInsuranceProfile = ({
  register,
  handleSubmit,
  errors,
  formData,
  goNext,
  watch,
  fetchData,
  setFormData,
  setExternalStates,
}) => {
  console.log(fetchData);
  // country, state, city, zipcode, timezone dynamically selet options state
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  // console.log(states);
  const [cities, setCities] = useState([]);
  const [singleState, setSingleState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [timezone, setTimezone] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  // Function to handle country selection
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setStates(Object.keys(countryStateCityData[country].states));
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSingleState(state);
    setStates(Object.keys(countryStateCityData[selectedCountry].states));
    setExternalStates(
      Object.keys(countryStateCityData[selectedCountry].states)
    );
    const selectedCities =
      countryStateCityData[selectedCountry].states[state].cities;
    setCities(Object.keys(selectedCities)); // Get city names as keys
    Object.keys(selectedCities).forEach((city) => {});
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    console.log(city);
    const currentZipCode =
      countryStateCityData[selectedCountry].states[singleState].cities[city]
        .zipcode;
    setZipcode(currentZipCode);
    const currentTimeZone =
      countryStateCityData[selectedCountry].states[singleState].cities[city]
        .timezone;
    setTimezone(currentTimeZone);
  };

  // console.log(fetchData);
  const [profileImage, setProfileImage] = useState(fetchData.fileUrl || null);
  const firstName = watch("firstName", "");
  const lastName = watch("lastName", "");

  const getInitials = () => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: selectedFile,
    }));
    console.log(selectedFile);
    setProfileImage(URL.createObjectURL(selectedFile));
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleImageRemove = () => {
    setFormData((prevData) => ({
      ...prevData,
      file: null,
    }));
    setProfileImage(null);
    // setFilePreview(null);
    document.getElementById("fileInput").value = "";
    // console.log("Image removed");
    // setProfileImage(null);
    // Reset file input value
    // document.getElementById("profilePicture").value = "";
  };
  // dob
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

  const getDefaultDate = () => {
    return "01/01/2000"; // or any default date in MM/DD/YYYY format
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Limit to 10 digits
    const limitedValue = cleanedValue.slice(0, 10);

    // Format as (XXX)-XXX-XXXX
    if (limitedValue.length <= 3) {
      return `(${limitedValue}`;
    } else if (limitedValue.length <= 6) {
      return `(${limitedValue.slice(0, 3)})-${limitedValue.slice(3)}`;
    } else {
      return `(${limitedValue.slice(0, 3)})-${limitedValue.slice(
        3,
        6
      )}-${limitedValue.slice(6)}`;
    }
  };

  const handlePhoneChange = (event) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    event.target.value = formattedValue; // Update the input with formatted value
  };

  return (
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl    min-h-screen gap-5">
      {/* <DashboardNav /> */}
      <div className="flex items-center justify-center w-full flex-col rounded-lg container ">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col w-full bg-white rounded-2xl p-5 container "
        >
          <div className="flex items-start justify-center flex-col sm:w-full py-5 relative gap-2">
            {/* File input */}
            <div className="flex items-start justify-start w-full gap-5">
              <div className="flex items-start justify-start">
                {profileImage ? (
                  <img
                    src={profileImage || fetchData.fileUrl || null}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div>
                    {getInitials() ? (
                      <div className="w-24 h-24 rounded-full bg-[#eeeeee] text-white flex items-center justify-center text-3xl font-bold">
                        {getInitials()}
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-[#eeeeee] text-gray-400 flex items-center justify-center text-xs font-bold border-2 border-gray-400">
                        No Preview
                        <br />
                        Available
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="relative w-40 flex flex-col gap-5">
                {profileImage ? (
                  <button
                    type="button"
                    className="flex items-center justify-center w-40 px-0 py-2 bg-red-500 rounded-full cursor-pointer text-white mt-2"
                    onClick={handleImageRemove}
                  >
                    <FaTrash className="mx-1" />
                    <span>Remove Photo</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center w-40 px-0 py-2 bg-primarybg rounded-full cursor-pointer text-white">
                    <FaUpload className="mr-2" />
                    <span>Upload </span>
                  </div>
                )}
                {!profileImage && (
                  <input
                    type="file"
                    id="profilePictureUrl"
                    className="w-full h-10 opacity-0 absolute z-10 cursor-pointer"
                    accept="image/*"
                    // {...register("file")}
                    onChange={handleImageChange}
                  />
                )}

                <span className="text-sm font-semibold text-gray-400 my-5">
                  (File should be smaller than 1MB)
                </span>
              </div>
            </div>

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
                  defaultValue={fetchData.firstName || ""}
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
                  htmlFor="lastName"
                  className="float-left mr-auto font-semibold"
                >
                  Last Name
                  <span className="text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={fetchData.lastName || ""}
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
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="phone"
                  className="float-left mr-auto font-semibold"
                >
                  Emergency Contact Phone Number (XXX)-XXX-XXXX
                  <span className="text-red-500 text-xl"> *</span>
                </label>
                <input
                  defaultValue={fetchData.emergencyContactPhoneNumber || ""}
                  type="tel"
                  maxLength={14}
                  pattern="^\(\d{3}\)-\d{3}-\d{4}$"
                  placeholder="(XXX)-XXX-XXXX"
                  onInput={handlePhoneChange}
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("emergencyContactPhoneNumber", {
                    required: "Phone number is required",
                    validate: (value) => {
                      const cleanedValue = value.replace(/\D/g, "");
                      return (
                        cleanedValue.length === 10 ||
                        "Phone number must be 10 digits"
                      );
                    },
                  })}
                />
                {/* <input
                  defaultValue={fetchData.emergencyContactPhoneNumber || ""}
                  type="tel"
                  pattern="^[+]?[0-9]{10,14}$"
                  placeholder="(XXX)-XXX-XXXX"
                  onInput={handlePhoneChange}
                  maxLength={14}
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("emergencyContactPhoneNumber", {
                    required: "Phone number is required",
                    validate: (value) => {
                      const cleanedValue = value.replace(/\D/g, ""); // Remove formatting
                      return (
                        cleanedValue.length === 10 ||
                        "Phone number must be 10 digits"
                      );
                    },
                  })}
                /> */}
                {errors.emergencyContactPhoneNumber && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.emergencyContactPhoneNumber.message}
                  </p>
                )}
              </div>

              <div className="flex items-start justify-start w-full flex-col">
                <label
                  htmlFor="subscriberState"
                  className="float-left mr-auto font-semibold"
                >
                  Select Relation{" "}
                  <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("dependentRelation", {
                    required: "Select Relation is required",
                  })}
                  defaultValue={fetchData?.dependentRelation || ""}
                >
                  <option value="">Select Relation</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Son">Son</option>
                  <option value="Brother">Brother</option>
                  <option value="Daughter"> Daughter</option>
                  <option value="Spouse"> Spouse</option>
                  <option value="Friend"> Friend</option>
                  <option value="Other"> Other</option>
                </select>
                {errors.dependentRelation && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.dependentRelation.message}
                  </p>
                )}
              </div>
            </div>
            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col">
                <div className="w-full flex items-start justify-between">
                  <label className="radio-label text-base font-semibold">
                    Gender <span className=" text-red-500 text-xl"> *</span>
                  </label>
                </div>
                <div className="radio-options flex items-start justify-start gap-5 w-full">
                  <label className="radio-option text-base font-semibold">
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender", {
                        required: "Please select a  Gender.",
                      })}
                      defaultChecked={fetchData?.gender === "Male"}
                    />
                    Male
                  </label>
                  <label className="radio-option text-base font-semibold">
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender", {
                        required: "Please select a  Gender.",
                      })}
                      defaultChecked={fetchData?.gender === "Female"}
                    />
                    Female
                  </label>
                  <label className="radio-option text-base font-semibold">
                    <input
                      type="radio"
                      value="other"
                      {...register("gender", {
                        required: "Please select a  Gender.",
                      })}
                      defaultChecked={fetchData?.gender === "Other"}
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
                  defaultValue={fetchData?.dateOfBirth}
                  type="date"
                  max={getTodayDate()}
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
            {/* row start */}

            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor="primaryAddress"
                  className="float-left mr-auto font-semibold"
                >
                  Primary Address
                </label>
                <textarea
                  defaultValue={fetchData?.primaryAddress}
                  cols={30}
                  rows={5}
                  type="text"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 resize-none focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("primaryAddress")}
                />
              </div>
              {/* row middle */}
              <div className="flex items-start justify-center w-full flex-col">
                <label
                  htmlFor="secondaryAddress"
                  className="float-left mr-auto font-semibold"
                >
                  Secondary Address
                </label>
                <textarea
                  defaultValue={fetchData?.secondaryAddress}
                  cols={30}
                  rows={5}
                  type="text"
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md resize-none py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                  {...register("secondaryAddress", {})}
                />
              </div>
            </div>
            {/* row end  */}

            {/* row start */}
            <div className="flex items-center justify-center md:flex-row flex-col w-full gap-5">
              <div className="flex items-start justify-start w-full flex-col gap-2">
                <label
                  htmlFor="country"
                  className="float-left mr-auto font-semibold"
                >
                  Country <span className=" text-red-500 text-xl"> *</span>
                </label>
                <select
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("country", {
                    required: "Country is required",
                  })}
                  defaultValue={fetchData?.country}
                  // value={fetchData.country}
                  onChange={handleCountryChange}
                >
                  {Object.keys(countryStateCityData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}

                  {/* <option value="">Select Country</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="United States">United States</option> */}
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
                  defaultValue={fetchData?.state}
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("state", {
                    required: "State is required",
                  })}
                  onChange={handleStateChange}
                >
                  {states.length > 0 ? (
                    states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))
                  ) : (
                    <option disabled>No states available</option>
                  )}
                  {/* <option value="">Select State</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option> */}
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
                  defaultValue={fetchData.city}
                  defaultChecked={fetchData.city}
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("city", {
                    required: "City is required",
                  })}
                  onChange={handleCityChange}
                >
                  {cities.length > 0 ? (
                    cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))
                  ) : (
                    <option disabled>No cities available</option>
                  )}
                  {/* <option value="">Select City</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option> */}
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
                  defaultValue={fetchData.zipCode}
                  defaultChecked={fetchData.zipCode}
                >
                  <option value="zipCode">{zipcode}</option>
                  {/* 
                  <option value="">Select Zip Code</option>
                  <option value="Alabama">4800</option>
                  <option value="Aaska">5320</option>
                  <option value="Arizona">4120</option> */}
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
                  defaultValue={fetchData.timeZone}
                  defaultChecked={fetchData.timeZone}
                  className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-bold"
                  {...register("timeZone", {
                    required: "Time Zone is required",
                  })}
                >
                  <option value="zipCode">{timezone}</option>

                  {/* <option value="">Select Time Zone</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Aaska">Aaska</option>
                  <option value="Arizona">Arizona</option> */}
                </select>
                {errors.timeZone && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.timeZone.message}
                  </p>
                )}
              </div>
              {/* row middle */}
            </div>
            {/* row end  */}

            <div className="flex items-start justify-between md:flex-row w-full md:w-1/2 my-2">
              <div className="flex items-start justify-between w-full">
                <div className="w-full flex items-start justify-center">
                  <label className="radio-label text-base font-semibold">
                    Do you have insurance?
                  </label>
                </div>
                <div className="flex items-start justify-center gap-3 w-full">
                  <label className="radio-option text-base font-semibold flex items-center justify-center ">
                    <input
                      defaultValue={fetchData.haveInsurance === "Yes" && "Yes"}
                      defaultChecked={
                        fetchData.haveInsurance === "Yes" && "Yes"
                      }
                      type="radio"
                      value="Yes"
                      {...register("haveInsurance")}
                    />
                    Yes
                  </label>
                  <label className="radio-option text-base font-semibold flex items-center justify-center ">
                    <input
                      defaultValue={fetchData.haveInsurance === "No" && "No"}
                      defaultChecked={fetchData.haveInsurance === "No" && "No"}
                      type="radio"
                      value="No"
                      {...register("haveInsurance")}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* end inputs */}
          </div>

          <div className="w-full my-5">
            <div className="flex items-center justify-center gap-5">
              <button
                className="bg-primarybg font-medium text-white rounded-full py-1 px-10"
                type="submit"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInsuranceProfile;
