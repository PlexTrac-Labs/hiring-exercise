import { ArrowBackIos } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router";

const ButtonNavigateToUserList: React.FC<ButtonProps> = (
  props: ButtonProps
) => {
  const navigate = useNavigate();

  return (
    <Button
      size="large"
      startIcon={<ArrowBackIos />}
      onClick={e => navigate("/user")}
      {...props}
      style={{ color: "black", ...props.style }}
    >
      Users
    </Button>
  );
};
export default ButtonNavigateToUserList;
