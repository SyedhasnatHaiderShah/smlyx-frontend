import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import EditInsuranceProfile from "./EditInsuranceProfile";
import EditInsuranceInfo from "./EditInsuranceInfo";
import axios from "axios";
import { toast } from "react-toastify";

const EditInsurance = ({ fetchData, setCurrentEditUserId }) => {
  console.log(fetchData);
  const depndentId = fetchData?.id;
  const token = localStorage.getItem("token");
  // console.log(userId, token);
  const [externalStates, setExternalStates] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    file: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { id, ...updatedData } = data;
    let payload = {};
    if (formData.file) {
      payload = {
        file: formData.file,
        ...updatedData,
      };
    } else {
      payload = { ...updatedData };
    }

    try {
      await axios.patch(
        `http://localhost:3000/dependents/update/${depndentId}`,
        payload,
        {
          headers: {
            "Content-Type": formData.file
              ? "multipart/form-data"
              : "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Dependent updated successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
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
    }
  };

  const handleInsuranceInfoSubmit = (data) => {
    const finalData = { ...formData, ...data };
  };

  return (
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl px-5 min-h-screen">
      <div className="flex items-center justify-center w-full flex-col rounded-lg">
        <div className="flex items-center justify-center w-full text-xl font-semibold">
          <p
            className={`rounded-lg rounded-r-none my-0  w-full md:w-1/2 text-center py-3 ${
              step === 1 ? "bg-primarybg text-white" : "bg-white text-primary "
            }`}
          >
            Profile
          </p>
          <p
            className={`rounded-lg rounded-s-none my-3 w-full md:w-1/2 text-center py-3 ${
              step === 2 ? "bg-primarybg text-white" : "bg-white text-primary "
            }`}
          >
            Insurance Info
          </p>
        </div>
      </div>
      <div className=" w-full">
        {step === 1 && (
          <EditInsuranceProfile
            setFormData={setFormData}
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            fetchData={fetchData}
            goBack={goBack}
            goNext={goNext}
            watch={watch}
            setExternalStates={setExternalStates}
          />
        )}

        {step === 2 && (
          <EditInsuranceInfo
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            goBack={goBack}
            goNext={goNext}
            fetchData={fetchData}
            externalStates={externalStates}
          />
        )}
      </div>
    </div>
  );
};

export default EditInsurance;
