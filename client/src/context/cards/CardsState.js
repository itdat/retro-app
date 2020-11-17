import React, { useReducer } from "react";
import axios from "axios";
import CardsContext from "./cardsContext";
import cardsReducer from "./cardsReducer";
import {
  ADD_CARD,
  CARD_ERROR,
  GET_CARDS,
  REMOVE_CARD,
  UPDATE_CARD,
  SET_ADDING_COLUMN,
  GET_COLUMN_ORDER,
  CLEAR_CARD_ERROR,
  UPDATE_COLUMN,
} from "../types";

const CardsState = (props) => {
  const initialState = {
    cards: [],
    wentWellOrder: [],
    toImproveOrder: [],
    actionItemsOrder: [],
    error: null,
    addingColumn: null,
  };

  const [state, dispatch] = useReducer(cardsReducer, initialState);

  // Get cards
  const getCards = async (boardId) => {
    try {
      const res = await axios.get(`/api/boards/${boardId}/cards`);
      dispatch({
        type: GET_CARDS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Get orders of cards
  // Get column orders by board Id
  const getColumnOrder = async (boardId, columnName) => {
    try {
      const res = await axios.get(
        `/api/boards/${boardId}/columns/${columnName}`
      );
      dispatch({
        type: GET_COLUMN_ORDER,
        payload: {
          [columnName + "Order"]: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Add card
  const addCard = async (data) => {
    const { content, column, board } = data;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/boards/${board}/cards`,
        { content, column },
        config
      );
      dispatch({
        type: ADD_CARD,
        payload: {
          card: res.data,
          column,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CARD_ERROR,
        payload: err.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: CARD_ERROR,
          payload: null,
        });
      }, 1000);
    }
  };

  // Remove card
  const removeCard = async (id) => {
    try {
      await axios.delete(`/api/cards/${id}`);

      dispatch({
        type: REMOVE_CARD,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update card
  const updateCard = async (card) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const res = await axios.put(`/api/cards/${card._id}`, card, config);
      dispatch({ type: UPDATE_CARD, payload: res.data });
    } catch (err) {
      dispatch({ type: CARD_ERROR, payload: err.response.msg });
    }
  };

  // Set adding column
  const setAddingColumn = (column) => {
    dispatch({
      type: SET_ADDING_COLUMN,
      payload: column,
    });
  };

  // Move card
  const moveCard = async ({
    boardId,
    destColumn,
    destIndex,
    srcColumn,
    srcIndex,
    srcId,
  }) => {
    try {
      axios.get(
        `/api/boards/${boardId}/columns/${destColumn}/${destIndex}?srcId=${srcId}&srcColumn=${srcColumn}`
      );

      let srcColumnIds = [...state[srcColumn + "Order"]];
      if (srcColumn === destColumn) {
        let tmp = srcColumnIds[srcIndex];
        srcColumnIds[srcIndex] = srcColumnIds[destIndex];
        srcColumnIds[destIndex] = tmp;
        dispatch({
          type: UPDATE_COLUMN,
          payload: { name: srcColumn, list: srcColumnIds },
        });
      } else {
        let destColumnIds = [...state[destColumn + "Order"]];
        srcColumnIds.splice(srcIndex, 1);
        destColumnIds.splice(destIndex, 0, srcId);

        dispatch({
          type: UPDATE_COLUMN,
          payload: { name: srcColumn, list: srcColumnIds },
        });

        dispatch({
          type: UPDATE_COLUMN,
          payload: { name: destColumn, list: destColumnIds },
        });
      }
    } catch (err) {
      dispatch({ type: CARD_ERROR, payload: err.response.msg });
    }

    // dispatch({
    //   type: MOVE_CARD,
    //   payload,
    // });
    // try {
    //   const res = await axios.get(
    //     `/api/boards/${boardId}/columns/${destColumn}/${destIndex}?srcId=${srcId}`
    //   );
    //   let payload = {};
    //   if (res.data.source) {
    //     payload[res.data.source.name] = res.data.source.list;
    //   }
    //   payload[res.data.destination.name] = res.data.destination.list;
    //   console.log(payload);
    //   dispatch({ type: MOVE_CARD, payload });
    // } catch (err) {
    //   dispatch({ type: CARD_ERROR, payload: err.response.msg });
    // }
  };

  // Clear error
  const clearError = () => dispatch({ type: CLEAR_CARD_ERROR });

  return (
    <CardsContext.Provider
      value={{
        cards: state.cards,
        error: state.error,
        addingColumn: state.addingColumn,
        wentWellOrder: state.wentWellOrder,
        toImproveOrder: state.toImproveOrder,
        actionItemsOrder: state.actionItemsOrder,
        getCards,
        getColumnOrder,
        removeCard,
        addCard,
        moveCard,
        updateCard,
        setAddingColumn,
        clearError,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsState;
