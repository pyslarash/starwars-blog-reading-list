import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../img/sw-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { passTheFavorite, deleteTheFavorite } from "../store/favoriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/dropdown-menu.css";

const Navbar = () => {
  const favorites = useSelector((state) => state.favorite.favorites); // Get the value of the favorites from the Redux store
  const dispatch = useDispatch(); // Utilizing useDispatch from Redux Toolkit
  const [dropdownOpen, setDropdownOpen] = useState(false);  // Setting up the state to control manual opening/closing of the Favorites button

  const handleAddFavorite = (title, link) => {  // Making sure we are adding the Favorites to the list
    dispatch(passTheFavorite({ title, link }));
  };

  const handleDeleteFavorite = (event, title, link) => {  // Setting up the Delete function
    event.preventDefault();   // Preventing the list to close down automatically when deleting an item. It works together with event.stopPropagation();
    console.log('Removing from favorites:', title, link);
    dispatch(deleteTheFavorite({ title, link }));
    event.stopPropagation(); // I had to place it in the end, so I wouldn't click multiple times on the Favorties button to open it. Now I rarely need to click more than once.
  };

  const toggleDropdown = () => {  // Opening the dropdown menu
    setDropdownOpen(!dropdownOpen);
  };

  const favoriteElements = favorites
    ? favorites.map((fav, index) => { // Map through the favorite titles and create an array of <li> elements
    return (
      <li className="m-2 mx-3 d-flex align-items-center justify-content-between" key={index}>
        <div className="col"><Link className="link-design" to={fav.link}>{fav.title}</Link></div> {/* Showing the title + link in the list */}
        <div className="col text-end">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={(event) => handleDeleteFavorite(event, fav.title, fav.link) /* This code makes sure that the list won't close when we deleting an item */}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </li>
    );
  }) : null;

  return (
		<nav className="navbar navbar-light bg-dark px-5 mb-3">
		  <Link to="/">
			<img src={logo} />
		  </Link>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleDropdown}>
          Favorites
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end custom-dropdown-menu ${
            dropdownOpen ? "show" : ""
          }`}>
        {favoriteElements.length === 0 ? (
            <p className="m-3 text-center fw-bold">Nothing to see here yet</p> /* Shows a placeholder if no items are in the list */
          ) : (
            favoriteElements
        )}
        </ul>
      </div>
		</nav>
	  );
};

export default Navbar;