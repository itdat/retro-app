import React, { useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import RetroCard from "../cards/RetroCard";

import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";

const CardColumn = ({ title, cards, setCards, classes }) => {
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const { confirm, hideConfirm } = confirmDialogContext;

  useEffect(() => {
    if (confirm && confirm.result === true) {
      const delCards = cards.filter(
        (card) => card._id !== confirm.message.idCard
      );
      setCards(delCards);
      hideConfirm();
    }
  }, [confirm, cards]);

  return (
    <Grid item xs={12} md={4} container wrap="nowrap" direction="column">
      <Card className={classes}>
        <Typography variant="h5" align="center" color="inherit">
          {title}
        </Typography>
      </Card>
      {cards.map((card, i) => {
        return <RetroCard key={i} card={card} />;
      })}
    </Grid>
  );
};

export default CardColumn;
