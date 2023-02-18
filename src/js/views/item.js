import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import placeholder from "../../img/no-image.jpg";
import axios from "axios";

const Item = () => {
		const {apiType} = useParams();
		const {number} = useParams();
		const [item, setItem] = useState([]);
		let picType = "";
		if (apiType === "people") {
			picType = "characters"
		}
		else {
			picType = apiType
		}

		useEffect(() => {
			axios.get(`https://swapi.dev/api/${apiType}/${number}`)
			  .then(response => {
				setItem(response.data)
				console.log(response.data);
			  })
			  .catch(error => {
				console.log(error);
			  });
		  }, []);

		  const info = item;
		  let extractedData = [];
		  let count = 0;
		  for (const [key, value] of Object.entries(info)) { // Creating an array out of object's key-value pairs. Extracting 1st to 4th.
			if (count >= 1 && count <= 7) {
				extractedData.push(`${key}: ${value}`);
			  	console.log(extractedData);
			}
			count++;
			if (count > 7) {
			  break;
			}
		  }
		
		  const extractedDataElements = extractedData.map((data, index) => {
			let [param, value] = data.split(":");
			let formattedParam = param
			  .trim()
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
		<>
		  <div className="container m-5 d-flex justify-content-center">
		  	<div className="row">
				<div className="col">
				<img src={`https://starwars-visualguide.com/assets/img/${picType}/${number}.jpg`} onError={(e) => e.target.src=placeholder} />
				</div>
				<div className="col ">
					<h1>{item.name}</h1>
					<p>
						{extractedDataElements}
					</p>
				</div>
			</div>
		  </div>
		</>
	);
	};

export default Item;