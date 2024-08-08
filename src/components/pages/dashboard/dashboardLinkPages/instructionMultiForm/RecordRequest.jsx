import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LockIcon from "@mui/icons-material/Lock";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import ConsentForm from "./ConsentForm";
import { useNavigate } from "react-router-dom";
import DividerText from "./DividerText";

const RecordRequest = ({ formData, setFormData, goBack, goNext }) => {
  // State for image previews and errors
  const [proposedTreatmentImage, setProposedTreatmentImage] = useState(null);
  const [xRaysImagesPreview, setXRaysImagesPreview] = useState(null);
  const [additionalFilesPreview, setAdditionalFilesPreview] = useState(null);
  const [imageError, setImageError] = useState("");

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeSection, setActiveSection] = useState(null); // State to track the active section
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    goNext();
  };

  const multiOnSubmit = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    setCurrentStep(2);
  };

  const toggleSection = (section) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  // Function to handle image selection and preview
  const handleImageChange = (event, setImagePreview) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/bmp",
        "image/webp",
        "image/tiff",
        "image/svg+xml",
        "image/vnd.microsoft.icon",
        "image/vnd.adobe.photoshop",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (validExtensions.includes(file.type)) {
        setImageError(""); // Clear any previous errors
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) }); // File size in KB
        };
        reader.readAsDataURL(file);
      } else {
        setImageError(
          "Please upload a valid image file (.ai, .bmp, .gif, .ico, .jpeg, .jpg, .png, .ps, .psd, .svg, .tif, .tiff, .webp, .jfif, .pdf, .slx, .doc, .docx"
        );
        setImagePreview(null); // Clear the image preview if invalid file is selected
      }
    }
  };

  // Function to handle image removal
  const handleRemoveImage = (setImagePreview, inputId) => {
    setImagePreview(null);
    document.getElementById(inputId).value = ""; // Clear the input file
  };

  return (
    <div className="flex items-start justify-start w-full flex-col min-h-72  bg-[#eeeee] px-5">
      <div className="w-full mt-8 container">
        <div className="flex items-center justify-center flex-col w-full bg-white gap-5 p-5 rounded-xl">
          <div className="flex items-center justify-center w-full flex-col gap-10">
            {/* Request Your Records Section first step */}
            {currentStep === 1 && (
              <div className="flex items-center justify-center w-full flex-col gap-3  border shadow-xl p-5 rounded-xl">
                <p className="text-gray-500 break-words text-xl font-semibold text-center">
                  Don't have your records? Request your records from your
                  dentist.
                </p>
                <button
                  className="px-10 py-3 rounded-full hover:bg-[#605fa4] bg-[#8281b6] text-white font-bold transition-all duration-500 ease-in-out"
                  onClick={() => toggleSection("requestRecords")}
                >
                  Request Your Records
                </button>

                {activeSection === "requestRecords" && (
                  <div className="w-full">
                    <form
                      onSubmit={handleSubmit(multiOnSubmit)}
                      className="flex items-start justify-start w-full flex-col gap-4"
                    >
                      <div className="flex items-start justify-start flex-col gap-3">
                        <p className=" text-xl font-semibold">
                          Records Request
                        </p>
                        <p className=" font-bold">
                          Enter your dentist's information and we'll request
                          your records on your behalf.
                        </p>

                        <div className="w-full">
                          <label
                            htmlFor="dentistName"
                            className=" font-semibold text-gray-800"
                          >
                            Dentist's Name or Practice Name
                          </label>
                          <input
                            type="text"
                            {...register("dentistName", { required: true })}
                            className="w-full border text-sm text-gray-500 font-semibold border-gray-300 rounded-md p-2"
                          />
                          {errors.dentistName && (
                            <p className="text-red-500">
                              This field is required
                            </p>
                          )}
                        </div>

                        <div className="w-full flex items-start justify-start flex-col md:flex-row gap-5">
                          <div className="w-full md:w-1/2 flex items-start justify-start flex-col">
                            <label
                              htmlFor="dentistEmail"
                              className=" font-semibold text-gray-800"
                            >
                              Dentist's Email Address
                            </label>
                            <input
                              type="email"
                              {...register("dentistEmail", { required: true })}
                              className="w-full border text-sm text-gray-500 font-semibold border-gray-300 rounded-md p-2"
                            />
                            {errors.dentistEmail && (
                              <p className="text-red-500">
                                This field is required
                              </p>
                            )}
                          </div>
                          <div className="w-full md:w-1/2 flex items-start justify-start flex-col">
                            <label
                              htmlFor="dentistPhone"
                              className=" font-semibold text-gray-800"
                            >
                              Dentist's Phone Number
                            </label>
                            <input
                              type="tel"
                              {...register("dentistPhone", { required: true })}
                              className="w-full border text-sm text-gray-500 font-semibold border-gray-300 rounded-md p-2"
                            />
                            {errors.dentistPhone && (
                              <p className="text-red-500">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-[#605fa4] text-white rounded-full"
                      >
                        Submit Request
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* consent form */}
            {currentStep === 2 && (
              <ConsentForm
                goBack={goBack}
                goNext={goNext}
                formData={formData}
                setFormData={setFormData}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
              />
            )}
            <DividerText />
            {/* Upload Your Records Section */}
            {currentStep === 1 && (
              <div className="flex items-center justify-center w-full flex-col gap-3  border shadow-xl p-5 rounded-xl">
                <p className="text-gray-500 break-words text-xl font-semibold text-center">
                  Already have your records? Upload them now!
                </p>
                <button
                  className="px-8 py-3 rounded-full hover:bg-[#605fa4] bg-white border border-[#605fa4] text-[#605fa4] font-bold transition-all duration-500 ease-in-out hover:text-white"
                  onClick={() => toggleSection("uploadRecords")}
                >
                  <CloudUploadIcon /> Upload Your Records
                </button>

                {activeSection === "uploadRecords" && (
                  <div className="w-full">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex items-start justify-start w-full flex-col gap-4"
                    >
                      <div>
                        <p>
                          To receive a second opinion, please upload any
                          supporting documents and images that were gathered
                          during your initial treatment recommendation.
                        </p>

                        <div className="w-full">
                          <label
                            htmlFor="proposedTreatment"
                            className=" font-semibold"
                          >
                            1. Upload Proposed Treatment (required)
                          </label>
                          <div
                            className=" h-16 w-full  border-dashed border-2 cursor-pointer text-sm font-semibold text-gray-600 rounded-full  my-2 flex items-center justify-center
                          "
                            onClick={() =>
                              document
                                .getElementById("proposedTreatment")
                                .click()
                            }
                          >
                            Drop Propsed Treatment files here or{" "}
                            <span className=" text-primarybg underline ms-1">
                              browse
                            </span>
                          </div>
                          <input
                            id="proposedTreatment"
                            type="file"
                            {...register("proposedTreatment", {
                              required: true,
                            })}
                            className="w-full hidden"
                            onChange={(e) =>
                              handleImageChange(e, setProposedTreatmentImage)
                            }
                            accept=".ai, .bmp, .gif, .ico, .jpeg, .jpg, .png, .ps, .psd, .svg, .tif, .tiff, .webp, .jfif, .pdf, .slx, .doc, .docx"
                          />
                          {errors.proposedTreatment && (
                            <p className="text-red-500 text-sm font-semibold">
                              This field is required
                            </p>
                          )}
                          {proposedTreatmentImage && (
                            <div className="my-4 flex items-center justify-between w-full  ">
                              <img
                                src={proposedTreatmentImage}
                                alt="Selected"
                                className="h-10 w-10 object-cover rounded-md"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveImage(
                                    setProposedTreatmentImage,
                                    "proposedTreatment"
                                  )
                                }
                                className="mt-2 text-red-500 text-sm font-semibold underline"
                              >
                                Remove Image
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="xRaysImages"
                            className=" font-semibold"
                          >
                            2. Upload X-Rays and Images (required)
                          </label>
                          <div
                            className=" h-16 w-full  border-dashed border-2 cursor-pointer text-sm font-semibold text-gray-600 rounded-full  my-2 flex items-center justify-center
                          "
                            onClick={() =>
                              document.getElementById("xRaysImages").click()
                            }
                          >
                            Drop x-rays and images files here or{" "}
                            <span className=" text-primarybg underline ms-1">
                              browse
                            </span>
                          </div>
                          <input
                            id="xRaysImages"
                            type="file"
                            {...register("xRaysImages", { required: true })}
                            className="w-full hidden"
                            onChange={(e) =>
                              handleImageChange(e, setXRaysImagesPreview)
                            }
                            accept=".ai, .bmp, .gif, .ico, .jpeg, .jpg, .png, .ps, .psd, .svg, .tif, .tiff, .webp, .jfif, .pdf, .slx, .doc, .docx"
                          />
                          {errors.xRaysImages && (
                            <p className="text-red-500 text-sm font-semibold">
                              This field is required
                            </p>
                          )}
                          {xRaysImagesPreview && (
                            <div className="my-4 flex items-center justify-between w-full">
                              <img
                                src={xRaysImagesPreview}
                                alt="Selected"
                                className="h-10 w-10 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveImage(
                                    setXRaysImagesPreview,
                                    "xRaysImages"
                                  )
                                }
                                className="mt-2 text-red-500 text-sm font-semibold underline"
                              >
                                Remove Image
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="additionalImages"
                            className=" font-semibold"
                          >
                            3. Upload Additional Files (optional)
                          </label>
                          <div
                            className=" h-16 w-full  border-dashed border-2 cursor-pointer text-sm font-semibold text-gray-600 rounded-full  my-2 flex items-center justify-center
                          "
                            onClick={() =>
                              document.getElementById("additionalFiles").click()
                            }
                          >
                            Drop additional files here or{" "}
                            <span className=" text-primarybg underline ms-1">
                              browse
                            </span>
                          </div>
                          <input
                            id="additionalFiles"
                            type="file"
                            {...register("additionalFiles")}
                            className="w-full border hidden border-gray-300 rounded-md p-2"
                            onChange={(e) =>
                              handleImageChange(e, setAdditionalFilesPreview)
                            }
                            accept=".ai, .bmp, .gif, .ico, .jpeg, .jpg, .png, .ps, .psd, .svg, .tif, .tiff, .webp, .jfif, .pdf, .slx, .doc, .docx"
                          />
                          {additionalFilesPreview && (
                            <div className="my-4 flex items-center justify-between w-full">
                              <img
                                src={additionalFilesPreview}
                                alt="Selected"
                                className="h-10 w-10 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveImage(
                                    setAdditionalFilesPreview,
                                    "additionalFiles"
                                  )
                                }
                                className="mt-2 text-red-500 text-sm font-semibold underline"
                              >
                                Remove Image
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-[#605fa4] text-white rounded-full"
                      >
                        Upload Files
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordRequest;
