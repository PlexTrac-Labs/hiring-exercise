import React from "react";
import { CircularProgress, Modal } from "@mui/material";
interface props {
  loading: boolean;
}

const LoadingPopup: React.FC<props> = ({ loading }) => {
  return (
    <Modal open={loading} style={{ display: "flex" }}>
      <CircularProgress color="inherit" style={{ margin: "auto" }} />
    </Modal>
  );
};
export default LoadingPopup;
