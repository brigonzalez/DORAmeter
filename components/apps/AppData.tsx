import React, { ReactElement } from "react";
import AppMetricDetail from "./AppMetricDetail";
import { DeploymentFrequency } from "../../types/deployment-frequency.types";
import { Grid, Paper, Typography } from "@mui/material";

const AppData = ({
  deploymentFrequency,
}: {
  deploymentFrequency: DeploymentFrequency;
}): ReactElement => (
  <Grid
    item
    lg={4}
    md={6}
    sx={{
      display: "flex",
      flexDirection: "column",
      padding: "2%",
    }}
    xs={12}
  >
    <Paper
      sx={{
        padding: "4%",
      }}
      variant="outlined"
    >
      <Typography sx={{ margin: "2% 0%" }} variant="h6">
        {deploymentFrequency.appName}
      </Typography>
      <AppMetricDetail metric="DF" rating={deploymentFrequency.rating} />
      <AppMetricDetail metric="LT" rating="NONE" />
      <AppMetricDetail metric="MTTR" rating="NONE" />
      <AppMetricDetail metric="CF" rating="NONE" />
    </Paper>
  </Grid>
);

export default AppData;
