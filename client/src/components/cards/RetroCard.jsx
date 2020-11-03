import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const RetroCard = ({ card }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {card.content}
        </Typography>
        <Typography>{card.content}</Typography>
      </CardContent>
      <CardActions>
        <Hidden mdUp>
          <Button size="small" color="primary">
            Move
          </Button>
        </Hidden>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default RetroCard;
