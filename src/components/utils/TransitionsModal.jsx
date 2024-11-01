import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function TransitionsModal({ setImageUploaded }) {
  const id = localStorage.getItem("id");
  // Getting user data from Redux store
  const [formData, setFormData] = useState({
    userId: id,
    addedBy: localStorage.getItem("userName"),
    name: "Default Name",
    date: new Date().toLocaleString(),
    detail: "",
    file: null,
  });

  // console.log(formData);

  const [open, setOpen] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [isPDF, setIsPDF] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle file input change and set preview for PDFs and images
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType === "application/pdf") {
        setIsPDF(true);
        setFilePreview(URL.createObjectURL(selectedFile)); // Preview PDF
      } else if (fileType.startsWith("image/")) {
        setIsPDF(false);
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result); // Preview image
        };
        reader.readAsDataURL(selectedFile);
      }

      setFormData((prevData) => ({
        ...prevData,
        file: selectedFile,
      }));
    }
  };

  // Remove the selected file and reset the preview
  const handleFileRemove = () => {
    setFormData((prevData) => ({
      ...prevData,
      file: null,
    }));
    setFilePreview(null);
    setIsPDF(false);
    document.getElementById("fileInput").value = "";
  };

  // Handle input changes for the rest of the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit form data along with the file to the backend
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      toast.error("Please select a file to upload");
      return;
    }

    // const fileData = new FormData(); // Create FormData instance
    // fileData.append("file", formData.file);
    // fileData.append("detail", formData.detail);
    // fileData.append("name", formData.name);
    // fileData.append("date", formData.date);
    // fileData.append("id", formData.id);

    try {
      console.log(formData);
      // console.log(fileData);
      const uploadResponse = await axios.post(
        "http://localhost:3000/upload/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const fileUrl = uploadResponse.data.data.secure_url; // Get the file URL from the response
      toast.success(`File uploaded successfully: ${fileUrl}`); // Show success toast

      setImageUploaded(true);
      setFormData({
        userId: id,
        addedBy: localStorage.getItem("userName"),
        name: "Default Name",
        date: new Date().toLocaleString(),
        detail: "",
        file: null,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error uploading file: ", error);
      toast.error("Error uploading file");
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}> */}
      <button
        className="bg-primarybg text-white px-5 rounded-full py-2 z-0"
        onClick={handleOpen}
      >
        + Add Upload
      </button>
      {/* </Button> */}
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
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {/* File Upload Section */}
              <div className="flex items-start justify-start w-full">
                <div
                  className="border-2 border-dashed border-[#3fbbeb] p-4 text-center cursor-pointer w-1/2 h-32 mb-5 rounded-lg"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {/* Conditional rendering for image or PDF */}
                  {filePreview ? (
                    isPDF ? (
                      <iframe
                        src={filePreview}
                        title="PDF Preview"
                        className="w-full h-full"
                      />
                    ) : (
                      <img
                        src={filePreview}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    "Click to Upload File"
                  )}
                </div>
                <div className="flex items-center justify-center w-1/2 h-full bg-lime-200">
                  {filePreview && (
                    <div className="relative">
                      {isPDF ? (
                        <div className="text-sm">PDF Preview Available</div>
                      ) : (
                        <img
                          src={filePreview}
                          alt="Uploaded"
                          className="h-24 w-24 object-cover"
                        />
                      )}
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={handleFileRemove}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* File Input */}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />

              {/* Name Input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name" className="font-semibold">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Date (Read-Only) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="font-semibold">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Record Note */}
              <div className="flex flex-col gap-2">
                <label htmlFor="recordNote" className="font-semibold">
                  Record Note
                </label>
                <textarea
                  name="detail"
                  value={formData.detail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-primarybg text-white px-5 py-2 rounded-full self-center"
                disabled={!formData.file}
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
