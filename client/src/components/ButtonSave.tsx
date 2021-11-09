import { Button, ButtonProps } from "@mui/material";

const ButtonSave: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button
      variant="contained"
      {...props}
      style={{
        color: "black",
        backgroundColor: "grey",
        ...props.style
      }}
    >
      Save
    </Button>
  );
};
export default ButtonSave;
