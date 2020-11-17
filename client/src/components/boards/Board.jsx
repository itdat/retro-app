import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { DragDropContext } from "react-beautiful-dnd";

import CardColumn from "../cards/CardColumn";

// Contexts
import CardsContext from "../../context/cards/cardsContext";
import AuthContext from "../../context/auth/authContext";
import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";
import AlertContext from "../../context/alert/alertContext";

import { CONFIRM_DELETE_CARD } from "../notification/types";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5px",
  },
  columnTitle: {
    marginTop: "0.2rem",
    padding: "1rem",
  },
  wentWell: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.primary,
  },
  toImprove: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.text.primary,
  },
  actionItems: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.text.primary,
  },
}));

const Board = (props) => {
  const classes = useStyles();

  const cardsContext = useContext(CardsContext);
  const authContext = useContext(AuthContext);
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const alertContext = useContext(AlertContext);

  const { error, removeCard, clearError, moveCard } = cardsContext;
  const { loadUser } = authContext;
  const { hideConfirm, confirm } = confirmDialogContext;
  const { setAlert } = alertContext;

  // Initialize in the fisrt load
  useEffect(() => {
    clearError();
    loadUser();
    // eslint-disable-next-line
  }, []);

  // Delete card listener
  useEffect(() => {
    if (
      confirm &&
      confirm.message.type === CONFIRM_DELETE_CARD &&
      confirm.result === true
    ) {
      removeCard(props.match.params.id, confirm.message.idCard);
      hideConfirm();
    }
    // eslint-disable-next-line
  }, [confirm]);

  // Listen error when loading cards
  useEffect(() => {
    if (error) setAlert(error);
    // eslint-disable-next-line
  }, [error]);

  const wentWellColumn = {
    title: "Went Well",
    type: "wentWell",
  };
  const toImproveColumn = {
    title: "To Improve",
    type: "toImprove",
  };
  const actionItemsColumn = {
    title: "Action Items",
    type: "actionItems",
  };

  const onDragEnd = async (result) => {
    await moveCard({
      boardId: props.match.params.id,
      destColumn: result.destination.droppableId,
      destIndex: result.destination.index,
      srcColumn: result.source.droppableId,
      srcIndex: result.source.index,
      srcId: result.draggableId,
    });
  };

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Grid item>
          <Link
            to="/boards"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button variant="outlined" startIcon={<ArrowBack />}>
              Back to boards
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <DragDropContext onDragEnd={onDragEnd}>
          <CardColumn
            column={wentWellColumn}
            columnClasses={clsx(classes.columnTitle, classes.wentWell)}
            {...props}
          />
          <CardColumn
            column={toImproveColumn}
            columnClasses={clsx(classes.columnTitle, classes.toImprove)}
            {...props}
          />
          <CardColumn
            column={actionItemsColumn}
            columnClasses={clsx(classes.columnTitle, classes.actionItems)}
            {...props}
          />
        </DragDropContext>
      </Grid>
    </Fragment>
  );
};

export default Board;
