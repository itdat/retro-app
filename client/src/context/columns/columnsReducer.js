import { GET_COLUMN_ORDER, MOVE_CARD, COLUMN_ERROR } from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_COLUMN_ORDER:
      return {
        ...state,
        ...action.payload,
      };
    case MOVE_CARD:
      return {
        ...state,
        ...action.payload,
      };
    case COLUMN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
