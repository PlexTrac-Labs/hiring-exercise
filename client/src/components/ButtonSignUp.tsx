import { Button, ButtonProps } from "@mui/material";

const ButtonSignUp: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      {...props}
      style={{
        color: "black",
        backgroundColor: "transparent",
        border: "darkgrey 1px solid",
        ...props.style
      }}
    >
      Sign Up
    </Button>
  );
};
export default ButtonSignUp;
