import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import RetroCard from "../cards/RetroCard";

const CardColumn = ({ title, cards, classes }) => {
  return (
    <Grid item xs={12} md={4} container wrap="nowrap" direction="column">
      <Card className={classes}>
        <Typography variant="h6" align="center" color="inherit">
          {title}
        </Typography>
      </Card>
      {cards.map((card) => {
        return <RetroCard card={card} />;
      })}
    </Grid>
  );
};

export default CardColumn;
