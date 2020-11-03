import { CONFIRM_DIALOG, CANCEL_DIALOG, SET_CONFIRM_DIALOG } from "../types";
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_CONFIRM_DIALOG:
      return action.payload;
    case CONFIRM_DIALOG:
      return {
        ...state,
        result: true,
      };
    case CANCEL_DIALOG:
      return null;
    default:
      return state;
  }
};
