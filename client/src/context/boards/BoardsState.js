import React, { useReducer } from "react";
import axios from "axios";
import BoardsContext from "./boardsContext";
import boardsReducer from "./boardsReducer";
import {
  ADD_BOARD,
  BOARD_MESSAGE,
  GET_BOARDS,
  GET_BOARD,
  REMOVE_BOARD,
  UPDATE_BOARD,
  CLEAR_BOARD_MESSAGE,
  CLEAR_BOARDS,
} from "../types";

const BoardsState = (props) => {
  const initialState = {
    boards: [],
    currentBoard: {},
    message: null,
  };

  const [state, dispatch] = useReducer(boardsReducer, initialState);

  // Get all boards
  const getBoards = async () => {
    try {
      const res = await axios.get(`/api/boards`);
      dispatch({
        type: GET_BOARDS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_MESSAGE,
        payload: err.response.data.msg,
      });
    }
  };

  const getBoard = async (boardId) => {
    try {
      const res = await axios.get(`/api/boards/${boardId}`);
      dispatch({
        type: GET_BOARD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOARD_MESSAGE,
        payload: err.response.data.msg,
      });
    }
  };

  // Add a board
  const addBoard = async (board) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/boards", board, config);
      dispatch({
        type: ADD_BOARD,
        payload: res.data,
      });

      dispatch({
        type: BOARD_MESSAGE,
        payload: "Card created",
      });
    } catch (err) {
      if (err.response.data.msg) {
        dispatch({
          type: BOARD_MESSAGE,
          payload: err.response.data.msg,
        });
      }

      // Check validation errors
      if (err.response.data.errors) {
        // eslint-disable-next-line
        err.response.data.errors.map((error, i) => {
          setTimeout(() => {
            dispatch({
              type: BOARD_MESSAGE,
              payload: error.msg,
            });
          }, 3000 * (i + 1));
        });
      }

      setTimeout(() => {
        dispatch({
          type: BOARD_MESSAGE,
          payload: null,
        });
      }, 0);
    }
  };

  // Update a board
  const updateBoard = async (board) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await axios.put(`/api/boards/${board._id}`, board, config);
      dispatch({ type: UPDATE_BOARD, payload: res.data });
    } catch (err) {
      dispatch({ type: BOARD_MESSAGE, payload: err.response.msg });
    }
  };

  // Remove a board
  const removeBoard = async (id) => {
    try {
      await axios.delete(`/api/boards/${id}`);
      dispatch({
        type: REMOVE_BOARD,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: BOARD_MESSAGE,
        payload: err.response.msg,
      });
    }
  };

  // Clear boards
  const clearBoards = () => {
    dispatch({ type: CLEAR_BOARDS });
  };

  const clearBoardMessage = () => {
    dispatch({ type: CLEAR_BOARD_MESSAGE });
  };

  return (
    <BoardsContext.Provider
      value={{
        boards: state.boards,
        currentBoard: state.currentBoard,
        message: state.message,
        getBoards,
        getBoard,
        addBoard,
        updateBoard,
        removeBoard,
        clearBoardMessage,
        clearBoards,
      }}
    >
      {props.children}
    </BoardsContext.Provider>
  );
};

export default BoardsState;
