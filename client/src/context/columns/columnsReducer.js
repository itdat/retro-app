import {
  GET_COLUMN_ORDER,
  ADD_CARD_TO_COLUMN,
  MOVE_CARD,
  COLUMN_ERROR,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_COLUMN_ORDER:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_CARD_TO_COLUMN:
      return {
        ...state,
        [action.payload.column + "Order"]: [
          action.payload.id,
          ...state[action.payload.column + "Order"],
        ],
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
