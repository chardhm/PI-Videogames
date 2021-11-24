import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showGenres, addGame, } from "../../actions/actions";
import './CreateVideogame.css'

export default function AddGame() {
  // Obtengo los géneros del store
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    name: "",
    description: "",
    background_image: "",
    rating: "",
    released: "",
  });

  const [errors, setErrors] = useState({});
  const [checkbox, setCheckbox] = useState([]);
  const [checkboxPlatforms, setCheckboxPlatforms] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Despues de mostrar el DOM..
  useEffect(() => {
    // Si la página está cargando entonces..
    if (loading) {
      dispatch(showGenres()); // Muestro los géneros
      setLoading(false); // La página ya cargó
    }
  });

  const handleInputChange = function (e) {
    // Si el input cambia entonces obtener su valor
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    // Valida el dato escrito
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function validate(input) {
    let errors = {};

    // Si no hay nombre
    if (!input.name) {
      errors.name = "Name is required";
    }

    // Si no hay descripción
    if (!input.description) {
      errors.description = "Description is required";
    }

    return errors;
  }

  const handleCheckboxChange = function (e) {
    // Si es la primera vez que se marca un género
    if (checkbox.length === 0) {
      // Asigno su nombre al array checkbox
      // EJ: checkbox = ["Action"]
      setCheckbox([e.target.name]);
    } else {
      let exist = false;

      // Sino recorro el array checkbox y busco si ya tiene ese género
      for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i] === e.target.name) exist = true;
      }

      // Si lo tiene lo saco del array (es porque estoy desmarcando la casilla)
      if (exist) setCheckbox(checkbox.filter((name) => name !== e.target.name));
      // Sino lo sumo al array
      else setCheckbox([...checkbox, e.target.name]);
    }
  };

  const handleCheckboxPlatformsChange = function (e) {
    // Si es la primera vez que se marca una plataforma
    if (checkboxPlatforms.length === 0) {
      // Asigno su nombre al array checkboxPlatforms
      // EJ: checkboxPlatforms = ["PC"]
      setCheckboxPlatforms([e.target.name]);
    } else {
      let exist = false;

      // Sino recorro el array checkboxPlatforms y busco si ya tiene esa plataforma
      for (let i = 0; i < checkboxPlatforms.length; i++) {
        if (checkboxPlatforms[i] === e.target.name) exist = true;
      }

      // Si lo tiene lo saco del array (es porque estoy desmarcando la casilla)
      if (exist)
        setCheckboxPlatforms(
          checkboxPlatforms.filter((name) => name !== e.target.name)
        );
      // Sino lo sumo al array
      else setCheckboxPlatforms([...checkboxPlatforms, e.target.name]);
    }
  };

  // Si hago clic sobre el botón "Create videogame"
  const handleSubmit = function () {
    if (
      Object.keys(validate(input)).length === 0 &&
      checkbox.length > 0 &&
      checkboxPlatforms.length > 0
    ) {
      // Si está todo OK entonces..
      // Despacho el juego
      dispatch(
        addGame(
          input.name,
          input.background_image,
          input.description,
          input.released,
          input.rating,
          checkbox,
          checkboxPlatforms
        )
      );
      // Muestro un mensaje satisfactorio
      setErrorMsg(false);
      setSuccessMsg(true);
    } else {
      // Sino muestro un mensaje de error
      setSuccessMsg(false);
      setErrorMsg(true);
    }
  };


  return (
    <div className="bodyDetails">
       {successMsg ? (
        <div className="success show">
          <span className="check">
            <i className=""></i>
          </span>
          <span className="msg">Success: Game created succesfully!</span>
          <a className="close"></a>
        </div>
      ) : (
        <p></p>
      )}
      {/* Si hay un error entonces.. */}
      {errorMsg ? (
        <div className="error show">
          <span className="check">
            <i className=""></i>
          </span>
          <span className="msg-error">Error: Please, add platforms and genres!</span>
          <span className="close">
            <i className=""></i>
          </span>
        </div>
      ) : (
        <p></p>
      )}
      {/* Si está cargando entonces.. */}
      {loading ? (
        <p>Loading</p>
      ) : ( 
        <div className="caja">
          <Link to="/home"><button className="home-btn">Home</button></Link>
        <div class="button">
          <button className ="btnAdd" onClick={() => handleSubmit()}>Create videogame</button>
        </div>
        <div className="containerForm">
          <div className="titleForm">Registration</div>
        <div className="gameDetails">
            <div className="inputBox">
              <span className="formDetails">Name: </span>
              <input
                className={errors.name && "danger"}
                autocomplete="off"
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={handleInputChange}
                value={input.name}
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>
            <div className="inputBox">
              <span className="formDetails">Description: </span>
              <input
                className={errors.description && "danger"}
                type="text"
                name="description"
                placeholder="Enter description"
                onChange={handleInputChange}
                value={input.description}
              />
              {errors.description && (
                <p className="danger">{errors.description}</p>
              )}
            </div>
            <div className="inputBox">
              <span className="formDetails">Released: </span>
              <input
                type="date"
                name="released"
                placeholder="DD/MM/YY"
                onChange={handleInputChange}
                value={input.released}
              />
            </div>
            <div className="inputBox">
              <span className="formDetails">Rating: </span>
              <input
                type="number"
                min="0"
                max="5"
                regex="\b([1-9]|10)\b"
                name="rating"
                placeholder="Enter the rating from 0 to 5"
                onChange={handleInputChange}
                value={input.rating}
              />
            </div>
            <div className="inputBox">
              <span className="formDetails">Image: </span>
              <input
                type="text"
                name="background_image"
                placeholder="Enter URL"
                onChange={handleInputChange}
                value={input.background_image}
              />
            </div>
            <p></p>
            <div className="genresDetailss">
              <span className="genresTitle">Genres: </span>
              <div className="category">
                {/* Muestro todos los géneros */}
                {genres.map((genre) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        name={genre.name}
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      <label> {genre.name}</label>
                    </div>
                  );
                })}
              </div>
             </div>
            </div>
            <div className="platformsDetailss">
              <span className="platformsTitle">Platforms: </span>
              <div className="category">
                <div>
                  <input
                    name="Android"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Android </span>
                  <img className="platIcn" src="https://img.icons8.com/color/48/000000/android-os.png"/>
                </div>
                <div>
                  <input
                    name="Apple Macintosh"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Apple Macintosh </span>
                  <img className="platIcn" src="https://img.icons8.com/fluency-systems-filled/48/000000/mac-client.png"/>
                </div>
                <div>
                  <input
                    name="Linux"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Linux </span>
                  <img class ="platIcn" src="https://img.icons8.com/color/48/000000/linux--v1.png"/>
                </div>
                <div>
                  <input
                    name="Nintendo"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Nintendo </span>
                  <img className="platIcn" src="https://img.icons8.com/color/48/000000/nintendo.png"/>
                </div>
                <div>
                  <input
                    name="PC"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>PC </span>
                  <img className ="platIcn" src="https://img.icons8.com/office/16/000000/pc-on-desk.png"/>
                </div>
                <div>
                  <input
                    name="PlayStation"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>PlayStation </span>
                  <img className ="platIcn" src="https://img.icons8.com/color/48/000000/play-station.png"/>
                </div>
                <div>
                  <input
                    name="Xbox"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Xbox </span>
                  <img className ="platIcn" src="https://img.icons8.com/color/48/000000/xbox--v1.png"/>
                </div>
               </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}