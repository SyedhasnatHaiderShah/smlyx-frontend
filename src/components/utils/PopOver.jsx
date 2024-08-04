import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Divider, ListItem, ListItemText } from "@mui/material";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className=" cursor-pointer opacity-80  hover:opacity-100 transition-all duration-300 ease-in-out">
        <CircleNotificationsIcon
          onClick={handleClick}
          aria-describedby={id}
          fontSize="large"
          className=" text-primarybg"
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div
          className=" w-72 shadow-md min-h-16 flex
         items-center justify-center x-5 py-6 flex-col gap-2 rounded-lg"
        >
          <p className=" text-primary text-xl font-medium ">Notification</p>
          <Divider variant="middle" className=" w-full " />
          <p className=" text-heading text-xl font-medium ">Notification</p>
        </div>
      </Popover>
    </div>
  );
}
