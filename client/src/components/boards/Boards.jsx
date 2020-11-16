import React, { Fragment, useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";

import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Add from "@material-ui/icons/Add";
import Board from "./Board";
import FormInputDialog from "./FormInputDialog";

import AuthContext from "../../context/auth/authContext";
import BoardsContext from "../../context/boards/boardsContext";
import CardsContext from "../../context/cards/cardsContext";
import AlertContext from "../../context/alert/alertContext";
import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";

import { CONFIRM_DELETE_BOARD } from "../notification/types";

import BoardCard from "./BoardCard";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5px",
  },
}));

const Boards = ({ match }) => {
  // Using styles
  const classes = useStyles();

  // Using contexts
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  const boardsContext = useContext(BoardsContext);
  const { boards, message, getBoards, addBoard, removeBoard } = boardsContext;

  const cardsContext = useContext(CardsContext);
  const { clearError } = cardsContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const confirmDialogContext = useContext(ConfirmDialogContext);
  const { hideConfirm, confirm } = confirmDialogContext;

  // Handle form dialog
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  const showDialog = () => {
    setOpen(true);
  };

  // Load data when component did mount
  useEffect(() => {
    loadUser();
    getBoards();
    clearError();
    // eslint-disable-next-line
  }, [match]);

  // Listen if error occurs
  useEffect(() => {
    if (message) {
      setAlert(message);
    }
    // eslint-disable-next-line
  }, [message]);

  // Delete board listener
  useEffect(() => {
    if (
      confirm &&
      confirm.message.type === CONFIRM_DELETE_BOARD &&
      confirm.result === true
    ) {
      removeBoard(confirm.message.id);
      hideConfirm();
    }
    // eslint-disable-next-line
  }, [confirm]);

  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={Board} />
      <Route
        exact
        path={match.path}
        render={() => (
          <Fragment>
            <Grid container className={classes.container} spacing={1}>
              <Grid item xs={12}>
                {/* Show form input dialog */}
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Add />}
                  onClick={showDialog}
                >
                  Add new board
                </Button>
              </Grid>

              {/* List of created boards */}
              {boards &&
                boards.map((board) => (
                  <BoardCard key={board._id} board={board} />
                ))}
            </Grid>
            <FormInputDialog
              isOpen={open}
              closeDialog={closeDialog}
              addBoard={addBoard}
            />
          </Fragment>
        )}
      />
    </Switch>
  );
};

export default Boards;
