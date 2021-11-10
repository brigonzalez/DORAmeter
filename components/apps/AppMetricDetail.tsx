import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";

const metricDisplayNameMap: {
  [key: string]: string;
} = {
  CF: "Change Failure",
  DF: "Deployment Frequency",
  LT: "Lead Time",
  MTTR: "Mean Time to Restore Service",
};

const AppMetricDetail = ({
  metric,
  rating,
}: {
  rating: string;
  metric: string;
}): ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        py: "2%",
      }}
    >
      <Typography variant="body1">{`${metricDisplayNameMap[metric]}: `}</Typography>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: `badges.${rating.toLowerCase()}.background`,
          borderRadius: 2,
          color: `badges.${rating.toLowerCase()}.foreground`,
          px: "3%",
        }}
      >
        <Typography variant="overline">{rating}</Typography>
      </Box>
    </Box>
  );
};

export default AppMetricDetail;
