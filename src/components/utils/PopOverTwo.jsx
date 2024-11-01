import * as React from "react";
import Popover from "@mui/material/Popover";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function BasicPopover({ patientInfoData, handleMenuToggle }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSignOut = () => {
    // Clear session data or tokens (localStorage, cookies, etc.)
    // localStorage.removeItem("token");
    // localStorage.removeItem("userName");
    // localStorage.removeItem("id");
    localStorage.clear();
    // Assuming token is stored here
    // Redirect to login or home page
    navigate("/login");
  };

  const handleItemClick = (item2) => {
    if (item2.title === "Sign Out" || item2.route === "#") {
      handleSignOut();
    } else {
      navigate(item2.route);
    }
  };

  return (
    <div className=" hover:border-b-2 hover:border-[#605fa4] ">
      {patientInfoData.map((item, index) => (
        <div key={index}>
          <div
            className=" cursor-pointer text-[#605fa4]  text-base font-semibold"
            onClick={handleClick}
            aria-describedby={id}
            fontSize="large"
          >
            {item.head} <ExpandMoreIcon />
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
            <div className=" w-[200px] bg-[#7a4c97] text-white shadow-md min-h-16 flex items-center justify-center p-5  flex-col gap-2 rounded text-sm">
              {item.detail.map((item2, index2) => (
                <div
                  key={index2}
                  className=" flex items-start justify-start w-full"
                  onClick={handleMenuToggle}
                >
                  <p
                    className=" hover:underline cursor-pointer    font-medium  "
                    onClick={() => handleItemClick(item2)}
                  >
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
