import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@material-ui/core";

// Contexts
import CardsContext from "../../context/cards/cardsContext";

import styled from "styled-components";

const Container = styled.div`
  padding: 0.5rem;
`;

const useStyles = makeStyles((theme) => ({
  cardContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
}));

const DummyCard = ({ boardId, card }) => {
  const cardsContext = useContext(CardsContext);

  const { addCard, addingColumn, setAddingColumn } = cardsContext;

  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(card.content);

  // Listen if adding a new card to the column
  useEffect(() => {
    if (addingColumn === card.column) {
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
    if (edit && addingColumn === card.column) {
      const newCard = {
        content: value,
        column: card.column,
        board: boardId,
      };
      await addCard(newCard);
      setAddingColumn(null);
    }
    setEdit(!edit);
  };

  return (
    <Container>
      <Card hidden={addingColumn === card.column ? false : true}>
        <CardContent className={classes.cardContent}>
          {edit && (
            <TextField
              fullWidth
              multiline
              value={value}
              onChange={handleChange}
              autoFocus
            />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleModifyClick}>
            Save
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default DummyCard;
