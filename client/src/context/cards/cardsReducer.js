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
    case REMOVE_CARD:
      return {
        ...state,
        wentWell: state.wentWell.filter((card) => card._id !== action.payload),
        toImprove: state.toImprove.filter(
          (card) => card._id !== action.payload
        ),
        actionItems: state.actionItems.filter(
          (card) => card._id !== action.payload
        ),
        loading: false,
      };
    case ADD_CARD:
      let updatedCards = [];
      switch (action.payload.column) {
        case "wentWell":
          updatedCards = [...state.wentWell, action.payload];
          break;
        case "toImprove":
          updatedCards = [...state.toImprove, action.payload];
          break;
        case "actionItems":
          updatedCards = [...state.actionItems, action.payload];
          break;
      }
      return {
        ...state,
        [action.payload.column]: updatedCards,
        loading: false,
      };
    default:
      return state;
  }
};