import * as React from "react";
import Popover from "@mui/material/Popover";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BasicPopover({
  btn,
  patientInfoData,
  handleMenuToggle,
}) {
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
      {patientInfoData.map((item, index) => (
        <div key={index}>
          <div
            className=" cursor-pointer text-primarybg  text-base font-semibold"
            onClick={handleClick}
            aria-describedby={id}
            fontSize="large"
          >
            {item.head}
          </div>
          {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        {btn.title} {btn.icon}
      </Button> */}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div
              className=" w-[200px] bg-primary text-white shadow-md min-h-16 flex
         items-center justify-centerop p-5  flex-col gap-2 rounded text-sm"
            >
              {item.detail.map((item2, index2) => (
                <div
                  key={index2}
                  className=" flex items-start justify-start w-full"
                  onClick={handleMenuToggle}
                >
                  <p className=" hover:underline cursor-pointer    font-medium ">
                    {item2.title}
                  </p>
                </div>
              ))}
            </div>
          </Popover>
        </div>
      ))}
    </div>
  );
}
