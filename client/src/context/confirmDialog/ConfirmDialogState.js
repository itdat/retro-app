import React, { useReducer } from "react";
import ConfirmDialogContext from "./confirmDialogContext";
import ConfirmDialogReducer from "./confirmDialogReducer";
import { SET_CONFIRM_DIALOG, CONFIRM_DIALOG, CANCEL_DIALOG } from "../types";

const ConfirmDialogState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(ConfirmDialogReducer, initialState);

  const showConfirm = (message) => {
    dispatch({
      type: SET_CONFIRM_DIALOG,
      payload: { message, result: false },
    });
  };

  const hideConfirm = () => {
    dispatch({
      type: SET_CONFIRM_DIALOG,
      payload: null,
    });
  };

  const onConfirm = () => {
    dispatch({
      type: CONFIRM_DIALOG,
    });
  };

  const onCancel = () => {
    dispatch({
      type: CANCEL_DIALOG,
    });
  };

  return (
    <ConfirmDialogContext.Provider
      value={{
        confirm: state,
        showConfirm,
        hideConfirm,
        onConfirm,
        onCancel,
      }}
    >
      {props.children}
    </ConfirmDialogContext.Provider>
  );
};

export default ConfirmDialogState;
