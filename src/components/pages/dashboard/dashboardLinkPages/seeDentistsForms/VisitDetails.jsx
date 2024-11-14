import React, { useEffect, useState } from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AddDependent from "./AddDependent";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form11 from "./Form11";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddUpdateInsurance from "./AddUpdateInsurance";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useSelector } from "react-redux";
const VisitDetails = ({ formData, setFormData, goBack, goNext }) => {
  const users = useSelector((state) => state.dependents.currentUser);
  // console.log(users.map((item) => item.firstName));

  const [selectedState, setSelectedState] = useState("");
  const [allergyYes, setAllergyYes] = useState(false);
  const [medicalConditionsYes, setMedicalConditionsYes] = useState(false);
  const [medicationYes, setMedicationYes] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();

  const navigate = useNavigate();
  const symptoms = [
    "Fever",
    "Swelling",
    "Sores/Lesions",
    "Dry Mouth",
    "Sore Throat",
    "Sensitivity",
    "None of the above",
  ];

  const validateDateNotInFuture = (value) => {
    const today = new Date();
    const inputDate = new Date(value);
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(today.getFullYear() - 5);

    if (inputDate > today) {
      return "Date cannot be in the future.";
    }
    if (inputDate < fiveYearsAgo) {
      return "Date cannot be more than previous 5 years old.";
    }
    return true;
  };
  // const {
  //   register,
  //   watch,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  const visitReason = watch("visitReason", "");

  // const onSubmit = (data) => {
  //   setFormData(data);
  // };
  const [showDependent, setShowDependent] = React.useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  // const [selectedPatient, setSelectedPatient] = useState("");
  const [showInsuranceToggle, setShowInsuranceToggle] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const validateAge = (value) => {
    const today = new Date();
    const dob = new Date(value);

    if (dob > today) {
      return "Date of Birth cannot be in the future.";
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
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handlePatientChange = () => {
    const patient = formData.patient;
    // setSelectedPatient(patient);
    if (patient === "" || patient === undefined) {
      setShowInsuranceToggle(false);
    } else {
      setShowInsuranceToggle(true);
    }
  };

  const onSubmit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  // useEffect(() => {
  //   handlePatientChange();
  // }, [formData]);

  // signature part
  const sigCanvas = useRef(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  // Save the signature as an image in FormData
  const saveSignature = () => {
    // Convert the canvas to a Base64 image string
    const dataUrl = sigCanvas.current.toDataURL("image/png");

    // Convert the Base64 string to a Blob
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Create a new FormData instance
    // const formData = new FormData();
    setFormData((prev) => ({ ...prev, signature: blob }));

    // Append the Blob to FormData as an image file
    // formData.append('signature', blob, 'signature.png');

    // Now you can send formData via an HTTP request (e.g., using fetch or axios)
    console.log(formData);
  };

  return (
    <div className=" flex items-start justify-start flex-col w-full gap-2">
      <p className=" text-2xl font-semibold ">See A Dentist Now </p>
      <p className=" text-lg text-primarybg font-semibold">
        Price of visit: $59
      </p>
      <div className=" flex items-start justify-start flex-col w-full md:w-1/2">
        <form
          className=" w-full gap-2 flex items-start justify-start flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" flex items-start justify-start w-full flex-col">
            {/* patient selection */}
            <label
              htmlFor="state"
              className="float-left mr-auto font-semibold text-primary"
            >
              Who is this visit for? *{" "}
              <span className=" text-red-500 text-xl"> *</span>
            </label>
            <select
              className={`w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold ${
                showDependent ? "bg-[#e9ecef]" : " bg-slate-50"
              }`}
              {...register("patient", { required: "Patient is required" })}
              disabled={showDependent}
              // onChange={handlePatientChange}
            >
              {users.map((user) => (
                <option key={user.id} value={(user.firstName, user.lastName)}>
                  {user.firstName} {""} {user.lastName}
                </option>
              ))}
              {/* <option value="">Select Patient</option>
              <option value="user1">user1</option>
              <option value="user2">user2</option>
              <option value="user3">user3</option> */}
            </select>
            {errors.patient && (
              <p className="text-red-500 text-sm font-bold float-left mr-auto">
                {errors.patient.message}
              </p>
            )}
          </div>
        </form>
        <p
          className=" underline text-sm text-gray-400 font-medium cursor-pointer py-2"
          onClick={() => setShowDependent(!showDependent)}
        >
          + Add Dependent
        </p>
        {/* dynamic form on toggle the add dependent  */}
        {showDependent && (
          <AddDependent />
          // <div className=" flex items-start justify-start w-full flex-col">
          //   <form
          //     className=" w-full gap-2 flex items-start justify-start flex-col"
          //     onSubmit={handleSubmit(onSubmit)}
          //   >
          //     <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
          //       <div className=" flex items-start justify-start w-full flex-col">
          //         <label
          //           htmlFor="firstName"
          //           className="float-left mr-auto font-semibold"
          //         >
          //           First Name <span className=" text-red-500 text-xl"> *</span>
          //         </label>
          //         <input
          //           defaultValue={formData.firstName}
          //           type="text"
          //           placeholder="First Name"
          //           className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
          //           {...register("firstName", {
          //             required: "First Name is required",
          //           })}
          //         />
          //         {errors.firstName && (
          //           <p className="text-red-500 text-sm font-bold float-left mr-auto">
          //             {errors.firstName.message}
          //           </p>
          //         )}
          //       </div>
          //       <div className=" flex items-start justify-start w-full flex-col">
          //         <label
          //           htmlFor="lastName"
          //           className="float-left mr-auto font-semibold"
          //         >
          //           Last Name <span className=" text-red-500 text-xl"> *</span>
          //         </label>
          //         <input
          //           defaultValue={formData.lastName}
          //           type="text"
          //           placeholder="Last Name"
          //           className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
          //           {...register("lastName", {
          //             required: "Last Name is required",
          //           })}
          //         />
          //         {errors.lastName && (
          //           <p className="text-red-500 text-sm font-bold float-left mr-auto">
          //             {errors.lastName.message}
          //           </p>
          //         )}
          //       </div>
          //     </div>
          //     <div className=" flex items-center justify-center md:flex-row flex-col w-full gap-5">
          //       <div className=" flex items-start justify-start w-full flex-col">
          //         <label
          //           htmlFor="relation"
          //           className="float-left mr-auto font-semibold"
          //         >
          //           Select Relation
          //           <span className=" text-red-500 text-xl"> *</span>
          //         </label>
          //         <select
          //           className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary text-heading text-sm font-semibold"
          //           {...register("relation", {
          //             required: "Relation is required",
          //           })}
          //         >
          //           <option value="">Select Relation</option>
          //           <option value="Father">Father</option>
          //           <option value="Mother">Mother</option>
          //           <option value="Son">Son</option>
          //           <option value="Brother">Brother</option>
          //           <option value="Daughter"> Daughter</option>
          //           <option value="Spouse">Spouse</option>
          //           <option value="Friend">Friend</option>
          //           <option value="Other">Other</option>
          //         </select>
          //         {errors.relation && (
          //           <p className="text-red-500 text-sm font-bold float-left mr-auto">
          //             {errors.relation.message}
          //           </p>
          //         )}
          //       </div>
          //       <div className="flex items-start justify-start w-full flex-col">
          //         <label
          //           htmlFor="subscriberDateOfBirth"
          //           className="float-left mr-auto font-semibold"
          //         >
          //           Date of Birth{" "}
          //           <span className=" text-red-500 text-xl"> *</span>
          //         </label>
          //         <input
          //           type="date"
          //           pattern="\d{2}/\d{2}/\d{4}"
          //           placeholder="MM/DD/YYYY"
          //           className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
          //           {...register("dateOfBirth", {
          //             required: "Date of Birth is required",
          //             validate: validateAge,
          //           })}
          //         />
          //         {errors.dateOfBirth && (
          //           <p className="text-red-500 text-sm font-bold float-left mr-auto">
          //             {errors.dateOfBirth.message}
          //           </p>
          //         )}
          //       </div>
          //     </div>
          //     <div className=" flex items-start justify-start w-full flex-col gap-2">
          //       <div className="w-full flex items-start justify-between">
          //         <label className="radio-label text-base font-semibold">
          //           Gender
          //         </label>
          //       </div>
          //       <div>
          //         <div className="radio-options flex items-start justify-center gap-5 w-full">
          //           <label className="radio-option text-base font-semibold">
          //             <input
          //               type="radio"
          //               value="Male"
          //               {...register("gender", {
          //                 required: "Please select an option.",
          //               })}
          //             />
          //             Male
          //           </label>
          //           <label className="radio-option text-base font-semibold">
          //             <input
          //               type="radio"
          //               value="Female"
          //               {...register("gender", {
          //                 required: "Please select an option.",
          //               })}
          //             />
          //             Female
          //           </label>
          //           <label className="radio-option text-base font-semibold">
          //             <input
          //               type="radio"
          //               value="other"
          //               {...register("gender", {
          //                 required: "Please select an option.",
          //               })}
          //             />
          //             Other
          //           </label>
          //         </div>
          //         {errors.gender && (
          //           <p className="text-red-500 text-sm font-bold float-left mr-auto">
          //             {errors.gender.message}
          //           </p>
          //         )}
          //       </div>
          //     </div>
          //     <div className=" flex items-center justify-center my-5">
          //       <button
          //         className=" border rounded-full px-8 py-2 bg-primarybg text-white "
          //         type="submit"
          //         //   onClick={(e) => e.preventDefault()}
          //       >
          //         Add Dependent
          //       </button>
          //     </div>
          //   </form>
          // </div>
        )}

        {/* other data */}

        <div className=" flex items-start justify-start w-full flex-col">
          <label
            htmlFor="state"
            className="float-left mr-auto font-semibold text-primary"
          >
            Where will you be located during your visit?
            <span className=" text-red-500 text-xl"> *</span>
          </label>
          <select
            className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-3 focus:outline-primary text-heading text-sm font-bold"
            {...register("state", { required: "State is required" })}
            onChange={(e) => {
              setSelectedState(e.target.value);
            }}
          >
            <option value="">Select State</option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District of Columbia">District of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Guam">Guam</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
          {errors.patient && (
            <p className="text-red-500 text-sm font-bold float-left mr-auto">
              {errors.patient.message}
            </p>
          )}
        </div>
        <div className=" flex items-start justify-start w-full gap-3 py-3">
          <div className=" bg-[#e0c84b]  w-10 py-2 rounded-full flex items-center justify-center  ">
            <PriorityHighIcon fontSize="" className=" text-white" />
          </div>
          <p className=" text-gray-500 font-semibold ">
            If this is a medical emergency, please dial 911 or go to your
            nearest medical facility immediately.
          </p>
        </div>
        {/* </form> */}
        <div className=" flex items-center justify-center w-full"></div>
      </div>

      {/* insurance form toggle */}
      <div className=" flex items-center justify-center my-3">
        <input
          type="checkbox"
          className="mr-2"
          {...register("addUpdateInsurance")}
          value={showInsurance}
          onChange={() => setShowInsurance(!showInsurance)}
        />
        <label
          htmlFor="addUpdateInsurance"
          className=" text-lg font-semibold  text-gray-700"
        >
          Click here to add or update your insurance.
        </label>
      </div>

      {/* insurance form  component*/}
      {showInsurance && <AddUpdateInsurance />}
      {/* isnurance add update ended */}

      {selectedState && (
        <div className=" w-full flex items-start justify-start   ">
          <div className="flex flex-col bg-[#eeeeee] w-full px-5 py-8 rounded-lg gap-3">
            <p className=" text-lg text-gray-800 font-bold">
              Intake Form - Smlyx.com
            </p>
            <div className=" border bg-[#f7f7f7] p-3 rounded-lg text-sm font-semibold  text-gray-600">
              <p>
                Please fill out the questions below and select "Submit" to
                continue.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="  w-full bg-[#ffffff] p-3 rounded-lg"
            >
              <div className="flex items-center justify-center flex-col w-full gap-5">
                <div className="flex items-start justify-start w-full flex-col">
                  <label
                    htmlFor="visitReason"
                    className="float-left mr-auto font-semibold"
                  >
                    What is the reason for your visit today?
                    <span className="text-red-500 text-xl"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Reason for your visit"
                    className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium placeholder:text-gray-400 text-heading text-sm font-semibold"
                    {...register("visitReason", {
                      required: "This field is required",
                      validate: {
                        maxLength: (value) =>
                          value.length <= 150 ||
                          "Reason for visit cannot exceed 150 characters",
                      },
                    })}
                  />
                  {errors.visitReason && (
                    <p className="text-red-500 text-sm font-bold float-left mr-auto">
                      {errors.visitReason.message}
                    </p>
                  )}
                  {!errors.visitReason && visitReason.length > 150 && (
                    <p className="text-red-500 text-sm font-bold float-left mr-auto">
                      Reason for visit cannot exceed 150 characters
                    </p>
                  )}
                </div>
                <div className=" flex items-start justify-start w-full border p-2 rounded-lg">
                  <p className="text-gray-700 text-sm font-semibold break-words ">
                    Please seek emergency medical services if you are
                    experiencing a medical emergency (ie. chest pain, head or
                    eye injury, broken bones, difficulty breathing etc).
                  </p>
                </div>
                <div className=" w-full flex items-start justify-start bg-[#f7f7f7] p-2">
                  <div className=" flex items-start justify-start w-full flex-col">
                    <p> Please select your pain level below: </p>
                    <label
                      htmlFor="painLevel"
                      className="float-left mr-auto font-semibold"
                    >
                      Pain Level:
                      <span className=" text-red-500 text-xl"> *</span>
                    </label>
                    <select
                      className="w-full px-5 outline outline-slate-300 outline-1 rounded-md py-2  focus:outline-primary  text-sm font-bold"
                      {...register("painLevel", {
                        required: "Pain level is required",
                      })}
                    >
                      <option value="">Select State</option>
                      <option value="Alabama">No Pain</option>
                      <option value="Aaska">Some Pain</option>
                      <option value="Arizona">Moderate Pain</option>
                      <option value="Arizona">Severe Pain</option>
                      <option value="Arizona">Extreme Pain</option>
                    </select>
                    {errors.painLevel && (
                      <p className="text-red-500 text-sm font-bold float-left mr-auto">
                        {errors.painLevel.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start justify-start w-full flex-col">
                  <label className="float-left mr-auto font-semibold">
                    Are you experiencing any of the following? (Check off all
                    that apply)
                  </label>
                  <div className=" flex items-start justify-start w-full gap-3 flex-wrap">
                    {symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="flex items-center  justify-center"
                      >
                        <input
                          type="checkbox"
                          id={`symptom-${index}`}
                          className="mr-2"
                          {...register("symptoms")}
                          value={symptom}
                        />
                        <label
                          htmlFor={`symptom-${index}`}
                          className=" font-medium text-sm"
                        >
                          {symptom}
                        </label>
                      </div>
                    ))}
                    {errors.symptoms && (
                      <p className="text-red-500 text-sm font-bold float-left mr-auto">
                        {errors.symptoms.message}
                      </p>
                    )}
                  </div>
                  <hr className=" w-full" />
                  <div className="flex items-start justify-start w-full flex-col gap-5 flex-wrap">
                    {/* Allergies Section */}
                    <div className="flex items-start justify-start gap-3 flex-col md:flex-row w-full my-2">
                      <label className="float-left mr-auto font-semibold w-full md:w-1/3">
                        Do you have any allergies?
                      </label>
                      <div className="w-full flex items-start justify-start md:justify-center gap-3 flex-col md:flex-row md:w-1/3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="allergies-yes"
                            value="true"
                            {...register("allergies", {
                              required: "This field is required",
                            })}
                            className="mr-2"
                            onChange={() => setAllergyYes(true)}
                          />
                          <label
                            htmlFor="allergies-yes"
                            className=" font-medium text-sm"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="allergies-no"
                            value="false"
                            {...register("allergies", {
                              required: "This field is required",
                            })}
                            onChange={() => setAllergyYes(false)}
                            className="mr-2"
                          />
                          <label
                            htmlFor="allergies-no"
                            className=" font-medium text-sm"
                          >
                            No
                          </label>
                        </div>
                      </div>

                      <div className="w-full md:w-1/3">
                        {errors.allergies && (
                          <p className="text-red-500 text-sm font-bold float-left mr-auto">
                            {errors.allergies.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className=" w-full md:w-2/3">
                      {allergyYes && (
                        <div className="mt-2">
                          <label
                            htmlFor="allergyDetails"
                            className="font-semibold text-sm"
                          >
                            If yes, please list below::
                          </label>
                          <input
                            type="text"
                            id="allergyDetails"
                            {...register("allergyDetails", {
                              required: allergyYes
                                ? "Allergy details are required"
                                : false,
                            })}
                            placeholder="Enter details"
                            className="w-full px-4 py-2 mt-1 outline outline-slate-300 outline-1 rounded-md text-sm"
                          />
                          {errors.allergyDetails && (
                            <p className="text-red-500 text-sm font-bold mt-1">
                              {errors.allergyDetails.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <hr className="w-full" />

                    {/* Medical Conditions Section */}
                    <div className="flex items-start justify-start gap-3 flex-col md:flex-row w-full my-2">
                      <label className="float-left mr-auto font-semibold w-full md:w-1/3">
                        Do you have any medical conditions?
                      </label>
                      <div className="w-full flex items-start justify-start md:justify-center gap-3 flex-col md:flex-row md:w-1/3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="medical-conditions-yes"
                            value="Yes"
                            {...register("medicalConditions", {
                              required: "This field is required",
                            })}
                            className="mr-2"
                            onChange={() => setMedicalConditionsYes(true)}
                          />
                          <label
                            htmlFor="medical-conditions-yes"
                            className=" font-medium text-sm"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="medical-conditions-no"
                            value="No"
                            {...register("medicalConditions", {
                              required: "This field is required",
                            })}
                            className="mr-2"
                            onChange={() => setMedicalConditionsYes(false)}
                          />
                          <label
                            htmlFor="medical-conditions-no"
                            className=" font-medium text-sm"
                          >
                            No
                          </label>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3">
                        {errors.medicalConditions && (
                          <p className="text-red-500 text-sm font-bold float-left mr-auto">
                            {errors.medicalConditions.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className=" w-full md:w-2/3">
                      {medicalConditionsYes && (
                        <div className="mt-2">
                          <label
                            htmlFor="allergyDetails"
                            className="font-semibold text-sm"
                          >
                            If yes, please list below::
                          </label>
                          <input
                            type="text"
                            id="allergyDetails"
                            {...register("medicalConditionsDetails", {
                              required: medicalConditionsYes
                                ? " Medical Conditions details are required"
                                : false,
                            })}
                            placeholder="Enter details"
                            className="w-full px-4 py-2 mt-1 outline outline-slate-300 outline-1 rounded-md text-sm"
                          />
                          {errors.medicalConditionsDetails && (
                            <p className="text-red-500 text-sm font-bold mt-1">
                              {errors.medicalConditionsDetails.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <hr className=" w-full" />

                    {/* Medications Section */}
                    <div className="flex items-start justify-start gap-3 flex-col md:flex-row w-full my-2">
                      <label className="float-left mr-auto font-semibold w-full md:w-1/3">
                        Are you currently taking any medications?
                      </label>
                      <div className="w-full flex items-start justify-start md:justify-center gap-3 flex-col md:flex-row md:w-1/3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="medications-yes"
                            value="Yes"
                            {...register("medications", {
                              required: "This field is required",
                            })}
                            onChange={() => setMedicationYes(true)}
                            className="mr-2"
                          />
                          <label
                            htmlFor="medications-yes"
                            className=" font-medium text-sm"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="medications-no"
                            value="No"
                            {...register("medications", {
                              required: "This field is required",
                            })}
                            onChange={() => setMedicationYes(false)}
                            className="mr-2"
                          />
                          <label
                            htmlFor="medications-no"
                            className=" font-medium text-sm"
                          >
                            No
                          </label>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3">
                        {errors.medications && (
                          <p className="text-red-500 text-sm font-bold float-left mr-auto">
                            {errors.medications.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" w-full md:w-2/3">
                    {medicationYes && (
                      <div className="mt-2">
                        <label
                          htmlFor="allergyDetails"
                          className="font-semibold text-sm"
                        >
                          If yes, please list below::
                        </label>
                        <input
                          type="text"
                          id="allergyDetails"
                          {...register("medicationsDetails", {
                            required: medicationYes
                              ? " Medications details are required"
                              : false,
                          })}
                          placeholder="Enter details"
                          className="w-full px-4 py-2 mt-1 outline outline-slate-300 outline-1 rounded-md text-sm"
                        />
                        {errors.medicationsDetails && (
                          <p className="text-red-500 text-sm font-bold mt-1">
                            {errors.medicationsDetails.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <hr className=" w-full my-3" />

                  <div className="flex md:items-start md:justify-start items-center justify-center w-full flex-col md:flex-row gap-1">
                    <label
                      htmlFor="lastDentalExam"
                      className="float-left mr-auto font-semibold w-full md:w-1/3"
                    >
                      When was your last dental exam?
                    </label>
                    <input
                      type="date"
                      className="w-full md:w-1/3 px-5 outline outline-slate-300 outline-1 rounded-md py-2 focus:outline-primary placeholder:font-medium text-gray-500 placeholder:text-gray-400  text-sm font-semibold"
                      {...register("lastDentalExam", {
                        required: "Last dental exam date is required",
                        validate: validateDateNotInFuture,
                      })}
                      // max={new Date().toISOString().split("T")[0]}
                      // onInput={(e) => {
                      //   const input = e.target;
                      //   const value = input.value;

                      //   // Automatically trim year to 4 digits
                      //   if (value.length > 10) {
                      //     const [year, month, day] = value.split("-");
                      //     if (year.length > 4) {
                      //       input.value = `${year.slice(0, 4)}-${month || ""}-${
                      //         day || ""
                      //       }`;
                      //     }
                      //   }
                      // }}
                    />
                    <div className="w-full md:w-1/3 items-center justify-center ">
                      {errors.lastDentalExam && (
                        <p className="text-red-500 text-sm font-bold float-left mr-auto">
                          {errors.lastDentalExam.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start justify-start w-full md:flex-row py-5 flex-col">
                    <input
                      type="checkbox"
                      name="newsLetter"
                      id=""
                      className="mr-2"
                      {...register("termsAndCondition", {
                        required: "You must accept the terms and conditions",
                        validate: (value) =>
                          value === true ||
                          "You must accept the terms and conditions",
                      })}
                    />
                    <p className="text-xs font-semibold text-gray-500">
                      I agree that I have read and consent to the Privacy
                      Practices
                    </p>
                    {errors.termsAndCondition && (
                      <p className="text-red-500 text-sm font-bold float-left mr-auto">
                        {errors.termsAndCondition.message}
                      </p>
                    )}
                    <div className=" flex items-center justify-center flex-col w-full gap-2">
                      {/* {errors.termsAndCondition && (
                  <p className="text-red-500 text-sm font-bold float-left mr-auto">
                    {errors.termsAndCondition.message}
                  </p>
                )} */}
                    </div>
                  </div>
                  <p
                    className=" text-sm font-semibold text-primarybg underline cursor-pointer"
                    onClick={() => navigate("/privacy-practices")}
                  >
                    Smlyx.com, LLC Notice of Privacy Practices
                  </p>

                  {/* signature */}
                  {/* <div className=" my-4 w-full flex items-center justify-center flex-col gap-3 md:items-start md:justify-start ">
                  <p className=" text-sm font-bold text-gray-800">Signature</p>
                  <div className=" bg-[#f5f5eb]  p-2 rounded-lg h-52 w-72 ">
                    <AutorenewIcon />
                  </div>
                  <p className=" text-gray-400 text-sm font-bold text-center">
                    Patient / Responsible Party Signature
                  </p>
                </div> */}
                  <div className="my-4 w-full flex items-center justify-center flex-col gap-3 md:items-start md:justify-start">
                    <p className="text-sm font-bold text-gray-800">Signature</p>
                    <div className="bg-[#f5f5eb] p-2 rounded-lg h-52 w-72 relative">
                      <SignatureCanvas
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{
                          width: 288,
                          height: 208,
                          className: "signatureCanvas",
                        }}
                        backgroundColor="#f5f5eb"
                      />
                      <p
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={clearSignature}
                      >
                        <AutorenewIcon />
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm font-bold text-center">
                      Patient / Responsible Party Signature
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-full gap-3">
                <button
                  className=" bg-[#605fa4] text-white text-sm font-bold px-5 py-3 rounded-full"
                  type="submit"
                  // disabled={!isValid}
                >
                  Submit and Next
                </button>
              </div>
            </form>
            {/* <button
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
      </button> */}
          </div>
        </div>
      )}

      {/*intake form 11 */}
      <div className=" flex items-center justify-center w-full">
        <button
          className=" px-12 py-3  rounded-full border text-gray-400 border-gray-400 font-bold "
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VisitDetails;
