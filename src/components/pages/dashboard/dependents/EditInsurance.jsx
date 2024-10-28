import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import EditInsuranceProfile from "./EditInsuranceProfile";
import EditInsuranceInfo from "./EditInsuranceInfo";
import axios from "axios";
import { toast } from "react-toastify";

const EditInsurance = ({ fetchData, setCurrentEditUserId }) => {
  // console.log(fetchData.id);
  // console.log(fetchData);
  const id = fetchData?.id;
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  // console.log(userId, token);
  const [externalStates, setExternalStates] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // profilePictureUrl: null,
    file: null,
  });

  // console.log(formData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const updatedData = { file: formData.file, userId, ...data };
    // setFormData(updatedData);
    // console.log(updatedData);

    if (data.haveInsurance === "Yes" && step < 2) {
      setStep(step + 1);
    } else {
      // console.log("Form submitted:", updatedData);
      try {
        // Make the PATCH request to update the dependent
        await axios.patch(
          `http://localhost:3000/dependents/update/${id}`, // Replace with your actual API endpoint
          updatedData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Form submitted and data updated:", response.data);
        // Optionally navigate to a different page after successful submission
        toast.success("Dependent updated successfully");
        setCurrentEditUserId(null);
        // navigate("/dashboard/my-dependents"); // Replace with the actual path
      } catch (error) {
        // console.error("Error updating dependent:", error);
        toast.error(error.response.data.message);
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
    <div className="bg-[#eeeeee] w-full flex items-center justify-start flex-col rounded-2xl px-5 min-h-screen">
      <div className="flex items-center justify-center w-full flex-col rounded-lg">
        <div className="flex items-center justify-center w-full text-xl font-semibold">
          <p
            className={`rounded-full rounded-r-none my-3  w-full md:w-1/2 text-center py-3 ${
              step === 1 ? "bg-primarybg text-white" : "bg-white text-primary "
            }`}
          >
            Profile
          </p>
          <p
            className={`rounded-full rounded-s-none my-3 w-full md:w-1/2 text-center py-3 ${
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
