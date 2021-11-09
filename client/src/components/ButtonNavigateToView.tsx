import { Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";

interface props {
  relativeNavigation?: string;
}

const ButtonNavigateToView: React.FC<props> = ({ relativeNavigation }) => {
  const navigate = useNavigate();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    relUrl: string
  ) => {
    e.stopPropagation();
    navigate(relUrl);
  };

  return (
    <IconButton
      onClick={e =>
        relativeNavigation ? handleClick(e, relativeNavigation) : null
      }
    >
      <Visibility />
    </IconButton>
  );
};
export default ButtonNavigateToView;
