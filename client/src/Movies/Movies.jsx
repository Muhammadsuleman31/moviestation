import React from "react"
import "./movies.css"
import { useState, useEffect , useContext} from 'react';






function Movies(pros){

  function discard(e){
    pros.ondelete(pros.Name)
  }

 

  const handleImageError = (e) => {
    e.target.onerror = null; // Reset the event handler to prevent infinite loop
    e.target.src = 'https://i.imgur.com/s8Uo3wh.jpeg'; // Fallback image URL
  };
 
return(
  <div className="movie">
    <div className="img-container" > 
    {pros.Poster ? (
          <img src={pros.Poster} alt="Movie Poster" onError={handleImageError} />
        ) : (
          <img src="https://i.imgur.com/s8Uo3wh.jpeg" alt="Fallback" />
        )}
        </div>
    <div>
   <h3>{pros.Name} ({pros.Year})</h3>
   <h5>Genres: {pros.Genres}</h5>
   <h5>Runtime: {pros.Runtime} Imdb: {pros.Imdb}</h5>
   <p>plot: {pros.Plot}</p>
   <button onClick={discard}>delete</button>
    </div>
  </div>
)



}

export default Movies