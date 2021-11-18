import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../../actions/actions";

export function Details(props) {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    return (
      <div>
        <button onClick={() => dispatch(showDetails(window.location.pathname))}>Show Details</button>
        {Object.keys(details).length !== 0 ? (
        <div>
             <img src={details.background_image} alt="" />
          <h4>{details.name}</h4>
          <p>{details.description}</p>
          <div>
            {details.platforms.map((object) => (
              <p>{object.platform.name} |</p>
            ))}
          </div>
          <div class="container-rating">
            <img class="star" src="https://www.medicoselite.com/wp-content/uploads/rating-medico.gif" alt ="" />
            <p>{details.rating}</p>
          </div>
          <p>{details.genres.map((genre) => genre.name)}</p>
        </div>
) : (
    <p></p>
  )}
</div>
);
}