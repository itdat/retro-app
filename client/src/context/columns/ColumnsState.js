import React, { useReducer } from "react";
import axios from "axios";
import ColumnsContext from "./columnsContext";
import columnsReducer from "./columnsReducer";
import { GET_COLUMN_ORDER, MOVE_CARD, COLUMN_ERROR } from "../types";

const ColumnsState = (props) => {
  const initialState = {
    wentWellOrder: [],
    toImproveOrder: [],
    actionItemsOrder: [],
    error: null,
  };

  const [state, dispatch] = useReducer(columnsReducer, initialState);

  // Get column orders by board Id
  const getColumnOrders = async (id) => {
    try {
      const res = await axios.get(`/api/boards/${id}/columns/wentWell`);
      console.log(`BUGGGG ${res}`);
      dispatch({
        type: GET_COLUMN_ORDER,
        payload: {
          wentWellOrder: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: COLUMN_ERROR,
        payload: err.response.data.msg,
      });
    }
    try {
      const res = await axios.get(`/api/boards/${id}/columns/toImprove`);
      dispatch({
        type: GET_COLUMN_ORDER,
        payload: {
          toImproveOrder: res.data,
        },
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: COLUMN_ERROR,
        payload: err.response.data.msg,
      });
    }
    try {
      const res = await axios.get(`/api/boards/${id}/columns/actionItems`);
      dispatch({
        type: GET_COLUMN_ORDER,
        payload: {
          actionItemsOrder: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: COLUMN_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Update card
  const moveCard = async ({ boardId, destColumn, destIndex, srcId }) => {
    try {
      const res = await axios.get(
        `/api/boards/${boardId}/columns/${destColumn}/${destIndex}?srcId=${srcId}`
      );
      console.log(res);
      let payload = {};
      if (res.data.source) {
        payload[res.data.source.name] = res.data.source.list;
      }
      payload[res.data.destination.name] = res.data.destination.list;
      console.log(payload);
      dispatch({ type: MOVE_CARD, payload });
    } catch (err) {
      dispatch({ type: COLUMN_ERROR, payload: err.response.msg });
    }
  };

  return (
    <ColumnsContext.Provider
      value={{
        wentWellOrder: state.wentWellOrder,
        toImproveOrder: state.toImproveOrder,
        actionItemsOrder: state.actionItemsOrder,
        error: state.error,
        getColumnOrders,
        moveCard,
      }}
    >
      {props.children}
    </ColumnsContext.Provider>
  );
};

export default ColumnsState;
