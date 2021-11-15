import { SHOW_GAMES } from "../actions/actions";

let initialState = {
  details: {},
  games: [],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    default:
      return state;
  }
};

export default todos;