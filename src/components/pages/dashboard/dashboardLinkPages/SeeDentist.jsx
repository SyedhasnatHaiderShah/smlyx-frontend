import smart from "../assets/smart.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LockIcon from "@mui/icons-material/Lock";
import VisitDetails from "./seeDentistsForms/VisitDetails";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
const SeeDentist = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className=" flex items-start justify-start  w-full  flex-col  min-h-screen h-full  bg-[#eeeeee] px-5">
      <div className="   w-full mt-8 min-h-screen container ">
        <div className=" flex items-start justify-start flex-col w-full bg-white h-full gap-5 p-5 rounded-xl ">
          {/* progress number with 4 steps */}

          {/* see a dentist now */}
          <VisitDetails
            register={register}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default SeeDentist;
