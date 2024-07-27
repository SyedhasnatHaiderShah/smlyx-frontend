import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { FaUpload, FaTrash } from "react-icons/fa";

export default function TransitionsModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentDate = new Date().toLocaleString();

  useEffect(() => {
    setValue("date", currentDate);
    setValue("name", "Default Name");
  }, [setValue, currentDate]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
        setValue("image", file, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById("imageInput").value = ""; // Reset file input value
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <button className="bg-primarybg text-white px-5 rounded-full py-2">
          + Add Upload
        </button>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-1/2 max-w-xl bg-white p-4 rounded-lg shadow-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-start justify-start w-full">
                <div
                  className="border-2 border-dashed border-[#3fbbeb] p-4 text-center cursor-pointer w-1/2 h-32 mb-5 rounded-lg"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleImageChange({
                      target: { files: e.dataTransfer.files },
                    });
                  }}
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Drag & Drop or Click to Upload Image"
                  )}
                </div>
                <div className="flex items-center justify-center w-1/2">
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Uploaded"
                        className="h-24 w-24 object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={handleImageRemove}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                {...register(
                  "image"
                  // { required: "Image is required" }
                )}
                className="hidden"
                onChange={handleImageChange}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}

              <div className="w-full flex items-start justify-start gap-1">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="name" className="font-semibold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    // readOnly
                    // defaultValue="Default Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="recordType" className="font-semibold">
                    Record Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("recordType", {
                      required: "Record type is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="image">Images</option>
                    <option value="document">Documents</option>
                  </select>
                  {errors.recordType && (
                    <p className="text-red-500 text-sm">
                      {errors.recordType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">Type of Report</label>
                <div className="flex gap-4">
                  <label className="flex items-center font-semibold">
                    <input
                      type="radio"
                      value="chart"
                      {...register("typeOfReport", {
                        required: "Please select an option",
                      })}
                      className="mr-2"
                    />
                    Chart
                  </label>
                  <label className="flex items-center font-semibold">
                    <input
                      type="radio"
                      value="other"
                      {...register("typeOfReport", {
                        required: "Please select an option",
                      })}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
                {errors.typeOfReport && (
                  <p className="text-red-500 text-sm">
                    {errors.typeOfReport.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="font-semibold">
                  Date
                </label>
                <input
                  type="text"
                  readOnly
                  {...register("date")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="recordNote" className="font-semibold">
                  Record Note
                </label>
                <textarea
                  {...register("recordNote")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className={`bg-primarybg text-white px-5 py-2 rounded-full self-center ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isValid}
              >
                Submit
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
