import { Button, ButtonProps } from "@mui/material";

const ButtonLogin: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      {...props}
      style={{ backgroundColor: "darkgray", color: "black", ...props.style }}
    >
      Login
    </Button>
  );
};
export default ButtonLogin;
