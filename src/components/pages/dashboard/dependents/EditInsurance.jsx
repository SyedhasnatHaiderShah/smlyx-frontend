import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EditInsuranceProfile from "./EditInsuranceProfile";
import EditInsuranceInfo from "./EditInsuranceInfo";

const EditInsurance = ({ fetchData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (data.haveInsurance === "yes" && step < 2) {
      setStep(step + 1);
    } else {
      // console.log("Form submitted:", updatedData);
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
            className={`rounded-full rounded-r-none  w-full md:w-1/2 text-center py-3 ${
              step === 1 ? "bg-white cursor-pointer" : "bg-[#eeeeee]"
            }`}
          >
            Profile
          </p>
          <p
            className={`rounded-full rounded-s-none w-full md:w-1/2 text-center py-3 ${
              step === 2 ? "bg-white cursor-pointer" : "bg-[#eeeeee]"
            }`}
          >
            Insurance Info
          </p>
        </div>
      </div>
      <div className=" w-full">
        {step === 1 && (
          <EditInsuranceProfile
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            fetchData={fetchData}
            goBack={goBack}
            goNext={goNext}
            watch={watch}
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
          />
        )}
      </div>
    </div>
  );
};

export default EditInsurance;
