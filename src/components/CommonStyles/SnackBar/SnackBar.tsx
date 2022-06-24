import React from "react";
import { Snackbar, SnackbarProps } from "@mui/material";

interface SnackBarProps extends SnackbarProps {
  time: number;
}

const SnackBar = (props: SnackBarProps) => {
  const { anchorOrigin, open, onClose, message, time } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={time}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
      message={message}
    />
  );
};

export default SnackBar;
