import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// import { makeStyles } from "@material-ui/styles";
import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";

import BoardsContext from "../../context/boards/boardsContext";
import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";

import { CONFIRM_DELETE_BOARD } from "../notification/types";

// const useStyles = makeStyles((theme) => ({}));

const BoardCard = ({ board }) => {
  // Using styles
  //   const classes = useStyles();

  // Use context
  const boardsContext = useContext(BoardsContext);
  const { updateBoard } = boardsContext;

  const confirmDialogContext = useContext(ConfirmDialogContext);
  const { showConfirm } = confirmDialogContext;

  // Use states
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState({
    name: board.name,
    context: board.context,
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    if (!edit) {
      setEdit(!edit);
    } else {
      const updatedBoard = { ...board, ...value };
      await updateBoard(updatedBoard);
      setEdit(!edit);
    }
  };

  const handleDelete = (e) => {
    showConfirm({
      type: CONFIRM_DELETE_BOARD,
      title: "Confirm delete operation",
      content: "Are you sure to delete this board?",
      id: board._id,
    });
  };

  return (
    <Grid item key={board._id} xs={12} sm={3}>
      <Card>
        {edit ? (
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="/cover.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <TextField
                name="name"
                inputProps={{ style: { fontSize: "1.5rem" } }}
                value={value.name}
                label={value.name ? "" : "Board name"}
                autoFocus
                fullWidth
                onChange={handleChange}
              />
              <TextField
                name="context"
                value={value.context}
                label={value.context ? "" : "Board context"}
                fullWidth
                multiline
                onChange={handleChange}
              />
            </CardContent>
          </CardActionArea>
        ) : (
          <Link
            to={`/boards/${board._id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/cover.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {value.context}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        )}

        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </Button>
          <Button size="small" color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BoardCard;
