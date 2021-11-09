import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface props {
  onClick(): void;
}

const ButtonDelete: React.FC<props> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <IconButton onClick={e => handleClick(e)}>
      <Delete />
    </IconButton>
  );
};
export default ButtonDelete;
