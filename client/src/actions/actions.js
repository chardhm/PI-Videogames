export const SHOW_GAMES = "SHOW_GAMES";
export const FILTER_GAMES_INPUT = "FILTER_GAMES_INPUT";
export const SHOW_GENRES = "SHOW_GENRES";
export const FILTER_GAMES_GENRE = "FILTER_GAMES_GENRE";
export const ASCENDING_ORDER = "ASCENDING_ORDER";
export const DESCENDING_ORDER = "DESCENDING_ORDER";
export const HIGHER_RATING = "HIGHER_RATING";
export const LOWER_RATING = "LOWER_RATING";
export const SHOW_DETAILS = "SHOW_DETAILS";
export const ADD_GAME = "ADD_GAME";
/* let id = 0; */
const axios = require("axios");

export function showGames() {
  return function (dispatch) {
    axios.get("https://api.rawg.io/api/games?key=931b4e802056402a9ad13bc2c9e98c48").then((response) => {
      console.log(response.data.results);
      dispatch({ type: SHOW_GAMES, payload: response.data.results });
    });
  };
}
export function showGenres() {
    return function (dispatch) {
      axios.get("https://api.rawg.io/api/genres?key=931b4e802056402a9ad13bc2c9e98c48")
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

  export function ascendingOrder(array) {
    return function (dispatch) {
      dispatch({ type: ASCENDING_ORDER, payload: array });
    };
  }
  
  export function descendingOrder(array) {
    return function (dispatch) {
      dispatch({ type: DESCENDING_ORDER, payload: array });
    };
  };

  export function higherRating(array) {
    return function (dispatch) {
      dispatch({ type: HIGHER_RATING, payload: array });
    };
  };
  
  export function lowerRating(array) {
    return function (dispatch) {
      dispatch({ type: LOWER_RATING, payload: array });
    };
  };
  
  export function showDetails(pathname) {
    console.log(pathname);
    return function (dispatch) {
      axios.get(`http://localhost:3001${pathname}`).then((response) => {
        console.log(response);
        dispatch({ type: SHOW_DETAILS, payload: response.data });
      });
    };
  };

  export function addGame(
    name,
    background_image,
    description,
    released,
    rating,
    genres,
    platforms
  ) {
    return function (dispatch) {
      axios.post("http://localhost:3001/videogame", {
        name,
        background_image,
        description,
        released,
        rating,
        genres,
        platforms,
      })
      .then((response) => {
        dispatch({ type: ADD_GAME });
      });
    };
  }