import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import AddCircleOutlineTwoTone from "@material-ui/icons/AddCircleOutlineTwoTone";
import IconButton from "@material-ui/core/IconButton";

import RetroCard from "../cards/RetroCard";
import { Box } from "@material-ui/core";

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

const CardColumn = ({ column, columnClasses, cards }) => {
  const classes = useStyles();

  const [isAdding, setIsAdding] = useState(false);

  const addNewCard = () => {
    setIsAdding(true);
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
        {cards.map((card) => {
          return <RetroCard key={card._id} card={card} />;
        })}

        {/* Dummy card when adding */}
        {isAdding && (
          <RetroCard
            key="newCard"
            card={{ content: "", column: column.type }}
            isEdited={true}
            isAdding={true}
            setIsAdding={setIsAdding}
          />
        )}
      </Box>
    </Grid>
  );
};

export default CardColumn;
