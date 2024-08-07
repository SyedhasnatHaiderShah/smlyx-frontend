import smart from "../assets/smart.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LockIcon from "@mui/icons-material/Lock";
import VisitDetails from "./seeDentistsForms/VisitDetails";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import SelectPharmacy from "./seeDentistsForms/SelectPharmacy";
import ReviewSubmit from "./seeDentistsForms/ReviewSubmit";
import BillingInformation from "./seeDentistsForms/BillingInformation";

const ProgressBar = ({ currentStep }) => {
  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full flex items-center justify-center bg-slate-300 rounded-full h-8 mb-1">
      <div
        className="h-8 rounded-full w-full bg-gradient-to-r from-primarybg via- to-primary flex items-center justify-center text-white font-bold"
        // style={{ width: `${progressPercentage}%` }}
      >
        {currentStep === 1 ? (
          <p className=" text-xs md:text-sm w-full flex items-center justify-center">
            Step 1 Visit Details
          </p>
        ) : currentStep === 2 ? (
          <p className=" text-xs  md:text-sm w-full flex items-center justify-center">
            Step 2 Select pharmacy
          </p>
        ) : currentStep === 3 ? (
          <p className=" text-xs md:text-sm w-full flex items-center justify-center">
            Step 3 Review Pharmacy
          </p>
        ) : (
          <p className=" text-xs md:text-sm w-full flex items-center justify-center">
            Step 4 Billing Information
          </p>
        )}
      </div>
    </div>
  );
};

const SeeDentist = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  console.log(formData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log("Form submitted:", updatedData);
      navigate("/dashboard");
    }
  };
  const dataCollection = () => {
    const updatedData = { ...formData, formData };
    setFormData(updatedData);

    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log("Form submitted:", updatedData);
    }
  };

  const goBack = () => {
    if (step === 1) {
      return null;
    } else {
      setStep(step - 1);
    }
  };
  const goNext = () => {
    if (step === 4) {
      return null;
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className=" flex items-start justify-start  w-full  flex-col  min-h-screen h-full  bg-[#eeeeee] px-5">
      <div className="   w-full mt-8 min-h-screen container ">
        <div className=" flex items-start justify-start flex-col w-full bg-white h-full gap-5 p-5 rounded-xl ">
          {/* progress number with 4 steps */}
          <div className=" flex items-start justify-start w-full">
            <ProgressBar currentStep={step} />
          </div>

          {/* see a dentist now */}
          {step === 1 && (
            <VisitDetails
              formData={formData}
              setFormData={setFormData}
              goBack={goBack}
              goNext={goNext}
            />
          )}
          {step === 2 && (
            <SelectPharmacy
              formData={formData}
              setFormData={setFormData}
              goBack={goBack}
              goNext={goNext}
            />
          )}
          {step === 3 && (
            <ReviewSubmit
              register={register}
              handleSubmit={handleSubmit(onSubmit)}
              formData={formData}
              errors={errors}
              setFormData={setFormData}
              goBack={goBack}
              goNext={goNext}
            />
          )}
          {step === 4 && (
            <BillingInformation
              register={register}
              handleSubmit={handleSubmit(onSubmit)}
              formData={formData}
              errors={errors}
              setFormData={setFormData}
              goBack={goBack}
              goNext={goNext}
            />
          )}
        </div>
        <div className=" flex items-center justify-center gap-5 h-28">
          <button
            className=" bg-[#605fa4] text-white text-sm font-bold px-5 py-3 rounded-full"
            onClick={goBack}
          >
            Back
          </button>
          <button
            className=" bg-[#605fa4] text-white text-sm font-bold px-5 py-3 rounded-full"
            onClick={goNext}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeDentist;
