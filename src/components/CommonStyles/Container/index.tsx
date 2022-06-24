import React from "react";
import { Container as ContainerMUI, ContainerProps } from "@mui/material";

const MARGIN_CONTAINER = 40;

const Container = (props: ContainerProps) => {
  return (
    <ContainerMUI
      style={{ marginTop: MARGIN_CONTAINER, marginBottom: MARGIN_CONTAINER }}
      {...props}
    />
  );
};

export default React.memo(Container);
