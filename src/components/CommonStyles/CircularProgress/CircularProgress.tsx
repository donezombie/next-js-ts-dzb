import React from "react";
import {
  CircularProgress as CircularProgressMUI,
  CircularProgressProps,
} from "@mui/material";

const CircularProgress = (props: CircularProgressProps) => {
  return <CircularProgressMUI size={24} {...props} />;
};

export default React.memo(CircularProgress);
