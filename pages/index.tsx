import type { NextPage } from "next";
import Header from "../components/apps/Header";
import Apps from "../components/apps/Apps";
import React from "react";
import { Box } from "@mui/material";

const Index: NextPage = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Header />
    <Apps />
  </Box>
);

export default Index;
