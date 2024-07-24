import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { FaUpload, FaTrash } from "react-icons/fa"; // Import delete icon

const ProfileSetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const firstName = watch("firstName", "");
  const lastName = watch("lastName", "");

  const getInitials = () => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  const onSubmit = (data) => {
    setFormData(data);
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1048576) {
      // Check file size (1MB = 1048576 bytes)
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File should be smaller than 1MB");
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
    // Reset file input value
    document.getElementById("profilePicture").value = "";
  };

  return (
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl md:px-12 px-5 min-h-screen gap-10">
      <DashboardNav />
      <div className="flex items-center justify-center w-full flex-col rounded-lg">
        <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 my-2">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>{" "}
          / Profile Setting
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col w-full bg-white rounded-2xl p-5 gap-2 container"
        >
          <div className="flex items-start justify-center flex-col sm:w-full py-0 relative">
            <p className="text-xl text-primary font-semibold my-3 w-full">
              Profile Setting
            </p>

            {/* File input */}
            <div className="flex items-start justify-start w-full gap-5">
              <div className="flex items-start justify-start">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#0a1d62] text-white flex items-center justify-center text-3xl font-bold">
                    {getInitials()}
                  </div>
                )}
              </div>
              <div className="relative w-40 flex flex-col gap-5">
                {profileImage && (
                  <button
                    type="button"
                    className="flex items-center justify-center w-40 px-0 py-2 bg-red-500 rounded-full cursor-pointer text-white mt-2"
                    onClick={handleImageRemove}
                  >
                    <FaTrash className="mx-1" />
                    <span>Remove Photo</span>
                  </button>
                )}
                <input
                  type="file"
                  id="profilePicture"
                  className="w-full h-10 opacity-0 absolute z-10 cursor-pointer"
                  {...register("profilePicture")}
                  onChange={handleImageChange}
                />

                <div className="flex items-center justify-center w-40 px-0 py-2 bg-primarybg rounded-full cursor-pointer text-white">
                  <FaUpload className="mr-2" />
                  <span>Upload</span>
                </div>

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
