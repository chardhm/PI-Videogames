import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterForGenre, filterForInput, showGames, showGenres, ascendingOrder, descendingOrder} from "../../actions/actions";

export default function Home(props) {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const filteredGames = useSelector((state) => {
    if (state.filteredGames) return state.filteredGames;
  });
  const genres = useSelector((state) => state.genres);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const [alphabetic, setAlphabetic] = useState(false);

  return (
    <div>
      <button onClick={() => dispatch(showGames())}>SHOW GAMES</button>
      <button onClick={() => dispatch(showGenres())}>SHOW GENRES</button>
      <input
        onChange={(e) => {
          if (e.target.value.length !== 0) {
            setAlphabetic(false);
            dispatch(filterForInput(e.target.value, games));
          }
          setInput(e.target.value);
        }}
      />
      <div>
        {genres.map((genre) => (
          <div>
            <button
              onClick={(e) => {
                setClicked(!clicked);
                console.log(clicked);
                if(input.length === 0) dispatch(filterForGenre(e.target.innerHTML, games));
                else dispatch(filterForGenre(e.target.innerHTML, filteredGames));
              }}
            >
              {genre.name}
            </button>
          </div>
        ))}
        <select onChange={(e) => {
          console.log(e.target.value);
          if(e.target.value === 1) 
          {
            setAlphabetic(!alphabetic);
            dispatch(ascendingOrder(games));
            setAlphabetic(!alphabetic);
            console.log(alphabetic);
          }
          else if(e.target.value === 2){ 
            setAlphabetic(!alphabetic);
            dispatch(descendingOrder(games));
            setAlphabetic(!alphabetic);
            console.log(alphabetic);
          } 
        }} >
          <option selected value="0">Choose one</option>
          <option value="1">Ascending</option>
          <option value="2">Descending</option>
        </select>
      </div>
      <div>
      {input.length === 0 && !clicked || alphabetic ? games.map((game) => (
            <div class="container">
              <div class="card">
                <img src={game.background_image} alt="" />
                <h4>{game.name}</h4>
                {game.genres.map((genre) => (
                  <p>{genre.name}</p>
                ))}
              </div>
            </div>
      ))
          : filteredGames.map((game) => (
              <div>
                <h1>{game.name}</h1>
                {game.genres.map((genre) => (
                  <h2>{genre.name}</h2>
                ))}
                <img src={game.background_image} alt="" />
              </div>
            ))}
      </div>
    </div>
  );
}