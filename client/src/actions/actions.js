export const SHOW_GAMES = "SHOW_GAMES";
export const FILTER_GAMES_INPUT = "FILTER_GAMES_INPUT";
export const SHOW_GENRES = "SHOW_GENRES";
export const FILTER_GAMES_GENRE = "FILTER_GAMES_GENRE";
const axios = require("axios");

export function showGames() {
  return function (dispatch) {
    axios.get("http://localhost:3001").then((response) => {
      console.log(response.data.results);
      dispatch({ type: SHOW_GAMES, payload: response.data.results });
    });
  };
}
export function showGenres() {
    return function (dispatch) {
      axios
        .get(
          "https://api.rawg.io/api/genres?key=931b4e802056402a9ad13bc2c9e98c48"
        )
        .then((response) => {
          console.log(response.data.results);
          dispatch({ type: SHOW_GENRES, payload: response.data.results });
        });
    };
  };
  
  export function filterForInput(value, array) {
    return function (dispatch) {
      dispatch({ type: FILTER_GAMES_INPUT, payload: array, query: value });
    };
  };
  
  export function filterForGenre(value, array) {
    return function (dispatch) {
      dispatch({ type: FILTER_GAMES_GENRE, payload: array, genre: value });
    };
  };