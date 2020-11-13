import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

const FormInputDialog = ({ isOpen, closeDialog, addBoard }) => {
  const [info, setInfo] = useState({ name: "", context: "" });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleAddBoard = async (e) => {
    e.preventDefault();
    const board = { ...info };
    await addBoard(board);
    closeDialog();
  };

  useEffect(() => {
    setInfo({ name: "", context: "" });
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create a new board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Board name"
          type="text"
          fullWidth
          required
          value={info.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="context"
          name="context"
          label="Board context"
          type="text"
          multiline
          rows={3}
          fullWidth
          value={info.context}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddBoard} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormInputDialog;
