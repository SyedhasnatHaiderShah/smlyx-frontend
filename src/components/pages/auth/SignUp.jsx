import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import axios from "axios";
import { toast } from "react-toastify";

const ProgressBar = ({ currentStep }) => {
  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white rounded-full h-6 mb-4">
      <div
        className="h-6 rounded-full bg-gradient-to-r from-primarybg via- to-primary"
        style={{ width: `${progressPercentage}%` }}
      >
        <p className=" w-full flex items-center justify-center text-white font-bold">
          Step {currentStep} / 3
        </p>
      </div>
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
  const onSubmit = async (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    try {
      // new logic
      if (step === 1) {
        // Move to Step 2 if insurance is Yes
        setStep(updatedData.insurance === "Yes" ? step + 1 : step + 2);
      } else if (step === 2) {
        // Move to Step 3
        setStep(step + 1);
      } else if (step === 3) {
        // Final submission

        // old but working
        // Handle navigation based on the current step
        // if (step === 1) {
        //   if (updatedData.insurance === "Yes") {
        //     // Move to Step 2 for insurance details
        //     setStep(step + 1);
        //   } else {
        //     // Skip to Step 3 if no insurance
        //     setStep(step + 2);
        //   }
        // } else if (step === 2) {
        //   // If we're on Step 2 (insurance details), move to Step 3
        //   setStep(step + 1);
        // } else if (step === 3) {
        // Final submission on Step 3

        const { confirmPassword, ...submissionData } = updatedData;

        // API call using try-catch for error handling
        const response = await axios.post(
          "http://localhost:3000/users/registeruser",
          submissionData
        );

        // If the registration is successful
        console.log("User successfully registered:", response.data);
        navigate("/dashboard");
        toast.success("User successfully registered");
      }
    } catch (error) {
      // Catch any errors and handle them
      // alert("Error registering user: " + error.message);
      // console.error("Error registering user:", error);
      // toast.error(error.response);

      const errorMessage = error.response?.data?.message || "An error occurred";
      const errorCode = error.response?.data?.statusCode || "Unknown Error";

      // Log or display the error messages
      // console.error("Error messages:", errorMessage);
      // console.error("Error code:", errorCode);
      toast.error(errorMessage);
      // toast.error(errorCode);
    }
  };

  const goBack = () => {
    if (formData.insurance === "No" && step > 1) {
      setStep(step - 2);
      return;
    } else {
      setStep(step - 1);
    }
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
          // first form
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
          // insurance form
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
          // password form
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
