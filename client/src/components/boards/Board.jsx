import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CardColumn from "../cards/CardColumn";
import CardsContext from "../../context/cards/cardsContext";
import AuthContext from "../../context/auth/authContext";
import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";
import AlertContext from "../../context/alert/alertContext";
import { CONFIRM_DELETE_CARD } from "../notification/types";

const useStyles = makeStyles((theme) => ({
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

const Board = ({ match }) => {
  const classes = useStyles();

  const cardsContext = useContext(CardsContext);
  const authContext = useContext(AuthContext);
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const alertContext = useContext(AlertContext);

  const {
    wentWell,
    toImprove,
    actionItems,
    error,
    getCards,
    removeCard,
  } = cardsContext;
  const { loadUser } = authContext;
  const { hideConfirm, confirm } = confirmDialogContext;
  const { setAlert } = alertContext;

  // Initialize in the fisrt load
  useEffect(() => {
    loadUser();
    getCards(match.params.id);
    // eslint-disable-next-line
  }, []);

  // Delete card listener
  useEffect(() => {
    if (
      confirm &&
      confirm.message.type === CONFIRM_DELETE_CARD &&
      confirm.result === true
    ) {
      removeCard(confirm.message.idCard);
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

  return (
    <Grid container spacing={1}>
      <CardColumn
        column={wentWellColumn}
        columnClasses={clsx(classes.columnTitle, classes.wentWell)}
        cards={wentWell}
        boardId={match.params.id}
      />
      <CardColumn
        column={toImproveColumn}
        columnClasses={clsx(classes.columnTitle, classes.toImprove)}
        cards={toImprove}
        boardId={match.params.id}
      />
      <CardColumn
        column={actionItemsColumn}
        columnClasses={clsx(classes.columnTitle, classes.actionItems)}
        cards={actionItems}
        boardId={match.params.id}
      />
    </Grid>
  );
};

export default Board;
