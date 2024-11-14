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
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: "8px",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
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
            showMark: true,
            color: "#605fa4",
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
