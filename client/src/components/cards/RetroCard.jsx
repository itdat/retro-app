import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Hidden, TextField } from "@material-ui/core";

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

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(card.content);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleModifyClick = () => {
    setEdit(!edit);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        {edit ? (
          <TextField multiline value={value} onChange={handleChange} />
        ) : (
          <Typography multiline style={{ whiteSpace: "pre-line" }}>
            {value}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Hidden mdUp>
          <Button size="small" color="primary">
            Move
          </Button>
        </Hidden>
        <Button size="small" color="primary" onClick={handleModifyClick}>
          {edit ? "Save" : "Edit"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default RetroCard;
