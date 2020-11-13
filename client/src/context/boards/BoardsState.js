import React, { useReducer } from "react";
import axios from "axios";
import BoardsContext from "./boardsContext";
import boardsReducer from "./boardsReducer";
import {
  ADD_BOARD,
  BOARD_ERROR,
  GET_BOARDS,
  REMOVE_BOARD,
  UPDATE_BOARD,
} from "../types";

const BoardsState = (props) => {
  const initialState = {
    boards: [],
    error: null,
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
        type: BOARD_ERROR,
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
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: err.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: BOARD_ERROR,
          payload: null,
        });
      }, 1000);
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
      dispatch({ type: BOARD_ERROR, payload: err.response.msg });
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
        type: BOARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <BoardsContext.Provider
      value={{
        boards: state.boards,
        error: state.error,
        getBoards,
        addBoard,
        updateBoard,
        removeBoard,
      }}
    >
      {props.children}
    </BoardsContext.Provider>
  );
};

export default BoardsState;
