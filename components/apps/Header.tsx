import React, { ReactElement } from "react";

import DorameterLogo from "../icons/DorameterLogo";
import { Box } from "@mui/material";

const Header = (): ReactElement => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      paddingTop: "1%",
    }}
  >
    <DorameterLogo
      sx={{
        height: "50px",
        width: "100vs",
      }}
    />
  </Box>
);

export default Header;
