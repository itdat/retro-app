import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Card, IconButton, Typography } from "@material-ui/core";
import AddCircleOutlineTwoTone from "@material-ui/icons/AddCircleOutlineTwoTone";

import CardsContext from "../../context/cards/cardsContext";

import RetroCard from "../cards/RetroCard";
import DummyCard from "../cards/DummyCard";

import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
  columnTitle: {
    marginRight: "1rem",
  },
  list: {
    backgroundColor: "#ebecf0",
    marginTop: "5px",
    height: "80vh",
    overflow: "auto",
    borderRadius: "5px",
  },
}));

const CardColumn = ({ column, columnClasses, cards, boardId }) => {
  const classes = useStyles();

  const cardsContext = useContext(CardsContext);
  const { addingColumn, setAddingColumn } = cardsContext;

  const addNewCard = () => {
    if (addingColumn !== column.type) {
      setAddingColumn(column.type);
    }
  };

  return (
    <Grid item xs={12} md={4} container wrap="nowrap" direction="column">
      <Card className={columnClasses}>
        <Grid container justify="center" alignItems="center">
          <Grid item className={classes.columnTitle}>
            <Typography variant="h5" align="center" color="inherit">
              {column.title}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={addNewCard}>
              <AddCircleOutlineTwoTone style={{ fontSize: 32 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
      <Box className={classes.list}>
        {/* Card list */}
        <Droppable droppableId={column.type}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => {
                return <RetroCard key={card._id} card={card} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* Dummy card when adding */}
        <DummyCard
          card={{ content: "", column: column.type }}
          boardId={boardId}
        />
      </Box>
    </Grid>
  );
};

export default CardColumn;
