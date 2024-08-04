import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { HiMenu, HiX } from "react-icons/hi";
import PopOverTwo from "./PopOverTwo";

export default function RightDrawer({
  isOpen,
  setIsOpen,
  patientInfoData,
  settingsData,
}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ right: open });
  };

  const handleClose = () => {
    setState({ right: false });
    setIsOpen(false);
  };

  const list = () => (
    <Box
      sx={{ width: 550 }}
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Button onClick={toggleDrawer(true)}>
          {isOpen ? <HiX size={32} /> : <HiMenu size={32} />}
        </Button>
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: {
                xs: 250,
                sm: 300,
                md: 400,
              },
            }}
            role="presentation"
            onClick={handleClose}
            onKeyDown={handleClose}
            className=" flex items-center justify-center gap-5 p-5 flex-col"
          >
            <PopOverTwo patientInfoData={patientInfoData} />
            <PopOverTwo patientInfoData={settingsData} />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
