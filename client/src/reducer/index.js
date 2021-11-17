import { SHOW_GAMES, SHOW_GENRES, FILTER_GAMES_GENRE, FILTER_GAMES_INPUT, ASCENDING_ORDER, DESCENDING_ORDER } from "../actions/actions";

let initialState = {
  details: {},
  games: [],
  genres:[],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_GAMES:
      return {
        ...state,
        games: action.payload,
      };
      case FILTER_GAMES_INPUT:
      return {
        ...state,
        filteredGames: action.payload.filter((game) => {
          if (game.name.toLowerCase().startsWith(action.query.toLowerCase())) {
            return game;
          }
          return false;
        }),
      };
    case FILTER_GAMES_GENRE:
      return {
        ...state,
        filteredGames: action.payload.filter((game) => {
          let exist = false;
          game.genres.map((g) => {
            if (g.name === action.genre) exist = true;
            return game;
          });
          if (exist) {
            return game
          } 
          return false;
        }),
      };
      case ASCENDING_ORDER:
      action.payload.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        games: action.payload,
      };
    case DESCENDING_ORDER:
      action.payload.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        games: action.payload,
      };
    case SHOW_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

export default todos;