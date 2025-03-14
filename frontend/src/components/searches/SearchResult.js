import React from "react";
import "./SearchResult.css"
import Popup from 'reactjs-popup';
import { useState } from "react";

export const SearchResult = ({result}) => {
    const [films] = useState([result]);
    return (
        <div 
        className="search-result" >
        {films.map((film, index) => (
            <Button key={index} film={film} />
        ))}</div>
    )
}

  function Button({film}) {

    const movieInfo = `Film ID: ${film.film_id} 
                        Category: ${film.category_name}
                        Actor: ${film.actors}
                        Description: ${film.description}`;
    

    return (
      <Popup trigger=
      {<button>
        {film.title}
        </button>
        }
        >
        <PopupInfo info={movieInfo} />
        </Popup>
    );
  }

  function PopupInfo({info}) {
    return (
      <div className="text">
      {info.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      </div>
    );
  }