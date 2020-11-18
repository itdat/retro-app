import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, IconButton, TextField } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Share from "@material-ui/icons/Share";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import { DragDropContext } from "react-beautiful-dnd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import CardColumn from "../cards/CardColumn";

// Contexts
import BoardsContext from "../../context/boards/boardsContext";
import CardsContext from "../../context/cards/cardsContext";
import AuthContext from "../../context/auth/authContext";
import ConfirmDialogContext from "../../context/confirmDialog/confirmDialogContext";
import AlertContext from "../../context/alert/alertContext";

import { CONFIRM_DELETE_CARD } from "../notification/types";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5px",
  },
  columnTitle: {
    marginTop: "0.2rem",
    padding: "1rem",
  },
  wentWell: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.primary,
  },
  toImprove: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.text.primary,
  },
  actionItems: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.text.primary,
  },
}));

const Board = (props) => {
  const classes = useStyles();

  const cardsContext = useContext(CardsContext);
  const authContext = useContext(AuthContext);
  const confirmDialogContext = useContext(ConfirmDialogContext);
  const alertContext = useContext(AlertContext);
  const boardsContext = useContext(BoardsContext);

  const { currentBoard, getBoard, updateBoard } = boardsContext;
  const { error, removeCard, clearError, moveCard } = cardsContext;
  const { loadUser } = authContext;
  const { hideConfirm, confirm } = confirmDialogContext;
  const { setAlert } = alertContext;

  const [state, setState] = useState({
    value: String(window.location.href),
    copied: false,
  });

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState({
    name: "",
    context: "",
  });

  // Initialize in the fisrt load
  useEffect(() => {
    clearError();
    loadUser();
    getBoard(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValue({
      ...value,
      name: currentBoard.name,
      context: currentBoard.context,
    });
  }, [currentBoard]);

  // Delete card listener
  useEffect(() => {
    if (
      confirm &&
      confirm.message.type === CONFIRM_DELETE_CARD &&
      confirm.result === true
    ) {
      removeCard(props.match.params.id, confirm.message.idCard);
      hideConfirm();
    }
    // eslint-disable-next-line
  }, [confirm]);

  // Listen error when loading cards
  useEffect(() => {
    if (error) setAlert(error);
    // eslint-disable-next-line
  }, [error]);

  const wentWellColumn = {
    title: "Went Well",
    type: "wentWell",
  };
  const toImproveColumn = {
    title: "To Improve",
    type: "toImprove",
  };
  const actionItemsColumn = {
    title: "Action Items",
    type: "actionItems",
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    if (!edit) {
      setEdit(!edit);
    } else {
      const updatedBoard = { ...currentBoard, ...value };
      await updateBoard(updatedBoard);
      setEdit(!edit);
    }
  };

  const onDragEnd = async (result) => {
    await moveCard({
      boardId: props.match.params.id,
      destColumn: result.destination.droppableId,
      destIndex: result.destination.index,
      srcColumn: result.source.droppableId,
      srcIndex: result.source.index,
      srcId: result.draggableId,
    });
  };

  return (
    <Fragment>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.container}
      >
        <Grid item style={{ marginRight: "0.8rem" }}>
          <Link
            to="/boards"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton>
              <ArrowBack />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <CopyToClipboard
            text={state.value}
            onCopy={() => {
              setAlert("Board URL is copied");
              setState({ ...state, copied: true });
            }}
          >
            <IconButton>
              <Share />
            </IconButton>
          </CopyToClipboard>
        </Grid>
      </Grid>
      <Grid alignItems="center" justify="center" container>
        <Grid item style={{ marginBottom: "1rem" }}>
          {edit ? (
            <Fragment>
              <TextField
                name="name"
                fullWidth
                inputProps={{ style: { fontSize: "1.8rem" } }}
                value={value.name}
                autoFocus
                onChange={handleChange}
              />
              <TextField
                name="context"
                fullWidth
                value={value.context}
                onChange={handleChange}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Typography align="center" variant="h4">
                {value.name}
              </Typography>
              <Typography align="center">{value.context}</Typography>
            </Fragment>
          )}
        </Grid>
        <Grid item>
          <IconButton onClick={handleEdit}>
            {edit ? <Save fontSize="small" /> : <Edit fontSize="small" />}
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <DragDropContext onDragEnd={onDragEnd}>
          <CardColumn
            column={wentWellColumn}
            columnClasses={clsx(classes.columnTitle, classes.wentWell)}
            {...props}
          />
          <CardColumn
            column={toImproveColumn}
            columnClasses={clsx(classes.columnTitle, classes.toImprove)}
            {...props}
          />
          <CardColumn
            column={actionItemsColumn}
            columnClasses={clsx(classes.columnTitle, classes.actionItems)}
            {...props}
          />
        </DragDropContext>
      </Grid>
    </Fragment>
  );
};

export default Board;
