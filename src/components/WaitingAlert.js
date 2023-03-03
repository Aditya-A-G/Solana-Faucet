import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function WaitingAlert(props) {
  const { showWaitingAlert, onClose } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showWaitingAlert}
        onClose={onClose}
        autoHideDuration={6000}
        message="Please Wait"
        key={"top" + "right"}
      >
        <Alert onClose={onClose} severity="info" sx={{ width: "100%" }}>
          Please Wait
        </Alert>
      </Snackbar>
    </div>
  );
}
