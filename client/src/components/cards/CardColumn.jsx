import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import AddCircleOutlineTwoTone from "@material-ui/icons/AddCircleOutlineTwoTone";
import IconButton from "@material-ui/core/IconButton";

import RetroCard from "../cards/RetroCard";

import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";
import { CONFIRM_DELETE_CARD } from "../notification/types";

const useStyles = makeStyles((theme) => ({
  columnTitle: {
    marginRight: "1rem",
  },
}));

const CardColumn = ({ title, cards, setCards, columnClasses }) => {
  const classes = useStyles();

  const confirmDialogContext = useContext(ConfirmDialogContext);
  const { confirm, hideConfirm } = confirmDialogContext;

  useEffect(() => {
    if (
      confirm &&
      confirm.message.type === CONFIRM_DELETE_CARD &&
      confirm.result === true
    ) {
      const remainCards = cards.filter(
        (card) => card._id !== confirm.message.idCard
      );
      setCards(remainCards);
      hideConfirm();
    }
    // eslint-disable-next-line
  }, [confirm, cards]);

  return (
    <Grid item xs={12} md={4} container wrap="nowrap" direction="column">
      <Card className={columnClasses}>
        <Grid container justify="center" alignItems="center">
          <Grid item className={classes.columnTitle}>
            <Typography variant="h5" align="center" color="inherit">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="small">
              <AddCircleOutlineTwoTone style={{ fontSize: 32 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
      {cards.map((card) => {
        return <RetroCard key={card._id} card={card} />;
      })}
    </Grid>
  );
};

export default CardColumn;
