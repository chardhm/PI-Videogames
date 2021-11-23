export const SHOW_GAMES = "SHOW_GAMES";
export const FILTER_GAMES_INPUT = "FILTER_GAMES_INPUT";
export const SHOW_GENRES = "SHOW_GENRES";
export const FILTER_GAMES_GENRE = "FILTER_GAMES_GENRE";
export const ASCENDING_ORDER = "ASCENDING_ORDER";
export const DESCENDING_ORDER = "DESCENDING_ORDER";
export const HIGHER_RATING = "HIGHER_RATING";
export const LOWER_RATING = "LOWER_RATING";
export const SHOW_DETAILS = "SHOW_DETAILS";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const ADD_GAME = "ADD_GAME";
export const API_OR_DB = "API_OR_DB";
let id = 0;
const axios = require("axios");

export function showGames() {
  return function (dispatch) {
    // Llamo al backend para obtener todos los juegos y los despacho
    axios.get("http://localhost:3001/videogames").then((response) => {
      dispatch({ type: SHOW_GAMES, payload: response.data });
    });
  };
}
export function showGenres() {
  return function (dispatch) {
    // Llamo al backend para obtener todos los géneros y los despacho
    axios.get("http://localhost:3001/genres").then((response) => {
      console.log(response.data);
      dispatch({ type: SHOW_GENRES, payload: response.data });
    });
  };
}
  
export function filterForInput(value, array) {
  return function (dispatch) {
    // Despacho el tipo, los juegos y el valor del input
    dispatch({ type: FILTER_GAMES_INPUT, payload: array, query: value });
  };
}
  
export function filterForGenre(value, array) {
  return function (dispatch) {
    // Despacho el tipo, los juegos y el género elegido
    dispatch({ type: FILTER_GAMES_GENRE, payload: array, genre: value });
  };
}

export function ascendingOrder(array) {
  return function (dispatch) {
    // Despacho el tipo y los juegos
    dispatch({ type: ASCENDING_ORDER, payload: array });
  };
}

export function descendingOrder(array) {
  return function (dispatch) {
    // Despacho el tipo y los juegos
    dispatch({ type: DESCENDING_ORDER, payload: array });
  };
}

export function higherRating(array) {
  return function (dispatch) {
    // Despacho el tipo y los juegos
    dispatch({ type: HIGHER_RATING, payload: array });
  };
}

export function lowerRating(array) {
  return function (dispatch) {
    // Despacho el tipo y los juegos
    dispatch({ type: LOWER_RATING, payload: array });
  };
}

export function showDetails(pathname) {
  return function (dispatch) {
    // Llamo al backend con el id que obtengo del frontend y
    //  despacho la respuesta (el juego)

    // EJ: axios.get(`http://localhost:3001/videogame/3821`)

    axios.get(`http://localhost:3001${pathname}`).then((response) => {
      dispatch({ type: SHOW_DETAILS, payload: response.data });
    });
  };
}

export function clearDetail() {
  return {
      type: CLEAR_DETAIL,
  }
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
    // Llamo al backend y le paso las propiedades para que se encargue de crear el juego.
    // Despacho solo el tipo.
    axios
      .post("http://localhost:3001/videogame", {
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

export function APIorDB(array, dbOrAPI) {
  return function (dispatch) {
    // Despacho el tipo y los juegos
    dispatch({ type: API_OR_DB, payload: { array, dbOrAPI } });
  };
}