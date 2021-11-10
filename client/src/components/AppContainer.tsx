import { Container, ContainerProps } from "@mui/material";
import React from "react";

const AppContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "50px", ...props.style }}
      {...props}
    >
      {props.children}
    </Container>
  );
};
export default AppContainer;
