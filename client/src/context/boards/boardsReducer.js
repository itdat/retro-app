import {
  GET_BOARDS,
  ADD_BOARD,
  BOARD_MESSAGE,
  REMOVE_BOARD,
  UPDATE_BOARD,
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
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
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
    default:
      return state;
  }
};
