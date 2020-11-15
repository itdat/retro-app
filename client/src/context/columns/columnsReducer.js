import { GET_COLUMN_ORDERS, MOVE_CARD, COLUMN_ERROR } from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_COLUMN_ORDERS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case MOVE_CARD:
      console.log("Update columns");
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
