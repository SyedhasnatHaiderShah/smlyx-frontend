import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  const content = (
    <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</p>
  );

  return (
    <Root>
      <Divider>
        <Chip
          label="OR"
          // size="medium"
          // color="info"
          // className=" text-primarybg bg-primary"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "white",
            backgroundColor: "#a53794",
          }}
        />
      </Divider>
    </Root>
  );
}
