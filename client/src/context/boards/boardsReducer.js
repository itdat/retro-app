import {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_MESSAGE,
  REMOVE_BOARD,
  UPDATE_BOARD,
  CLEAR_BOARD_MESSAGE,
  CLEAR_BOARDS,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return {
        ...state,
        boards: action.payload,
        loading: false,
      };
    case GET_BOARD:
      return {
        ...state,
        currentBoard: action.payload,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [action.payload, ...state.boards],
        loading: false,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map((board) =>
          board._id === action.payload._id ? action.payload : board
        ),
      };
    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.payload),
        loading: false,
      };
    case BOARD_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_BOARD_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case CLEAR_BOARDS:
      return {
        ...state,
        boards: [],
      };
    default:
      return state;
  }
};
