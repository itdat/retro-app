import {
  ADD_CARD,
  CARD_ERROR,
  GET_CARDS,
  REMOVE_CARD,
  UPDATE_CARD,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
