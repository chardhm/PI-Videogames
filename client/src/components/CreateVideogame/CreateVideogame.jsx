import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showGenres, addGame, } from "../../actions/actions";

export default function AddGame() {
  const genres = useSelector((state) => state.genres);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (loading) {
      dispatch(showGenres());
      setLoading(false);
    }
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "Name is required";
    }

    if (!input.description) {
      errors.description = "Description is required";
    }

    return errors;
  }

  const handleCheckboxChange = function (e) {
    if (checkbox.length === 0) {
      setCheckbox([e.target.name]);
    } else {
      let exist = false;

      for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i] === e.target.name) exist = true;
      }

      if (exist) setCheckbox(checkbox.filter((name) => name !== e.target.name));
      else setCheckbox([...checkbox, e.target.name]);
    }
    console.log(checkbox);
  };

  const handleCheckboxPlatformsChange = function (e) {
    if (checkboxPlatforms.length === 0) {
      setCheckboxPlatforms([e.target.name]);
    } else {
      let exist = false;

      for (let i = 0; i < checkboxPlatforms.length; i++) {
        if (checkboxPlatforms[i] === e.target.name) exist = true;
      }

      if (exist)
        setCheckboxPlatforms(
          checkboxPlatforms.filter((name) => name !== e.target.name)
        );
      else setCheckboxPlatforms([...checkboxPlatforms, e.target.name]);
    }
    console.log(checkboxPlatforms);
  };

  const handleSubmit = function () {
    if (Object.keys(validate(input)).length === 0 && checkbox.length > 0 &&
    checkboxPlatforms.length > 0) {
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
      setErrorMsg(false);
      setSuccessMsg(true);
    } else {
      setSuccessMsg(false);
      setErrorMsg(true);
    }
  };

  return (
    <div className="bodyDetails">
       {successMsg ? (
        <div class="success show">
          <span class="check">
            <i class=""></i>
          </span>
          <span class="msg">Success: Game created succesfully!</span>
          <span class="crose">
            <i class=""></i>
          </span>
        </div>
      ) : (
        <p></p>
      )}
      {errorMsg ? (
        <div class="error show">
          <span class="check">
            <i class=""></i>
          </span>
          <span class="msg-error">Error: Please, add platforms and genres!</span>
          <span class="crose">
            <i class=""></i>
          </span>
        </div>
      ) : (
        <p></p>
      )}
      {loading ? (
        <p>Loading</p>
      ) : ( 
        <div className="containerForm">
          <div className="title">Registration</div>
        <Link to="/home"><button>Home</button></Link>
        <div class="game-details">
            <div class="input-box">
              <span class="details">Name: </span>
              <input
                className={errors.name && "danger"}
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={handleInputChange}
                value={input.name}
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>
            <div class="input-box">
              <span class="details">Description: </span>
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
            <div class="input-box">
              <span class="details">Released: </span>
              <input
                type="text"
                name="released"
                placeholder="DD/MM/YY"
                onChange={handleInputChange}
                value={input.released}
              />
            </div>
            <div class="input-box">
              <span class="details">Rating: </span>
              <input
                type="text"
                name="rating"
                placeholder="Enter the rating"
                onChange={handleInputChange}
                value={input.rating}
              />
            </div>
            <div class="input-box">
              <span class="details">Image: </span>
              <input
                type="text"
                name="background_image"
                placeholder="Enter URL"
                onChange={handleInputChange}
                value={input.background_image}
              />
            </div>
            </div>

            <div class="gender-details">
              <span class="gender-title">Genres: </span>
              <div class="category">
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
            <div class="gender-details">
              <span class="gender-title">Platforms: </span>
              <div class="category">
                <div>
                  <input
                    name="Android"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Android</span>
                </div>
                <div>
                  <input
                    name="Apple Macintosh"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Apple Macintosh</span>
                </div>
                <div>
                  <input
                    name="Linux"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Linux</span>
                </div>
                <div>
                  <input
                    name="Nintendo"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Nintendo</span>
                </div>
                <div>
                  <input
                    name="PC"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>PC</span>
                </div>
                <div>
                  <input
                    name="PlayStation"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>PlayStation</span>
                </div>
                <div>
                  <input
                    name="XBOX"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>XBOX</span>
                </div>
              </div>
              <div class="button">
                <button class ="btn" onClick={() => handleSubmit()}>Create videogame</button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}