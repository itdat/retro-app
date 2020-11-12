import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { Grid, Hidden, IconButton, TextField } from "@material-ui/core";

import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";
import CardsContext from "../../context/cards/cardsContext";
import { CONFIRM_DELETE_CARD } from "../notification/types";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem",
  },
  cardContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
}));

const RetroCard = ({ type = "listItem", boardId, card }) => {
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const cardsContext = useContext(CardsContext);

  const { showConfirm } = confirmDialogContext;
  const { addCard, addingColumn, updateCard, setAddingColumn } = cardsContext;

  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(card.content);

  // Listen if adding a new card to the column
  useEffect(() => {
    if (type === "newCard" && addingColumn === card.column) {
      setEdit(true);
      setValue("");
    }
    // eslint-disable-next-line
  }, [addingColumn]);

  // Handle input value changes
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Handle confirmation of changes (save or edit)
  const handleModifyClick = async () => {
    if (!edit) {
      setEdit(!edit);
    } else {
      if (type === "newCard" && addingColumn === card.column) {
        const newCard = {
          content: value,
          column: card.column,
          board: boardId,
        };

        await addCard(newCard);
        setAddingColumn(null);
        setEdit(!edit);
      } else {
        // Update a card
        const updatedCard = { ...card, content: value };
        await updateCard(updatedCard);
        setEdit(!edit);
      }
    }
  };

  // Show confirm dialog when deleting a card
  const handleDelete = (e) => {
    showConfirm({
      type: CONFIRM_DELETE_CARD,
      title: "Confirm delete operation",
      content: "Are you sure to delete this card?",
      idCard: card._id,
    });
  };

  return (
    <Card
      hidden={
        (type === "newCard" && addingColumn === card.column) ||
        type === "listItem"
          ? false
          : true
      }
      className={classes.card}
    >
      <CardContent className={classes.cardContent}>
        {edit ? (
          <TextField
            fullWidth
            multiline
            value={value}
            onChange={handleChange}
            autoFocus
          />
        ) : (
          <Grid container>
            <Grid item className={classes.content} zeroMinWidth>
              <Typography style={{ whiteSpace: "pre-line" }} noWrap>
                {value}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={handleDelete}>
                <DeleteForever color="error" />
              </IconButton>
            </Grid>
          </Grid>
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
