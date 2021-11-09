import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";

interface props {
  relativeNavigation: string;
}

const ButtonNavigateToEdit: React.FC<props> = ({ relativeNavigation }) => {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate(relativeNavigation)}>
      <Edit />
    </IconButton>
  );
};
export default ButtonNavigateToEdit;
