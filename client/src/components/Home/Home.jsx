import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterForGenre, filterForInput, showGames, showGenres, ascendingOrder, descendingOrder, higherRating, lowerRating, APIorDB, API_OR_DB,} from "../../actions/actions";
import './Home.css'

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const filteredGames = useSelector((state) => {
    if (state.filteredGames) return state.filteredGames;
  });
  const genres = useSelector((state) => state.genres);

  const [genre, setGenre] = useState(false);
  const [input, setInput] = useState("");
  const [alphabetic, setAlphabetic] = useState(false);
  const [rating, setRating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiOrDb, setApiOrDb] = useState(false);

  // Estados para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
 //                           1              15
  const indexOfLastPost = currentPage * postsPerPage; 
  const indexOfFirstPost = indexOfLastPost - postsPerPage; 
  // Con el slice reparto los juegos en posts de 15
  const currentPosts = games.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    // Si no es la última página entonces cambiar a la siguiente página
    if (currentPage !== 7) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    // Si no es la primer página entonces cambiar a la página anterior
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

   //resetear filtros
  const refreshPage = ()=>{
    window.location.reload();  }


  // Después de cargar el DOM
  useEffect(() => {
    if (loading) {
      // Si la página está cargando entonces..
      // Muestro los juegos y los géneros
      // Seteo el loading el false
      dispatch(showGames());
      dispatch(showGenres());
      setLoading(false);
    }
  });

  return (
    <div className="pantalla">
      <div className="container-top">
        <span className="customArrow"></span>
        <Link to="/home"><button className="homeBtn">Home</button></Link>        
        <input
          className="placeholder"
          placeholder="Search game..."
          onChange={(e) => {
            if (e.target.value.length !== 0) {
              // Si el usuario ingresa al menos una letra en el input entonces..
              setAlphabetic(false);
              // Buscar los juegos que tengan esa letra o palabra
              dispatch(filterForInput(e.target.value, games));
            } 
            setInput(e.target.value);
          }}
        />
        <Link to="/videogame"><button className="addGame">Add videogame</button></Link>
        <p></p>
        <select
          onChange={(e) => {
            // Si no selecciona ningún género entonces..
            if (e.target.value === 0) {
              setGenre(false);
            } else {
              // Sino los filtro por el género seleccionado
              setGenre(false);
              dispatch(filterForGenre(e.target.value, games));
              setGenre(true);
            }
          }}
        >
          <option className="cajita" selected value="0">Choose genre</option>
          {genres.map((genre, i) => (
          <option value={genre.name} key={i}>{genre.name}</option>
          ))}
        </select>
        <span className="custom-arrow"></span>
        <select
          onChange={(e) => {
            /* console.log(e.target.value); */
            setAlphabetic(!alphabetic);
            if (e.target.value == 1) {
              // Si selecciona de forma ascendente (A-Z) entonces..
              dispatch(ascendingOrder(games));
              setAlphabetic(!alphabetic);
            } else if (e.target.value == 2) {
              // Sino.. si selecciona de forma descendente (Z-A) entonces..
              dispatch(descendingOrder(games));
              setAlphabetic(!alphabetic);
            }
          }}
        >
          <option selected value="0" disabled>Alphabetically</option>
          <option value="1">A - Z</option>
          <option value="2">Z - A</option>
        </select>
        <span className="custom-arrow"></span>
        <select
          onChange={(e) => {
            /* console.log(e.target.value); */
            setRating(!rating);
            if (e.target.value == 1) {
              // Si selecciona por mayor rating entonces..
              dispatch(higherRating(games));
              setRating(!rating);
            } else if (e.target.value == 2) {
              // Sino.. si selecciona por menor rating entonces..
              dispatch(lowerRating(games));
              setRating(!rating);
            } else setRating(false);
          }}
        >
          <option selected value="0" disabled>Order by rating</option>
          <option value="1">Best Rating</option>
          <option value="2">Worst Rating</option>
        </select>
        <select
          onChange={(e) => {
            setApiOrDb(false);
            if (e.target.value == 0) setApiOrDb(false);
            else {
              dispatch(APIorDB(games, e.target.value));
              setApiOrDb(true);
            }
          }}
        >
          
          <option selected value="0">
            API or Database
          </option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
        <button className ="resetFilters" type="submit" onClick={refreshPage}> Reset Filters</button>
      </div>
      <div className="button-container">
      <button className="btnPag" onClick={() => prevPage()}>Previous page</button>
      <button className="btnPag2" onClick={() => nextPage()}>Next page</button>
      </div>
      <div className="container">
        {(input.length === 0 || alphabetic || rating) && !genre && !apiOrDb
          ? // Si no buscaron ni filtraron nada entonces..
            currentPosts.map((game, i) => (
              <div className="card" key={i}>
                <Link to={() => `/videogame/${game.id}`}>
                <i className="fas fa-info-circle">i</i>
                </Link>
                <h4>{game.name}</h4>
                <img src={game.background_image} />
                <p>⭐ {game.rating}</p>
                <p>{game.genres.map((genre) => " ● " + genre.name)}</p>
                {/* <p>{
				          	game.genres.length <= 4
				          	? game.genres?.map(genre => " ● " + genre.name)
				          	: game.genres?.filter((genre,i) => i<6 && genre.name)
				          					 .map(genre => " ● " + genre.name).join(",")
				          					 .concat(' and more...')
                }</p> */}
              </div>
            ))
          : // Sino mostrar el array de los juegos filtrados
            filteredGames.map((game, i) => (
              <div className="card" key={i}>
                <Link className="detailsBtn" to={() => `/videogame/${game.id}`}>
                <i className="fas fa-info-circle">i</i>
                </Link>
                <h4>{game.name}</h4>
                <img src={game.background_image} />
                <p>⭐ {game.rating || 'N/A'/*Not available*/}</p>
                <p>{game.genres.map((genre) => " ● " + genre.name)}</p>
              </div>
            ))}
      </div>
    </div>
  );
}