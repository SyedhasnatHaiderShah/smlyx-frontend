import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import TransitionsModal from "./../../utils/TransitionsModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Preview icon
import FileDownloadIcon from "@mui/icons-material/FileDownload"; // Download icon
import CloseIcon from "@mui/icons-material/Close";
import { teal } from "@mui/material/colors";
import { toast } from "react-toastify";

const Uploads = () => {
  const navigate = useNavigate();
  const [fetchData, setFetchData] = useState([]);
  console.log(fetchData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Control modal visibility
  const [currentFile, setCurrentFile] = useState(null); // Store the current file to preview

  // Retrieve user ID from localStorage
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const fetchImages = async () => {
    setLoading(true);
    try {
      // Fetch images by userId from the server with token authorization
      const response = await axios.get(
        `http://localhost:3000/upload/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFetchData(response.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [userId, imageUploaded]);

  const handlePreviewClick = (fileUrl) => {
    setCurrentFile(fileUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentFile(null);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentFile;
    link.setAttribute("download", "file");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // handle delete upload
  const handleDeleteUpload = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/upload/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImageUploaded(!imageUploaded);
      toast.success("Upload deleted successfully");
      setImageUploaded(true);
      fetchImages();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-start justify-start flex-col w-full bg-[#eeeeee] min-h-screen gap-5 p-5">
      <div className="w-full container">
        <div className="flex items-start justify-start w-full text-sm font-bold text-gray-500 my-2">
          <span
            className="mx-1 hover:text-primarybg cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </span>{" "}
          / Uploads
        </div>
      </div>
      <div className="container w-full flex gap-5 flex-col">
        <div className="flex items-center justify-between w-full">
          <p className="text-3xl font-bold">Uploads</p>
          <TransitionsModal setImageUploaded={setImageUploaded} />
        </div>

        {loading ? (
          <div className="w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5">
            <p className="text-xl font-bold text-gray-500">Loading images...</p>
          </div>
        ) : // ) : error ? (
        //   <div className="w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5">
        //     <p className="text-xl font-bold text-red-500">{error}</p>
        //   </div>
        fetchData.length > 0 ? (
          <TableContainer component={Paper}>
            <Table
              sx={{
                width: "100%",
                display: {
                  xs: "none",
                  sm: "table",
                },
              }}
              aria-label="uploads table"
            >
              <TableHead>
                <TableRow>
                  {/* <TableCell>Record Type</TableCell> */}
                  <TableCell style={{ fontSize: "16px", fontWeight: "500" }}>
                    Date
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "500" }}>
                    Files
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "500" }}>
                    Note
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "500" }}>
                    Added By
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "500" }}>
                    View
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "500" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchData.map((data) => (
                  <TableRow key={data.id}>
                    {/* <TableCell>{data.recordType}</TableCell> */}
                    <TableCell>
                      {new Date(data.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <img
                        src={data.fileUrl}
                        alt={data.name}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell>{data.detail}</TableCell>
                    <TableCell>{data.addedBy}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handlePreviewClick(data.fileUrl)}
                      >
                        <VisibilityIcon style={{ color: "#40baea" }} />
                        {/* <VisibilityIcon /> */}
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteUpload(data.id)}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                        {/* <VisibilityIcon /> */}
                      </IconButton>
                      {/* Add other action buttons here */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5">
            <p className="text-3xl font-bold text-gray-500">
              No uploads found!
            </p>
          </div>
        )}
      </div>

      {/* show the fetchdata on small screen */}
      <div className=" flex sm:hidden w-full items-center justify-center flex-wrap gap-3">
        {loading ? (
          <div className="w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5">
            <p className="text-xl font-bold text-gray-500">Loading images...</p>
          </div>
        ) : error ? (
          <div className="w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5">
            <p className="text-xl font-bold text-red-500">{error}</p>
          </div>
        ) : fetchData.length > 0 ? (
          fetchData.map((data) => (
            <div
              key={data.id}
              className=" flex items-center justify-center gap-1 w-full shadow-xl p-3 border rounded-2xl bg-white flex-wrap"
            >
              <div className="flex flex-col gap-1 items-start justify-start">
                {" "}
                {/* <p>{data.name}</p> */}
                <p className="text-lg text-gray-600 ">
                  <strong>Name:</strong> {data.name}
                </p>
                <p className="text-lg text-gray-600">
                  {" "}
                  <strong>Detail:</strong> {data.detail}
                </p>
                <p className="text-lg text-gray-600">
                  {" "}
                  <strong>Uploaded at:</strong> {data.date}
                </p>
                <p className="text-lg text-gray-600">
                  {" "}
                  <strong>Added by:</strong> {data.addedBy}
                </p>
              </div>

              <div className=" w-full flex items-center justify-center gap-3">
                <img
                  src={data.fileUrl}
                  alt={data.name}
                  className="w-16  rounded-lg object-cover "
                />
                <IconButton
                  color="primary"
                  onClick={() => handlePreviewClick(data.fileUrl)}
                >
                  <VisibilityIcon style={{ color: "#40baea" }} />
                  {/* <VisibilityIcon /> */}
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleDeleteUpload(data.id)}
                >
                  <DeleteIcon style={{ color: "red" }} />
                  {/* <VisibilityIcon /> */}
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5">
            <p className="text-3xl font-bold text-gray-500">
              No uploads found!
            </p>
          </div>
        )}
      </div>

      {/* <div
        className="w-full bg-white rounded-2xl min-h-52 flex items-center justify-center p-5 sm:hidden"
        style={{ display: { sm: "none" } }}
      >
        <p className="text-3xl font-bold text-gray-500">No uploads found!</p>
      </div> */}

      {/* Modal for previewing the image/PDF */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="file-preview-modal"
        aria-describedby="preview-file-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "80%",
              sm: "70%",
              md: "60%",
              lg: "40%",
              xl: "30%",
            },
            height: {
              xs: "90%",
              sm: "80%",
              md: "90%",
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflow: "auto",
            maxHeight: "90vh",
          }}
        >
          {currentFile && (
            <>
              {/* Display image or PDF */}
              {currentFile.endsWith(".pdf") ? (
                <embed
                  src={currentFile}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                />
              ) : (
                <img
                  src={currentFile}
                  alt="Preview"
                  style={{
                    width: {
                      xs: "80%",
                      sm: "70%",
                      md: "90%",
                    },
                    height: {
                      xs: "300px",
                      sm: "350px%",
                      md: "400px",
                    },
                  }}
                />
              )}
              <div className="flex items-center justify-center mt-5 gap-5">
                {/* Download Button */}
                <button
                  variant="contained"
                  // color="info"
                  onClick={handleDownload}
                  className="bg-primarybg text-white p-2 rounded-lg"
                >
                  <FileDownloadIcon />
                  Download
                </button>
                <button
                  variant="contained"
                  onClick={handleCloseModal}
                  className="bg-primarybg text-white px-5 py-2 rounded-lg"
                >
                  <CloseIcon />
                  Close
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Uploads;
