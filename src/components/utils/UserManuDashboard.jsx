import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar"; // Import Avatar from MUI
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/currentUserSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BasicMenu() {
  const dispatch = useDispatch();

  const dependentsData = useSelector((state) => state.dependents.currentUser);
  // console.log(dependentsData);

  const userName = useSelector((state) => state.currentUser.userName);

  // console.log(userName);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Set the initial user once dependentsData is loaded
  // React.useEffect(() => {
  //   if (dependentsData && dependentsData.length > 0) {
  //     setUser(dependentsData[0]);
  //   }
  // }, [dependentsData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    setUser(item);
    dispatch(setUser({ userName: item.firstName }));

    // Set the selected user
    setAnchorEl(null); // Close the menu
  };

  return (
    <div>
      <p
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-[#983794] md:px-2 px-0 text-sm md:text-base   py-2 font-bold cursor-pointer relative group"
      >
        {userName}
        <ExpandMoreIcon />
      </p>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{
          marginRight: "30px",
        }}
      >
        {dependentsData?.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleClose(item)}
            style={{
              minWidth: "150px",
            }}
          >
            <Avatar
              src={item.fileUrl}
              style={{
                marginRight: "8px",
              }}
            />
            <p className="text-[#983794] md:px-2 px-0 text-sm md:text-base   py-2 font-bold cursor-pointer relative group">
              {item.firstName}
            </p>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
