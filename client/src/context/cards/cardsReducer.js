import {
  ADD_CARD,
  CARD_ERROR,
  GET_CARDS,
  REMOVE_CARD,
  SET_ADDING_COLUMN,
  UPDATE_CARD,
  SORT_CARDS,
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
      console.log("ABC");
      return {
        ...state,
        [action.payload.column]: [
          action.payload,
          ...state[action.payload.column],
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
    case SET_ADDING_COLUMN:
      return {
        ...state,
        addingColumn: action.payload,
      };
    case SORT_CARDS:
      return {
        ...state,
        [action.payload.name]: action.payload.list,
      };
    default:
      return state;
  }
};
