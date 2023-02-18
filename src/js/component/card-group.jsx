import React, { useState, useEffect } from "react";
import "../../styles/cardgroup.css";
import axios from "axios";
import TheCard from "./card.jsx";

const CardGroup = (props) => {
const [groupChar, setGroupChar] = useState({ next: "", previous: "", results: [] });
const [page, setPage] = useState(1);

  useEffect(() => {
	getData();
  }, [page]);	

  const getData = (url = `https://swapi.dev/api/${props.apiType}/`) => {	// Setting a general url for the API with a variable page
	
    if (page === 1) {url = `https://swapi.dev/api/${props.apiType}/`}
    else if (page > 1) {url = `https://swapi.dev/api/${props.apiType}/?page=${page}`}
    else {alert ("The page doesn't exist! =(")}

	axios
	.get(url, {		// Calling the API from the general URL
	  headers: {
			"Content-Type": "application/json",
	  },
	})
	.then(({ data }) => {	// Getting data from that API
		setGroupChar({
			next: data.next,	// Getting the link for the next set of characters
			previous: data.previous,	// Getting the link for the previous set of characters
            results: data.results,  // Getting the current set of characters
        });
		console.log(groupChar)
		})
	.catch((error) => {
		console.log(error); // Checking errors
		return error.response;
  });
};

   const handleClick = (button) => {
    if (button === "next") {setPage((p) => p + 1)}
    else if (button === "previous") {setPage((p) => p - 1)}
   }

  return (
    <div className="text-center m-5">
      <h1 className="thetitle">{props.apiType}</h1>
	  <div className="d-flex flex-nowrap overflow-auto m-3">
      {groupChar.results ? groupChar.results.map((item, index) => {
			
		const itemUrl = item.url; // Getting the item Url
		//console.log("itemUrl:", itemUrl);
		const splitArray = itemUrl.split("/"); // Creating an array of parts of the Url. The item number is always #5
		//console.log("splitArray:", splitArray);
		const itemIndex = splitArray[5]; // Creating the itemIndex which is the number of the item
		//console.log("itemIndex:", itemIndex);
		let picType = "";
		if (props.apiType === "people") {picType = "characters"}
		else {picType = props.apiType};
		// let apiPic = `https://starwars-visualguide.com/assets/img/${picType}/${picIndex}.jpg`;
		// const placeHolderPic = "../../img/no-image.jpg";
		console.log(item.name)	
		return (
				<TheCard 
					key={index} 
					imgAlt={item.name} 
					cardImage={`https://starwars-visualguide.com/assets/img/${picType}/${itemIndex}.jpg`}
					cardTitle={item.name} 
					data={Object.entries(item)} // getting the info from the objects
					apiType={props.apiType}
					number={itemIndex}
					addToFav={item.name}
				/>
			
			);
		})
		: null
		}
	</div>
		<a onClick={() => handleClick("previous")} className={`btn nav-btn m-2 btn-dark btn-block ${groupChar.previous === null ? 'disabled' : ''}`}>
			Previous
		</a>
		<a onClick={() => handleClick("next")} className={`btn nav-btn btn-dark btn-block ${groupChar.next === null ? 'disabled' : ''}`}>
			Next
		</a>
    </div>
  );
};

export default CardGroup;