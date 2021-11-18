import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterForGenre, showGenres, addGame, } from "../../actions/actions";

export default function AddGame() {
  const genres = useSelector((state) => state.genres);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [released, setReleased] = useState("");
  const [rating, setRating] = useState("");
  const [platforms, setPlatforms] = useState("");

  useEffect(() => {
    if (loading) {
      dispatch(showGenres());
      setLoading(false);
    }
  });

  return (
    <div>
        <Link to="/home"><button>Home</button></Link>
      <form>
        <label>Name: </label>
        <input />
        <label>Description: </label>
        <textarea />
        <label>Release date: </label>
        <input />
        <label>Rating: </label>
        <input />
        <select>
          <option selected value="0">
            Choose genres
          </option>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <select>
          <option selected value="0">
            Choose platforms
          </option>
          <option value="Android">Android</option>
          <option value="Apple Macintosh">Apple Macintosh</option>
          <option value="Linux">Linux</option>
          <option value="Nintendo">Nintendo</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="XBOX">XBOX</option>
        </select>
      </form>
      <button onClick={() =>
          dispatch(addGame(
              "GTA",
              "background_image",
              "description",
              "released",
              "rating",
              "Adventure",
              "platforms"
            )
          )
        }
      > Create videogame </button>
    </div>
  );
}