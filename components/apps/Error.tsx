import React, { ReactElement } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Paper } from "@mui/material";

const Error = (): ReactElement => (
  <Paper
    sx={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      left: "50%",
      p: 2,
      position: "absolute",
      top: "50%",
      transform: "translateX(-50%) translateY(-50%)",
    }}
    variant="outlined"
  >
    <ErrorOutlineIcon
      sx={{
        color: "error.main",
        fontWeight: "bolder",
        height: "50%",
      }}
    />
    <p>{"Something went wrong. Please try again."}</p>
  </Paper>
);

export default Error;
