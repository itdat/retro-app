import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CardColumn from "../cards/CardColumn";
import CardsContext from "../../context/cards/cardsContext";
import AuthContext from "../../context/auth/authContext";
import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";
import { CONFIRM_DELETE_CARD } from "../notification/types";
const useStyles = makeStyles((theme) => ({
  columnTitle: {
    marginTop: "0.2rem",
    padding: "2rem",
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

const Home = () => {
  const classes = useStyles();

  const cardsContext = useContext(CardsContext);
  const authContext = useContext(AuthContext);
  const confirmDialogContext = useContext(ConfirmDialogContext);

  const {
    getCards,
    wentWell,
    toImprove,
    actionItems,
    removeCard,
  } = cardsContext;

  const { hideConfirm, confirm } = confirmDialogContext;

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    getCards();
    // eslint-disable-next-line
  }, []);

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

  return (
    <Grid container spacing={1}>
      <CardColumn
        title="Went Well"
        cards={wentWell}
        columnClasses={clsx(classes.columnTitle, classes.wentWell)}
      />
      <CardColumn
        title="To Improve"
        cards={toImprove}
        columnClasses={clsx(classes.columnTitle, classes.toImprove)}
      />
      <CardColumn
        title="Action Items"
        cards={actionItems}
        columnClasses={clsx(classes.columnTitle, classes.actionItems)}
      />
    </Grid>
  );
};

export default Home;
