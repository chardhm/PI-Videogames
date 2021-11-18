import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import { store } from "./store/index";
import { Provider } from "react-redux";
import Home from "./components/Home/Home";
import { Details } from "./components/VideoGamesDetails/VideoGamesDetails";
import AddGame from "./components/CreateVideogame/CreateVideogame"


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route exact path="/" component={App} />
      <Route path="/home" component={Home} />
      <Route path="/videogame/:id" component={Details} />
      <Route exact path="/addGame" component={AddGame} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
