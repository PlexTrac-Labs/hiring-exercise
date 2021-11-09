import { Button, ButtonProps } from "@mui/material";

const ButtonCancel: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button
      variant="contained"
      {...props}
      style={{
        color: "black",
        backgroundColor: "lightgrey",
        ...props.style
      }}
    >
      Cancel
    </Button>
  );
};
export default ButtonCancel;
