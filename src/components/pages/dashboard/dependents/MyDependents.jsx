import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import InsuranceProfile from "./InsuranceProfile";
import InsuranceInfo from "./InsuranceInfo";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const MyDependents = ({ setShowAddDependents }) => {
  // multi step
  const [externalStates, setExternalStates] = useState([]);
  const token = localStorage.getItem("token");
  // +add dependents component
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    // profilePictureUrl: null,
    file: null,
  });
  console.log("dependentsformData", formData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setFormData(data);
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    // Prepare the data payload without FormData
    const payload = {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      emergencyContactPhoneNumber: data.emergencyContactPhoneNumber,
      dependentRelation: data.dependentRelation,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      primaryAddress: data.primaryAddress,
      secondaryAddress: data.secondaryAddress,
      country: data.country,
      state: data.state,
      city: data.city,
      zipCode: data.zipCode,
      timeZone: data.timeZone,
      haveInsurance: data.haveInsurance,
      dentalInsuranceCarrier: data.dentalInsuranceCarrier,
      patientRelation: data.patientRelation,
      subscriberFirstName: data.subscriberFirstName,
      subscriberLastName: data.subscriberLastName,
      subscriberGender: data.subscriberGender,
      subscriberDateOfBirth: data.subscriberDateOfBirth,
      subscriberId: data.subscriberId,
      employer: data.employer,
      groupNo: data.groupNo,
      subscriberAddress: data.subscriberAddress,
      subscriberCity: data.subscriberCity,
      subscriberState: data.subscriberState,
      subscriberZip: data.subscriberZip,
    };

    // Check if there’s a file to upload

    if (data.haveInsurance === "Yes" && step < 2) {
      setStep(step + 1);
    } else {
      if (data.file) {
        // If a file is present, create FormData for file upload
        const formData = new FormData();
        Object.keys(payload).forEach((key) =>
          formData.append(key, payload[key])
        );
        formData.append("file", data.file);

        try {
          const response = await axios.post(
            "http://localhost:3000/dependents/create",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Form submitted successfully:", response.data);
          toast.success("Dependents added successfully");
          setFormData({}); // Reset form data after successful submission
          setShowAddDependents(false);
        } catch (error) {
          console.error("Error submitting the form:", error);
          toast.error("Error submitting the form");
        }
      } else {
        // If no file, send JSON data
        try {
          const response = await axios.post(
            "http://localhost:3000/dependents/create",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("payload submitted successfully:", response.data);
          toast.success("Dependents added successfully");
          setFormData({}); // Reset form data after successful submission
          setShowAddDependents(false);
        } catch (error) {
          console.error("Error submitting the form:", error);
          toast.error("Error submitting the form");
        }
      }
    }
  };

  const goBack = () => {
    setStep(step - 1);
  };
  const goNext = () => {
    setStep(step + 1);
  };

  // multi step end

  const [showProfile, setShowProfile] = useState(true);
  const [showInsuranceInfo, setShowInsuranceInfo] = useState(false);

  const handleProfileSubmit = (data) => {
    setFormData(data);
    if (data.hasInsurance === "Yes") {
      setShowProfile(false);
      setShowInsuranceInfo(true);
    } else {
      // handle final submission if no insurance
      // console.log("Final data: ", data);
      // you can navigate to another page or show a success message here
    }
  };

  const handleInsuranceInfoSubmit = (data) => {
    const finalData = { ...formData, ...data };
    // console.log("Final data: ", finalData);
    // you can navigate to another page or show a success message here
  };

  return (
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl min-h-screen">
      <div className="flex items-center justify-center w-full flex-col rounded-lg">
        {/* <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 my-2">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>{" "}
          / My Dependents
        </div> */}
        {/* <div className="flex items-start justify-start flex-col w-full my-2">
          <p className="text-2xl text-gray-900 font-semibold mt-1 w-full">
            My Dependents
          </p>
          <p className="text-lg text-primarybg font-semibold w-full">
            Family Member's Profile
          </p>
        </div> */}
        <div className="flex items-center justify-center w-full text-xl font-semibold">
          <p
            className={`rounded-full rounded-r-none  w-full md:w-1/2 text-center py-3 ${
              step === 1 ? "bg-primarybg cursor-pointer" : "bg-white"
            }`}
          >
            Profile
          </p>
          <p
            className={`rounded-full rounded-s-none w-full md:w-1/2 text-center py-3 ${
              step === 2 ? "bg-primarybg cursor-pointer" : "bg-white"
            }`}
          >
            Insurance Info
          </p>
        </div>
      </div>
      <div className=" w-full">
        {step === 1 && (
          <InsuranceProfile
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            goBack={goBack}
            goNext={goNext}
            watch={watch}
            setFormData={setFormData}
            setExternalStates={setExternalStates}
          />
        )}

        {step === 2 && (
          <InsuranceInfo
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            goBack={goBack}
            goNext={goNext}
            externalStates={externalStates}
          />
        )}
      </div>
    </div>
  );
};

export default MyDependents;
