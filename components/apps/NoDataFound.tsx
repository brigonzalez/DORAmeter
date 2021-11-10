import React, { ReactElement } from "react";
import { Box, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const NoDataFound = (): ReactElement => (
  <Paper
    sx={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      left: "50%",
      position: "absolute",
      px: 2,
      top: "50%",
      transform: "translateX(-50%) translateY(-50%)",
    }}
    variant="outlined"
  >
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <InfoIcon sx={{ mr: 1 }} />
      <p>{"No data found!"}</p>
    </Box>
    <p>
      {
        "Try making a POST request to the `/event` endpoint with the following request body:"
      }
      <br />
      {
        '{"appName": "app a", "eventType": "DEPLOYMENT" | "CODE_COMMITTED" | "SUCCESSFUL_TEST" | "UNSUCCESSFUL_TEST"}'
      }
    </p>
  </Paper>
);

export default NoDataFound;
