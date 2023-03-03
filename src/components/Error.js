import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function Error(props) {
  const { showError, onClose } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showError}
        onClose={onClose}
        autoHideDuration={6000}
        message="Incorrect Address"
        key={"top" + "right"}
      >
        <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
          Incorrect Address
        </Alert>
      </Snackbar>
    </div>
  );
}
