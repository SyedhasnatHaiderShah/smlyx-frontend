import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const ProgressBar = ({ currentStep }) => {
  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white rounded-full h-6 mb-4">
      <div
        className="h-6 rounded-full bg-gradient-to-r from-primarybg via- to-primary"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

const SignUp = () => {
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

    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Form submitted:", updatedData);
      navigate("/dashboard");
    }
  };

  const goBack = () => {
    setStep(step - 1);
  };
  const goNext = () => {
    setStep(step + 1);
  };

  return (
    <div className=" bg-[#eeeeee] min-h-screen flex items-start justify-start flex-col py-2 md:px-7 px-5">
      <div className="flex items-center justify-center gap-3 py-2">
        <img src={logo} alt="logo" className="w-12" />
        <p
          className="text-4xl bg-gradient-to-r from-primarybg via-heading to-primary text-transparent cursor-pointer bg-clip-text w-52 font-bold"
          onClick={() => navigate("/")}
        >
          SMLYX.com
        </p>
      </div>
      <div className=" py-12 w-full container">
        <ProgressBar currentStep={step} />
        {step === 1 && (
          <StepOne
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            goBack={goBack}
            goNext={goNext}
          />
        )}
        {step === 2 && (
          <StepTwo
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            goBack={goBack}
            goNext={goNext}
          />
        )}
        {step === 3 && (
          <StepThree
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            formData={formData}
            goBack={goBack}
            watch={watch}
          />
        )}
      </div>
    </div>
  );
};
export default SignUp;
