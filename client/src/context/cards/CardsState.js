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
  SORT_CARDS,
} from "../types";

const CardsState = (props) => {
  const initialState = {
    wentWell: [],
    toImprove: [],
    actionItems: [],
    error: null,
    addingColumn: null,
  };

  const [state, dispatch] = useReducer(cardsReducer, initialState);

  // Get cards (demo id: 5fa24556601b321aa80ee16c)
  const getCards = async (id) => {
    try {
      const wentWellRes = await axios.get(
        `/api/cards?board=${id}&column=wentWell`
      );
      const toImproveRes = await axios.get(
        `/api/cards?board=${id}&column=toImprove`
      );
      const actionItemsRes = await axios.get(
        `/api/cards?board=${id}&column=actionItems`
      );

      dispatch({
        type: GET_CARDS,
        payload: {
          wentWell: wentWellRes.data,
          toImprove: toImproveRes.data,
          actionItems: actionItemsRes.data,
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
  const addCard = async (card) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/cards", card, config);
      dispatch({
        type: ADD_CARD,
        payload: res.data,
      });
    } catch (err) {
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

  // Sort cards
  const sortCards = async (column, cards, order) => {
    const reorder = async () => {
      console.log(cards);
      console.log(order);
      let orderedCards = [...Array(order.length)];
      for (const card of cards) {
        const index = await order.findIndex(
          (id) => String(id) === String(card._id)
        );
        orderedCards[index] = card;
      }
      return orderedCards;
    };
    let value = await reorder();
    console.log(value);
    // console.log(`${column} : ${value}`);
    dispatch({
      type: SORT_CARDS,
      payload: {
        name: column,
        list: value,
      },
    });
  };

  return (
    <CardsContext.Provider
      value={{
        wentWell: state.wentWell,
        toImprove: state.toImprove,
        actionItems: state.actionItems,
        error: state.error,
        addingColumn: state.addingColumn,
        getCards,
        removeCard,
        addCard,
        updateCard,
        setAddingColumn,
        sortCards,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsState;
