import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterForGenre, filterForInput, showGames, showGenres} from "../../actions/actions";

export default function Home(props) {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const filteredGames = useSelector((state) => {
    if (state.filteredGames) return state.filteredGames;
  });
  const genres = useSelector((state) => state.genres);
  const [input, setInput] = useState("");

  return (
    <div>
      <button onClick={() => dispatch(showGames())}>SHOW GAMES</button>
      <button onClick={() => dispatch(showGenres())}>SHOW GENRES</button>
      <input
        onChange={(e) => {
          if (e.target.value.length !== 0) {
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
                console.log(e.target.innerHTML);
                dispatch(filterForGenre(e.target.innerHTML, filteredGames));
              }}
            >
              {genre.name}
            </button>
          </div>
        ))}
      </div>
      <div>
        {input.length === 0
          ? games.map((game) => (
              <div>
                <h1>{game.name}</h1>
                {game.genres.map((genre) => (
                  <h2>{genre.name}</h2>
                ))}
                <img src={game.background_image} alt="" />
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