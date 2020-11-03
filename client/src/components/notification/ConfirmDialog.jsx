import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";

const ConfirmDialog = () => {
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const { confirm, onConfirm, onCancel } = confirmDialogContext;
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={confirm !== null}
    >
      <DialogTitle>{confirm !== null && confirm.message.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {confirm !== null && confirm.message.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
