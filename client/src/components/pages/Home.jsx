import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CardColumn from "../cards/CardColumn";
import CardsContext from "../../context/cards/cardsContext";

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

  const { getCards, wentWell, toImprove, actionItems } = cardsContext;

  useEffect(() => {
    getCards();
  }, [wentWell, toImprove, actionItems]);

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
