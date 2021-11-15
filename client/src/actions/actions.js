export const SHOW_GAMES = "SHOW_GAMES";
const axios = require("axios");

export function showGames() {
  return function (dispatch) {
    axios.get("http://localhost:3001").then((response) => {
      console.log(response.data.results);
      dispatch({ type: SHOW_GAMES, payload: response.data.results });
    });
  };
}