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
} from "../types";

const CardsState = (props) => {
  const initialState = {
    wentWell: [],
    toImprove: [],
    actionItems: [],
  };

  const [state, dispatch] = useReducer(cardsReducer, initialState);

  // Get cards
  const getCards = async () => {
    try {
      const wentWellRes = await axios.get(
        `/api/cards?board=5fa24556601b321aa80ee16c&column=wentWell`
      );
      const toImproveRes = await axios.get(
        `/api/cards?board=5fa24556601b321aa80ee16c&column=toImprove`
      );
      const actionItemsRes = await axios.get(
        `/api/cards?board=5fa24556601b321aa80ee16c&column=actionItems`
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
        payload: err.message,
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
        payload: err.response.msg,
      });
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

  return (
    <CardsContext.Provider
      value={{
        wentWell: state.wentWell,
        toImprove: state.toImprove,
        actionItems: state.actionItems,
        getCards,
        removeCard,
        addCard,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsState;
