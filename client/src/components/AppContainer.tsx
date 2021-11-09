import { Container } from "@mui/material";

interface Props {
  children: JSX.Element;
}

const AppContainer = ({ children }: Props) => {
  return <Container style={{ marginTop: "100px" }}>{children}</Container>;
};
export default AppContainer;
