import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { colors } from "../helpful/style";

export type InteractDialogProps = {
  open: boolean;
  title: string;
  handleClose: () => void;
};

export const InteractDialog: React.FC<InteractDialogProps> = (props) => {
  const { children, open, title, handleClose } = { ...props };

  const TitleStyle = {
    backgroundColor: colors.darkGreen,
    color: "white",
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={TitleStyle}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
