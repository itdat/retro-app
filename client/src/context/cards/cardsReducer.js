import {
  ADD_CARD,
  CARD_ERROR,
  GET_CARDS,
  GET_COLUMN_ORDER,
  REMOVE_CARD,
  SET_ADDING_COLUMN,
  UPDATE_CARD,
  UPDATE_COLUMN,
  CLEAR_CARD_ERROR,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
      };
    case GET_COLUMN_ORDER:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_COLUMN:
      return {
        ...state,
        [action.payload.name + "Order"]: action.payload.list,
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
      return {
        ...state,
        cards: [action.payload.card, ...state.cards],
        [action.payload.column + "Order"]: [
          action.payload.card._id,
          ...state[action.payload.column + "Order"],
        ],
        loading: false,
      };
    case UPDATE_CARD:
      return {
        ...state,
        [action.payload.column]: state[action.payload.column].map((card) =>
          card._id === action.payload._id ? action.payload : card
        ),
      };
    case CARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_CARD_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_ADDING_COLUMN:
      return {
        ...state,
        addingColumn: action.payload,
      };
    default:
      return state;
  }
};
