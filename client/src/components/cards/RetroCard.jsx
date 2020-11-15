import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Hidden,
  IconButton,
  TextField,
} from "@material-ui/core";
import DeleteForever from "@material-ui/icons/DeleteForever";

// Contexts
import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";
import CardsContext from "../../context/cards/cardsContext";

import { CONFIRM_DELETE_CARD } from "../notification/types";

import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  &:first-child {
    padding-top: 0.5rem;
  }
  padding: 0 0.5rem;
  padding-bottom: 0.5rem;
`;

const useStyles = makeStyles((theme) => ({
  cardContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
}));

const RetroCard = ({ boardId, card, index }) => {
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const cardsContext = useContext(CardsContext);

  const { showConfirm } = confirmDialogContext;
  const { updateCard } = cardsContext;

  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(card.content);

  // Handle input value changes
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Handle confirmation of changes (save or edit)
  const handleModifyClick = async () => {
    if (edit) {
      // Update a card
      const updatedCard = { ...card, content: value };
      await updateCard(updatedCard);
    }
    setEdit(!edit);
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
    <Draggable draggableId={`${card._id}`} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
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
        </Container>
      )}
    </Draggable>
  );
};

export default RetroCard;
