import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const ConsentForm = ({
  setCurrentStep,
  goBack,
  goNext,
  formData,
  setFormData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const signatureCanvas = useRef(null);

  const onSubmit = (data) => {
    const signature = signatureCanvas.current.toDataURL();
    const formData = { ...data, signature };
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    goNext();
    // console.log(formData); // Handle form submission
  };

  const clearSignature = () => {
    const canvas = signatureCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Request and Authorization For Release of Dental Records
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Section 1 - Request and Authorization */}
        <div className="mb-6">
          <h3 className="font-bold mb-4 text">
            Section 1 - Request and Authorization
          </h3>
          <div className=" flex items-start justify-start w-full gap-5">
            <label className="block mb-2 font-semibold">I,</label>
            <input
              type="text"
              {...register("requesterName", {
                required: "Requester name is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2 font-medium"
              placeholder="Requester Name"
            />
          </div>
          {errors.requesterName && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.requesterName.message}
            </p>
          )}

          <p className="mb-2 my-3  font-semibold">hereby request a copy of:</p>
          <div className=" flex items-start justify-start w-full  gap-2 flex-col md:flex-row">
            <div className="flex items-center  mb-4 w-full justify-start">
              <input
                type="radio"
                {...register("recordsType", {
                  required: "Please select an option",
                })}
                value="myRecords"
                className="mr-2"
              />
              <label className=" text-sm text-gray-600 font-semibold">
                My dental records
              </label>
            </div>
            <div className="flex items-center  mb-4 w-full justify-start">
              <input
                type="radio"
                {...register("recordsType", {
                  required: "Please select an option",
                })}
                value="patientRecords"
                className="mr-2"
              />
              <label className="text-sm text-gray-600 font-semibold">
                The dental records of:
              </label>
              <input
                type="text"
                {...register("patientName")}
                className="ml-2 border text-gray-400 font-medium  border-gray-300 rounded-md p-2 flex-grow"
                placeholder="Patient's Name"
              />
            </div>
          </div>

          {errors.recordsType && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.recordsType.message}
            </p>
          )}

          <div className="mt-4">
            <label className="text-sm text-gray-600 font-semibold">
              Patient's Date of Birth:
            </label>
            {/* should throw error if user age is less than 18 */}

            <input
              type="date"
              {...register("dob", {
                required: "Date of Birth is required",
                validate: (value) => {
                  const today = new Date();
                  const dob = new Date(value);
                  const age = today.getFullYear() - dob.getFullYear();
                  if (age < 18) {
                    return "You must be at least 18 years old.";
                  }
                  return true;
                },
              })}
              className="w-full border text-gray-400 font-medium border-gray-300 rounded-md p-2 mt-2"
            />
            {errors.dob && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.dob.message}
              </p>
            )}
          </div>
        </div>

        {/* Section 2 - Scope of Request */}
        <div className="my-3">
          <h3 className="font-bold mb-4">Section 2 - Scope of Request</h3>
          <p className=" text-sm text-gray-600 font-semibold">
            This request includes but is not limited to all diagnosis, treatment
            plans, x-rays, lab test results, treatment, etc.
          </p>
        </div>

        {/* Section 3 - Form and Format of Records and Delivery */}
        <div className="my-3">
          <h3 className="font-bold mb-4">
            Section 3 - Form and Format of Records and Delivery
          </h3>
          <p className=" text-sm text-gray-600 font-semibold">
            In accordance with HIPAA regulations (45 CFR Sec. 164.524 (c)(2)(i)
            & (c)(3)(ii)), I authorize and direct
            <input
              type="text"
              {...register("authorizeTo", {
                required: "Authorization entity is required",
              })}
              className="border border-gray-300 rounded-md p-2 mx-2"
              placeholder="Entity Name"
            />
            to provide the records in electronic format.
          </p>
          {errors.authorizeTo && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.authorizeTo.message}
            </p>
          )}
        </div>

        {/* Section 4 - Purpose */}
        <div className="mb-6">
          <h3 className="font-bold mb-4 ">Section 4 - Purpose</h3>
          <p className="text-sm text-gray-600 font-semibold">
            The purpose of this request is to obtain a second opinion.
          </p>
        </div>

        {/* Section 5 - Acknowledgments */}
        <div className="mb-6">
          <h3 className="font-bold mb-4">Section 5 - Acknowledgments</h3>
          <p className="text-sm text-gray-600 font-semibold">
            The requester understands and acknowledges the right to revoke this
            Request and Authorization at any time.
          </p>
        </div>

        {/* Section 6 - Duration of Authorization */}
        <div className="mb-6">
          <h3 className="font-bold mb-4">
            Section 6 - Duration of Authorization
          </h3>
          <p className="text-sm text-gray-600 font-semibold">
            This authorization is effective as of the date signed and for a
            period of 60 days thereafter.
          </p>
        </div>

        {/* Section 7 - Signature of Requestor and Date */}
        <div className="mb-6">
          <h3 className="font-bold mb-4">
            Section 7 - Signature of Requestor and Date
          </h3>
          <div className="flex items-center mb-4 relative">
            <canvas
              ref={signatureCanvas}
              className="border border-gray-300 rounded-md w-full h-24 relative"
            ></canvas>
            <RestartAltIcon
              fontSize="medium"
              className=" text-red-500 font-medium text-sm cursor-pointer absolute left-3 top-3"
              type="button"
              onClick={clearSignature}
            />
            {/* <button
              type="button"
              onClick={clearSignature}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Clear
            </button> */}
          </div>
          <div className="mt-4">
            <label className="text-sm text-gray-600 font-semibold">
              Patient / Responsible Party Signature:
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                {...register("signatureAcknowledged", {
                  required: "You must acknowledge your signature",
                })}
                className="mr-2"
              />
              <label className="text-sm text-gray-600 font-semibold">
                I acknowledge that this is my signature
              </label>
            </div>
            {errors.signatureAcknowledged && (
              <p className="text-red-500 font-semibold text-sm ">
                {errors.signatureAcknowledged.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-sm text-gray-600 font-semibold">Date:</label>
            <input
              type="date"
              {...register("signatureDate", { required: "Date is required" })}
              className="w-full border font-medium text-gray-400 border-gray-300 rounded-md p-2 mt-2"
              value={new Date().toISOString().split("T")[0]}
            />
            {errors.signatureDate && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.signatureDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Guardian Options */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">
            If not signed by the patient, the Requestor's relationship to the
            Patient is:
          </h3>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              {...register("relationship", {
                required: "Please select a relationship",
              })}
              value="parent"
              className="mr-2"
            />
            <label className="text-sm text-gray-600 font-semibold">
              Parent or guardian of minor patient
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              {...register("relationship", {
                required: "Please select a relationship",
              })}
              value="guardian"
              className="mr-2"
            />
            <label className="text-sm text-gray-600 font-semibold">
              Guardian or conservator of an incompetent patient
            </label>
          </div>
          {errors.relationship && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.relationship.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className=" flex items-center justify-center w-full flex-col md:flex-row gap-5 md:w-1/2">
          <button
            className=" text-sm font-semibold rounded-full text-gray-500 border border-gray-500  px-6 py-3  w-full"
            onClick={() => setCurrentStep(1)}
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-[#605fa4] text-white text-sm font-semibold  px-6 py-3 rounded-full w-full"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsentForm;
