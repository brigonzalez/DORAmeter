import React, { ReactElement } from "react";
import useSWR from "swr";
import Error from "./Error";
import NoDataFound from "./NoDataFound";
import AppData from "./AppData";
import { DeploymentFrequency } from "../../types/deployment-frequency.types";
import { getFetcher } from "../../adapters/http-client-adapter";
import { Box, CircularProgress, Grid } from "@mui/material";

const Apps = (): ReactElement => {
  const { data: deploymentFrequencies, error } = useSWR<DeploymentFrequency[]>(
    "/api/deployment-frequencies",
    getFetcher
  );

  if (error) return <Error />;

  if (!deploymentFrequencies)
    return (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          left: "50%",
          position: "absolute",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Grid alignItems="center" container direction="row" justifyContent="center">
      {!deploymentFrequencies.length ? (
        <NoDataFound />
      ) : (
        deploymentFrequencies.map((deploymentFrequency) => (
          <AppData
            deploymentFrequency={deploymentFrequency}
            key={deploymentFrequency.appName}
          />
        ))
      )}
    </Grid>
  );
};

export default Apps;
