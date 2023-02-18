import React from "react";
import "../../styles/cardstyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import placeholder from "../../img/no-image.jpg"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { passTheFavorite, deleteTheFavorite } from "../store/favoriteSlice";

const TheCard = (props) => {
  const dispatch = useDispatch(); // Setting up Dispatch from the Redux Toolkit
  const favorites = useSelector(state => state.favorite.favorites); // Selecting the Favorites from the favoriteSlice.js the 'favorites' after the last dot is actually that array
  const isFavorite = favorites.find(favorite => favorite.title === props.cardTitle) !== undefined; // Double checking whether the item has beed declared as a Favorite already


  const handleAddToFavorites = (title, link) => { // Passing an item to Favorites
    console.log('Adding to favorites:', title, link);
    dispatch(passTheFavorite({ title, link }));
  };

  const handleRemoveFromFavorites = (title, link) => { // Removing an item from Favorites
    console.log('Removing from favorites:', title, link);
    dispatch(deleteTheFavorite({ title, link }));
  };

  const info = props.data;
  let extractedData = [];
  let count = 0;
  
  for (const [key, value] of Object.entries(info)) { // Creating an array out of object's key-value pairs. Extracting 1st to 4th.
    if (count >= 1 && count <= 3) {
      let dataArray = value.toString().split(','); // The value was actually 2 values: "description, value". I separated them and created 2 different values.
      extractedData.push(dataArray);
    }
    count++;
    if (count > 3) {
      break;
    }
  }

  const extractedDataElements = extractedData.map((data, index) => { // The description needs to be fixed by removing the "/" and replacing them with " ". Then We need to make every first letter uppercase.
    let [param, value] = data;
    let formattedParam = param
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    // Returning it
    return (
      <div key={index}>
        <strong>{formattedParam}: </strong>
        {value}
      </div>
    );
  });

    return (
      <div className="card m-3" style={{ width: '18rem' }}>
        <img className="card-img-top" src={props.cardImage} alt={props.imgAlt} onError={(e) => e.target.src=placeholder} />
        <div className="card-body d-flex flex-column text-left">
          <h5 className="card-title">{props.cardTitle}</h5>
          <p className="card-text">{extractedDataElements}</p>
        <div className="d-flex mt-auto justify-content-between mx-3">
          <Link to={`/${props.apiType}/${props.number}`}>
            <button className="btn btn-outline-dark">Learn More!</button>
          </Link>
          <button className="btn btn-outline-warning" onClick={() => {
              if (isFavorite) {
                handleRemoveFromFavorites(props.cardTitle, `${props.apiType}/${props.number}`); // Passing all of the necessary info to the handler
              } else {
                handleAddToFavorites(props.cardTitle, `${props.apiType}/${props.number}`); // Passing all of the necessary info to the handler
              }
            }}>
              <FontAwesomeIcon icon={faHeart} style={{color: isFavorite ? 'red' : 'gray'}} /> {/* Making sure the button is marked a certain way if an item is in the Favorites list. */}
          </button>
          </div>
        </div>
      </div>
    );
  }

export default TheCard;