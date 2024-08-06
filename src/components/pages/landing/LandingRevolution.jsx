import React, { useState } from "react";
import TopNav from "./../navbar/TopNav";
import bg from "../../../assets/landing-hero.webp";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LandingRevolution = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="py-20 w-full flex flex-col md:flex-row items-center justify-center gap-10 container px-5">
      {/* left */}
      <div className="md:w-1/2 w-full flex items-center justify-center flex-col px-5">
        <div className="lg:w-3/4 w-full flex items-start justify-center flex-col gap-5">
          <p className="md:text-4xl text-2xl sm:text-3xl font-extralight md:font-medium text-gray-500 leading-snug break-words">
            Revolutionize your dental care with a free AI dental scan
          </p>
          <p className="md:text-xl text-base text-primary leading-snug">
            Get a clear picture of your oral health using your smart phone.
            After the scan you'll be able to review the results with a licensed
            dentist.
          </p>
          <div className="flex items-center gap-5 justify-center md:flex-row flex-col">
            <button className="bg-primary font-bold text-white px-6 py-3 rounded-full hover:opacity-90">
              Start Now
            </button>
            <button
              className="text-white bg-primarybg rounded-full px-5 py-3 text-base font-extrabold hover:opacity-90 cursor-pointer"
              onClick={handleClickOpen}
            >
              Watch Video
            </button>
          </div>
        </div>
      </div>

      {/* right */}

      <div className="md:w-1/2 w-full flex items-center justify-start px-5">
        <div className="w-full ">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/AYxY0YChWhY?si=xabRQQl22dWrFzBk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Dialog for YouTube video */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Watch Video
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="iframe-container">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/AYxY0YChWhY?si=xabRQQl22dWrFzBk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingRevolution;
