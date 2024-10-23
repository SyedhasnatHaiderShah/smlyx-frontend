import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar"; // Import Avatar from MUI
import { useDispatch, useSelector } from "react-redux";

export default function BasicMenu({ userName }) {
  const dispatch = useDispatch();

  const dependentsData = useSelector((state) => state.dependents.dependents);
  console.log(dependentsData);

  const [user, setUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Set the initial user once dependentsData is loaded
  React.useEffect(() => {
    if (dependentsData && dependentsData.length > 0) {
      setUser(dependentsData[0]);
    }
  }, [dependentsData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    setUser(item);
    dispatch(setUser({ userName: item.firstName, avatarUrl: item.fileUrl }));

    // Set the selected user
    setAnchorEl(null); // Close the menu
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {localStorage.getItem("userName")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dependentsData?.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClose(item)}>
            <Avatar
              src={item.fileUrl}
              style={{
                marginRight: "8px",
              }}
            />
            {item.firstName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
