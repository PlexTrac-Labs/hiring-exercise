import { VpnKey } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";

interface props {
  relativeNavigation?: string;
}

const ButtonNavigateToPasswordChange: React.FC<props> = ({
  relativeNavigation
}) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={e => {
        e.stopPropagation();
        navigate("/password-change");
      }}
    >
      <VpnKey />
    </IconButton>
  );
};
export default ButtonNavigateToPasswordChange;
