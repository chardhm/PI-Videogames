import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDetails, clearDetail } from "../../actions/actions";
import { Link } from "react-router-dom";
import pacmanLoading from "../../img/pacman-loader.gif";
import './VideoGamesDetails.css';

export function Details(props) {
  // Obtengo los detalles
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // Despues de mostrar el DOM..
  useEffect(() => {
    if (loading) {
      // Si está cargando entonces..
      // Muestro los detalles por el id
      
      // EJ:
      // window.location.pathname = "/videogame/3493"
      dispatch(showDetails(window.location.pathname));
    }
    setLoading(false);
  });

  return (
    <>
      {/* Si se encontraron los detalles, mostrarlos */}
      {Object.keys(details).length !== 0 ? (
        <main>
          <Link className="link" to="/home">
            <button className="back-btn">Back</button>
          </Link>
          <div className="container-details">
            <div className="cover">
              <img className="background" src={details.background_image} />
              <div className="ratingDetail">
                <span>Rating: {details.rating}</span>
              </div>
              <div>
              <img
                  className="star"
                  src="https://www.medicoselite.com/wp-content/uploads/rating-medico.gif"
                  alt=""
                />
              </div>
              <div className="ratingDetail">
                Platforms:<p></p>
                {!details.hasOwnProperty("db") ? (
                  details.platforms.map((object) => (
                    <span> <img className ="platBtn" src="https://img.icons8.com/officexs/16/000000/circled-chevron-right.png"/> {object.platform.name} </span>
                  ))
                ) : (
                  <span> <img className ="platBtn" src="https://img.icons8.com/officexs/16/000000/circled-chevron-right.png"/> {details.platforms}</span>
                )}
              </div>
              <p></p>
              <div className="ratingDetail">
                Genres:<p></p>
                {details.genres.map((genre) => (
                  <span> <img className ="platBtn" src="https://img.icons8.com/officexs/16/000000/circled-chevron-right.png"/> {genre.name} </span>
                ))}
              </div>
              <p></p>
              <div className="ratingDetail">
                {/* Si no pertenece a la BD (pertenece a la API) entonces.. */}
                {!details.hasOwnProperty("db") ? (
                  <span>This game comes to the API.</span>
                ) : (
                  // Sino..
                  <span>This game comes to the Database.</span>
                )}
              </div>
              <p></p>
              
            </div>
            <div className="content">
              <div className="content-body">
                <div className="black-label">
                  <span className="title">{details.name}</span>
                  {/* Uso el replaceAll para sacar las etiquetas "<p></p>" de la descripción*/}
                  <p>{details.description.replaceAll(/<\/?[^>]+(>|$)/g, "")}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        {/* <p>Loading...</p> */},
        
          <img src={pacmanLoading} alt="" />
      )}
    </>
  );
}