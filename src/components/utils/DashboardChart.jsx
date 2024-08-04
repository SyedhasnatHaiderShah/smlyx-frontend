import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

const uData = [51, 59, 60, 65, 75];
const xLabels = [
  "Feb 12 2021",
  "March 25 2021",
  "April 25 2021",
  "May 20 2021",
  "June 5 2021",
];

export default function DashboardChart() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: {
          xs: "100%",
          sm: "100%",
          md: "300px",
          lg: "100%",
          xl: "100%",
        },
      }}
    >
      <LineChart
        width={500}
        height={300}
        series={[
          {
            data: uData,
            label: "Users",
            area: true,
            showMark: false,
            color: "gray",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{
          [`& .${lineElementClasses.line}`]: {
            stroke: "#3f51b5",
          },
          [`& .${lineElementClasses.area}`]: {
            fill: "rgba(63, 81, 181, 0.5)",
          },
        }}
      />
    </Box>
  );
}
